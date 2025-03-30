import { useStats } from "@/providers/StatsProvider";
import { useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import * as THREE from "three";
import { Clone, DragControls } from "@react-three/drei";

interface PooProps {
  position: [number, number, number];
}

export default function Poo({ position }: PooProps) {
  const poo = useLoader(GLTFLoader, "/models/poo.glb");
  const { stats, setStats } = useStats();
  const pooRef = useRef<THREE.Group | null>(null);

  const handleDragEnd = () => {
    if (!pooRef.current) return;

    const worldPosition = new THREE.Vector3();
    pooRef.current.getWorldPosition(worldPosition);

    if (
      worldPosition.x > -1.5 &&
      worldPosition.x < -0.8 &&
      worldPosition.z > -1.25 &&
      worldPosition.z < -0.75
    ) {
      const updatedPooPosition = stats.hygiene.pooPosition.filter((poo) => {
        const [x, , z] = poo.position;
        return !(
          x === pooRef.current?.position.x && z === pooRef.current?.position.z
        );
      });

      setStats((prevStats) => {
        return {
          ...prevStats,
          hygiene: {
            ...prevStats.hygiene,
            value: Math.min(prevStats.hygiene.value + 25, 100),
            pooPosition: [...updatedPooPosition],
          },
          health: {
            ...prevStats.health,
            value: Math.min(prevStats.health.value + 25, 100),
          },
          xp: {
            ...prevStats.xp,
            value: prevStats.xp.value + 10,
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
    <DragControls autoTransform={true} axisLock="y" onDragEnd={handleDragEnd}>
      <Clone
        object={poo.scene}
        scale={[0.1, 0.1, 0.1]}
        position={position}
        ref={pooRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      />
    </DragControls>
  );
}
