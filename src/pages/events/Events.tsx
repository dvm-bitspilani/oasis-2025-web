import styles from "./Events.module.scss";
import EventBack from "/svgs/events/eventsback.svg";
import Text from "/images/events/text.png";
import dance from "/images/events/dance.png";
import music from "/images/events/music.png";
import misc from "/images/events/misc.png";
import photography from "/images/events/photography.png";
import quizzes from "/images/events/quizzes.png";
import Eventspage from "./components/Eventspage";
import { useRef, useState } from "react";

interface FanImage {
  src: string;
  alt: string;
  className: string;
}

const rotationAngles = [0, -25, -70, -115, -160];

const fanImages: FanImage[] = [
  { src: quizzes, alt: "Quizzes", className: styles.quizzes },
  { src: music, alt: "Music", className: styles.music },
  { src: photography, alt: "Photography", className: styles.photography },
  { src: dance, alt: "Dance", className: styles.dance },
  { src: misc, alt: "Misc", className: styles.misc },
];

const Events: React.FC = () => {
  const [showImages, setShowImages] = useState(true);
  const [showEventPage, setShowEventPage] = useState(false);
  const [foldFan, setFoldFan] = useState(false);
  const [origins, setOrigins] = useState<{ x: number; y: number }[]>([]);

  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  const handleImageClick = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const bottomCenter = { x: viewportWidth / 2, y: viewportHeight };
    console.log(bottomCenter);

    // calculate vector from image center to bottom center
    const newOrigins = fanImages.map((_, i) => {
      const imgEl = imageRefs.current[i];
      if (!imgEl) return { x: 0, y: 0 };

      const rect = imgEl.getBoundingClientRect();
      const imgCenterX = rect.left + rect.width / 2;
      const imgCenterY = rect.top + rect.height / 2;

      const offsetX = bottomCenter.x - imgCenterX;
      const offsetY = bottomCenter.y - imgCenterY;

      return { x: offsetX, y: offsetY };
    });

    setOrigins(newOrigins);
    setFoldFan(true);

    setShowEventPage(true);
    setTimeout(() => setShowImages(false), 1500);
  };
  const durations = [0, 0.3, 0.6, 0.9, 1.2];

  return (
    <div
      className={styles.eventsmaincontainer}
      style={{ backgroundImage: `url("${EventBack}")` }}
    >
      <img src={Text} alt="Text" className={styles.text} />

      {showImages && (
        <div className={styles.eventscontainer}>
          {fanImages.map((img, i) => {
            const delay = (fanImages.length - 1 - i) * 0.3;
            const origin = origins[i] || { x: 0, y: 0 };
            const angle = rotationAngles[i];

            return (
              <img
                key={i}
                src={img.src}
                alt={img.alt}
                ref={(el) => {
                  imageRefs.current[i] = el;
                }}
                className={`${img.className} ${
                  foldFan ? `${styles.fold} ${styles.folding}` : ""
                }`}
                style={{
                  transition: foldFan
                    ? `transform ${durations[i]}s linear ${delay}s`
                    : `transform 0.1s ease 0s`,
                  zIndex: foldFan ? "2" : "none",
                  scale: foldFan ? "1" : "1",
                  // transitionDelay: foldFan ? `${delay}s` : "0s",
                  transform: foldFan
                    ? `translate3d(${origin.x}px, ${
                        origin.y
                      }px, 0) rotate(${angle}deg) translate3d(${-origin.x}px, ${-origin.y}px, 0) `
                    : "none",
                }}
                onClick={handleImageClick}
              />
            );
          })}
        </div>
      )}

      {showEventPage && (
        <div className={styles.eventspageWrapper}>
          <Eventspage />
        </div>
      )}
    </div>
  );
};

export default Events;
