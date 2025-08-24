import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

import useOverlayStore from "../../utils/store";
import styles from "./Landing.module.scss";

import { useGSAP } from "@gsap/react";
import Navbar from "../components/navbar/Navbar";
import landingImage from "/images/landing/background1.png";
import mobileMountains from "/images/landing/mobileMountains.png";
import tree from "/images/landing/tree1.png";
import insta from "/svgs/landing/insta.svg";
import instaLamp from "/svgs/landing/instaLamp.svg";
import linkden from "/svgs/landing/linkden.svg";
import linkdenLamp from "/svgs/landing/linkdenLamp.svg";
import mobileBackground from "/svgs/landing/mobileBackground.svg";
import mobileRegisterBtn from "/svgs/landing/mobileRegisterBtn.svg";
import registerBtn from "/svgs/landing/registerBtn.svg";
import wire from "/svgs/landing/wire.svg";
import x from "/svgs/landing/x.svg";
import xLamp from "/svgs/landing/xLamp.svg";
import logo from "/images/landing/oasisLogo.png";
import mobileCloud from "/images/landing/mobileCloud.png";
import AboutUs from "../aboutus/AboutUs";
import ContactDoors from "../contact/ContactDoors";
import Ham from "../components/ham/ham";

import { useHamStore } from "../../utils/store";

gsap.registerPlugin(ScrollTrigger);

const TARGET_DATE = new Date("2025-11-05T00:00:00Z");

const socialLinks = [
  {
    icon: x,
    lamp: xLamp,
    classNameDiv: styles.xDiv,
    classNameLamp: styles.xLamp,
    classNameIcon: styles.xIcon,
    url: "https://x.com/bitsoasis",
  },
  {
    icon: linkden,
    lamp: linkdenLamp,
    classNameDiv: styles.linkdenDiv,
    classNameLamp: styles.linkdenLamp,
    classNameIcon: styles.linkdenIcon,
    url: "https://www.linkedin.com/company/oasis24-bits-pilani/",
  },
  {
    icon: insta,
    lamp: instaLamp,
    classNameDiv: styles.instaDiv,
    classNameLamp: styles.instaLamp,
    classNameIcon: styles.instaIcon,
    url: "https://www.instagram.com/bitsoasis/",
  },
];

export default function LandingRevamp({
  goToPage,
}: {
  goToPage: (path: string) => void;
}) {
  //@ts-ignore
  const overlayIsActive = useOverlayStore((state) => state.isActive);
  const removeGif = useOverlayStore((state) => state.removeGif);
  const setRemoveGif = useOverlayStore((state) => state.setRemoveGif);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const registerButtonRef = useRef<HTMLDivElement>(null);
  const dateCountdownRef = useRef<HTMLDivElement>(null);
  const landingRef = useRef<HTMLImageElement>(null);
  const landingMobileRef = useRef<HTMLImageElement>(null);
  const treeContainerRef = useRef<HTMLDivElement>(null);
  const isHamOpen = useHamStore((state) => state.isHamOpen);
  const setIsHamOpen = useHamStore((state) => state.setHamOpen);

  useEffect(() => {
    if (overlayIsActive) {
      setTimeout(() => {
        setRemoveGif();
      }, 3000);
    }
  }, [overlayIsActive]);

  useEffect(() => {
    if (removeGif && wrapperRef.current) {
      //change with new wrapperRef/containerRef
      wrapperRef.current.style.maskImage = "none";
      document.body.style.position = "static";
    }
    if (!removeGif) {
      document.body.style.position = "fixed";
    }
  }, [removeGif]);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = TARGET_DATE.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timerId = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <>
      <main className={styles.wrapper} ref={wrapperRef}>
        <Navbar goToPage={goToPage} />
        <div
          className={
            isHamOpen
              ? `${styles.hamContainer} ${styles.hamOpen}`
              : styles.hamContainer
          }
        >
          <div
            className={styles.blur}
            onClick={() => setIsHamOpen(false)}
          ></div>

          <div className={styles.translateHam}>
            <Ham goToPage={goToPage} />
          </div>
        </div>

        <div className={styles.landingContainer}>
          <div className={styles.dateCountdown} ref={dateCountdownRef}>
            <div className={`${styles.daysLeft} ${styles.timeLeft}`}>
              <div className={styles.days}>
                {timeLeft.days > 10 ? (
                  <span>{timeLeft.days}</span>
                ) : (
                  <span>0{timeLeft.days}</span>
                )}
              </div>
              DAYS
            </div>
            :
            <div className={`${styles.hoursLeft} ${styles.timeLeft}`}>
              <div className={styles.hours}>
                {timeLeft.hours > 10 ? (
                  <span>{timeLeft.hours}</span>
                ) : (
                  <span>0{timeLeft.hours}</span>
                )}
              </div>
              HOURS
            </div>
            :
            <div className={`${styles.minutesLeft} ${styles.timeLeft}`}>
              <div className={styles.minutes}>
                {timeLeft.minutes > 10 ? (
                  <span>{timeLeft.minutes}</span>
                ) : (
                  <span>0{timeLeft.minutes}</span>
                )}
              </div>
              MINUTES
            </div>
          </div>
          <div
            className={styles.registerBtnContainer}
            onClick={() => goToPage("/register")}
            ref={registerButtonRef}
          >
            <img
              src={registerBtn}
              className={styles.registerBtn}
              alt="Register"
            />
            <img
              src={mobileRegisterBtn}
              className={styles.mobileRegisterBtn}
              alt=""
            />
            <div className={styles.registerBtnText}>Register</div>
          </div>

          <div className={styles.backgroundContainer}>

            <div className={styles.logoContainer}>
              <img src={logo} className={styles.logo} alt="Logo" />
            </div>
            
            <div className={styles.desktopBackground}>
              <img
                src={landingImage}
                className={styles.landingImage}
                ref={landingRef}
              />
            </div>

            <div className={styles.mobileBackground}>
              <img
                src={mobileMountains}
                className={styles.mobileMountains}
                alt=""
                ref={landingMobileRef}
              />
              <img
                src={mobileBackground}
                alt=""
                className={styles.mobileBackground}
              />

              <img src={mobileCloud} className={styles.mobileCloud} />
            </div>
          </div>
          <div className={styles.foregroundContainer}>

            <div className={styles.treeContainer} ref={treeContainerRef}>
              <div className={styles.tree}>
                <div className={styles.socialLinksContainer}>
                  <div className={styles.wire}>
                    <img src={wire} alt="" />
                  </div>
                  {socialLinks.map((link, index) => (
                    <div
                      key={index}
                      className={`${styles.socialLinkContainer} ${link.classNameDiv}`}
                    >
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                      >
                        <img
                          src={link.icon}
                          alt=""
                          className={`${styles.socialIcon} ${link.classNameIcon}`}
                        />
                        <img
                          src={link.lamp}
                          alt=""
                          className={`${styles.socialLamp} ${link.classNameLamp}`}
                        />
                      </a>
                    </div>
                  ))}
                </div>
                <img
                  src={tree}
                  // className={styles.tree}
                  alt=""
                  loading="eager"
                  fetchPriority="high"
                  style={{ contain: "none" }}
                />
              </div>
              <div className={styles.treeExtender}></div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
