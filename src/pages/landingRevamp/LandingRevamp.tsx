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
import treeMob from "/images/landing/treeMob.png";
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
import logo from "/images/landing/banner_without_sponz.png";
import mobileCloud from "/images/landing/mobileCloud.png";
import AboutUs from "../aboutus/AboutUs";
// import ContactDoors from "../contact/ContactDoors";
// import Ham from "../components/ham/ham";
import MainHam from "../components/mainHam/mainHam";
import Lenis from "@studio-freight/lenis";

import { useMainHamStore } from "../../utils/store";
import ContactDoors from "../contact/ContactDoors";
import { Helmet } from "react-helmet";

gsap.registerPlugin(ScrollTrigger);

const TARGET_DATE = new Date("2025-11-07T00:00:00+05:30");

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
  onToggle,
}: {
  goToPage: (path: string) => void;
  onToggle: () => void;
}) {
  const overlayIsActive = useOverlayStore((state) => state.isActive);
  const removeGif = useOverlayStore((state) => state.removeGif);
  const setRemoveGif = useOverlayStore((state) => state.setRemoveGif);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const registerButtonRef = useRef<HTMLDivElement>(null);
  const dateCountdownRef = useRef<HTMLDivElement>(null);
  const landingRef = useRef<HTMLImageElement>(null);
  const landingMobileRef = useRef<HTMLImageElement>(null);
  const treeContainerRef = useRef<HTMLDivElement>(null);
  // const isHamOpen = useHamStore((state) => state.isHamOpen);
  const isMainHamOpen = useMainHamStore((state) => state.isMainHamOpen);
  // const setIsHamOpen = useHamStore((state) => state.setHamOpen);
  const setIsMainHamOpen = useMainHamStore((state) => state.setMainHamOpen);

  const treeImageRef = useRef<HTMLImageElement>(null);
  const scrollerRef = useRef<HTMLImageElement>(null);

  const aboutUsContRef = useRef<HTMLDivElement>(null);
  const aboutUsWrapperRef = useRef<HTMLDivElement>(null);

  const [scrollHeight, setScrollHeight] = useState(
    (scrollerRef.current?.scrollHeight ?? 0) - window.innerHeight * 1.4
  );
  useEffect(() => {
    if (removeGif) {
      setScrollHeight(
        (scrollerRef.current?.scrollHeight ?? 0) - window.innerHeight * 1.4
      );
    }
    const handleResize = () => {
      if (scrollerRef.current) {
        setScrollHeight(
          (scrollerRef.current.scrollHeight ?? 0) - window.innerHeight * 1.4
        );
      }
      // if (window.innerWidth <= 730) {
      //   document.scrollingElement?.scrollTo({ top: 0, behavior: "instant" });
      //   document.body.style.position = "fixed";
      // } else {
      //   document.body.style.position = "static";
      // }
    };

    handleResize();
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

    document.scrollingElement?.scrollTo({ top: 0 });

    calculateTimeLeft();
    const timerId = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      // wrapper: document.body,
      // content: document.body,
      lerp: window.innerWidth < 730 ? 0.1 : 0.1, // higher lerp for mobile for smoother scroll
      infinite: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    // Use GSAP ticker for better sync with ScrollTrigger
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // const breakPointDetector = gsap.to("#aboutUsBottom", {
    //   scrollTrigger: {
    //     trigger: "#aboutUsBottom",
    //     start: "top bottom",
    //     // onEnter: () => {lenis.stop(), console.log("Here")},
    //   }
    // })

    return () => {
      // breakPointDetector.kill()
      gsap.ticker.remove((time) => {
        lenis.raf(time);
      });
      lenis.destroy();
    };
  }, []);

  useGSAP(() => {
    if (treeImageRef.current && landingRef.current) {
      gsap.set(treeImageRef.current, {
        // autoAlpha: 1,
        // scale: 1,
        // y: 0,
        force3D: true,
      });

      gsap.set(landingRef.current, {
        // autoAlpha: 1,
        // scale: 1,
        // y: 0,
        force3D: true,
      });

      gsap.set(scrollerRef.current, {
        // autoAlpha: 1,
        // scale: 1,
        // y: 0,
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

    const mm = gsap.matchMedia();

    mm.add("(max-width: 730px) or (aspect-ratio < 8/12)", () => {
      // const masterTimeline = gsap.timeline({
      //   scrollTrigger: {
      //     trigger: wrapperRef.current,
      //     start: "top top",
      //     end: `+=300vh`,
      //     scrub: true,
      //     invalidateOnRefresh: true,
      //   },
      // });
      gsap.fromTo(
        dateCountdownRef.current,
        { autoAlpha: 1 },
        {
          autoAlpha: 0,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "00vh",
            end: "+=120vh",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );

      // masterTimeline

      gsap.to(
        treeImageRef.current,
        {
          scale: 1.15,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: `+=300vh`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
        // 0
      );

      gsap.to(
        landingMobileRef.current,
        {
          scale: 1.08,
          // y: "8%",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: `+=300vh`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
        // 0
      );

      gsap.to(landingMobileRef.current, {
        y: "-10%",
        // duration: 20,
        ease: "sine.inOut",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: `+=300vh`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    });
    mm.add("(min-width: 730px) and (aspect-ratio > 8/12)", () => {
      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: `+=${scrollHeight}px`,
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });
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
            y: "-20%",
            duration: 16,
            // ease: "sine.in",
          },
          1
        )

        .to(
          landingRef.current,
          {
            y: "-30%",
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
    return () => {
      mm.revert();
    };
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
            isMainHamOpen
              ? `${styles.mainHamContainer} ${styles.mainHamOpen}`
              : styles.mainHamContainer
          }
        >
          <div onClick={() => setIsMainHamOpen(false)}></div>
          <div className={styles.showMainHam}>
            <MainHam goToPage={goToPage} />
          </div>
        </div>
        <div className={styles.backgroundContainer}>
          <div className={styles.logoContainer}>
            <img src={logo} className={styles.logo} alt="Logo" />
          </div>

          <div className={styles.desktopBackground} ref={landingRef}>
            <img
              src={landingImage}
              className={styles.landingImage}
              alt="Landing Image"
            />
          </div>

          <div
            className={styles.mobileBackgroundContainer}
            ref={landingMobileRef}
          >
            <img
              src={mobileMountains}
              className={styles.mobileMountains}
              alt="Mountains"
              // ref={landingMobileRef}
            />
            <img
              src={mobileBackground}
              alt="mobile"
              className={styles.mobileBackground}
            />

            <img src={mobileCloud} className={styles.mobileCloud} alt="cloud" />
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
        <div className={styles.scrollerWrapper}>
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
                  alt="Register"
                />
                <div className={styles.registerBtnText}>Register</div>
              </div>

              <div className={styles.foregroundContainer}>
                <div className={styles.treeContainer} ref={treeContainerRef}>
                  <div className={styles.tree} ref={treeImageRef}>
                    <div className={styles.socialLinksContainer}>
                      <div className={styles.wire}>
                        <img src={wire} alt="Wire" />
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
                              alt="Icon"
                              className={`${styles.socialIcon} ${link.classNameIcon}`}
                            />
                            <img
                              src={link.lamp}
                              alt="Lamp"
                              className={`${styles.socialLamp} ${link.classNameLamp}`}
                            />
                          </a>
                        </div>
                      ))}
                    </div>
                    <div className={styles.audioTagContainer}>
                      <div className={styles.wire}>
                        <img src={wire} alt="Wire" />
                      </div>
                      <svg
                        fill="#fff"
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="800px"
                        height="800px"
                        viewBox="0 0 345.09 345.089"
                        className={styles.audioTag}
                        onClick={onToggle}
                      >
                        <g>
                          <path
                            d="M172.539,0.003C77.405,0.003,0,77.405,0,172.544c0,95.141,77.405,172.542,172.539,172.542
                            c95.137,0,172.551-77.401,172.551-172.542C345.084,77.405,267.676,0.003,172.539,0.003z M151.973,209.493
                            c0,6.323-2.879,12.105-7.449,14.952c-4.566,2.876-10.064,2.348-14.201-1.388l-31.243-28.019c-1.414,0.648-2.996,1.045-4.668,1.045
                            H68.254c-6.167,0-11.166-5.008-11.166-11.175v-26.166c0-6.173,4.999-11.16,11.166-11.16h26.157c2.072,0,3.996,0.604,5.65,1.58
                            l30.261-27.16c2.372-2.12,5.188-3.2,8.022-3.2c2.104,0,4.23,0.606,6.179,1.819c4.57,2.882,7.449,8.656,7.449,14.964V209.493z
                            M186.503,206.802c-2.456,0-4.918-0.942-6.791-2.816c-3.753-3.759-3.753-9.848,0-13.595c4.768-4.768,7.397-11.103,7.397-17.858
                            c0-6.737-2.63-13.081-7.397-17.852c-3.753-3.753-3.753-9.839,0-13.589c3.753-3.759,9.842-3.759,13.595,0
                            c8.395,8.398,13.03,19.57,13.03,31.441c0,11.89-4.636,23.059-13.03,31.453C191.421,205.86,188.971,206.802,186.503,206.802z
                            M215.356,227.092c-2.456,0-4.924-0.937-6.792-2.81c-3.753-3.76-3.753-9.842,0-13.596c21.035-21.028,21.017-55.25-0.012-76.281
                            c-3.753-3.75-3.753-9.839,0-13.589s9.842-3.756,13.595,0c28.529,28.531,28.529,74.942,0.006,103.466
                            C220.28,226.156,217.818,227.092,215.356,227.092z M251.007,250.74c-1.88,1.873-4.342,2.81-6.792,2.81
                            c-2.462,0-4.93-0.937-6.797-2.81c-3.759-3.76-3.759-9.836,0-13.596c17.252-17.258,26.745-40.189,26.745-64.6
                            c0-24.403-9.5-47.351-26.77-64.602c-3.753-3.75-3.753-9.839,0-13.589c3.759-3.759,9.842-3.759,13.595,0
                            c20.897,20.888,32.402,48.654,32.402,78.191C283.385,202.094,271.886,229.861,251.007,250.74z"
                          />
                        </g>
                      </svg>
                    </div>
                    <img
                      src={tree}
                      // className={styles.tree}
                      className={styles.treeDesktop}
                      alt="Tree"
                      loading="eager"
                      fetchPriority="high"
                      style={{ contain: "none" }}
                    />
                    <img
                      src={treeMob}
                      alt="TreeMobile"
                      className={styles.treeMob}
                      loading="eager"
                      fetchPriority="high"
                    />
                  </div>
                  <div className={styles.treeExtender}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bottomContainer}>
          <div className={styles.bottomOverlay} />
          <div className={styles.aboutUsContainer} ref={aboutUsContRef}>
            <div className={styles.aboutUsWrapper} ref={aboutUsWrapperRef}>
              <AboutUs isBackBtn={false} />
              <div className={styles.aboutUsBottom} id="aboutUsBottom" />
            </div>
            {aboutUsContRef.current &&
              aboutUsWrapperRef && ( // bottomSpacerRef.current &&
                <ContactDoors
                  pinElemRef={aboutUsContRef}
                  triggerElemRef={aboutUsWrapperRef}
                />
              )}
          </div>
          {/* <div className={styles.bottomSpacer} ref={bottomSpacerRef}/> */}
        </div>
      </main>
      <Helmet>
        <title>OASIS 2025 | Whispers Of Edo</title>
      </Helmet>
    </>
  );
}
