"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, PerformanceMonitor } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import type * as THREE from "three";

function GlassTorus() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.18;
    ref.current.rotation.y += delta * 0.22;
  });
  return (
    <Float speed={1.1} rotationIntensity={0.4} floatIntensity={1.1}>
      <mesh ref={ref} scale={1.15}>
        <torusKnotGeometry args={[1, 0.32, 128, 20]} />
        <meshPhysicalMaterial
          transmission={1}
          thickness={1.4}
          roughness={0.15}
          metalness={0}
          ior={1.3}
          clearcoat={1}
          clearcoatRoughness={0.1}
          attenuationDistance={2}
          attenuationColor={"#ffffff"}
          transparent
        />
      </mesh>
    </Float>
  );
}

// Drives the demand-mode canvas via rAF, and pauses when tab is hidden
// or the OS prefers reduced motion. Keeps CPU idle when nothing is animating.
function DemandDriver() {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    let raf = 0;
    let stopped = document.hidden;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      invalidate();
      return;
    }
    const tick = () => {
      if (!stopped) invalidate();
      raf = requestAnimationFrame(tick);
    };
    const onVis = () => {
      stopped = document.hidden;
      if (!stopped) invalidate();
    };
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [invalidate]);
  return null;
}

export default function HeroCanvas() {
  const isLowPower = useMemo(() => {
    if (typeof navigator === "undefined") return false;
    const cores = navigator.hardwareConcurrency ?? 8;
    const coarse =
      typeof matchMedia !== "undefined" && matchMedia("(pointer: coarse)").matches;
    return coarse || cores <= 4;
  }, []);

  const [dpr, setDpr] = useState<[number, number]>(
    isLowPower ? [1, 1] : [1, 1.25],
  );

  return (
    <Canvas
      dpr={dpr}
      frameloop="demand"
      gl={{
        antialias: !isLowPower,
        alpha: true,
        powerPreference: isLowPower ? "low-power" : "high-performance",
      }}
      camera={{ position: [0, 0, 4.5], fov: 38 }}
    >
      <PerformanceMonitor
        onDecline={() => setDpr(([min]) => [min, Math.max(min, 1)])}
      />
      <DemandDriver />
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} color="#7d6cff" />
      <directionalLight position={[-4, -2, 3]} intensity={1} color="#5fc8e8" />
      <directionalLight position={[0, -3, -4]} intensity={0.6} color="#e89cd8" />
      <GlassTorus />
    </Canvas>
  );
}

