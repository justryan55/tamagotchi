"use client";

import AnimationList from "@/components/AnimationList";
import CheckStats from "@/components/CheckStats";
import DepleteStats from "@/components/DepleteStats";
import Experience from "@/components/Experience";
import Nav from "@/components/Nav";
import Stats from "@/components/Stats";
import styles from "@/styles/home.module.css";
import { useState } from "react";

export default function Page() {
  const [toggleStats, setToggleStats] = useState(false);
  const [toggleAnimations, setToggleAnimations] = useState(false);
  const [animation, setAnimation] = useState("standing");
  const [spawnPoo, setSpawnPoo] = useState(false);
  const [spawnFood, setSpawnFood] = useState(false);
  const [directionalLight, setDirectionalLight] = useState(5);
  const [ambientLight, setAmbientLight] = useState(1.5);

  const toggleStatsClass = () => {
    setToggleStats((prev) => !prev);
    setToggleAnimations(false);
  };

  const toggleAnimationsClass = () => {
    setToggleAnimations((prev) => !prev);
    setToggleStats(false);
  };

  const toggleAnimation = (animation: string) => {
    setAnimation(animation);
  };

  const toggleFood = () => {
    setSpawnFood(true);
  };

  const toggleLight = () => {
    setDirectionalLight((prev) => (prev === 5 ? 0 : 5));
    setAmbientLight((prev) => (prev === 1.5 ? 0 : 1.5));
  };

  return (
    <>
      <CheckStats setSpawnPoo={setSpawnPoo} />
      <DepleteStats />
      <Stats toggleStats={toggleStats} />
      {toggleAnimations && <AnimationList toggleAnimation={toggleAnimation} />}
      <div className={styles.canvas}>
        <Experience
          animation={animation}
          spawnPoo={spawnPoo}
          spawnFood={spawnFood}
          setSpawnFood={setSpawnFood}
          directionalLight={directionalLight}
          ambientLight={ambientLight}
        />
      </div>
      <Nav
        toggleStatsClass={toggleStatsClass}
        toggleAnimationsClass={toggleAnimationsClass}
        toggleFood={toggleFood}
        toggleLight={toggleLight}
      />
    </>
  );
}
