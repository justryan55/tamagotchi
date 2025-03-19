import { useStats } from "@/providers/StatsProvider";
import { useEffect } from "react";

export default function DepleteStats() {
  const { stats, setStats } = useStats();

  function generateRandomTime() {
    return 5000;
  }

  useEffect(() => {
    const interval = setInterval(function () {
      clearInterval(interval);

      setStats((prevStats) => ({
        ...prevStats,
        hunger: { ...prevStats.hunger, value: prevStats.hunger.value - 1 },
      }));
    }, generateRandomTime());
  }, [stats, setStats]);

  return null;
}
