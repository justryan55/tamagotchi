"use client";

import { useStats } from "@/providers/StatsProvider";
import {
  Clone,
  DragControls,
  OrbitControls,
  Text,
  useAnimations,
} from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import { Perf } from "r3f-perf";
import React, { useEffect, useRef, useState } from "react";
import { TextureLoader } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Physics, RigidBody } from "@react-three/rapier";
import { v4 as uuidv4 } from "uuid";

interface ExperienceProps {
  animation: string;
  setAnimation: (state: string) => void;
  setSpawnPoo: (state: boolean) => void;
  spawnPoo: boolean;
  spawnBall: boolean;
  spawnFood: boolean;
  toggleCleaningFeature: (state: boolean) => void;
  isCleaning: boolean;
  setSpawnFood: (state: boolean) => void;
  lightSettings: {
    lightOn: boolean;
    directional: number;
    ambient: number;
  };
}

interface TextState {
  content: string;
  fontSize: number;
}

interface DogProps {
  animation: string;
  isCleaning: boolean;
  toggleCleaningFeature: (state: boolean) => void;
  setText: React.Dispatch<
    React.SetStateAction<{ content: string; fontSize: number }>
  >;
}

interface PooProps {
  position: [number, number, number];
}

interface FoodProps {
  setSpawnFood: (state: boolean) => void;
  setAnimation: (state: string) => void;
}

interface BallProps {
  position: [number, number, number];
}

gsap.registerPlugin(useGSAP);

function Dog({
  animation,
  isCleaning,
  toggleCleaningFeature,
  setText,
}: DogProps) {
  const dog = useLoader(GLTFLoader, "/models/dog.glb");
  const bubbles = useLoader(GLTFLoader, "/models/bubbles.glb");
  const bubbleActionRef = useRef<THREE.AnimationAction | null>(null);
  const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const { stats, setStats } = useStats();
  const [isDragging, setIsDragging] = useState(false);

  dog.scene.position.y = -0.5;

  const dogAnimations = useAnimations(dog.animations, dog.scene);
  const bubbleAnimations = useAnimations(bubbles.animations, bubbles.scene);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isCleaning) return;
    setIsDragging(true);
    mousePosition.current = { x: e.clientX, y: e.clientY };

    const action = bubbleAnimations.actions["Bubbles Floating"];

    if (action) {
      action.reset().setLoop(THREE.LoopRepeat, Infinity).fadeIn(2).play();
      bubbleActionRef.current = action;
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging && !isCleaning) return;

    const deltaX = Math.abs(e.clientX - mousePosition.current.x);
    const deltaY = Math.abs(e.clientY - mousePosition.current.y);

    if (deltaX < 5 || deltaY < 5) return;

    mousePosition.current = { x: e.clientX, y: e.clientY };
    setStats((prevStats) => {
      return {
        ...prevStats,
        hygiene: {
          ...prevStats.hygiene,
          value: Math.min(prevStats.hygiene.value + 1, 100),
        },
        xp: {
          ...prevStats.xp,
          value: prevStats.xp.value + 1,
        },
      };
    });
  };

  const handlePointerUp = () => {
    if (!isCleaning) return;
    setIsDragging(false);
    bubbleActionRef.current?.fadeOut(0.5);
    toggleCleaningFeature(false);

    setText((prevText) => {
      return {
        ...prevText,
        content: `Level: ${stats.xp.level}`,
        fontSize: 70,
      };
    });
  };

  useEffect(() => {
    const action = dogAnimations.actions[animation];
    action?.reset().fadeIn(0.5).play();

    return () => {
      action?.fadeOut(0.5);
    };
  }, [animation, dogAnimations.actions]);

  useEffect(() => {
    if (!isCleaning) {
      bubbleActionRef.current?.fadeOut(0.5);
    }
  }, [isCleaning]);

  return (
    <>
      <primitive
        object={dog.scene}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      />
      {isCleaning && (
        <primitive object={bubbles.scene} scale={[0.002, 0.002, 0.002]} />
      )}
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
      console.log(stats.hygiene.pooPosition);
      const updatedPooPosition = stats.hygiene.pooPosition.filter((poo) => {
        const [x, , z] = poo.position;
        return !(
          x === pooRef.current?.position.x && z === pooRef.current?.position.z
        );
      });

      setStats((prevStats) => {
        return {
          ...prevStats,
          hygiene: {
            ...prevStats.hygiene,
            value: Math.min(prevStats.hygiene.value + 25, 100),
            pooPosition: [...updatedPooPosition],
          },
          health: {
            ...prevStats.health,
            value: Math.min(prevStats.health.value + 25, 100),
          },
          xp: {
            ...prevStats.xp,
            value: prevStats.xp.value + 10,
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

function Walls() {
  const [aoMap, colourMap, normalMap, roughnessMap, metalnessMap] = useLoader(
    TextureLoader,
    [
      "/textures/wall/Poliigon_PlasterPainted_7664_AmbientOcclusion.png",
      "/textures/wall/Poliigon_PlasterPainted_7664_BaseColor.png",
      "/textures/wall/Poliigon_PlasterPainted_7664_Normal.png",
      "/textures/wall/Poliigon_PlasterPainted_7664_Roughness.png",
      "/textures/wall/Poliigon_PlasterPainted_7664_Metallic.png",
    ]
  );

  const WallMaterial = () => {
    return (
      <meshStandardMaterial
        color="#B0B0B0"
        map={colourMap}
        normalMap={normalMap}
        aoMap={aoMap}
        roughnessMap={roughnessMap}
        metalnessMap={metalnessMap}
      />
    );
  };
  return (
    <RigidBody type="fixed">
      <mesh position={[0, 1.25, -1.75]}>
        <planeGeometry args={[3.5, 3.5]} />
        <WallMaterial />
      </mesh>
      <mesh rotation={[0, Math.PI * 0.5, 0]} position={[-1.75, 1.25, 0]}>
        <planeGeometry args={[3.5, 3.5]} />
        <WallMaterial />
      </mesh>
      <mesh rotation={[0, -Math.PI * 0.5, 0]} position={[1.75, 1.25, 0]}>
        <planeGeometry args={[3.5, 3.5]} />
        <WallMaterial />
      </mesh>
    </RigidBody>
  );
}

function Bin() {
  const bin = useLoader(GLTFLoader, "/models/bin.glb");

  return (
    <RigidBody type="fixed">
      <primitive
        object={bin.scene}
        scale={[0.75, 0.75, 0.75]}
        position={[-0.5, -0.25, -1.25]}
        onPointerOver={() => {
          // console.log("Test");
        }}
      />
    </RigidBody>
  );
}

function Plant() {
  const plant = useLoader(GLTFLoader, "/models/rhyzome_plant.glb");

  return (
    <RigidBody>
      <primitive
        object={plant.scene}
        scale={[0.75, 0.75, 0.75]}
        position={[1.25, -0.5, -1.15]}
      />
    </RigidBody>
  );
}

function Food({ setSpawnFood, setAnimation }: FoodProps) {
  const food = useLoader(GLTFLoader, "/models/food.glb");
  const foodRef = useRef<THREE.Group | null>(null);
  const { stats, setStats } = useStats();

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
            setStats((prevStats) => {
              return {
                ...prevStats,
                happiness: {
                  ...prevStats.happiness,
                  value: Math.min(prevStats.happiness.value + 25, 100),
                },
                energy: {
                  ...prevStats.energy,
                  value: Math.min(prevStats.energy.value + 25, 100),
                },
                hunger: {
                  ...prevStats.hunger,
                  value: Math.min(prevStats.hunger.value + 25, 100),
                },
                xp: {
                  ...prevStats.xp,
                  value: prevStats.xp.value + 10,
                },
              };
            });
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

function Ball({ position }: BallProps) {
  const ball = useLoader(GLTFLoader, "/models/ball.glb");
  const { setStats } = useStats();

  const ballRef = useRef<any>(null);

  const bounce = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (ballRef.current) {
      ballRef.current.wakeUp();
      const randomSign = () => (Math.random() < 0.5 ? -1 : 1);
      ballRef.current.applyImpulse({
        x: randomSign() * 0.005,
        y: randomSign() * 0.005,
        z: -0.005,
      });

      setStats((prevStats) => {
        return {
          ...prevStats,
          happiness: {
            ...prevStats.happiness,
            value: Math.min(prevStats.happiness.value + 5, 100),
          },
          energy: {
            ...prevStats.energy,
            value: Math.min(prevStats.energy.value - 5, 100),
          },
          xp: {
            ...prevStats.xp,
            value: prevStats.xp.value + 5,
          },
        };
      });
    }
  };

  return (
    <RigidBody
      colliders="ball"
      restitution={0.7}
      linearDamping={0.5}
      angularDamping={0.5}
      ref={ballRef}
      canSleep={false}
      // position={[0.9, 1, -0.65]}
      position={position}
    >
      {/* <primitive object={ball.scene} onClick={bounce} /> */}
      <Clone object={ball.scene} onClick={bounce} />
    </RigidBody>
  );
}

function Whiteboard({ content, fontSize }: TextState) {
  const whiteboard = useLoader(GLTFLoader, "/models/whiteboard.glb");
  const { stats } = useStats();

  return (
    <primitive
      object={whiteboard.scene}
      scale={[0.003, 0.003, 0.003]}
      rotation={[0, -0.3, 0]}
      position={[-1, 1.5, -1.7]}
    >
      <Text
        rotation={[0, 0.3, 0]}
        position={[0, 0.3, 0.01]}
        fontSize={fontSize}
        color="black"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Marker-Regular.otf"
      >
        {content}
      </Text>
    </primitive>
  );
}

export default function Experience({
  animation,
  setAnimation,
  spawnPoo,
  setSpawnPoo,
  spawnFood,
  setSpawnFood,
  lightSettings,
  spawnBall,
  toggleCleaningFeature,
  isCleaning,
}: ExperienceProps) {
  const { perfVisible } = useControls({
    perfVisible: false,
  });
  const { stats, setStats } = useStats();
  const [text, setText] = useState({
    content: `Level: ${stats.xp.level}`,
    fontSize: 50,
  });
  const [balls, setBalls] = useState<Array<[number, number, number]>>([
    [0.9, 1, -0.65],
  ]);

  useEffect(() => {
    if (spawnPoo) {
      const pooPosition = [Math.random(), -0.42, Math.random()];
      const newPoo = {
        id: uuidv4(),
        position: pooPosition,
      };

      setStats((prevStats) => {
        return {
          ...prevStats,
          hygiene: {
            ...prevStats.hygiene,
            pooPosition: [...prevStats.hygiene.pooPosition, newPoo],
          },
        };
      });
      setSpawnPoo(false);
    }
  }, [setStats, spawnPoo, setSpawnPoo]);

  useEffect(() => {
    if (spawnBall) {
      const ballPosition: [number, number, number] = [
        Math.random() * 3 - 1.5,
        1,

        Math.random() * 3 - 1.5,
      ];
      setBalls((prevBalls) => [...prevBalls, ballPosition]);
    }
  }, [spawnBall]);

  useEffect(() => {
    if (!lightSettings.lightOn) {
      const interval = setInterval(() => {
        setStats((prevStats) => {
          return {
            ...prevStats,
            energy: {
              ...prevStats.energy,
              value: Math.min(prevStats.energy.value + 5, 100),
            },
          };
        });
      }, 3000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [lightSettings.lightOn, setStats]);

  useEffect(() => {
    if (isCleaning) {
      setText((prevText) => {
        return {
          ...prevText,
          content: `  Click on the dog\n and move to clean.`,
          fontSize: 42,
        };
      });
    } else {
      setText((prevText) => {
        return {
          ...prevText,
          content: `Level: ${stats.xp.level}`,
          fontSize: 70,
        };
      });
    }
  }, [isCleaning]);

  return (
    <>
      <Leva hidden />
      <Canvas camera={{ position: [0, 0.75, 2.75] }}>
        {perfVisible && <Perf position="top-left" />}
        {/* <OrbitControls /> */}
        <directionalLight intensity={lightSettings.directional} />
        <ambientLight intensity={lightSettings.ambient} />
        <Dog
          animation={animation}
          isCleaning={isCleaning}
          toggleCleaningFeature={toggleCleaningFeature}
          setText={setText}
        />
        {spawnFood && (
          <Food setSpawnFood={setSpawnFood} setAnimation={setAnimation} />
        )}
        {stats.hygiene.pooPosition.map((poo) => (
          <Poo
            key={poo.id}
            position={poo.position as [number, number, number]}
          />
        ))}
        <Whiteboard content={text.content} fontSize={text.fontSize} />

        <Physics>
          <Floor />
          <Walls />
          <Plant />
          <Bin />
          {balls.map((position, index) => (
            <Ball key={index} position={position} />
          ))}
        </Physics>
      </Canvas>
    </>
  );
}
