import styles from "@/styles/stats.module.css";
import { useStats } from "@/providers/StatsProvider";
import { useEffect } from "react";

interface StatsProps {
  toggleStats: boolean;
  setToggleStats: (newState: boolean) => void;
}

export default function Stats({ toggleStats, setToggleStats }: StatsProps) {
  const { stats } = useStats();

  useEffect(() => {
    const handleResize = () => {
      setToggleStats(window.innerWidth > 1496);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setToggleStats]);

  return (
    <div className={`${styles.container} ${toggleStats ? "" : styles.hidden}`}>
      <ul>
        {Object.entries(stats).map((item) => (
          <li className={styles.list} key={`${item[0]}-${item[1].id}`}>
            <h2 className={styles.subheading}>{item[1].title}</h2>
            <span
              className={item[1].title === "XP" ? styles["xp-bar"] : styles.bar}
            >
              <span style={{ width: `${item[1].value}%` }}></span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
