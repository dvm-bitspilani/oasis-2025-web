import styles from "./Navbar.module.scss";
import moon from "/svgs/landing/moon1.svg";
import moonHam from "/svgs/landing/moonHam.svg";
import cloud1 from "/svgs/landing/hamClouds/cloud1.min.svg";
import cloud2 from "/svgs/landing/hamClouds/cloud2.min.svg";
import cloud3 from "/svgs/landing/hamClouds/cloud3.min.svg";
import cloud4 from "/svgs/landing/hamClouds/cloud4.min.svg";
import cloud5 from "/svgs/landing/hamClouds/cloud5.min.svg";
import cloud6 from "/svgs/landing/hamClouds/cloud6.min.svg";
import { useState, useEffect } from "react";
import { useHamStore } from "../../../utils/store";

const navItems = [
  { label: "Home", katakana: "ホーム", links: "/" },
  { label: "About Us", katakana: "アバウト・アス", links: "/aboutus" },
  { label: "Events", katakana: "イベンツ", links: "/events" },
  { label: "Contact", katakana: "コンタクト", links: "/contact" },
];

export default function Navbar({
  goToPage,
}: {
  goToPage: (path: string) => void;
}) {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [isMobile, setIsMobile] = useState(
    viewportWidth / viewportHeight < 8 / 12 || viewportWidth < 730
      ? true
      : false
  );
  const setHamOpen = useHamStore((state) => state.setHamOpen);
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setIsMobile(viewportWidth / viewportHeight < 8 / 12 || viewportWidth < 730);
  }, [viewportHeight, viewportWidth]);
  const handleHamClick = () => {
    if (isMobile) {
      setHamOpen(true);
    }
  };
  return (
    <nav className={styles.nav}>
      <div className={styles.hamMenuBtn} onClick={handleHamClick}>
        <img src={moon} alt="" className={styles.moon} />
        <img src={moonHam} alt="" className={styles.moonHam} />
        <div className={styles.clouds}>
          <img
            src={cloud1}
            alt=""
            className={`${styles.cloud1} ${styles.cloud}`}
          />
          <img
            src={cloud2}
            alt=""
            className={`${styles.cloud2} ${styles.cloud}`}
          />
          <img
            src={cloud3}
            alt=""
            className={`${styles.cloud3} ${styles.cloud}`}
          />
          <img
            src={cloud4}
            alt=""
            className={`${styles.cloud4} ${styles.cloud}`}
          />
          <img
            src={cloud5}
            alt=""
            className={`${styles.cloud5} ${styles.cloud}`}
          />
          <img
            src={cloud6}
            alt=""
            className={`${styles.cloud6} ${styles.cloud}`}
          />
        </div>
      </div>
      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li key={item.label} className={styles.navItem}>
            <div
              className={styles.navLink}
              onClick={() => goToPage(item.links)}
            >
              <div className={styles.actualLabel}>{item.label}</div>
              <div className={styles.katakana}>{item.katakana}</div>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
}
