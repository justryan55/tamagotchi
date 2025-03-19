"use client";

import AnimationList from "@/components/AnimationList";
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
      <DepleteStats />
      <Stats toggleStats={toggleStats} />
      {toggleAnimations && <AnimationList toggleAnimation={toggleAnimation} />}
      <div className={styles.canvas}>
        <Experience animation={animation} />
      </div>
      <Nav
        toggleStatsClass={toggleStatsClass}
        toggleAnimationsClass={toggleAnimationsClass}
      />
    </>
  );
}
