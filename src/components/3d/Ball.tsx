import { useStats } from "@/providers/StatsProvider";
import { Clone } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

interface BallProps {
  position: [number, number, number];
}

export default function Ball({ position }: BallProps) {
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
      <Clone object={ball.scene} onClick={bounce} castShadow />
    </RigidBody>
  );
}
