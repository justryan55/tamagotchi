"use client";

import { HeaderItems } from "../content/nav";
import { NavItems } from "../content/nav";
import styles from "../styles/nav.module.css";

interface NavProps {
  toggleStatsClass: () => void;
  toggleAnimationsClass: () => void;
  toggleFood: () => void;
  toggleLight: () => void;
  toggleBall: () => void;
}

export default function Nav({
  toggleStatsClass,
  toggleAnimationsClass,
  toggleFood,
  toggleLight,
  toggleBall,
}: NavProps) {
  return (
    <>
      <nav className={styles["header-nav"]}>
        <ul className={styles["header-nav-list"]}>
          {HeaderItems.map((item) => (
            <li
              className={styles["nav-item"]}
              key={item.id}
              aria-label={item.text}
              onClick={
                item.text === HeaderItems[0].text
                  ? toggleStatsClass
                  : item.text === HeaderItems[2].text
                  ? toggleAnimationsClass
                  : undefined
              }
            >
              {item.svg}
            </li>
          ))}
        </ul>
      </nav>

      <nav className={styles.nav}>
        <ul className={styles["nav-list"]}>
          {NavItems.map((item) => (
            <li
              className={styles["nav-item"]}
              key={item.id}
              aria-label={item.text}
              onClick={
                item.text === NavItems[0].text
                  ? toggleFood
                  : item.text === NavItems[2].text
                  ? toggleBall
                  : item.text === NavItems[4].text
                  ? toggleLight
                  : undefined
              }
            >
              {item.svg}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
