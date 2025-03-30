import { useLoader } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export default function Plant() {
  const plant = useLoader(GLTFLoader, "/models/rhyzome_plant.glb");

  return (
    <Suspense>
      <RigidBody>
        <primitive
          object={plant.scene}
          scale={[0.75, 0.75, 0.75]}
          position={[1.25, -0.5, -1.15]}
        />
      </RigidBody>
    </Suspense>
  );
}
