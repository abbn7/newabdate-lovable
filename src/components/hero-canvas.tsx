"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, PerformanceMonitor, MeshTransmissionMaterial } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import type * as THREE from "three";

function GlassTorus({ isLowPower }: { isLowPower: boolean }) {
  const ref = useRef<THREE.Mesh>(null!);
  
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.15;
    ref.current.rotation.y += delta * 0.18;
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={1}>
      <mesh ref={ref} scale={1.15}>
        <torusKnotGeometry args={[1, 0.32, isLowPower ? 64 : 128, 20]} />
        <MeshTransmissionMaterial
          backside
          samples={isLowPower ? 4 : 8}
          resolution={isLowPower ? 128 : 256}
          transmission={1}
          roughness={0.1}
          thickness={1.2}
          ior={1.2}
          chromaticAberration={0.04}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.05}
          clearcoat={0.5}
          attenuationDistance={2}
          attenuationColor={"#ffffff"}
          color={"#ffffff"}
        />
      </mesh>
    </Float>
  );
}

// Optimized DemandDriver that only invalidates when needed
function DemandDriver() {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    let raf = 0;
    let lastTime = performance.now();
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (reduce) {
      invalidate();
      return;
    }

    const tick = (time: number) => {
      // Cap frame rate to ~60fps to save main thread on high-refresh screens
      if (time - lastTime >= 16) {
        if (document.visibilityState === "visible") {
          invalidate();
        }
        lastTime = time;
      }
      raf = requestAnimationFrame(tick);
    };

    const onVis = () => {
      if (document.visibilityState === "visible") invalidate();
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
    const coarse = typeof matchMedia !== "undefined" && matchMedia("(pointer: coarse)").matches;
    return coarse || cores <= 4;
  }, []);

  const [dpr, setDpr] = useState<[number, number]>(
    isLowPower ? [1, 1] : [1, 1.5]
  );

  return (
    <Canvas
      dpr={dpr}
      frameloop="demand"
      gl={{
        antialias: !isLowPower,
        alpha: true,
        powerPreference: isLowPower ? "low-power" : "high-performance",
        stencil: false,
        depth: true,
      }}
      camera={{ position: [0, 0, 4.5], fov: 38 }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <PerformanceMonitor
        onDecline={() => setDpr(([min]) => [min, Math.max(min, 1)])}
      />
      <DemandDriver />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} color="#7d6cff" />
      <directionalLight position={[-4, -2, 3]} intensity={0.8} color="#5fc8e8" />
      <directionalLight position={[0, -3, -4]} intensity={0.5} color="#e89cd8" />
      <GlassTorus isLowPower={isLowPower} />
    </Canvas>
  );
}
