import { useStats } from "@/providers/StatsProvider";
import { Text } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

interface TextState {
  content: string;
  fontSize: number;
}

export default function Whiteboard({ content, fontSize }: TextState) {
  const whiteboard = useLoader(GLTFLoader, "/models/whiteboard.glb");
  const { stats } = useStats();

  return (
    <Suspense>
      <primitive
        object={whiteboard.scene}
        scale={[0.003, 0.003, 0.003]}
        rotation={[0, -0.3, 0]}
        position={[-1, 1.5, -1.7]}
      >
        <Text
          rotation={[0, 0.3, 0]}
          position={[0, 0.3, 0.01]}
          fontSize={fontSize}
          color="black"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Marker-Regular.otf"
        >
          {content}
        </Text>
      </primitive>
    </Suspense>
  );
}
