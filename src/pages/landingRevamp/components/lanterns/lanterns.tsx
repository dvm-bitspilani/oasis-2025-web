import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function LanternsInfinite({
  count = 4,
  startFromRef,
}: {
  count?: number;
  startFromRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const spawnLantern = () => {
      if (!container) return;

      const startY = startFromRef?.current
        ? startFromRef.current.offsetTop + startFromRef.current.offsetHeight + 2*window.innerHeight// 20px below
        : window.innerHeight;

      const lantern = document.createElement("img");
      lantern.src = "/images/lantern.svg";
      lantern.style.position = "absolute";
      lantern.style.left = `${Math.random() * container.clientWidth}px`;
      lantern.style.top = `${startY}px`;
      lantern.style.width = "40px";
      lantern.style.height = "auto";
      lantern.style.pointerEvents = "none";

      container.appendChild(lantern);

      const sway = Math.random() * 100 - 50;
      const duration = 10 + Math.random() * 10;
      gsap.to(lantern, {
        y: -startY - 200, 
        x: `+=${sway}`,
        duration,
        ease: "linear",
        onComplete: () => lantern.remove(),
      });
    };

    const interval = setInterval(() => {
      for (let i = 0; i < count; i++) spawnLantern();
    }, 1200);

    return () => clearInterval(interval);
  }, [count, startFromRef]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "300vh", 
        pointerEvents: "none",
        zIndex: -1,      
      }}
    />
  );
}
