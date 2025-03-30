import styles from "@/styles/navItems.module.css";
import WeatherData from "@/components/WeatherData";

export const NavItems = [
  {
    id: 1,
    text: "Feed",
    svg: (
      <svg
        className={styles.icon}
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        color="#dc8add"
        aria-label="Feed"
      >
        <path
          d="M14 9.01L14.01 8.99889"
          stroke="#dc8add"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M8 8.01L8.01 7.99889"
          stroke="#dc8add"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M8 14.01L8.01 13.9989"
          stroke="#dc8add"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M6 19L2.23626 3.0041C2.13087 2.55618 2.54815 2.16122 2.98961 2.29106L19 7"
          stroke="#dc8add"
          strokeWidth="1.5"
        ></path>
        <path
          d="M22.198 8.42467C22.4324 7.48703 21.8623 6.5369 20.9247 6.30249C19.987 6.06808 19.0369 6.63816 18.8025 7.5758C18.4106 9.14318 16.9015 11.6241 14.5753 13.9503C12.2743 16.2513 9.42714 18.1442 6.60672 18.7951C5.66497 19.0124 5.07771 19.952 5.29504 20.8937C5.51236 21.8355 6.45198 22.4227 7.39373 22.2054C11.0734 21.3563 14.4762 18.9991 17.0502 16.4252C19.5989 13.8764 21.5898 10.8573 22.198 8.42467Z"
          stroke="#dc8add"
          strokeWidth="1.5"
          strokeLinecap="round"
        ></path>
      </svg>
    ),
  },
  {
    id: 2,
    text: "Clean",
    svg: (
      <svg
        className={styles.icon}
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        color="#99c1f1"
        aria-label="Clean"
      >
        <path
          d="M22 5L20.0455 17.3135C19.8913 18.2849 19.0538 19 18.0702 19H5.92981C4.94628 19 4.10872 18.2849 3.95454 17.3135L2 5"
          stroke="#99c1f1"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M21 11C19 11 16.5 8 16.5 8C16.5 8 14.3513 11 12 11C9.64873 11 7.5 8 7.5 8C7.5 8 5 11 3 11"
          stroke="#99c1f1"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    ),
  },
  {
    id: 3,
    text: "Play",
    svg: (
      <svg
        className={styles.icon}
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        color="#e5a50a"
      >
        <path
          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          stroke="#e5a50a"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M18.5716 4.46234C15.905 8.99175 15.9049 14.1847 18.5716 19.5377"
          stroke="#e5a50a"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M5.42834 4.46234C8.09501 8.99175 8.09513 14.1847 5.42834 19.5377"
          stroke="#e5a50a"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    ),
  },

  {
    id: 4,
    text: "Sleep",
    svg: (
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        color="#"
      >
        <path
          d="M21 4V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V4C3 2.89543 3.89543 2 5 2H19C20.1046 2 21 2.89543 21 4Z"
          stroke="#FF6347"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M3 8L11 8L11 6"
          stroke="#FF6347"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M21 8L13 8L13 6"
          stroke="#FF6347"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    ),
  },
];

export const HeaderItems = [
  {
    id: 1,
    text: "Stats",
    svg: (
      <svg
        className={styles.icon}
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        color="#8ff0a4"
        aria-label="Stats"
      >
        <path
          d="M19 3L5 3C3.89543 3 3 3.89543 3 5L3 19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
          stroke="#8ff0a4"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M7 7L17 7"
          stroke="#8ff0a4"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M7 12L17 12"
          stroke="#8ff0a4"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M7 17L13 17"
          stroke="#8ff0a4"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    ),
  },
  {
    id: 2,
    text: "Weather",
    svg: <WeatherData />,
  },
  {
    id: 3,
    text: "Animate",
    svg: (
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        color="#cdab8f"
        strokeWidth="1.5"
      >
        <path
          d="M6.90588 4.53682C6.50592 4.2998 6 4.58808 6 5.05299V18.947C6 19.4119 6.50592 19.7002 6.90588 19.4632L18.629 12.5162C19.0211 12.2838 19.0211 11.7162 18.629 11.4838L6.90588 4.53682Z"
          fill="#cdab8f"
          stroke="#cdab8f"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    ),
  },
];
