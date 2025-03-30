import { useStats } from "@/providers/StatsProvider";
import { useUser } from "@/providers/UserProvider";
import { useEffect, useState } from "react";

export default function DepleteStats({ lightOn }: { lightOn: boolean }) {
  const { stats, setStats } = useStats();
  const { user, setUser } = useUser();
  const [time, setTime] = useState<number>(Date.now());

  const getIntervalTime = () => {
    return Math.random() * 20000 + 10000;
  };

  useEffect(() => {
    const savedStats = localStorage.getItem("stats");
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }

    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [setStats, setUser]);

  useEffect(() => {
    if (!lightOn) {
      return;
    }

    const interval = setInterval(() => {
      const currentTime = Date.now();
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

      if (localStorage !== undefined) {
        localStorage.setItem("stats", JSON.stringify(stats));
      }
    }, getIntervalTime());

    return () => {
      clearInterval(interval);
    };
  }, [lightOn, setStats, stats]);

  useEffect(() => {
    if (!user) return;

    const elapsedTime = (Date.now() - user.lastLogonTime) / 1000 / 60;
    const depletionRate = elapsedTime / 2;

    setUser((prevUser) => {
      const updatedUser = {
        ...prevUser,
        lastLogonTime: Date.now(),
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      return updatedUser;
    });

    setStats((prevStats) => {
      const updatedStats = {
        ...prevStats,
        hunger: {
          ...prevStats.hunger,
          value: Math.max(0, prevStats.hunger.value - depletionRate),
        },
        happiness: {
          ...prevStats.happiness,
          value: Math.max(0, prevStats.happiness.value - depletionRate),
        },
        health: {
          ...prevStats.health,
          value: Math.max(0, prevStats.health.value - depletionRate),
        },
        energy: {
          ...prevStats.energy,
          value: Math.max(0, prevStats.energy.value - depletionRate),
        },
        hygiene: {
          ...prevStats.hygiene,
          value: Math.max(0, prevStats.hygiene.value - depletionRate),
        },
      };

      localStorage.setItem("stats", JSON.stringify(updatedStats));
      return updatedStats;
    });
    if (localStorage !== undefined) {
      localStorage.setItem("user", JSON.stringify(user));
    }

    localStorage.setItem(
      "user",
      JSON.stringify({ ...user, lastLogonTime: Date.now() })
    );
  }, [user, setStats, setUser]);

  return null;
}
