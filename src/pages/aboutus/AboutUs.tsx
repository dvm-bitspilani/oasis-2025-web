import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./AboutUs.module.scss";
import Header from "/svgs/aboutus/header.svg";
import fan from "/svgs/aboutus/fan.png";
import prev from "/svgs/aboutus/prev.svg";
import pause from "/svgs/aboutus/pause.svg";
import next from "/svgs/aboutus/next.svg";
import Aboutbar from "./components/Aboutbar";
import Reg from "/svgs/aboutus/reghead.svg";
import play from "/svgs/aboutus/play.svg";
import nextarr from "/svgs/aboutus/nextarr.svg";
import BackButton from "../components/backButton/BackButton";
declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const icons = [
  "/svgs/aboutus/letter1.svg",
  "/svgs/aboutus/letter2.svg",
  "/svgs/aboutus/letter3.svg",
  "/svgs/aboutus/letter4.svg",
  "/svgs/aboutus/letter5.svg",
  "/svgs/aboutus/letter6.svg",
  "/svgs/aboutus/letter7.svg",
  "/svgs/aboutus/letter8.svg",
];

const videos = ["Ogio7ZJSb9g", "5MtkggVC0w0", "krsrGOqnAN0"];

const AboutUs = ({ goToPage }: { goToPage: (path: string) => void }) => {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const playerContainerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<any>(null);
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
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = () => initPlayer();
    }

    return () => {
      try {
        if (playerRef.current?.destroy) playerRef.current.destroy();
      } catch {}
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

  useEffect(() => {
    gsap.set(`.${styles.fan2}`, { xPercent: 100, yPercent: -100, rotate: 180 });
  }, []);

  useEffect(() => {
    gsap.to(`.${styles.fan1}`, {
      rotateX: -5,
      rotateY: -5,
      duration: 0.5,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
    });

    gsap.to(`.${styles.fan2}`, {
      rotateX: -5,
      rotateY: -5,
      duration: 0.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    const spawnIcon = (fanSelector: string, isFan1: boolean) => {
      const fanEl = document.querySelector(fanSelector) as HTMLElement | null;
      if (!fanEl || !fanEl.parentElement) return;

      //const rect = fanEl.getBoundingClientRect();
      //const parentRect = fanEl.parentElement.getBoundingClientRect();

      const startX = fanEl.offsetLeft + fanEl.offsetWidth / 2;
      const startY = fanEl.offsetTop + fanEl.offsetHeight / 2;

      const iconSrc = icons[Math.floor(Math.random() * icons.length)];
      const img = document.createElement("img");
      img.src = iconSrc;
      img.className = styles.flyingIcon;
      img.style.left = `${startX}px`;
      img.style.top = `${startY}px`;

      fanEl.parentElement.appendChild(img);

      let angle: number;
      if (isFan1) {
        angle = Math.random() * (Math.PI / 2);
      } else {
        angle =
          (-40 * Math.PI) / 180 + Math.PI + Math.random() * 2 * (Math.PI / 3);
      }

      const distance = 20 + Math.random() * 100;
      const dx = Math.cos(angle) * distance;
      const dy = -Math.sin(angle) * distance;

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

    const spawnIcon2 = (fanSelector: string, isFan1: boolean) => {
      const fanEl = document.querySelector(fanSelector) as HTMLElement | null;
      if (!fanEl || !fanEl.parentElement) return;

      const rect = fanEl.getBoundingClientRect();
      const parentRect = fanEl.parentElement.getBoundingClientRect();

      const startX = rect.left - parentRect.left + rect.width / 2;
      const startY = rect.top - parentRect.top + rect.height / 2 - 100;

      const iconSrc = icons[Math.floor(Math.random() * icons.length)];
      const img = document.createElement("img");
      img.src = iconSrc;
      img.className = styles.flyingIcon;
      img.style.left = `${startX}px`;
      img.style.top = `${startY}px`;

      fanEl.parentElement.appendChild(img);

      let angle: number;
      if (isFan1) {
        angle = Math.random() * 2 * (Math.PI / 3);
      } else {
        angle = Math.PI + Math.random() * 2 * (Math.PI / 3);
      }

      const distance = Math.random() * 100;
      const dx = Math.cos(angle) * distance;
      const dy = -Math.sin(angle) * distance;

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

    let intervalId: number;

    const startSpawning = () => {
      intervalId = window.setInterval(() => {
        spawnIcon2(`.${styles.fan1}`, true);
        spawnIcon(`.${styles.fan2}`, false);
      }, 500);
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
  const isMobile = window.matchMedia(
    "(max-width: 1200px) and (max-aspect-ratio: 0.75) "
  ).matches;
  return (
    <div className={styles.AboutContainer}>
      {/* <Aboutbar goToPage={goToPage} /> */}
      <div className={styles.header}>
        <img src={isMobile ? Reg : Header} alt="About Us" />
      </div>

      <div className={styles.content3D}>
        <div className={styles.wrapper}>
          <button onClick={prevVideo} className={styles.arr}>
            <img src={nextarr} className={styles.prevarr} width="100%"></img>
          </button>
          <div className={styles.vid}>
            <div
              ref={playerContainerRef}
              style={{ width: "100%", height: "100%", borderRadius: "16px" }}
            />

            <img src={fan} alt="" className={styles.fan1} />
            <img src={fan} alt="" className={styles.fan2} />
          </div>

          <button onClick={nextVideo} className={styles.arr}>
            <img src={nextarr} className={styles.nextarr} width="100%"></img>
          </button>

          <div></div>

          {/* CONTROLS */}
          <div className={styles.controls}>
            <div className={styles.a1}></div>
            <div className={styles.buttonContainer}>
              <img
                src="/svgs/aboutus/bord.svg"
                className={styles.background}
                alt=""
              />
              <div className={styles.buttonGroup}>
                <button onClick={prevVideo}>
                  <img src={prev} alt="" className={styles.btns1} />
                </button>
                <div className={styles.a1}></div>
                <button onClick={togglePlayPause}>
                  <img
                    src={isPlaying ? play : pause}
                    alt=""
                    className={styles.btns2}
                  />
                </button>
                <div className={styles.a1}></div>
                <button onClick={nextVideo}>
                  <img src={next} alt="" className={styles.btns3} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ABOUT SIDE */}
        <div className={styles.abt}>
          <div className={styles.aboutback}>
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
        </div>
      </div>
      <BackButton className={styles.aboutBB} />
    </div>
  );
};

export default AboutUs;
