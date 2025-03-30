"use client";

import { useStats } from "@/providers/StatsProvider";
import { useGSAP } from "@gsap/react";
import { Suspense, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

gsap.registerPlugin(useGSAP);

interface FoodProps {
  setSpawnFood: (state: boolean) => void;
  setAnimation: (state: string) => void;
}

export default function Food({ setSpawnFood, setAnimation }: FoodProps) {
  const food = useGLTF("/models/food.glb");
  useGLTF.preload("/models/food.glb");
  const foodRef = useRef<THREE.Group | null>(null);
  const { setStats } = useStats();

  useGSAP(() => {
    if (foodRef.current) {
      gsap.fromTo(
        foodRef.current?.position,
        { x: 2.5 },
        {
          x: 0.25,
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
