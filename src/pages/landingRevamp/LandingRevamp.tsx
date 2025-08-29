import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

import useOverlayStore from "../../utils/store";
import styles from "./LandingRevamp.module.scss";

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
// import ContactDoors from "../contact/ContactDoors";
import Ham from "../components/ham/ham";
import Lenis from "@studio-freight/lenis";

import { useHamStore } from "../../utils/store";
import { s } from "framer-motion/client";
// import { FaA } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

const TARGET_DATE = new Date("2025-11-07T00:00:00Z");

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

  const treeImageRef = useRef<HTMLImageElement>(null);
  const scrollerRef = useRef<HTMLImageElement>(null);

  const [scrollHeight, setScrollHeight] = useState(
    scrollerRef.current?.scrollHeight
  );
  useEffect(() => {
    if (removeGif) {
      setScrollHeight(scrollerRef.current?.scrollHeight);
    }
    const handleResize = () => {
      if (scrollerRef.current) {
        setScrollHeight(scrollerRef.current.scrollHeight);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [removeGif]);

  useEffect(() => {
    if (overlayIsActive) {
      setTimeout(() => {
        setRemoveGif();
      }, 3000);
    }
  }, [overlayIsActive]);

  useEffect(() => {
    if (removeGif && wrapperRef.current) {
      wrapperRef.current.style.maskImage = "none";
      // Use CSS class instead of position changes
      document.body.classList.remove("scroll-locked");
    }
    if (!removeGif) {
      // Lock scroll with CSS class during overlay
      document.body.classList.add("scroll-locked");
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

  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: window.innerWidth < 730 ? 0.1 : 0.08, // higher lerp for mobile for smoother scroll
      infinite: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    // Use GSAP ticker for better sync with ScrollTrigger
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time);
      });
      lenis.destroy();
    };
  }, []);

  useGSAP(() => {
    if (treeImageRef.current && landingRef.current) {
      gsap.set(treeImageRef.current, {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        force3D: true,
      });

      gsap.set(landingRef.current, {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        force3D: true,
      });

      gsap.set(scrollerRef.current, {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        force3D: true,
      });
    }

    gsap.fromTo(
      registerButtonRef.current,
      { autoAlpha: 1 },
      {
        autoAlpha: 0,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "50vh",
          end: "+=145vh",
          scrub: true,
        },
      }
    );

    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "0px",
        end: `+=${scrollHeight}px`,
        scrub: true,
      },
    });

    const mm = gsap.matchMedia();

    mm.add("(max-width: 730px) or (aspect-ratio < 8/12)", () => {
      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=140vh",
          scrub: true,
        },
      });
      gsap.fromTo(
        dateCountdownRef.current,
        { autoAlpha: 1 },
        {
          autoAlpha: 0,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "00vh",
            end: "+=60vh",
            scrub: true,
          },
        }
      );

      masterTimeline

        .to(
          treeImageRef.current,
          {
            scale: 1.2,
            duration: 4,
            ease: "power2.inOut",
          },
          0
        )

        .to(
          landingMobileRef.current,
          {
            scale: 1.1,
            // y: "8%",
            duration: 4,
            ease: "power2.inOut",
          },
          0
        )

        .to(
          scrollerRef.current,
          {
            y: "-50%",
            // y: "-12.55%",
            duration: 24,
          },
          6
        )

        .to(
          landingMobileRef.current,
          {
            y: "-10%",
            duration: 16,
          },
          6
        );
    });
    mm.add("(min-width: 730px) and (aspect-ratio > 8/12)", () => {
      masterTimeline

        .to(
          treeImageRef.current,
          {
            scale: 1.2,
            // y: "14%",
            duration: 2,
          },
          0
        )
        .to(
          landingRef.current,
          {
            scale: 1.1,
            // y: "8%",
            duration: 2,
          },
          0
        )

        .to(
          scrollerRef.current,
          {
            y: "-80%",
            duration: 16,
            // ease: "sine.in",
          },
          1
        )

        .to(
          landingRef.current,
          {
            y: "-60%",
            duration: 12,
            // ease: "sine.in",
          },
          0.5
        )

        .to(
          dateCountdownRef.current,
          {
            y: "-300%",
            duration: 1,
            ease: "sine.in",
          },
          0
        );
    });
  }, [scrollHeight]);

  // useGSAP(() => {
  //   const scrollAnimationTimeline = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: wrapperRef.current,
  //       scrub: true,
  //       start: "top top",
  //       end: "+=800vh",
  //       onEnter: (self) => console.log("ENTERED:", self.trigger),
  //       onLeave: (self) => console.log("LEFT:", self.trigger),
  //       onUpdate: (self) => {
  //         console.log("ACTIVE:", self.trigger, "Progress:", self.progress);
  //       },
  //     },
  //   });

  //   scrollAnimationTimeline
  //     .to(
  //       treeImageRef.current,
  //       {
  //         scale: 1.2,
  //         y: "14%",
  //         duration: 4,
  //         ease: "power2.out",
  //       },
  //       0
  //     )
  //     .to(
  //       landingRef.current,
  //       {
  //         scale: 1.1,
  //         duration: 4,
  //         ease: "power2.out",
  //       },
  //       0
  //     );
  // }, []);

  return (
    <>
      <main
        className={`${styles.wrapper} ${
          !removeGif ? styles.pointerNoneEvent : ""
        } ${overlayIsActive ? styles.mask : ""}`}
        ref={wrapperRef}
      >
        <Navbar />
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
        <div className={styles.backgroundContainer}>
          <div className={styles.logoContainer}>
            <img src={logo} className={styles.logo} alt="Logo" />
          </div>

          <div className={styles.desktopBackground} ref={landingRef}>
            <img src={landingImage} className={styles.landingImage} />
          </div>

          <div
            className={styles.mobileBackgroundContainer}
            ref={landingMobileRef}
          >
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
        <div className={styles.dateCountdown} ref={dateCountdownRef}>
          <div className={`${styles.daysLeft} ${styles.timeLeft}`}>
            <div className={styles.days}>
              {timeLeft.days >= 10 ? (
                <span>{timeLeft.days}</span>
              ) : (
                <span>0{timeLeft.days}</span>
              )}
            </div>
            DAYS
          </div>
          <div>:</div>
          <div className={`${styles.hoursLeft} ${styles.timeLeft}`}>
            <div className={styles.hours}>
              {timeLeft.hours >= 10 ? (
                <span>{timeLeft.hours}</span>
              ) : (
                <span>0{timeLeft.hours}</span>
              )}
            </div>
            HOURS
          </div>
          <div>:</div>
          <div className={`${styles.minutesLeft} ${styles.timeLeft}`}>
            <div className={styles.minutes}>
              {timeLeft.minutes >= 10 ? (
                <span>{timeLeft.minutes}</span>
              ) : (
                <span>0{timeLeft.minutes}</span>
              )}
            </div>
            MINUTES
          </div>
        </div>
        <div className={styles.scroller} ref={scrollerRef}>
          <div className={styles.landingContainer}>
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

            <div className={styles.foregroundContainer}>
              <div className={styles.treeContainer} ref={treeContainerRef}>
                <div className={styles.tree} ref={treeImageRef}>
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
          <div className={styles.aboutUsContainer}>
            <AboutUs />
          </div>
        </div>
      </main>
    </>
  );
}
