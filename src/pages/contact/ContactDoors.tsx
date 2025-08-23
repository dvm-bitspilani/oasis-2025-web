import styles from "./Contact.module.scss";
import { useEffect, useRef } from "react";
import door1 from "/images/contact/Door1.png";
import door2 from "/images/contact/Door2.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface ContactDoorsProps {
  aboutUsRef: React.RefObject<HTMLDivElement | null>;
  // pinnedContRef?: React.RefObject<HTMLDivElement | null>,
  // bottomContentRef?: React.RefObject<HTMLDivElement | null>,
}

export default function ContactDoors({ aboutUsRef }: ContactDoorsProps) {
  const door1Ref = useRef<HTMLDivElement>(null);
  const door2Ref = useRef<HTMLDivElement>(null);
  // const scrollerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    console.log(aboutUsRef?.current);
    // gsap.registerPlugin(ScrollTrigger);

    const doorTimeLine = gsap.timeline({
      scrollTrigger: {
        trigger: aboutUsRef?.current,
        start: `top top`,
        end: `+=${window.innerHeight}`,
        scrub: 0.5,
        markers: true,
        pin: aboutUsRef.current,
        pinType: "transform",
        // onEnter: () => {
        //     //@ts-ignore
        //     aboutUsRef.current.style.position = "fixed";
        //     //@ts-ignore
        //     aboutUsRef.current.style.top = "0px";
        // },
        // onEnterBack: () => {
        //     //@ts-ignore
        //     aboutUsRef.current.style.position = "relative";
        //     //@ts-ignore
        //     aboutUsRef.current.style.top = "120svh";
        // }
      },
    });

    doorTimeLine
      .from(door1Ref.current, { x: "-100%" }, 0)
      .from(door2Ref.current, { x: "100%" }, 0);

    // gsap.from(door1Ref.current, {
    //     x: "-100%",
    //     scrollTrigger: {
    //         trigger: aboutUsRef.current,
    //         start: "top top",
    //         end: `+=${window.innerHeight}`,
    //         scrub: 0.5,
    //         pin: aboutUsRef?.current,
    //         // pinType: "transform",
    //         pinSpacing: false,
    //         markers: true,
    //         // pinnedContainer: pinnedContRef?.current,
    //     }
    // })
    // gsap.from(door2Ref.current, {
    //     x: "100%",
    //     scrollTrigger: {
    //         trigger: aboutUsRef.current,
    //         start: "top top",
    //         end: `+=${window.innerHeight}`,
    //         scrub: 0.5,
    //         pin: aboutUsRef?.current,
    //         // pinType: "transform",
    //         pinSpacing: false,
    //         markers: true,
    //         // pinnedContainer: pinnedContRef?.current,
    //     }
    // })
  });

  useEffect(() => {
    const handleResize = () => ScrollTrigger.refresh();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.contactDoors}>
      <div className={styles.contactDoor} ref={door1Ref}>
        <img className={styles.contactDoorImg} src={door1} />
      </div>
      <div className={styles.contactDoor} ref={door2Ref}>
        <img className={styles.contactDoorImg} src={door2} />
      </div>
    </div>
  );
}
