import { useLoader } from "@react-three/fiber";
import { Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export default function GameboyArt() {
  const gameboyArt = useLoader(GLTFLoader, "/models/gameboy-art.glb");
  return (
    <Suspense>
      <primitive
        object={gameboyArt.scene}
        position={[1.75, -0.65, 0]}
        rotation={[0, -Math.PI * 0.5, 0]}
        scale={[0.02, 0.02, 0.02]}
      />
    </Suspense>
  );
}
