import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Island() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const meta = useMemo(() => {
    const items: { pos: [number, number, number]; kind: "grass" | "dirt" | "stone" | "diamond" }[] = [];
    const R = 6;
    for (let x = -R; x <= R; x++) {
      for (let z = -R; z <= R; z++) {
        const d = Math.sqrt(x * x + z * z);
        if (d > R + 0.5) continue;
        items.push({ pos: [x, 0, z], kind: "grass" });
        const depth = Math.floor(2 + (R - d) * 0.6);
        for (let y = 1; y <= depth; y++) {
          items.push({ pos: [x, -y, z], kind: y < depth ? "dirt" : "stone" });
        }
      }
    }
    // sprinkle diamonds
    items.push({ pos: [2, 1, -1], kind: "diamond" });
    items.push({ pos: [-3, 1, 2], kind: "diamond" });
    return items;
  }, []);

  useMemo(() => {
    setTimeout(() => {
      if (!ref.current) return;
      const dummy = new THREE.Object3D();
      const colors = {
        grass: new THREE.Color("#7ec850"),
        dirt: new THREE.Color("#7a4d22"),
        stone: new THREE.Color("#7d828a"),
        diamond: new THREE.Color("#5cd6ff"),
      };
      meta.forEach((it, i) => {
        dummy.position.set(it.pos[0], it.pos[1], it.pos[2]);
        dummy.updateMatrix();
        ref.current!.setMatrixAt(i, dummy.matrix);
        ref.current!.setColorAt(i, colors[it.kind]);
      });
      ref.current.instanceMatrix.needsUpdate = true;
      if (ref.current.instanceColor) ref.current.instanceColor.needsUpdate = true;
    }, 0);
  }, [meta]);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, meta.length]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial vertexColors={false} />
    </instancedMesh>
  );
}

function FloatingDrone() {
  const g = useRef<THREE.Group>(null);
  useFrame((st) => {
    if (!g.current) return;
    const t = st.clock.elapsedTime;
    g.current.position.set(Math.sin(t * 0.6) * 4, 3 + Math.sin(t * 1.2) * 0.4, Math.cos(t * 0.6) * 4);
    g.current.rotation.y = -t * 0.6;
  });
  return (
    <group ref={g}>
      <mesh><boxGeometry args={[0.8, 0.2, 0.8]} /><meshStandardMaterial color="#9aa0a6" /></mesh>
      <mesh position={[0.6, 0.1, 0.6]}><boxGeometry args={[0.5, 0.05, 0.05]} /><meshStandardMaterial color="#5cd6ff" /></mesh>
      <mesh position={[-0.6, 0.1, 0.6]}><boxGeometry args={[0.5, 0.05, 0.05]} /><meshStandardMaterial color="#5cd6ff" /></mesh>
      <mesh position={[0.6, 0.1, -0.6]}><boxGeometry args={[0.5, 0.05, 0.05]} /><meshStandardMaterial color="#5cd6ff" /></mesh>
      <mesh position={[-0.6, 0.1, -0.6]}><boxGeometry args={[0.5, 0.05, 0.05]} /><meshStandardMaterial color="#5cd6ff" /></mesh>
    </group>
  );
}

function Particles() {
  const count = 40;
  const ref = useRef<THREE.InstancedMesh>(null);
  const offsets = useMemo(() =>
    Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 20,
      y: Math.random() * 12 - 2,
      z: (Math.random() - 0.5) * 20,
      speed: 0.3 + Math.random() * 0.6,
      phase: Math.random() * Math.PI * 2,
    })), []);

  useFrame((st) => {
    if (!ref.current) return;
    const t = st.clock.elapsedTime;
    const dummy = new THREE.Object3D();
    offsets.forEach((o, i) => {
      dummy.position.set(
        o.x + Math.sin(t * o.speed + o.phase) * 0.5,
        o.y + Math.sin(t * o.speed * 1.5 + o.phase) * 1.2,
        o.z + Math.cos(t * o.speed + o.phase) * 0.5
      );
      dummy.scale.setScalar(0.08 + 0.04 * Math.sin(t * 2 + o.phase));
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#5cd6ff" emissive="#5cd6ff" emissiveIntensity={0.8} transparent opacity={0.7} />
    </instancedMesh>
  );
}

export default function Hero() {
  return (
    <Canvas
      shadows
      camera={{ position: [12, 6, 12], fov: 40 }}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#0a0e1a"]} />
      <fog attach="fog" args={["#0a0e1a", 20, 45]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[8, 12, 6]} intensity={1.2} castShadow />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#5cd6ff" distance={15} />
      <Suspense fallback={null}>
        <Island />
        <FloatingDrone />
        <Particles />
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.3}
        minPolarAngle={Math.PI / 3.6}
        maxPolarAngle={Math.PI / 2.4}
      />
    </Canvas>
  );
}