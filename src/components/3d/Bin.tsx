import { useLoader } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export default function Bin() {
  const bin = useLoader(GLTFLoader, "/models/bin.glb");

  return (
    <Suspense>
      <RigidBody type="fixed">
        <primitive
          object={bin.scene}
          scale={[0.75, 0.75, 0.75]}
          position={[-0.5, -0.25, -1.25]}
          onPointerOver={() => {
            // console.log("Test");
          }}
        />
      </RigidBody>
    </Suspense>
  );
}
