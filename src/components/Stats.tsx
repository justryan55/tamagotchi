import styles from "@/styles/stats.module.css";
import { useStats } from "@/providers/StatsProvider";

interface StatsProps {
  toggleStats: boolean;
}

export default function Stats({ toggleStats }: StatsProps) {
  const stats = useStats();
  return (
    <div className={`${styles.container} ${toggleStats ? "" : styles.hidden}`}>
      {/* <h1 className={styles.heading}>Stats</h1> */}
      <ul>
        {Object.entries(stats).map((item) => (
          <li className={styles.list} key={item[1].id}>
            <h2 className={styles.subheading}>{item[1].title}</h2>
            <span className={styles.bar}>
              <span style={{ width: `${item[1].value}%` }}></span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
