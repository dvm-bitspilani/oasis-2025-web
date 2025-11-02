import styles from "./Events.module.scss";
import EventBack from "/svgs/events/eventsback.svg";
import Text from "/images/events/text.png";
import dance from "/images/events/dance.png";
import drama from "/images/events/drama.png";
import dramaMobile from "/images/events/DramaMobile.png";
import music from "/images/events/music.png";
import misc from "/images/events/misc.png";
import photography from "/images/events/photography.png";
// import quizzes from "/images/events/quizzes.png";
import danceMobile from "/images/events/DanceMobile.png";
import musicMobile from "/images/events/MusicMobile.png";
import miscMobile from "/images/events/MiscMobile.png";
import photographyMobile from "/images/events/PhotographyMobile.png";
// import quizzesMobile from "/images/events/QuizzesMobile.png";
import Eventspage from "./components/Eventspage";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import TextMobile from "/images/events/TextMobile.png";
import BackButton from "../components/backButton/BackButton";
import { Helmet } from "react-helmet";
import BreadCrumb from "../components/breadCrumb/BreadCrumb";
interface FanImage {
  src: string;
  mobileSrc?: string;
  alt: string;
  className: string;
}

const fanImages: FanImage[] = [
  {
    src: drama,
    mobileSrc: dramaMobile,
    alt: "Drama & Theatre",
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

const rotationAngles = [-30, -135, -185, -225, -305];
// const rotationAngles = [-30, -75, -120, -165, -215]; final without scales
// const rotationAngles = [-40, -85, -110, -145, -195];
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
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.bits-oasis.org/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Events",
        item: "https://www.bits-oasis.org/events",
      },
    ],
  };
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 1200px) and (max-aspect-ratio: 1.45)")
      .matches
  );
  const canHover = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;

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

  // const [durations, setDurations] = useState<number[]>([]);
  // const [delays, setDelays] = useState<number[]>([]);

  const EventRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  useEffect(() => {
    if (!canHover) return; // skip for mobile/touch

    const cleanups: (() => void)[] = [];

    imageRefs.current.forEach((img) => {
      if (!img) return;

      const hoverTween = gsap.to(img, {
        scale: 1.05,
        filter: "saturate(1.5)",
        duration: 0.2,
        ease: "power1.out",
        paused: true,
        // overwrite: true,
        startAt: { filter: "saturate(1) " }, // initial value
      });

      const onEnter = () => hoverTween.play();
      const onLeave = () => hoverTween.reverse();

      img.addEventListener("mouseenter", onEnter);
      img.addEventListener("mouseleave", onLeave);
      img.addEventListener("click", onLeave);
      // push cleanup for this img
      cleanups.push(() => {
        img.removeEventListener("mouseenter", onEnter);
        img.removeEventListener("mouseleave", onLeave);
      });
    });

    // Cleanup all listeners
    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, [canHover]);

  useEffect(() => {
    // const radius = isMobile ? window.innerHeight / 2 : window.innerWidth / 2;

    // const delayAngleFactor = isMobile ? 0.0016 : 0.01505;
    // const delayAngleFactor = 1000;
    // const speed = isMobile ? 800 : 1000;
    // const time= 2;
    // const computedDurations = rotationAngles.map((angle) => {
    //   // const angleRad = Math.abs((angle * Math.PI) / 180);
    //   // const arcLength = angleRad * radius;
    //   return  time;
    // });

    // setDurations([2,2,2,2,2]);

    // const angleDiffs = rotationAngles.map((angle) =>
    //   Math.abs(angle - rotationAngles[0])
    // );
    // const maxDiff = Math.max(...angleDiffs);
    // const computedDelays = angleDiffs.map(
    //   (diff) => 0
    //   // (diff) => diff + 10000
    // );

    // setDelays([0,0,0,0,0]);
  }, []);

  const handleImageClick = (alt: string) => {
    setSelectedCategory(alt);
    setFoldFan(true);
    imageRefs.current.forEach((img) => {
  if (!img) return;
  gsap.killTweensOf(img);
  img.style.filter = "saturate(1) "; // reset if needed
  img.style.scale = "1";  // optional: reset transforms
});
    setTimeout(() => {
      setShowImages(false);
    }, 2000);
     setShowEventPage(true);

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
            duration: 2,
            delay: 10,
              scaleX: [1,2].includes(originalIndex) ? 0.2: 1, // X scale for index 1,2,3
  scaleY: [0,3,4].includes(originalIndex) ? 0.2 : 1,
          // pointerEvents:"none",
          // scale:"1",
          // filter:"drop-shadow(0px 0px 30px rgba(0, 0,  0,1))",
            ease: "linear",
            // zIndex: alt === fanImages[originalIndex].alt ? 5 : 2, // clicked image on top
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
          imgEl.style.pointerEvents ="none";
          gsap.to(imgEl, {
            rotate: rotationAngles[i],
            duration: 1.7,
            delay: 10,
            scaleX: [1, 2, 3].includes(i) ? 0.2: 1, // X scale for index 1,2,3
  scaleY: [0, 4].includes(i) ? 0.2 : 1,
            ease: "linear",
            // zIndex: 2,
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
      <Helmet>
        <title>Events | OASIS 2025 | Whispers Of Edo</title>
        <meta
          name="description"
          content="Explore the diverse events at OASIS 2025 including Drama, Music, Dance, Photography, and more!"
        />
        <link rel="canonical" href="https://www.bits-oasis.org/events" />
      </Helmet>
      <BreadCrumb data={breadcrumbJsonLd} />
      <div>
        <BackButton className={styles.aboutBB} />
      </div>
      {/* <img src={Text} alt="Text" className={styles.text} /> */}

      {showImages && (
        <div className={styles.eventscontainer}>
          <h2 style={{ display: "none" }}>
            Events | OASIS 2025 | Whispers Of Edo
          </h2>
          {fanImages.map((img, i) => {
            return (
              <img
                key={i}
                src={isMobile && img.mobileSrc ? img.mobileSrc : img.src}
                alt={img.alt}
                data-nosnippet   
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
