import styles from "./ham.module.scss";
import hamX from "/svgs/landing/hamX.svg";
import phone from "/svgs/landing/phone.svg";
import homeIcon from "/svgs/landing/homeIcon.svg";
import aboutusIcon from "/svgs/landing/aboutusIcon.svg";
import eventIcon from "/svgs/landing/eventsIcon.svg";
import oasisLogo from "/images/landing/oasisLogo.png";
import { useHamStore } from "../../../utils/store";

const navItems = [
  { label: "Home", katakana: "ホーム", links: "/", icon: homeIcon },
  {
    label: "About Us",
    katakana: "アバウト・アス",
    links: "/aboutus",
    icon: aboutusIcon,
  },
  { label: "Contact", katakana: "コンタクト", links: "/contact", icon: phone },
  { label: "Events", katakana: "イベンツ", links: "/events", icon: eventIcon },
];
export default function Ham({
  goToPage,
}: {
  goToPage: (path: string) => void;
}) {
  const setHamOpen = useHamStore((state) => state.setHamOpen);
  return (
    <div className={styles.ham}>
      <div className={styles.closeBtn} onClick={() => setHamOpen(false)}>
        <img src={hamX} alt="Close" className={styles.closeIcon} />
      </div>
      <div className={styles.logoContainer}>
        <img src={oasisLogo} alt="Oasis Logo" className={styles.logo} />
      </div>
      <div className={styles.linkContainer}>
        {navItems.map((item, index) => (
          <>
            <div
              key={item.label}
              className={styles.navItem}
              onClick={() => {
                goToPage(item.links);
                setHamOpen(false);
              }}
            >
              <img src={item.icon} alt={item.label} className={styles.icon} />
              <span className={styles.label}>{item.label}</span>
            </div>
            {index < navItems.length - 1 && <div className={styles.line}></div>}
          </>
        ))}
      </div>
      <div className={styles.mwd}>
        {/* <img src={mwd} alt="Made with DVM" />
         */}
        Made with ❤️ by DVM
      </div>
    </div>
  );
}
