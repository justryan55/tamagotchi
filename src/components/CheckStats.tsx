import { useStats } from "@/providers/StatsProvider";
import { useEffect } from "react";

interface CheckStatsProp {
  setSpawnPoo: (state: boolean) => void;
}
export default function CheckStats({ setSpawnPoo }: CheckStatsProp) {
  const { stats } = useStats();
  const hygieneValue = Math.ceil(stats.hygiene.value);

  useEffect(() => {
    if (hygieneValue === 100) {
      setSpawnPoo(false);
      return;
    }

    setSpawnPoo(hygieneValue % 25 === 0);
  }, [hygieneValue, setSpawnPoo]);

  return null;
}
