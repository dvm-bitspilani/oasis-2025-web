 import styles from "./Aboutbar.module.scss";
// import moon from "/svgs/landing/moon1.svg";
// import moonHam from "/svgs/landing/moonHam.svg";
// import cloud1 from "/svgs/landing/hamClouds/cloud1.min.svg";
// import cloud2 from "/svgs/landing/hamClouds/cloud2.min.svg";
// import cloud3 from "/svgs/landing/hamClouds/cloud3.min.svg";
// import cloud4 from "/svgs/landing/hamClouds/cloud4.min.svg";
// import cloud5 from "/svgs/landing/hamClouds/cloud5.min.svg";
// import cloud6 from "/svgs/landing/hamClouds/cloud6.min.svg";

const navItems = [
  { label: "Home", katakana: "ホーム", links: "/" },
  { label: "About Us", katakana: "アバウト・アス", links: "/aboutus" },
  { label: "Events", katakana: "イベンツ", links: "/events" },
  { label: "Contact", katakana: "コンタクト", links: "/contact" },
];

export default function Aboutbar({
  goToPage,
}: {
  goToPage: (path: string) => void;
}) {
  return (
    <nav className={styles.nav}>
  <div className={styles.leftSpacer} /> 
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
