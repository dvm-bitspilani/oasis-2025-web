import styles from "./Navbar.module.scss";
import moon from "/svgs/landing/moon1.svg";
import moonHam from "/svgs/landing/moonHam.svg";
import cloud1 from "/svgs/landing/hamClouds/cloud1.min.svg";
import cloud2 from "/svgs/landing/hamClouds/cloud2.min.svg";
import cloud3 from "/svgs/landing/hamClouds/cloud3.min.svg";
import cloud4 from "/svgs/landing/hamClouds/cloud4.min.svg";
import cloud5 from "/svgs/landing/hamClouds/cloud5.min.svg";
import cloud6 from "/svgs/landing/hamClouds/cloud6.min.svg";
import { useState, useEffect, useContext, useRef } from "react";
import { useHamStore, useMainHamStore } from "../../../utils/store";
import { navContext } from "../../../App";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
})  {
  const { goToPage } = useContext(navContext);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [isMobile, setIsMobile] = useState(
    viewportWidth / viewportHeight < 8 / 12 || viewportWidth < 730
      ? true
      : false
  );

  const setHamOpen = useHamStore((state) => state.setHamOpen);
  const setMainHamOpen = useMainHamStore((state) => state.setMainHamOpen);
  const navRef =  useRef<HTMLElement>(null);

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

useEffect(() => {
  if (!navRef.current) return;

  console.log("Setting up scroll-based color change");

  const timer = setTimeout(() => {
    const targets = navRef.current?.querySelectorAll(
      `.${styles.actualLabel}, .${styles.katakana}`
    );

    if (!targets || targets.length === 0) {
      console.warn("No navbar text elements found");
      return;
    }

    console.log("Found targets:", targets.length);

    const triggerElement = document.createElement('div');
    triggerElement.style.position = 'absolute';
    triggerElement.style.top = '150vh'; 
    triggerElement.style.left = '0';
    triggerElement.style.width = '1px';
    triggerElement.style.height = '1px';
    triggerElement.style.visibility = 'hidden';
    triggerElement.id = 'navbar-scroll-trigger';
    
    document.body.appendChild(triggerElement);

    ScrollTrigger.refresh();

    const colorAnimation = gsap.to(targets, {
      scrollTrigger: {
        trigger: triggerElement,
        start: "top center", 
        end: "top top", 
        scrub: 1,
        onEnter: () => console.log("Color change TRIGGERED at 150vh"),
        onLeave: () => console.log("Color change ENDED"),
        onUpdate: (self) => console.log("Scroll progress:", self.progress),
      },
      color: "#C0B063",
      ease: "none"
    });

    return () => {
      console.log("Cleaning up scroll trigger");
      const element = document.getElementById('navbar-scroll-trigger');
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
    if (isMobile) {
      setHamOpen(true);
    } else {
      setMainHamOpen(true);
    }
  };
  return (
    <nav ref={navRef} className={`${styles.nav} ${
        variant === "about" ? styles.aboutVariant : ""
      }`}>
      {!hideHam &&(
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
    </nav>
  );
}
