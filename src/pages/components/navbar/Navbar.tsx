import styles from "./Navbar.module.scss";
import moon from "/svgs/landing/moon1.svg";
import moonHam from "/svgs/landing/moonHam.svg";
import cloud1 from "/svgs/landing/hamClouds/cloud1.min.svg";
import cloud2 from "/svgs/landing/hamClouds/cloud2.min.svg";
import cloud3 from "/svgs/landing/hamClouds/cloud3.min.svg";
import cloud4 from "/svgs/landing/hamClouds/cloud4.min.svg";
import cloud5 from "/svgs/landing/hamClouds/cloud5.min.svg";
import cloud6 from "/svgs/landing/hamClouds/cloud6.min.svg";
import { useEffect, useContext, useRef, useState } from "react";
import { useMainHamStore } from "../../../utils/store";
import { navContext } from "../../../App";
import { gsap } from "gsap";
import _ScrollTrigger, { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
// import debouncedHandler from "../../../utils/debounce";
// import { rect } from "framer-motion/client";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: "Home", katakana: "ホーム", links: "/" },
  { label: "About Us", katakana: "アバウト・アス", links: "/aboutus" },
  { label: "Events", katakana: "イベンツ", links: "/events" },
  { label: "Contact", katakana: "コンタクト", links: "/contact" },
];

export default function Navbar({
  hideHam = false,
  variant = "default",
}: {
  hideHam?: boolean;
  variant?: "default" | "about";
}) {
  const { goToPage } = useContext(navContext);

  // const setHamOpen = useHamStore((state) => state.setHamOpen);
  const setMainHamOpen = useMainHamStore((state) => state.setMainHamOpen);
  const navRef = useRef<HTMLElement>(null);
  const [navShow, setNavShow] = useState<number>(1);
  const lastScrollY = useRef<number>(0);

  useEffect(() => {
    let ticking = false;
    const threshold = 20;

    const isPhone = () =>
      window.matchMedia("(max-width: 1200px) and (max-aspect-ratio: 1.45)")
        .matches;

    const handleScroll = () => {
      if (isPhone()) {
        setNavShow(1);
        return;
      }

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const diff = currentY - lastScrollY.current;

          if (diff > threshold && currentY > 80) {
            setNavShow(0);
          } else if (diff < 9 - threshold) {
            setNavShow(1);
          }

          lastScrollY.current = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    const handleResize = () => {
      if (isPhone()) {
        setNavShow(1);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
      ScrollTrigger.update();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!navRef.current) return;

    // console.log("Setting up scroll-based color change");

    const timer = setTimeout(() => {
      const targets = navRef.current?.querySelectorAll(
        `.${styles.actualLabel}, .${styles.katakana}`
      );

      if (!targets || targets.length === 0) {
        console.warn("No navbar text elements found");
        return;
      }

      // console.log("Found targets:", targets.length);

      ScrollTrigger.refresh();

      const colorAnimation = gsap.fromTo(
        document.body,
        {
          "--navlink-color": "#ffdfd0",
        },
        {
          scrollTrigger: {
            trigger: document.body,
            start: `+=${window.innerHeight * 1.5}`,
            end: `+=${window.innerHeight * 0.5}`,
            scrub: 1,
            // onEnter: () => console.log("Color change TRIGGERED at 150vh"),
            // onLeave: () => console.log("Color change ENDED"),
            // onUpdate: (self) => console.log("Scroll progress:", self.progress),
          },
          //color: "#C0B063",
          "--navlink-color": "#c0b063",
          ease: "none",
          // markers: "true",
        }
      );

      return () => {
        // console.log("Cleaning up scroll trigger");
        const element = document.getElementById("navbar-scroll-trigger");
        if (element) {
          element.remove();
        }

        if (colorAnimation?.scrollTrigger) {
          colorAnimation.scrollTrigger.kill();
        }

        colorAnimation?.kill();
      };
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleHamClick = () => {
    setMainHamOpen(true);
  };
  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: navShow ? 0 : -120 }}
      transition={{ type: "spring", stiffness: 80, damping: 20 }}
      ref={navRef}
      className={`${styles.nav} ${
        variant === "about" ? styles.aboutVariant : ""
      }`}
    >
      {!hideHam && (
        <div className={styles.hamMenuBtn} onClick={handleHamClick}>
          <img src={moon} alt="moon" className={styles.moon} />
          <img src={moonHam} alt="moonHam" className={styles.moonHam} />
          <div className={styles.clouds}>
            <img
              src={cloud1}
              alt="Cloud1"
              className={`${styles.cloud1} ${styles.cloud}`}
            />
            <img
              src={cloud2}
              alt="Cloud2"
              className={`${styles.cloud2} ${styles.cloud}`}
            />
            <img
              src={cloud3}
              alt="Cloud3"
              className={`${styles.cloud3} ${styles.cloud}`}
            />
            <img
              src={cloud4}
              alt="Cloud4"
              className={`${styles.cloud4} ${styles.cloud}`}
            />
            <img
              src={cloud5}
              alt="Cloud5"
              className={`${styles.cloud5} ${styles.cloud}`}
            />
            <img
              src={cloud6}
              alt="Cloud6"
              className={`${styles.cloud6} ${styles.cloud}`}
            />
          </div>
        </div>
      )}
      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li
            key={item.label}
            className={styles.navItem}
            onClick={() => goToPage?.(item.links)}
          >
            <div className={styles.navLink}>
              <div className={styles.actualLabel}>{item.label}</div>
              <div className={styles.katakana}>{item.katakana}</div>
            </div>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
