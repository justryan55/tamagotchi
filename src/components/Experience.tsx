"use client";

import { useStats } from "@/providers/StatsProvider";
import { Canvas } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import { Perf } from "r3f-perf";
import React, { useEffect, useState } from "react";

import { Physics } from "@react-three/rapier";
import { v4 as uuidv4 } from "uuid";
import Food from "./3d/Food";
import Poo from "./3d/Poo";
import Whiteboard from "./3d/Whiteboard";
import SleepingText from "./3d/SleepingText";
import GameboyArt from "./3d/GameboyArt";
import LegoArt from "./3d/LegoArt";
import Lamp from "./3d/Lamp";
import Dog from "./3d/Dog";
import Bed from "./3d/Bed";
import Floor from "./3d/Floor";
import Walls from "./3d/Walls";
import Plant from "./3d/Plant";
import Bin from "./3d/Bin";
import Ball from "./3d/Ball";

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
  const [sleeping, setSleeping] = useState(false);
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
    setSleeping(false);

    if (lightSettings.lightOn) return;

    setSleeping(true);
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
  }, [isCleaning, stats.xp.level]);

  return (
    <>
      <Leva hidden />
      <Canvas shadows camera={{ position: [0, 0.75, 2.75] }}>
        {perfVisible && <Perf position="top-left" />}
        <directionalLight
          intensity={lightSettings.directional}
          position={[0, 2.5, 1]}
          castShadow
        />
        <ambientLight intensity={lightSettings.ambient} />
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
        {sleeping && <SleepingText />}
        <GameboyArt />
        <LegoArt />
        <Lamp />
        <Physics>
          <Dog
            animation={animation}
            isCleaning={isCleaning}
            toggleCleaningFeature={toggleCleaningFeature}
            setText={setText}
          />

          <Bed />
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
