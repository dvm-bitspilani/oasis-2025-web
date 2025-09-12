import Back from "/images/events/backg.png";
import styles from "./Eventspage.module.scss";
import cl1 from "/svgs/events/cl1.svg";
import cl2 from "/svgs/events/cl2.svg";
import topright from "/svgs/events/topright.svg";
import BackButton from "../../components/backButton/BackButton";
import down from "/images/events/down.jpg";
import gsap from "gsap";
import { useEffect } from "react";

const Eventspage = () => {
  const icons = [
    "/svgs/events/star.svg",
    "/svgs/events/star2.svg",
  ];

  const iconImages: HTMLImageElement[] = icons.map((src) => {
    const img = new Image();
    img.src = src;
    img.alt = "Letters";
    return img;
  });

  useEffect(() => {
    const container = document.querySelector(`.${styles.page}`) as HTMLElement | null;
    if (!container) return;

    const spawnFromCorner = (
      corner: "top-left" | "top-right" | "bottom-left" | "bottom-right"
    ) => {
      // Pick a random icon image and clone it
      const iconTemplate =
        iconImages[Math.floor(Math.random() * iconImages.length)];
      const img = iconTemplate.cloneNode(true) as HTMLImageElement;
      img.className = styles.flyingIcon;
      
      // Set start position with padding
      let startX = 0,
        startY = 0;
      const padding = 10;

      switch (corner) {
        case "top-right":
          startX = container.clientWidth ;
          startY = padding;
          break;
        case "bottom-left":
          startX = padding;
          startY = container.clientHeight;
          break;
        // Add other corners if needed
      }

      // Set initial position via CSS left/top
      img.style.position = "absolute";
      img.style.left = `${startX}px`;
      img.style.top = `${startY}px`;

      container.appendChild(img);

      // Calculate distance to center
      const centerX = container.clientWidth / 2;
      const centerY = container.clientHeight / 2;

      const dx = (centerX - startX)*Math.random()/4;
      const dy = (centerY - startY)*Math.random()/5;

      // Animate from 0 to dx, dy with scale and opacity
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
              duration: 3,
              onComplete: () => img.remove(),
            });
          },
        }
      );
    };

    let intervalId: number;

    const startSpawning = () => {
      intervalId = window.setInterval(() => {
        const corners = ["top-right", "bottom-left"];
        const randomCorner = corners[
          Math.floor(Math.random() * corners.length)
        ] as "top-right" | "bottom-left";
        spawnFromCorner(randomCorner);
      }, 400);
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

  return (
    <div>
      <div className={styles.page} style={{ backgroundImage: `url("${Back}")` }}>
        <img src={cl1} alt="" className={styles.cl1} />
        <img src={cl2} alt="" className={styles.cl2} />
        <img src={topright} alt="" className={styles.bar1} />
        <img src={topright} alt="" className={styles.bar2} />
        <div>
          <BackButton className={styles.aboutBB} />
        </div>
        <div className={styles.evntcontainer}>
          <div className={styles.leftevent}>
            <img src={down} alt="" className={styles.imagenew} />
            <p>Madhur Jain</p>
          </div>
          <div className={styles.rightevent}>
            <h4>TRAVEL AND LIVING QUIZ</h4>
            <p>
              Oasis, the annual cultural extravaganza of Birla Institute of Technology and Science,
              Pilani, has been a vibrant part of India's cultural tapestry since 1971. Managed
              entirely by students, it's a dazzling showcase of talent in and Music. It's where
              dreams come alive, laughter fills the air, and creativity knows no bounds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eventspage;
