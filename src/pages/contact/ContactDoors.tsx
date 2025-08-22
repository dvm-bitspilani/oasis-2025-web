import styles from './Contact.module.scss';
import { useEffect, useRef } from 'react';
import door1 from '/images/contact/Door1.png';
import door2 from '/images/contact/Door2.png';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import ContactGallery from './components/contactGallery/ContactGallery';

interface ContactDoorsProps {
    aboutUsRef: React.RefObject<HTMLDivElement | null>,
    pinnedContRef?: React.RefObject<HTMLDivElement | null>,
    bottomContentRef?: React.RefObject<HTMLDivElement | null>,
}

export default function ContactDoors({ aboutUsRef, pinnedContRef, bottomContentRef }: ContactDoorsProps) {
    const door1Ref = useRef<HTMLDivElement>(null);
    const door2Ref = useRef<HTMLDivElement>(null);
    // const scrollerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        return
        console.log(pinnedContRef?.current, aboutUsRef?.current)
        gsap.registerPlugin(ScrollTrigger);

        gsap.from(door1Ref.current, {
            x: "-100%",
            scrollTrigger: {
                trigger: aboutUsRef.current,
                start: "top top",
                end: `+=${window.innerHeight}`,
                scrub: 0.5,
                pin: bottomContentRef?.current,
                // pinType: "transform",
                pinSpacing: false,
                markers: true,
                // pinnedContainer: pinnedContRef?.current,
            }
        })
        gsap.from(door2Ref.current, {
            x: "100%",
            scrollTrigger: {
                trigger: aboutUsRef.current,
                start: "top top",
                end: `+=${window.innerHeight}`,
                scrub: 0.5,
                pin: bottomContentRef?.current,
                // pinType: "transform",
                pinSpacing: false,
                markers: true,
                // pinnedContainer: pinnedContRef?.current,
            }
        })
    });

    useEffect(() => {
        return
        const handleResize = () => ScrollTrigger.refresh();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    },[])

    return (
        <div className={styles.contactSection}>
            <div className={styles.contactDoor} ref={door1Ref} style={{backgroundImage: `url(${door1})`}} />
            <div className={styles.contactDoor} ref={door2Ref} style={{backgroundImage: `url(${door2})`}} />
            {/* <ContactGallery /> */}
        </div>
    )
}
