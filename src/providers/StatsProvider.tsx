"use client";

import { createContext, useContext } from "react";

interface Stats {
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
  };
}

const defaultStats: Stats = {
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
  },
};

const StatsContext = createContext<Stats>(defaultStats);

export const StatsProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <StatsContext.Provider value={defaultStats}>
      {children}
    </StatsContext.Provider>
  );
};

export const useStats = () => useContext(StatsContext);
