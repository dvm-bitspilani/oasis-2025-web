import styles from './Contact.module.scss';
import { useEffect, useRef } from 'react';
import door1 from '/images/contact/Door1.png';
import door2 from '/images/contact/Door2.png';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactGallery from './components/contactGallery/ContactGallery';

interface ContactDoorsProps {
    pinElemRef: React.RefObject<HTMLDivElement | null>,
    triggerElemRef: React.RefObject<HTMLDivElement | null>,
}

export default function ContactDoors({ pinElemRef, triggerElemRef }: ContactDoorsProps) {
    const door1Ref = useRef<HTMLDivElement>(null);
    const door2Ref = useRef<HTMLDivElement>(null);
    const galleryContentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        console.log(triggerElemRef.current, pinElemRef.current)

        const setGalleryAA = (autoAlpha: number) => gsap.to(galleryContentRef.current, {autoAlpha: autoAlpha})

        const doorTimeLine = gsap.timeline({
            scrollTrigger: {
                trigger: triggerElemRef.current,
                start: "top bottom",
                end: `+=${window.innerHeight - 1}`,
                scrub: 0.5,
                pin: pinElemRef.current,
                pinSpacing: false,
                onLeave: () => setGalleryAA(1),
                onEnterBack: () => setGalleryAA(0),
            }
        })

        doorTimeLine
            .from(door1Ref.current, {x: "-100%",}, 0)
            .from(door2Ref.current, {x: "100%",}, 0)
            // .from(galleryContentRef.current, {autoAlpha: 0})

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

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    },[])

    return (
        <div className={styles.contactDoors}>
            <div className={styles.contactDoor} ref={door1Ref}>
                <img className={styles.contactDoorImg} src={door1} />
            </div>
            <div className={styles.contactDoor} ref={door2Ref}>
                <img className={styles.contactDoorImg} src={door2} />
            </div>
            <div className={styles.contactSectionContent} ref={galleryContentRef}>
                <ContactGallery />
            </div>
        </div>
    )
}
