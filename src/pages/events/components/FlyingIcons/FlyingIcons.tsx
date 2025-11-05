import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./FlyingIcons.module.scss";

interface Props {
  icons: string[];
}

const FlyingIcons: React.FC<Props> = ({ icons }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const spawnFromCorner = (corner: "top-right" | "bottom-left") => {
      const iconSrc = icons[Math.floor(Math.random() * icons.length)];
      const img = document.createElement("img");
      img.src = iconSrc;
      img.className = styles.flyingIcon;
      img.alt = "Stars";

      const padding = 10;
      let startX = corner === "top-right" ? container.clientWidth - padding : padding;
      let startY = corner === "top-right" ? padding : container.clientHeight - padding;

      img.style.left = `${startX}px`;
      img.style.top = `${startY}px`;
      container.appendChild(img);

      const dx = ((container.clientWidth / 2 - startX) * Math.random()) / 1.25;
      const dy = ((container.clientHeight / 2 - startY) * Math.random()) / 2;

      gsap.fromTo(
        img,
        { opacity: 1, scale: 1, x: 0, y: 0 },
        {
          opacity: 0,
          scale: Math.random() * 1.5,
          x: dx,
          y: dy,
          duration: 4,
          ease: "linear",
          onComplete: () => img.remove(),
        }
      );
    };

    const spawnLoop = setInterval(() => {
      spawnFromCorner("top-right");
      spawnFromCorner("bottom-left");
    }, 400);

    return () => clearInterval(spawnLoop);
  }, [icons]);

  return <div ref={containerRef} className={styles.container} />;
};

export default FlyingIcons;
