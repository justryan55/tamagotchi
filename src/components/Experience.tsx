"use client";

import { useStats } from "@/providers/StatsProvider";
import {
  Clone,
  DragControls,
  OrbitControls,
  useAnimations,
} from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import { Perf } from "r3f-perf";
import React, { useEffect, useRef } from "react";
import { TextureLoader } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Physics, RigidBody } from "@react-three/rapier";

interface ExperienceProps {
  animation: string;
  setAnimation: (state: string) => void;
  spawnPoo: boolean;
  spawnFood: boolean;
  setSpawnFood: (state: boolean) => void;
  lightSettings: {
    lightOn: boolean;
    directional: number;
    ambient: number;
  };
}

interface DogProps {
  animation: string;
}

interface PooProps {
  position: [number, number, number];
}

interface FoodProps {
  setSpawnFood: (state: boolean) => void;
  setAnimation: (state: string) => void;
}

gsap.registerPlugin(useGSAP);

function Dog({ animation }: DogProps) {
  const dog = useLoader(GLTFLoader, "/models/dog.glb");
  dog.scene.position.y = -0.5;

  const animations = useAnimations(dog.animations, dog.scene);

  useEffect(() => {
    const action = animations.actions[animation];
    action?.reset().fadeIn(0.5).play();

    return () => {
      action?.fadeOut(0.5);
    };
  }, [animation, animations.actions]);

  return (
    <>
      <primitive object={dog.scene} />
    </>
  );
}

function Poo({ position }: PooProps) {
  const poo = useLoader(GLTFLoader, "/models/poo.glb");
  const { stats, setStats } = useStats();
  const pooRef = useRef<THREE.Group | null>(null);

  // const handleFollow = () => {
  //   const worldPosition = new THREE.Vector3();
  //   pooRef.current.getWorldPosition(worldPosition);
  //   console.log(worldPosition);
  // };

  const handleDragEnd = () => {
    if (!pooRef.current) return;

    const worldPosition = new THREE.Vector3();
    pooRef.current.getWorldPosition(worldPosition);

    if (
      worldPosition.x > -1.5 &&
      worldPosition.x < -0.8 &&
      worldPosition.z > -1.25 &&
      worldPosition.z < -0.75
    ) {
      const updatedPooPosition = stats.hygiene.pooPosition.filter(
        (position) =>
          !(
            position[0] === pooRef.current?.position.x &&
            position[2] === pooRef.current?.position.z
          )
      );

      setStats((prevStats) => {
        return {
          ...prevStats,
          hygiene: {
            ...prevStats.hygiene,
            pooPosition: [...updatedPooPosition],
          },
        };
      });
    }
  };

  return (
    <DragControls
      autoTransform={true}
      axisLock="y"
      // dragLimits={[
      //   [-1.5, 0.5],
      //   [0, 0],
      //   [-2, 1],
      // ]}
      // onDrag={handleFollow}
      onDragEnd={handleDragEnd}
    >
      <Clone
        object={poo.scene}
        scale={[0.1, 0.1, 0.1]}
        position={position}
        ref={pooRef}
      />
    </DragControls>
  );
}

function Floor() {
  const [armMap, colourMap, normalMap] = useLoader(TextureLoader, [
    "/textures/floor/laminate_floor_02_arm_1k.png",
    "/textures/floor/laminate_floor_02_diff_1k.png",
    "/textures/floor/laminate_floor_02_nor_gl_1k.png",
  ]);

  return (
    <RigidBody type="fixed">
      <mesh rotation={[-Math.PI * 0.5, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[3.5, 3.5]} />
        <meshStandardMaterial
          map={colourMap}
          normalMap={normalMap}
          aoMap={armMap}
          roughnessMap={armMap}
          metalnessMap={armMap}
        />
      </mesh>
    </RigidBody>
  );
}

function Bin() {
  const bin = useLoader(GLTFLoader, "/models/bin.glb");

  return (
    <primitive
      object={bin.scene}
      scale={[0.75, 0.75, 0.75]}
      position={[-0.5, -0.25, -1.25]}
      onPointerOver={() => {
        // console.log("Test");
      }}
    />
  );
}

function Food({ setSpawnFood, setAnimation }: FoodProps) {
  const food = useLoader(GLTFLoader, "/models/food.glb");
  const foodRef = useRef<THREE.Group | null>(null);
  useGSAP(() => {
    if (foodRef.current) {
      gsap.fromTo(
        foodRef.current?.position,
        { x: -5 },
        {
          x: -0.25,
          duration: 2,
          ease: "power3.out",
          onComplete: () => {
            setSpawnFood(false);
            setAnimation("standing");
          },
        }
      );
    }
  }, []);
  return (
    <primitive
      object={food.scene}
      scale={[0.1, 0.1, 0.1]}
      position={[-0.25, -0.4, 1]}
      rotation={[-Math.PI * 0.5, 0, 0]}
      ref={foodRef}
    />
  );
}

function Ball() {
  const ball = useLoader(GLTFLoader, "/models/ball.glb");

  const ballRef = useRef<any>(null);

  const bounce = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (ballRef.current) {
      ballRef.current.applyImpulse({ x: 0, y: 0.005, z: 0 });
    }
  };

  return (
    <RigidBody
      colliders="ball"
      restitution={1}
      position={[0.9, 1, 0.5]}
      ref={ballRef}
    >
      <primitive object={ball.scene} onClick={bounce} />
    </RigidBody>
  );
}

export default function Experience({
  animation,
  setAnimation,
  spawnPoo,
  spawnFood,
  setSpawnFood,
  lightSettings,
}: ExperienceProps) {
  const { perfVisible } = useControls({
    perfVisible: false,
  });
  const { stats, setStats } = useStats();

  useEffect(() => {
    if (spawnPoo) {
      const pooPosition = [Math.random(), -0.42, Math.random()];
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
      <Canvas camera={{ position: [0, 0.75, 2.75] }}>
        {perfVisible && <Perf position="top-left" />}
        {/* <OrbitControls /> */}
        <directionalLight intensity={lightSettings.directional} />
        <ambientLight intensity={lightSettings.ambient} />
        <Dog animation={animation} />
        {spawnFood && (
          <Food setSpawnFood={setSpawnFood} setAnimation={setAnimation} />
        )}
        <Bin />
        {stats.hygiene.pooPosition.map((p, i) => (
          <Poo key={i} position={p as [number, number, number]} />
        ))}
        <Physics>
          <Floor />
          <Ball />
        </Physics>
      </Canvas>
    </>
  );
}
