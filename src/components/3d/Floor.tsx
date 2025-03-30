import { useLoader } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { TextureLoader } from "three";

export default function Floor() {
  const [armMap, colourMap, normalMap] = useLoader(TextureLoader, [
    "/textures/floor/laminate_floor_02_arm_1k.png",
    "/textures/floor/laminate_floor_02_diff_1k.png",
    "/textures/floor/laminate_floor_02_nor_gl_1k.png",
  ]);

  return (
    <RigidBody type="fixed">
      <mesh
        rotation={[-Math.PI * 0.5, 0, 0]}
        position={[0, -0.5, 0]}
        receiveShadow
      >
        <planeGeometry args={[3.5, 3.62]} />
        <meshStandardMaterial
          map={colourMap}
          normalMap={normalMap}
          aoMap={armMap}
          roughnessMap={armMap}
          metalnessMap={armMap}
        />
      </mesh>
    </RigidBody>
  );
}
