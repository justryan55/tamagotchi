import styles from "@/styles/animations.module.css";

interface AnimationProps {
  toggleAnimation: (animationType: string) => void;
}

export default function Animations({ toggleAnimation }: AnimationProps) {
  return (
    <div className={styles.container}>
      <p className={styles.item} onClick={() => toggleAnimation("sitting")}>
        Sit
      </p>
      <p className={styles.item} onClick={() => toggleAnimation("standing")}>
        Stand
      </p>
      <p className={styles.item} onClick={() => toggleAnimation("shake")}>
        Shake
      </p>
      <p className={styles.item} onClick={() => toggleAnimation("rollover")}>
        Rollover
      </p>
      <p className={styles.item} onClick={() => toggleAnimation("play_dead")}>
        Play Dead
      </p>
    </div>
  );
}
