"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface Poo {
  id: string;
  position: number[];
}

interface Stats {
  xp: {
    id: number;
    title: string;
    level: number;
    value: number;
  };
  happiness: {
    id: number;
    title: string;
    value: number;
  };
  hunger: {
    id: number;
    title: string;
    value: number;
  };
  health: {
    id: number;
    title: string;
    value: number;
  };
  energy: {
    id: number;
    title: string;
    value: number;
  };
  hygiene: {
    id: number;
    title: string;
    value: number;
    pooPosition: Poo[];
  };
}

interface StatsContextType {
  stats: Stats;
  setStats: React.Dispatch<React.SetStateAction<Stats>>;
}

const defaultStats: Stats = {
  xp: {
    id: 0,
    title: "XP",
    level: 1,
    value: 0,
  },
  happiness: {
    id: 1,
    title: "Happiness",
    value: 100,
  },
  hunger: {
    id: 2,
    title: "Hunger",
    value: 100,
  },
  health: {
    id: 3,
    title: "Health",
    value: 100,
  },
  energy: {
    id: 4,
    title: "Energy",
    value: 100,
  },
  hygiene: {
    id: 5,
    title: "Hygiene",
    value: 100,
    pooPosition: [],
  },
};

const StatsContext = createContext<StatsContextType>({
  stats: defaultStats,
  setStats: () => {},
});

export const StatsProvider = ({ children }: { children: React.ReactNode }) => {
  const [stats, setStats] = useState<Stats>(defaultStats);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedStats = localStorage.getItem("stats");
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("stats", JSON.stringify(stats));
    }
  }, [stats]);

  return (
    <StatsContext.Provider value={{ stats, setStats }}>
      {children}
    </StatsContext.Provider>
  );
};

export const useStats = () => useContext(StatsContext);
