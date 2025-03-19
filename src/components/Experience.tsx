"use client";

import { OrbitControls, useAnimations } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import { Perf } from "r3f-perf";
import React, { useEffect } from "react";
import { TextureLoader } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface ExperienceProps {
  animation: string;
}

function Dog({ animation }) {
  const dog = useLoader(GLTFLoader, "/models/dog.glb");
  dog.scene.position.y = -0.5;

  const animations = useAnimations(dog.animations, dog.scene);
  // const { animationName } = useControls({
  //   animationName: { options: animations.names },
  // });

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

export default function Experience({ animation }: ExperienceProps) {
  const { perfVisible } = useControls({
    perfVisible: false,
  });

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
      </Canvas>
    </>
  );
}
