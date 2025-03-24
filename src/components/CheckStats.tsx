import { useStats } from "@/providers/StatsProvider";
import { useEffect, useState } from "react";

interface CheckStatsProp {
  setSpawnPoo: (state: bollean) => void;
}
export default function CheckStats({ setSpawnPoo }: CheckStatsProp) {
  const { stats, setStats } = useStats();

  useEffect(() => {
    if (stats.hygiene.value === 100) return;

    if (Math.round(stats.hygiene.value) % 25 === 0) {
      setSpawnPoo(true);
    } else {
      setSpawnPoo(false);
    }
  }, [stats.hygiene.value, setSpawnPoo]);

  return null;
}
