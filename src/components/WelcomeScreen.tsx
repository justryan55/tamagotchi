import { NavItems } from "@/content/nav";
import styles from "@/styles/welcome.module.css";

interface WelcomeScreenProps {
  setIsFirstVisit: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function WelcomeScreen({ setIsFirstVisit }: WelcomeScreenProps) {
  const handleClick = () => {
    setIsFirstVisit(false);
    localStorage.setItem("firstVisit", "false");
  };
  return (
    <div className={styles.container}>
      <h1>Welcome to Tamagotchi!</h1>
      <h2>How to Care for Your Pet:</h2>
      <ul>
        <li>
          <div>{NavItems[0].svg}</div>
          <p>
            Feed your pet regularly to keep it from starving and maintain its
            energy levels.
          </p>
        </li>
        <li>
          <div>{NavItems[1].svg}</div>
          <p>
            Hover your finger or cursor over your pet to help keep it clean.
          </p>
        </li>
        <li>
          <div>{NavItems[2].svg}</div>
          <p>
            Throw tennis balls for your pet to play with and stay entertained.
          </p>
        </li>
        <li>
          <div>{NavItems[3].svg}</div>
          <p>Make sure your pet gets enough rest to stay healthy and happy.</p>
        </li>
      </ul>
      <button className={styles.button} onClick={handleClick}>
        Play now!
      </button>
    </div>
  );
}
