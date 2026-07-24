"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, PerformanceMonitor, MeshTransmissionMaterial } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import type * as THREE from "three";

function GlassTorus({ isLowPower }: { isLowPower: boolean }) {
  const ref = useRef<THREE.Mesh>(null!);
  
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.12;
    ref.current.rotation.y += delta * 0.15;
  });

  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.8}>
      <mesh ref={ref} scale={1.15}>
        <torusKnotGeometry args={[1, 0.32, isLowPower ? 48 : 96, 16]} />
        <MeshTransmissionMaterial
          backside={!isLowPower}
          samples={isLowPower ? 2 : 6}
          resolution={isLowPower ? 64 : 192}
          transmission={1}
          roughness={0.15}
          thickness={1}
          ior={1.15}
          chromaticAberration={0.02}
          anisotropy={0.1}
          distortion={0}
          distortionScale={0}
          temporalDistortion={0}
          clearcoat={0.3}
          attenuationDistance={2}
          attenuationColor={"#ffffff"}
          color={"#ffffff"}
        />
      </mesh>
    </Float>
  );
}

// Optimized DemandDriver that only invalidates when visible and tab is active
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
      // Throttle to ~45fps on mobile/low-power to save battery/heat, 60fps otherwise
      const threshold = 22; // ~45fps
      if (time - lastTime >= threshold) {
        if (document.visibilityState === "visible" && document.hasFocus()) {
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
    window.addEventListener("focus", onVis);
    raf = requestAnimationFrame(tick);
    
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("focus", onVis);
    };
  }, [invalidate]);
  return null;
}

export default function HeroCanvas() {
  const isLowPower = useMemo(() => {
    if (typeof navigator === "undefined") return false;
    const cores = navigator.hardwareConcurrency ?? 8;
    const coarse = typeof matchMedia !== "undefined" && matchMedia("(pointer: coarse)").matches;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    return coarse || cores <= 4 || isMobile;
  }, []);

  const [dpr, setDpr] = useState<[number, number]>(
    isLowPower ? [0.8, 1] : [1, 1.25]
  );

  return (
    <Canvas
      dpr={dpr}
      frameloop="demand"
      gl={{
        antialias: !isLowPower,
        alpha: true,
        powerPreference: "low-power",
        stencil: false,
        depth: true,
      }}
      camera={{ position: [0, 0, 4.5], fov: 38 }}
    >
      <PerformanceMonitor
        onDecline={() => setDpr(([min]) => [min, Math.max(min, 0.8)])}
      />
      <DemandDriver />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={1} color="#7d6cff" />
      <directionalLight position={[-4, -2, 3]} intensity={0.7} color="#5fc8e8" />
      <GlassTorus isLowPower={isLowPower} />
    </Canvas>
  );
}
