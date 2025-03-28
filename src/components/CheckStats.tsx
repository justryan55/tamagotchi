import { useStats } from "@/providers/StatsProvider";
import { useEffect, useState } from "react";

interface CheckStatsProp {
  setSpawnPoo: (state: boolean) => void;
}
export default function CheckStats({ setSpawnPoo }: CheckStatsProp) {
  const { stats, setStats } = useStats();
  const hygieneValue = Math.ceil(stats.hygiene.value);
  const xpValue = stats.xp.value;
  const [hasSpawnedPoo, setHasSpawnedPoo] = useState(false);

  useEffect(() => {
    if (hygieneValue === 100) {
      setSpawnPoo(false);
      setHasSpawnedPoo(false);
      return;
    }

    if (hygieneValue % 10 === 0 && hygieneValue !== 0 && !hasSpawnedPoo) {
      setSpawnPoo(true);
      setHasSpawnedPoo(true);
      return;
    }

    if (hygieneValue > 0 && hygieneValue % 10 !== 0 && hasSpawnedPoo) {
      setHasSpawnedPoo(false);
    }
  }, [hygieneValue, setSpawnPoo, hasSpawnedPoo]);

  useEffect(() => {
    if (xpValue >= 100) {
      setStats((prevStats) => {
        return {
          ...prevStats,
          xp: {
            ...prevStats.xp,
            value: xpValue % 100,
            level: prevStats.xp.level + 1,
          },
        };
      });
    }
  }, [xpValue, setStats]);

  return null;
}
