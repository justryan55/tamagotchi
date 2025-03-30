import { Text } from "@react-three/drei";

export default function SleepingText() {
  return (
    <Text
      position={[0, 0.5, 0]}
      fontSize={0.2}
      color="lightblue"
      rotation={[-0.1, 0.2, 0]}
      anchorX="center"
      anchorY="middle"
    >
      Zzz...
    </Text>
  );
}
