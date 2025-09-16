import Back from "/images/events/backg.png";
import styles from "./Eventspage.module.scss";
import cl1 from "/svgs/events/cl1.svg";
import cl2 from "/svgs/events/cl2.svg";
import topright from "/svgs/events/topright.svg";
import BackButton from "../../components/backButton/BackButton";
import down from "/images/events/down.jpg";
import gsap from "gsap";
import { useEffect, useState } from "react";
import Right from "/svgs/events/Next1.svg";
import { motion, AnimatePresence } from "framer-motion";

const Eventspage = () => {
  const icons = ["/svgs/events/star.svg", "/svgs/events/star2.svg"];
  const events = [
    {
      image: down,
      author: "Madhur Jain",
      title: "TRAVEL AND LIVING QUIZ",
      description: `
      Oasis, the annual cultural extravaganza of Birla Institute of Technology and Science,
      Pilani, has been a vibrant part of India's cultural tapestry since 1971. Managed
      entirely by students, it's a dazzling showcase of talent in and Music. It's where
      dreams come alive, laughter fills the air, and creativity knows no bounds.
    `,
    },
    {
      image: down,
      author: "Madhur Jain",
      title: "TRAVEL AND LIVING QUIZ",
      description: `
      Oasis, the annual cultural extravaganza of Birla Institute of Technology and Science,
      Pilani, has been a vibrant part of India's cultural tapestry since 1971. Managed
      entirely by students, it's a dazzling showcase of talent in and Music. It's where
      dreams come alive, laughter fills the air, and creativity knows no bounds.
    `,
    },
    {
      image: down,
      author: "Madhur Jain",
      title: "TRAVEL AND LIVING QUIZ",
      description: `
      Oasis, the annual cultural extravaganza of Birla Institute of Technology and Science,
      Pilani, has been a vibrant part of India's cultural tapestry since 1971. Managed
      entirely by students, it's a dazzling showcase of talent in and Music. It's where
      dreams come alive, laughter fills the air, and creativity knows no bounds.
    `,
    },
  ];

  const iconImages: HTMLImageElement[] = icons.map((src) => {
    const img = new Image();
    img.src = src;
    img.alt = "Letters";
    return img;
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + events.length) % events.length
    );
  };

  useEffect(() => {
    const container = document.querySelector(
      `.${styles.page}`
    ) as HTMLElement | null;
    if (!container) return;

    const spawnFromCorner = (
      corner: "top-left" | "top-right" | "bottom-left" | "bottom-right"
    ) => {
      const iconTemplate =
        iconImages[Math.floor(Math.random() * iconImages.length)];
      const img = iconTemplate.cloneNode(true) as HTMLImageElement;
      img.className = styles.flyingIcon;

      let startX = 0,
        startY = 0;
      const padding = 10;

      switch (corner) {
        case "top-right":
          startX = container.clientWidth;
          startY = padding;
          break;
        case "bottom-left":
          startX = padding;
          startY = container.clientHeight;
          break;
      }

      img.style.position = "absolute";
      img.style.left = `${startX}px`;
      img.style.top = `${startY}px`;

      container.appendChild(img);

      const centerX = container.clientWidth / 2;
      const centerY = container.clientHeight / 2;

      const dx = ((centerX - startX) * Math.random()) / 1.25;
      const dy = ((centerY - startY) * Math.random()) / 2;

      gsap.fromTo(
        img,
        { opacity: 1, scale: 1, x: 0, y: 0 },
        {
          opacity: 0,
          scale: Math.random(),
          x: dx,
          y: dy,
          duration: 4,
          ease: "linear",
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
        // const corners = ["top-right", "bottom-left"];
        // const randomCorner = corners[
        //   Math.floor(Math.random() * corners.length)
        // ] as "top-right" | "bottom-left";
        spawnFromCorner("top-right");
        spawnFromCorner("bottom-left");
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
      <div
        className={styles.page}
        style={{ backgroundImage: `url("${Back}")` }}
      >
        <img src={cl1} alt="Clouds" className={styles.cl1} />
        <img src={cl2} alt="Clouds" className={styles.cl2} />
        <img src={topright} alt="Borders" className={styles.bar1} />
        <img src={topright} alt="Borders" className={styles.bar2} />
        <div>
          <BackButton className={styles.aboutBB} />
        </div>
        <div className={styles.evntcontainer}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 150, rotate: 0 }}
              animate={{
                opacity: 1,
                x: 0,
                // scale:[0,1],
                // rotateX: [90,0],
                // rotateZ: [180,0],
                // scale:[1,2,1],
                // rotate from 0 to 20 degrees during animation
              }}
              exit={{
                opacity: 0,
                x: -150,
                //  scale:0
                // rotateX:90, rotateZ:180, scale:[1,2,1]
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className={styles.eventContentWrapper}
            >
              <div className={styles.leftevent}>
                <img
                  src={events[currentIndex].image}
                  alt="Event"
                  className={styles.imagenew}
                />
                <p>{events[currentIndex].author}</p>
              </div>

              <div className={styles.rightevent}>
                <h4>{events[currentIndex].title}</h4>
                <p>{events[currentIndex].description}</p>
                <div className={styles.controls}>
                  <div className={styles.left} onClick={handlePrev}>
                    <img src={Right} alt="Prev" className={styles.prev} />
                  </div>
                  <div className={styles.right} onClick={handleNext}>
                    <img src={Right} alt="Next" className={styles.next} />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Eventspage;
