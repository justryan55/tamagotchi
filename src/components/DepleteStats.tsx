import { useStats } from "@/providers/StatsProvider";
import { useUser } from "@/providers/UserProvider";
import { useEffect, useState } from "react";

export default function DepleteStats() {
  const { stats, setStats } = useStats();
  const { user, setUser } = useUser();
  const [time, setTime] = useState<number>(Date.now());

  const getIntervalTime = () => {
    return Math.random() * 20000 + 10000;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = (currentTime - time) / 1000;
      setTime(currentTime);

      setStats((prevStats) => {
        const newHunger = Math.max(
          0,
          prevStats.hunger.value - (Math.random() * 2 + 1)
        );
        const newHappiness = Math.max(
          0,
          prevStats.happiness.value - (Math.random() * 1.5 + 1)
        );

        const newHygiene = Math.max(
          0,
          prevStats.hygiene.value - (Math.random() * 2 + 1)
        );

        const healthLoss = Math.abs(newHappiness - newHunger);
        const newHealth = Math.max(0, prevStats.health.value - healthLoss);

        const energyLoss = Math.abs(newHealth - newHunger) / 2;
        const newEnergy = Math.max(0, prevStats.energy.value - energyLoss);

        return {
          ...prevStats,
          hunger: { ...prevStats.hunger, value: newHunger },
          happiness: { ...prevStats.happiness, value: newHappiness },
          health: { ...prevStats.health, value: newHealth },
          energy: { ...prevStats.energy, value: newEnergy },
          hygiene: { ...prevStats.hygiene, value: newHygiene },
        };
      });

      localStorage.setItem("stats", JSON.stringify(stats));
    }, getIntervalTime());

    return () => {
      clearInterval(interval);
    };
  }, []);

  const useMountEffect = () => {
    useEffect(() => {
      const elapsedTime = (Date.now() - user.lastLogonTime) / 1000 / 60;
      const depletionRate = elapsedTime / 2;

      setUser((prevUser) => {
        return {
          ...prevUser,
          lastLogonTime: Date.now(),
        };
      });

      setStats((prevStats) => {
        return {
          ...prevStats,
          hunger: {
            ...prevStats.hunger,
            value: prevStats.hunger.value - depletionRate,
          },
          happiness: {
            ...prevStats.happiness,
            value: prevStats.happiness.value - depletionRate,
          },
          health: {
            ...prevStats.health,
            value: prevStats.health.value - depletionRate,
          },
          energy: {
            ...prevStats.energy,
            value: prevStats.energy.value - depletionRate,
          },
          hygiene: {
            ...prevStats.hygiene,
            value: prevStats.hygiene.value - depletionRate,
          },
        };
      });
    }, []);
  };

  localStorage.setItem("user", JSON.stringify(user));

  useMountEffect();

  return null;
}
