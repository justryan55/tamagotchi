import { useLoader } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { TextureLoader } from "three";

export default function Walls() {
  const [aoMap, colourMap, normalMap, roughnessMap, metalnessMap] = useLoader(
    TextureLoader,
    [
      "/textures/wall/Poliigon_PlasterPainted_7664_AmbientOcclusion.png",
      "/textures/wall/Poliigon_PlasterPainted_7664_BaseColor.png",
      "/textures/wall/Poliigon_PlasterPainted_7664_Normal.png",
      "/textures/wall/Poliigon_PlasterPainted_7664_Roughness.png",
      "/textures/wall/Poliigon_PlasterPainted_7664_Metallic.png",
    ]
  );

  const WallMaterial = () => {
    return (
      <meshStandardMaterial
        color="#B0B0B0"
        map={colourMap}
        normalMap={normalMap}
        aoMap={aoMap}
        roughnessMap={roughnessMap}
        metalnessMap={metalnessMap}
      />
    );
  };
  return (
    <RigidBody type="fixed">
      <mesh position={[0, 1.25, -1.75]}>
        <planeGeometry args={[3.5, 3.5]} />
        <WallMaterial />
      </mesh>
      <mesh rotation={[0, Math.PI * 0.5, 0]} position={[-1.75, 1.25, 0]}>
        <planeGeometry args={[3.5, 3.5]} />
        <WallMaterial />
      </mesh>
      <mesh rotation={[0, -Math.PI * 0.5, 0]} position={[1.75, 1.25, 0]}>
        <planeGeometry args={[3.5, 3.5]} />
        <WallMaterial />
      </mesh>
    </RigidBody>
  );
}
