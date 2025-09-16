import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./AboutUs.module.scss";
import Header from "/svgs/aboutus/header.svg";
import fan from "/svgs/aboutus/fan.png";
import prev from "/svgs/aboutus/prev.svg";
import pause from "/svgs/aboutus/pause.svg";
import next from "/svgs/aboutus/next.svg";
import Reg from "/svgs/aboutus/reghead.svg";
import play from "/svgs/aboutus/play.svg";
import nextarr from "/svgs/aboutus/nextarr.svg";
import BackButton from "../components/backButton/BackButton";
import PlayButton from "/svgs/aboutus/borde.svg";
import instaicon from "/svgs/aboutus/instaicon.svg";
import xicon from "/svgs/aboutus/xicon.svg";
import linkedin from "/svgs/aboutus/linkedin.svg";
import yticon from "/svgs/aboutus/yticon.svg";
import abtus from "/svgs/aboutus/abtus.svg";
import aboutPageBG from "/images/aboutus/background.jpg";
import aboutPageBGMobile from "/images/aboutus/backg.png";
import aboutTextBG from "/images/aboutus/abtbck.png";
import letter1 from "/svgs/aboutus/letter1.svg";
import letter2 from "/svgs/aboutus/letter2.svg";
import letter3 from "/svgs/aboutus/letter3.svg";
import letter4 from "/svgs/aboutus/letter4.svg";
import letter5 from "/svgs/aboutus/letter5.svg";
import letter6 from "/svgs/aboutus/letter6.svg";
import letter7 from "/svgs/aboutus/letter7.svg";
import letter8 from "/svgs/aboutus/letter8.svg";
// import Navbar from "../components/navbar/Navbar";

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const icons = [
  letter1,
  letter2,
  letter3,
  letter4,
  letter5,
  letter6,
  letter7,
  letter8,
];

const videos = ["Ogio7ZJSb9g", "5MtkggVC0w0", "krsrGOqnAN0"];
const iconImages: HTMLImageElement[] = icons.map((src) => {
  const img = new Image();
  img.src = src;
  img.alt = "Letters";
  return img;
});
const AboutUs = ({ isBackBtn = true }: { isBackBtn?: boolean }) => {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const AboutRef = useRef<HTMLDivElement | null>(null);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<any>(null);
  useEffect(() => {
    document.body.style.position = "static";
  }, []);
  useEffect(() => {
    const initPlayer = () => {
      if (playerRef.current || !playerContainerRef.current || !window.YT)
        return;

      playerRef.current = new window.YT.Player(playerContainerRef.current, {
        height: "100%",
        width: "100%",
        videoId: videos[0],
        playerVars: {
          autoplay: 0,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onStateChange: (event: any) => {
            const YTState = window.YT.PlayerState;
            if (event.data === YTState.PLAYING) setIsPlaying(true);
            if (event.data === YTState.PAUSED) setIsPlaying(false);
            if (event.data === YTState.ENDED) {
              setIsPlaying(false);
              nextVideo();
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = () => initPlayer();
      const existingScript = document.querySelector(
        "script[src='https://www.youtube.com/iframe_api']"
      );
      if (!existingScript) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        tag.async = true;
        document.body.appendChild(tag);
      }
    }

    return () => {
      if (
        playerRef.current &&
        typeof playerRef.current.destroy === "function"
      ) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);

  const loadByIndex = (index: number) => {
    if (!playerRef.current) return;
    setCurrent(index);
    playerRef.current.loadVideoById(videos[index]);
  };

  const nextVideo = () => {
    const newIdx = (current + 1) % videos.length;
    loadByIndex(newIdx);
  };

  const prevVideo = () => {
    const newIdx = (current - 1 + videos.length) % videos.length;
    loadByIndex(newIdx);
  };

  const togglePlayPause = () => {
    if (!playerRef.current || !window.YT) return;
    const state = playerRef.current.getPlayerState();
    const YTState = window.YT.PlayerState;
    if (state === YTState.PLAYING) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const fan2Ref = useRef<HTMLImageElement>(null);
  const fan1Ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    gsap.set(fan2Ref.current, { xPercent: 100, yPercent: -100, rotate: 180 });
  }, []);

  useEffect(() => {
    gsap.to(fan1Ref.current, {
      rotateX: -5,
      rotateY: -5,
      duration: 0.5,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
    });

    gsap.to(fan2Ref.current, {
      rotateX: -9,
      rotateY: -9,
      duration: 0.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
    gsap.to(AboutRef.current, {
      backgroundPositionY: "-=1000vh",
      duration: 200,

      repeat: -1,
      ease: "linear",
    });

    const spawnIcon = (fanSelector: string, isFan1: boolean) => {
      const fanEl = document.querySelector(fanSelector) as HTMLElement | null;
      if (!fanEl || !fanEl.parentElement) return;

      const rect = fanEl.getBoundingClientRect();
      const parentRect = fanEl.parentElement.getBoundingClientRect();

      let startX = fanEl.offsetLeft + fanEl.offsetWidth / 2;
      let startY = fanEl.offsetTop + fanEl.offsetHeight / 2;
      if (isFan1) {
        startX = rect.left - parentRect.left + rect.width / 2;
        startY = rect.top - parentRect.top + rect.height / 2 - 100;
      }

      // const iconSrc = icons[Math.floor(Math.random() * icons.length)];
      const iconTemplate =
        iconImages[Math.floor(Math.random() * iconImages.length)];
      const img = iconTemplate.cloneNode(true) as HTMLImageElement;
      // img.src = iconSrc;
      img.className = styles.flyingIcon;
      img.style.left = `${startX}px`;
      img.style.top = `${startY}px`;

      fanEl.parentElement.appendChild(img);

      let distance = 20 + Math.random() * 100;
      let angle: number;
      if (isFan1) {
        angle = Math.random() * 2 * (Math.PI / 3);
        distance = Math.random() * 100;
      } else {
        angle = (-20 * Math.PI) / 180 + Math.PI + Math.random() * (Math.PI / 3);
      }

      let dx = Math.cos(angle) * distance;
      let dy = -Math.sin(angle) * distance;

      gsap.fromTo(
        img,
        { opacity: 0, scale: 0, x: 0, y: 0 },
        {
          opacity: 1,
          scale: 1,
          x: dx,
          y: dy,
          duration: 2,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(img, {
              opacity: 0,
              duration: 0.5,
              onComplete: () => img.remove(),
            });
          },
        }
      );
    };

    // const spawnIcon2 = (fanSelector: string, isFan1: boolean) => {
    //   const fanEl = document.querySelector(fanSelector) as HTMLElement | null;
    //   if (!fanEl || !fanEl.parentElement) return;

    //   const rect = fanEl.getBoundingClientRect();
    //   const parentRect = fanEl.parentElement.getBoundingClientRect();

    //   const startX = rect.left - parentRect.left + rect.width / 2;
    //   const startY = rect.top - parentRect.top + rect.height / 2 - 100;

    //   // const iconSrc = icons[Math.floor(Math.random() * icons.length)];
    //   // const img = document.createElement("img");
    //   // img.src = iconSrc;
    //   const iconTemplate =
    //     iconImages[Math.floor(Math.random() * iconImages.length)];
    //   const img = iconTemplate.cloneNode(true) as HTMLImageElement;
    //   img.className = styles.flyingIcon;
    //   img.style.left = `${startX}px`;
    //   img.style.top = `${startY}px`;

    //   fanEl.parentElement.appendChild(img);

    //   let angle: number;
    //   if (isFan1) {
    //     angle = Math.random() * 2 * (Math.PI / 3);
    //   } else {
    //     angle = Math.PI + Math.random() * 2 * (Math.PI / 3);
    //   }

    //   const distance = Math.random() * 100;
    //   const dx = Math.cos(angle) * distance;
    //   const dy = -Math.sin(angle) * distance;

    //   gsap.fromTo(
    //     img,
    //     { opacity: 0, scale: 0, x: 0, y: 0 },
    //     {
    //       opacity: 1,
    //       scale: 1,
    //       x: dx,
    //       y: dy,
    //       duration: 2,
    //       ease: "power2.out",
    //       onComplete: () => {
    //         gsap.to(img, {
    //           opacity: 0,
    //           duration: 0.5,
    //           onComplete: () => img.remove(),
    //         });
    //       },
    //     }
    //   );
    // };

    const spawnFromCorner = (
      corner: "top-left" | "top-right" | "bottom-left" | "bottom-right"
    ) => {
      const container = document.querySelector(
        `.${styles.vid}`
      ) as HTMLElement | null;
      if (!container) return;

      // const iconSrc = icons[Math.floor(Math.random() * icons.length)];
      // const img = document.createElement("img");
      // img.src = iconSrc;
      const iconTemplate =
        iconImages[Math.floor(Math.random() * iconImages.length)];
      const img = iconTemplate.cloneNode(true) as HTMLImageElement;
      img.className = styles.flyingIcon;

      // Set start position
      let startX = 0,
        startY = 0;
      const padding = 10;

      switch (corner) {
        // case "top-left":
        //   startX = padding;
        //   startY = padding;
        //   break;
        case "top-right":
          startX = container.clientWidth - padding;
          startY = padding;
          break;
        case "bottom-left":
          startX = padding;
          startY = container.clientHeight - padding;
          break;
        // case "bottom-right":
        //   startX = container.clientWidth - padding -40;
        //   startY = container.clientHeight - padding - 40;
        //   break;
      }

      img.style.left = `${startX}px`;
      img.style.top = `${startY}px`;

      container.appendChild(img);

      // Move towards center
      const centerX = container.clientWidth / 2;
      const centerY = container.clientHeight / 2;

      const dx = ((centerX - startX) * Math.random()) / 4;
      const dy = ((centerY - startY) * Math.random()) / 2;

      gsap.fromTo(
        img,
        { opacity: 0, scale: 0, x: 0, y: 0 },
        {
          opacity: 1,
          scale: 1,
          x: -dx,
          y: -dy,
          duration: 2,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(img, {
              opacity: 0,
              duration: 0.5,
              onComplete: () => img.remove(),
            });
          },
        }
      );
    };

    const spawnFromCorner2 = (corner: "top-right" | "bottom-left") => {
      const container = document.querySelector(
        `.${styles.theme}`
      ) as HTMLElement | null;
      if (!container) return;

      // const iconSrc = icons[Math.floor(Math.random() * icons.length)];
      // const img = document.createElement("img");
      // img.src = iconSrc;
      const iconTemplate =
        iconImages[Math.floor(Math.random() * iconImages.length)];
      const img = iconTemplate.cloneNode(true) as HTMLImageElement;
      img.className = styles.flyingIcon;

      // Set start position
      let startX = 0,
        startY = 0;
      const padding = 0;

      switch (corner) {
        case "top-right":
          startX = container.clientWidth - padding - 25;
          startY = padding - 30;
          break;
        case "bottom-left":
          startX = padding - 20;
          startY = container.clientHeight - padding - 15;
          break;
      }

      img.style.left = `${startX}px`;
      img.style.top = `${startY}px`;

      container.appendChild(img);

      const centerX = container.clientWidth / 2;
      const centerY = container.clientHeight / 2;

      const dx = ((centerX - startX) * Math.random()) / 4;
      const dy = ((centerY - startY) * Math.random()) / 2;

      gsap.fromTo(
        img,
        { opacity: 0, scale: 0, x: 0, y: 0 },
        {
          opacity: 1,
          scale: 0.5,
          x: -dx,
          y: -dy,
          duration: 2,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(img, {
              opacity: 0,
              duration: 0.5,
              onComplete: () => img.remove(),
            });
          },
        }
      );
    };
    let intervalId: number;

    const startSpawning = () => {
      intervalId = window.setInterval(
        () => {
          const corners2 = ["top-right", "bottom-left"];
          const randomCorner2 = corners2[
            Math.floor(Math.random() * corners2.length)
          ] as any;
          spawnFromCorner2(randomCorner2);
          if (isMobile) {
            const corners = ["top-right", "bottom-left"];
            const randomCorner = corners[
              Math.floor(Math.random() * corners.length)
            ] as any;
            spawnFromCorner(randomCorner);
          } else {
            spawnIcon(`.${styles.fan1}`, true);
            spawnIcon(`.${styles.fan2}`, false);
          }
        },
        isMobile ? 700 : 500
      );
    };

    const stopSpawning = () => {
      if (intervalId) window.clearInterval(intervalId);
    };

    const handleVisibility = () => {
      if (document.hidden) stopSpawning();
      else startSpawning();
    };

    document.addEventListener("visibilitychange", handleVisibility);
    startSpawning();

    return () => {
      stopSpawning();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 1200px) and (max-aspect-ratio: 0.75) ")
      .matches
  );

  useEffect(() => {
    const handleResize = () =>
      setIsMobile(
        window.matchMedia("(max-width: 1200px) and (max-aspect-ratio: 0.75) ")
          .matches
      );

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={styles.AboutContainer}
      ref={AboutRef}
      style={{
        backgroundImage: `url("${isMobile ? aboutPageBGMobile : aboutPageBG}")`,
      }}
    >
      {/* <Navbar hideHam variant="about" /> */}

      <div className={styles.header}>
        <img src={isMobile ? Reg : Header} alt="About Us" />
      </div>

      <div className={styles.content3D}>
        <div className={styles.wrapper}>
          <button onClick={prevVideo} className={styles.arr}>
            <img
              src={nextarr}
              className={styles.prevarr}
              width="100%"
              alt="Next Arrow"
            ></img>
          </button>
          <div className={styles.vid}>
            <div
              onClick={togglePlayPause}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "16px",
                zIndex: "20",
              }}
            >
              <div
                ref={playerContainerRef}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "16px",
                  pointerEvents: "none",
                }}
              />
            </div>

            <img src={fan} alt="fan1" ref={fan1Ref} className={styles.fan1} />
            <img src={fan} alt="fan2" ref={fan2Ref} className={styles.fan2} />
          </div>

          <button onClick={nextVideo} className={styles.arr}>
            <img
              src={nextarr}
              className={styles.nextarr}
              width="100%"
              alt="Next Arrow"
            ></img>
          </button>

          <div></div>

          {/* CONTROLS */}
          <div className={styles.controls}>
            <div className={styles.a1}></div>
            <div className={styles.buttonContainer}>
              <img
                src={PlayButton}
                className={styles.background}
                alt="Buttons"
              />
              <div className={styles.buttonGroup}>
                <button onClick={prevVideo}>
                  <img
                    src={prev}
                    alt="Previous Button"
                    className={styles.btns1}
                  />
                </button>
                <div className={styles.a1}></div>
                <button onClick={togglePlayPause}>
                  <img
                    src={isPlaying ? play : pause}
                    alt="Pause Button"
                    className={styles.btns2}
                  />
                </button>
                <div className={styles.a1}></div>
                <button onClick={nextVideo}>
                  <img src={next} alt="Next Button" className={styles.btns3} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ABOUT SIDE */}
        <div className={styles.abt}>
          <div
            className={styles.aboutback}
            style={{
              backgroundImage: isMobile ? "none" : `url("${aboutTextBG}")`,
            }}
          >
            <p>
              Oasis, the annual cultural extravaganza of Birla Institute of
              Technology and Science, Pilani, has been a vibrant part of India's
              cultural tapestry since 1971. Managed entirely by students, it's a
              dazzling showcase of talent in Dance, Drama, Literature, Comedy,
              Fashion, and Music. It's where dreams come alive, laughter fills
              the air, and creativity knows no bounds. Step into the world of
              Oasis, where youth's boundless potential shines.
            </p>
          </div>
          <div className={styles.abtus}>
            <img src={abtus} alt="ABOUT US" />
            <h3>ABOUT US</h3>
          </div>
        </div>
      </div>
      {/* <button className={styles.theme} onClick={() => { }}>
        <h3>ABOUT THEME</h3>
      </button> */}
      <div className={styles.social}>
        <a href="https://www.linkedin.com/company/oasis24-bits-pilani/">
          <img src={linkedin} alt="Linkedin" />
        </a>
        <a href="https://www.youtube.com/@oasisbitspilani6375">
          <img src={yticon} alt="Youtube" />
        </a>
        <a href="https://twitter.com/bitsoasis">
          <img src={xicon} alt="Twitter" />
        </a>
        <a href="https://www.instagram.com/bitsoasis">
          <img src={instaicon} alt="Instagram" />
        </a>
      </div>
      {isBackBtn && <BackButton className={styles.aboutBB} />}
    </div>
  );
};

export default AboutUs;
