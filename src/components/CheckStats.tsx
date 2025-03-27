import { useStats } from "@/providers/StatsProvider";
import { useEffect, useState } from "react";

interface CheckStatsProp {
  setSpawnPoo: (state: boolean) => void;
}
export default function CheckStats({ setSpawnPoo }: CheckStatsProp) {
  const { stats } = useStats();
  const hygieneValue = Math.ceil(stats.hygiene.value);
  const [hasSpawnedPoo, setHasSpawnedPoo] = useState(false);

  useEffect(() => {
    if (hygieneValue === 100) {
      setSpawnPoo(false);
      setHasSpawnedPoo(false);
      return;
    }

    if (hygieneValue % 25 === 0 && hygieneValue !== 0 && !hasSpawnedPoo) {
      setSpawnPoo(true);
      setHasSpawnedPoo(true);
      return;
    }

    if (hygieneValue > 0 && hygieneValue % 25 !== 0 && hasSpawnedPoo) {
      setHasSpawnedPoo(false);
    }
  }, [hygieneValue, setSpawnPoo, hasSpawnedPoo]);

  return null;
}
