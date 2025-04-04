import { useStats } from "@/providers/StatsProvider";
import { Clone } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import type { RapierRigidBody } from "@react-three/rapier";
interface BallProps {
  position: [number, number, number];
}

export default function Ball({ position }: BallProps) {
  const ball = useLoader(GLTFLoader, "/models/ball.glb");
  const { setStats } = useStats();

  const ballRef = useRef<RapierRigidBody | null>(null);

  const bounce = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (ballRef.current) {
      const randomSign = () => (Math.random() < 0.5 ? -1 : 1);
      ballRef.current.applyImpulse(
        {
          x: randomSign() * 0.005,
          y: randomSign() * 0.005,
          z: -0.005,
        },
        true
      );

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

  const handlePointerOver = () => {
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "auto";
  };

  return (
    <RigidBody
      colliders="ball"
      restitution={0.7}
      linearDamping={0.5}
      angularDamping={0.5}
      ref={ballRef}
      canSleep={false}
      position={position}
    >
      <Clone
        object={ball.scene}
        onClick={bounce}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        castShadow
      />
    </RigidBody>
  );
}
