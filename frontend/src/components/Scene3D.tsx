"use client";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Points, PointMaterial, MeshTransmissionMaterial, Torus, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function ParticleField({ count = 3000 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 60;
      p[i * 3 + 1] = (Math.random() - 0.5) * 60;
      p[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return p;
  }, [count]);

  const ref = useRef<THREE.Points>(null!);
  useFrame((state) => {
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    ref.current.rotation.z = state.clock.getElapsedTime() * 0.01;
  });

  return (
    <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#a855f7"
        size={0.1}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function TechRing({ radius, speed, color, rotation }: { radius: number, speed: number, color: string, rotation: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    ref.current.rotation.z = state.clock.getElapsedTime() * speed;
  });

  return (
    <Torus ref={ref} args={[radius, 0.02, 16, 100]} rotation={rotation}>
      <meshBasicMaterial color={color} transparent opacity={0.2} />
    </Torus>
  );
}

function CentralLens() {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.cos(t / 4) / 4;
    meshRef.current.rotation.y = Math.sin(t / 4) / 4;
    meshRef.current.rotation.z = Math.sin(t / 4) / 4;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[4, 0]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={1.5}
          chromaticAberration={0.5}
          anisotropy={0.3}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.1}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
        />
      </mesh>
    </Float>
  );
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[20, 20, 10]} penumbra={1} castShadow color="#7c3aed" />
        <pointLight position={[-20, -20, -10]} color="#10b981" intensity={2} />
        
        <CentralLens />
        <ParticleField />
        
        {/* Decorative Tech Rings */}
        <TechRing radius={8} speed={0.2} color="#7c3aed" rotation={[Math.PI/3, 0, 0]} />
        <TechRing radius={9} speed={-0.15} color="#10b981" rotation={[Math.PI/4, Math.PI/4, 0]} />
        <TechRing radius={10} speed={0.1} color="#a855f7" rotation={[Math.PI/2.5, -Math.PI/6, 0]} />

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
