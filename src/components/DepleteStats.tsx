import { useStats } from "@/providers/StatsProvider";
import { useEffect, useState } from "react";

export default function DepleteStats() {
  const { stats, setStats } = useStats();
  const [time, setTime] = useState<number>(Date.now());

  const getIntervalTime = () => {
    return Math.random() * 20000 + 10000;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = (currentTime - time) / 1000;
      setTime(currentTime);

      setStats((prevStats) => ({
        ...prevStats,
        hunger: {
          ...prevStats.hunger,
          value: prevStats.hunger.value - 1,
        },
      }));

      localStorage.setItem("stats", JSON.stringify(stats));
    }, getIntervalTime());

    return () => {
      clearInterval(interval);
    };
  }, []);

  return null;
}
