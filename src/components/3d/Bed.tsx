import { useLoader } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export default function Bed() {
  const bed = useLoader(GLTFLoader, "/models/bed.glb");
  return (
    <Suspense>
      <RigidBody>
        <primitive
          object={bed.scene}
          rotation={[0, Math.PI, 0]}
          position={[-1.1, -0.42, 1.25]}
          scale={[0.5, 0.5, 0.5]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </Suspense>
  );
}
