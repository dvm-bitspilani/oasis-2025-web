import styles from './Contact.module.scss';
import { useEffect, useRef } from 'react';
import door1 from '/images/contact/Door1.png';
import door2 from '/images/contact/Door2.png';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ContactGallery from './components/contactGallery/ContactGallery';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ContactDoorsProps {
    aboutUsRef: React.RefObject<HTMLDivElement | null>,
    // pinnedContRef?: React.RefObject<HTMLDivElement | null>,
    bottomContentRef?: React.RefObject<HTMLDivElement | null>,
}

export default function ContactDoors({ aboutUsRef, bottomContentRef }: ContactDoorsProps) {
    const door1Ref = useRef<HTMLDivElement>(null);
    const door2Ref = useRef<HTMLDivElement>(null);
    // const scrollerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        console.log(aboutUsRef?.current)
        // gsap.registerPlugin(ScrollTrigger);
        
        gsap.registerPlugin(ScrollTrigger);

        const doorTimeLine = gsap.timeline({
            scrollTrigger: {
                trigger: aboutUsRef?.current,
                start: `top top`,
                end: `+=${window.innerHeight}`,
                scrub: 0.5,
                markers: true,
                pin: bottomContentRef?.current,
                pinType: "transform"
            }
        })

        doorTimeLine
            .from(door1Ref.current, {x: "-100%",}, 0)
            .from(door2Ref.current, {x: "100%",}, 0)

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
