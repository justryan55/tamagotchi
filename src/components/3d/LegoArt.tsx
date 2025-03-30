import { useLoader } from "@react-three/fiber";
import { Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export default function LegoArt() {
  const legoArt = useLoader(GLTFLoader, "/models/lego-art.glb");
  return (
    <Suspense>
      <primitive
        object={legoArt.scene}
        position={[0.75, -0.65, -1.75]}
        rotation={[0, 0, 0]}
        scale={[0.02, 0.02, 0.02]}
      />
    </Suspense>
  );
}
