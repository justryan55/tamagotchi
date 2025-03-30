import { useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export default function Lamp() {
  const lamp = useLoader(GLTFLoader, "/models/cactus-lamp.glb");
  const [lightSettings, setLightSettings] = useState({
    lightOn: true,
    intensity: 1.25,
  });

  const lampRef = useRef();
  const lightRef = useRef();

  const handleClick = () => {
    setLightSettings((prev) => ({
      ...prev,
      lightOn: !prev.lightOn,
      intensity: prev.intensity === 0.75 ? 0 : 0.75,
    }));
  };

  useFrame(() => {
    if (!lampRef.current || !lightRef.current) return;

    const lampPosition = lampRef.current.position;
    lightRef.current.position.set(
      lampPosition.x + 0.5,
      lampPosition.y + 0.5,
      lampPosition.z
    );
  });

  return (
    <>
      <primitive
        ref={lampRef}
        object={lamp.scene}
        scale={[0.0125, 0.0125, 0.0125]}
        position={[-1.75, 0.75, -0.25]}
        rotation={[0, Math.PI * 0.5, 0]}
        onClick={handleClick}
      />
      <pointLight
        ref={lightRef}
        intensity={lightSettings.intensity}
        distance={10}
        decay={2}
        color="#0cd157"
        castShadow
      />
    </>
  );
}
