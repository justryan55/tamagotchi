"use client";

import { useStats } from "@/providers/StatsProvider";
import { Clone, OrbitControls, Text, useAnimations } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import { Perf } from "r3f-perf";
import React, { useEffect, useMemo } from "react";
import { TextureLoader } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface ExperienceProps {
  animation: string;
  spawnPoo: boolean;
}

function Dog({ animation }) {
  const dog = useLoader(GLTFLoader, "/models/dog.glb");
  dog.scene.position.y = -0.5;

  const animations = useAnimations(dog.animations, dog.scene);

  useEffect(() => {
    const action = animations.actions[animation];
    action?.reset().fadeIn(0.5).play();

    return () => {
      action?.fadeOut(0.5);
    };
  }, [animation]);

  return (
    <>
      <primitive object={dog.scene} />
    </>
  );
}

function Poo({ position }) {
  const poo = useLoader(GLTFLoader, "/models/poo.glb");

  return (
    <>
      <Clone object={poo.scene} scale={[0.1, 0.1, 0.1]} position={position} />;
    </>
  );
}

function Floor() {
  const [armMap, colourMap, normalMap] = useLoader(TextureLoader, [
    "/textures/floor/laminate_floor_02_arm_1k.png",
    "/textures/floor/laminate_floor_02_diff_1k.png",
    "/textures/floor/laminate_floor_02_nor_gl_1k.png",
  ]);

  return (
    <mesh rotation={[-Math.PI * 0.5, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[3, 3]} />
      <meshStandardMaterial
        map={colourMap}
        normalMap={normalMap}
        aoMap={armMap}
        roughnessMap={armMap}
        metalnessMap={armMap}
      />
    </mesh>
  );
}

function Bin() {
  const bin = useLoader(GLTFLoader, "/models/bin.glb");

  return (
    <primitive
      object={bin.scene}
      scale={[0.75, 0.75, 0.75]}
      position={[-0.5, -0.25, -1.25]}
    />
  );
}

export default function Experience({ animation, spawnPoo }: ExperienceProps) {
  const { perfVisible } = useControls({
    perfVisible: false,
  });
  const { stats, setStats } = useStats();

  console.log(spawnPoo);

  useEffect(() => {
    const pooPosition = [Math.random(), -0.42, Math.random()];

    if (spawnPoo) {
      setStats((prevStats) => {
        return {
          ...prevStats,
          hygiene: {
            ...prevStats.hygiene,
            pooPosition: [...prevStats.hygiene.pooPosition, pooPosition],
          },
        };
      });
    }
  }, [setStats, spawnPoo]);

  return (
    <>
      <Leva hidden />
      <Canvas camera={{ position: [0, 0, 2] }}>
        {perfVisible && <Perf position="top-left" />}
        <OrbitControls />
        <directionalLight intensity={5} />
        <ambientLight intensity={2} />
        <Dog animation={animation} />
        <Floor />
        <Bin />
        {stats.hygiene.pooPosition.map((p, i) => (
          <Poo key={i} position={p} />
        ))}
      </Canvas>
    </>
  );
}
