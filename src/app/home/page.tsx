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
  const [spawnBall, setSpawnBall] = useState(false);
  const [isCleaning, setIsCleaning] = useState(false);
  const [lightSettings, setLightSettings] = useState({
    lightOn: true,
    directional: 5,
    ambient: 1.5,
  });

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

  const toggleBall = () => {
    setSpawnBall((prev) => !prev);
  };

  const toggleFood = () => {
    if (lightSettings.lightOn) {
      setAnimation("sitting");
      setSpawnFood(true);
    }
  };

  const toggleCleaningFeature = () => {
    setIsCleaning((prev) => !prev);
  };

  const toggleLight = () => {
    setLightSettings((prev) => ({
      ...prev,
      lightOn: !prev.lightOn,
      directional: prev.directional === 5 ? 0 : 5,
      ambient: prev.ambient === 1.5 ? 0 : 1.5,
    }));
  };

  return (
    <>
      <CheckStats setSpawnPoo={setSpawnPoo} isCleaning={isCleaning} />
      <DepleteStats lightOn={lightSettings.lightOn} />
      <Stats toggleStats={toggleStats} />
      {toggleAnimations && <AnimationList toggleAnimation={toggleAnimation} />}
      <div className={styles.canvas}>
        <Experience
          animation={animation}
          setAnimation={setAnimation}
          spawnPoo={spawnPoo}
          setSpawnPoo={setSpawnPoo}
          spawnFood={spawnFood}
          setSpawnFood={setSpawnFood}
          lightSettings={lightSettings}
          spawnBall={spawnBall}
          toggleCleaningFeature={toggleCleaningFeature}
          isCleaning={isCleaning}
        />
      </div>
      <Nav
        toggleStatsClass={toggleStatsClass}
        toggleAnimationsClass={toggleAnimationsClass}
        toggleFood={toggleFood}
        toggleLight={toggleLight}
        toggleBall={toggleBall}
        toggleCleaningFeature={toggleCleaningFeature}
      />
    </>
  );
}
