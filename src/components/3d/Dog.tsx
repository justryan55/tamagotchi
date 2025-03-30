import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import * as THREE from "three";
import { Suspense, useEffect, useRef, useState } from "react";
import { useStats } from "@/providers/StatsProvider";
import { useAnimations } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

interface DogProps {
  animation: string;
  isCleaning: boolean;
  toggleCleaningFeature: (state: boolean) => void;
  setText: React.Dispatch<
    React.SetStateAction<{ content: string; fontSize: number }>
  >;
}

export default function Dog({
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

  const handlePointerOver = () => {
    if (!isCleaning) return;
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "auto";
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
    <Suspense>
      <RigidBody>
        <primitive
          object={dog.scene}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        />
        {isCleaning && (
          <primitive object={bubbles.scene} scale={[0.002, 0.002, 0.002]} />
        )}
      </RigidBody>
    </Suspense>
  );
}
