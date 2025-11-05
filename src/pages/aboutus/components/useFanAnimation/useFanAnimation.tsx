import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
export function useFanAnimation(
  fan1Ref:React.RefObject<HTMLImageElement | null>,
  fan2Ref:  React.RefObject<HTMLImageElement | null>,
  isMobile: boolean,
  iconImages: HTMLImageElement[],
  styles: Record<string, string>
) {
  useGSAP(() => {
    if (!isMobile) {
      gsap.set(fan2Ref.current, { xPercent: 100, yPercent: -100, rotate: 180 });

      gsap.to(fan1Ref.current, {
        rotateX: -5,
        rotateY: -5,
        duration: 0.5,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
        force3D: true,
        
      });

      gsap.to(fan2Ref.current, {
        rotateX: -9,
        rotateY: -9,
        duration: 0.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        force3D: true,
      });
    }

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

      const iconTemplate =
        iconImages[Math.floor(Math.random() * iconImages.length)];
      const img = iconTemplate.cloneNode(true) as HTMLImageElement;
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

    const spawnFromCorner = (
      corner: "top-left" | "top-right" | "bottom-left" | "bottom-right"
    ) => {
      const container = document.querySelector(
        `.${styles.vid}`
      ) as HTMLElement | null;
      if (!container) return;

      const iconTemplate =
        iconImages[Math.floor(Math.random() * iconImages.length)];
      const img = iconTemplate.cloneNode(true) as HTMLImageElement;
      img.className = styles.flyingIcon;

      let startX = 0,
        startY = 0;
      const padding = 10;

      switch (corner) {
        case "top-right":
          startX = container.clientWidth - padding;
          startY = padding;
          break;
        case "bottom-left":
          startX = padding;
          startY = container.clientHeight - padding;
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

    let intervalId: number;

    const startSpawning = () => {
      intervalId = window.setInterval(
        () => {
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
      console.log("Cleared interval: ", intervalId);
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
  }, [isMobile]);
}
