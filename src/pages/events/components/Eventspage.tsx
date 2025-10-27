import Back from "/images/events/backg.png";
import MobileBack from "/images/events/evenback.png";
import styles from "./Eventspage.module.scss";
import cl1 from "/svgs/events/cl1.svg";
import cl2 from "/svgs/events/cl2.svg";
import topright from "/svgs/events/topright.svg";
import BackButton from "../../components/backButton/BackButton";
import gsap from "gsap";
import { useEffect, useState } from "react";
import Right from "/svgs/events/Next1.svg";
import { motion, AnimatePresence } from "framer-motion";
import Star from "/svgs/events/star.svg";
import Star2 from "/svgs/events/star.svg";

interface EventspageProps {
  category: string;
}

const Eventspage: React.FC<EventspageProps> = ({ category }) => {
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 1200px) and (max-aspect-ratio: 1.45)")
      .matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(max-width: 1200px) and (max-aspect-ratio: 1.45)"
    );

    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  const icons = [Star, Star2];
  const [events, setEvents] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  // category alias mapping
  const categoryAliases: Record<string, string[]> = {
    drama: ["drama", "drama & theatre", "drama and theatre"],
    music: ["music"],
    misc: ["misc", "fashion"],
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(
          "https://bits-oasis.org/2025/main/registrations/web_events/"
        );
        const data = await res.json();

        const normalizedCategory = category.toLowerCase();
        const validCategories = categoryAliases[normalizedCategory] || [
          normalizedCategory,
        ];

        const matchedCats = data.data.filter((cat: any) =>
          validCategories.includes(cat.category_name.toLowerCase())
        );

        const allEvents = matchedCats.flatMap((cat: any) => cat.events);

        setEvents(allEvents);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, [category]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      events.length > 0 ? (prevIndex + 1) % events.length : 0
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      events.length > 0 ? (prevIndex - 1 + events.length) % events.length : 0
    );
  };

  useEffect(() => {
    const container = document.querySelector(
      `.${styles.page}`
    ) as HTMLElement | null;
    if (!container) return;

    const spawnFromCorner = (corner: "top-right" | "bottom-left") => {
      const iconTemplate = new Image();
      iconTemplate.src = icons[Math.floor(Math.random() * icons.length)];
      const img = iconTemplate.cloneNode(true) as HTMLImageElement;
      img.className = styles.flyingIcon;
      img.alt = "Stars";

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
        style={{
          backgroundImage: `url("${isMobile ? MobileBack : Back}")`,
        }}
      >
        <img src={cl1} alt="Clouds" className={styles.cl1} />
        <img src={cl2} alt="Clouds" className={styles.cl2} />
        <img src={topright} alt="Borders" className={styles.bar1} />
        <img src={topright} alt="Borders" className={styles.bar2} />
        <BackButton
          className={styles.aboutBB}
          onClick={() => window.location.reload()}
        />

        <div className={styles.evntcontainer}>
          {isMobile ? (
            //  Mobile Layout
            <div className={styles.mobileEvents}>
              <AnimatePresence mode="wait">
                {events.length > 0 ? (
                  <div className={styles.mobileCard}>
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={styles.mobileContent}>
                        <h4>{events[currentIndex].name}</h4>
                        <p className={styles.club}>
                          {events[currentIndex].club_name}
                        </p>
                        <div className={styles.mobilevenue}>
                          <img src="/svgs/events/location.svg" alt="" />
                        <p>
                          {events[currentIndex].venue}
                        </p>
                        </div>
                      </div>

                      <img
                        src={
                          events[currentIndex].image_url ||
                          "/images/events/down.jpg"
                        }
                        alt={events[currentIndex].name}
                        className={styles.mobileImage}
                      />

                      <div className={styles.eventdesc}>
                        <p>{events[currentIndex].description}</p>
                      </div>
                    </motion.div>
                    <div className={styles.controls2}>
                      <div className={styles.left2} onClick={handlePrev}>
                        <img src={Right} alt="Prev" className={styles.prev} />
                      </div>
                      <div className={styles.right2} onClick={handleNext}>
                        <img src={Right} alt="Next" className={styles.next} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className={styles.loading}>
                    {`No events found in "${category}"`}
                  </p>
                )}
              </AnimatePresence>
            </div>
          ) : (
            //  Desktop Layout
            <AnimatePresence mode="wait">
              {events.length > 0 ? (
                <div className={styles.eventdesktop}>
                  <motion.div
                    className={styles.eventContentWrapper}
                    key={currentIndex}
                    initial={{ opacity: 0, x: 150 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -150 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <div className={styles.leftevent}>
                      <img
                        src={
                          events[currentIndex].image_url ||
                          "/images/events/down.jpg"
                        }
                        alt={events[currentIndex].name}
                        className={styles.imagenew}
                      />
                     <div className={styles.venname}>
                       <p>{events[currentIndex].club_name}</p>
                       <div className={styles.venue}>
                        <img src="/svgs/events/location.svg" alt="" />
                      <p>{events[currentIndex].venue}
                      </p> 
                      </div>
                     </div>
                    </div>

                    <div className={styles.rightevent}>
                      <h4>{events[currentIndex].name}</h4>
                      <p>{events[currentIndex].description}</p>
                     
                    </div>
                  </motion.div>
                  <div className={styles.controls}>
                    <div className={styles.left} onClick={handlePrev}>
                      <img src={Right} alt="Prev" className={styles.prev} />
                    </div>
                    <div className={styles.right} onClick={handleNext}>
                      <img src={Right} alt="Next" className={styles.next} />
                    </div>
                  </div>
                </div>
              ) : (
                <p className={styles.loading}>
                  {`No events found in "${category}"`}
                </p>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

export default Eventspage;
