import styles from "./Events.module.scss";
import EventBack from "/svgs/events/eventsback.svg";
import Text from "/images/events/text.png";
import dance from "/images/events/dance.png";
import music from "/images/events/music.png";
import misc from "/images/events/misc.png";
import photography from "/images/events/photography.png";
import quizzes from "/images/events/quizzes.png";
import danceMobile from "/images/events/DanceMobile.png";
import musicMobile from "/images/events/MusicMobile.png";
import miscMobile from "/images/events/MiscMobile.png";
import photographyMobile from "/images/events/PhotographyMobile.png";
import quizzesMobile from "/images/events/QuizzesMobile.png";
import Eventspage from "./components/Eventspage";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import TextMobile from "/images/events/TextMobile.png";
import BackButton from "../components/backButton/BackButton";
interface FanImage {
  src: string;
  mobileSrc?: string;
  alt: string;
  className: string;
}


const fanImages: FanImage[] = [
  {
    src: quizzes,
    mobileSrc: quizzesMobile,
    alt: "Quizzes",
    className: styles.quizzes,
  },
  { src: music, mobileSrc: musicMobile, alt: "Music", className: styles.music },
  {
    src: photography,
    mobileSrc: photographyMobile,
    alt: "Photography",
    className: styles.photography,
  },
  { src: dance, mobileSrc: danceMobile, alt: "Dance", className: styles.dance },
  { src: misc, mobileSrc: miscMobile, alt: "Misc", className: styles.misc },
];
// const speed = 500; // constant speed in pixels/second
// delay factor per degree

const rotationAngles = [-78, -90, -102, -114, -126];
// const rotationAngles = [-80, -92, -103, -114, -126];
// const rotationAngles = [-72, -92, -103, -114, -134];
// const rotationAngles = [-72, -92, -103, -112, -134];

// const fanImages: FanImage[] = [
//   { src: quizzes, alt: "Quizzes", className: styles.quizzes },
//   { src: music, alt: "Music", className: styles.music },
//   { src: photography, alt: "Photography", className: styles.photography },
//   { src: dance, alt: "Dance", className: styles.dance },
//   { src: misc, alt: "Misc", className: styles.misc },
// ];

const Events: React.FC = () => {
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 1200px) and (max-aspect-ratio: 1.45)")
      .matches
  );
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;


  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(max-width: 1200px) and (max-aspect-ratio: 1.45)"
    );

    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const [showImages, setShowImages] = useState(true);
  const [showEventPage, setShowEventPage] = useState(false);
  const [foldFan, setFoldFan] = useState(false);
  // const [origins, setOrigins] = useState<{ x: number; y: number }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [durations, setDurations] = useState<number[]>([]);
  const [delays, setDelays] = useState<number[]>([]);

  const EventRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
useEffect(() => {
  if (!canHover) return; // skip for mobile/touch

  imageRefs.current.forEach((img) => {
    if (!img) return;

    const hoverTween = gsap.to(img, {
      scale: 1.05,
      paused: true,
      duration: 0.2,
      ease: "power1.out",
      //  filter: "saturate(1.5)",
    });

    img.addEventListener("mouseenter", () => hoverTween.play());
    // img.addEventListener("mouseleave", () => hoverTween.reverse());
  });

  // Cleanup
  return () => {
    imageRefs.current.forEach((img) => {
      if (!img) return;
      img.removeEventListener("mouseenter", () => {});
      img.removeEventListener("mouseleave", () => {});
    });
  };
}, []);

  useEffect(() => {
    const radius = isMobile ? window.innerHeight / 2 : window.innerWidth / 2;

    const delayAngleFactor = isMobile ? 0.0016 : 0.01505;
    const speed = isMobile ? 800 : 1000;
    const computedDurations = rotationAngles.map((angle) => {
      const angleRad = Math.abs((angle * Math.PI) / 180);
      const arcLength = angleRad * radius;
      return arcLength / speed;
    });

    setDurations(computedDurations);

    const angleDiffs = rotationAngles.map((angle) =>
      Math.abs(angle - rotationAngles[0])
    );
    const maxDiff = Math.max(...angleDiffs);
    const computedDelays = angleDiffs.map(
      (diff) => (maxDiff - diff) * delayAngleFactor
    );

    setDelays(computedDelays);
  }, []);

  const handleImageClick = (alt: string) => {
  setSelectedCategory(alt);
  setFoldFan(true);
  setShowEventPage(true);
  setTimeout(() => {
    setShowImages(false);
  }, 1500);

  const mm = gsap.matchMedia();

  // MOBILE
  mm.add("(max-width: 1200px) and (max-aspect-ratio: 1.45)", () => {
    const mobileOrder = [1, 0, 4, 3, 2];

    requestAnimationFrame(() => {
      mobileOrder.forEach((originalIndex, orderIndex) => {
        const imgEl = imageRefs.current[originalIndex];
        if (!imgEl) return;

        const origin = (() => {
          const rect = imgEl.getBoundingClientRect();
          const rec = EventRef.current?.getBoundingClientRect();
          if (!rec) return { x: 0, y: 0 };
          return {
            x: rec.left - rect.left,
            y: rec.top + rec.height / 2 - rect.top,
          };
        })();

        //  reset transforms before animation
        gsap.killTweensOf(imgEl);
        gsap.set(imgEl, { scale: 1 });
        imgEl.style.transformOrigin = `${origin.x}px ${origin.y}px`;

        gsap.to(imgEl, {
          rotate: rotationAngles[orderIndex],
          duration: durations[orderIndex],
          delay: delays[orderIndex],
          ease: "linear",
          zIndex: alt === fanImages[originalIndex].alt ? 5 : 2, // clicked image on top
        });
      });
    });
  });

  // DESKTOP
  mm.add("(min-width: 1201px), (min-aspect-ratio: 1.46)", () => {
    requestAnimationFrame(() => {
      fanImages.forEach((_, i) => {
        const imgEl = imageRefs.current[i];
        if (!imgEl) return;

        const origin = (() => {
          const rect = imgEl.getBoundingClientRect();
          const rec = EventRef.current?.getBoundingClientRect();
          if (!rec) return { x: 0, y: 0 };
          return {
            x: rec.left + rec.width / 2 - rect.left,
            y: rec.bottom - rect.top,
          };
        })();

        gsap.killTweensOf(imgEl);
        gsap.set(imgEl, { scale: 1 });
        imgEl.style.transformOrigin = `${origin.x}px ${origin.y}px`;

        gsap.to(imgEl, {
          rotate: rotationAngles[i],
          duration: durations[i],
          delay: delays[i],
          ease: "linear",
          zIndex: 2,
        });
      });
    });
  });
};


  return (
    <div
      className={styles.eventsmaincontainer}
      ref={EventRef}
      style={{ backgroundImage: `url("${EventBack}")` }}
    >
      <div>
        <BackButton className={styles.aboutBB} />
      </div>
      {/* <img src={Text} alt="Text" className={styles.text} /> */}

      {showImages && (
        <div className={styles.eventscontainer}>
          {fanImages.map((img, i) => {
            return (
              <img
                key={i}
                src={isMobile && img.mobileSrc ? img.mobileSrc : img.src}
                alt={img.alt}
                ref={(el) => {
                  imageRefs.current[i] = el;
                }}
                className={`${img.className} ${
                  foldFan ? `${styles.fold} ${styles.folding}` : ""
                }`}
                onClick={() => handleImageClick(img.alt)}
              />
            );
          })}
          <img
            src={isMobile ? TextMobile : Text}
            alt="Text"
            className={styles.text}
          />
        </div>
      )}

      {showEventPage && selectedCategory && (
        <div className={styles.eventspageWrapper}>
          <Eventspage category={selectedCategory} />
        </div>
      )}
    </div>
  );
};

export default Events;
