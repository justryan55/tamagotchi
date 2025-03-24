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

  return (
    <>
      <CheckStats setSpawnPoo={setSpawnPoo} />
      <DepleteStats />
      <Stats toggleStats={toggleStats} />
      {toggleAnimations && <AnimationList toggleAnimation={toggleAnimation} />}
      <div className={styles.canvas}>
        <Experience animation={animation} spawnPoo={spawnPoo} />
      </div>
      <Nav
        toggleStatsClass={toggleStatsClass}
        toggleAnimationsClass={toggleAnimationsClass}
      />
    </>
  );
}
