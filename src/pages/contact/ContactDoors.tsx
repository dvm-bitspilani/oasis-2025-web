import styles from './Contact.module.scss';
import { useEffect, useRef, useState } from 'react';
import door1 from '/images/contact/Door1.png';
import door2 from '/images/contact/Door2.png';
import door1mobile from '/images/contact/Door1Mobile.png';
import door2mobile from '/images/contact/Door2Mobile.png';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import contactBanner from '/images/contact/contact-banner.png'
import contacts from './components/contactGallery/contacts';
// import ContactGallery from './components/contactGallery/ContactGallery';
import { FaEnvelope, FaPhone } from 'react-icons/fa6';

interface ContactDoorsProps {
    pinElemRef: React.RefObject<HTMLDivElement | null>,
    triggerElemRef: React.RefObject<HTMLDivElement | null>,
}

interface HoriBarDetails {
    numOfBars: number,
    firstBarPos: number,
    barGap: number,
}

export default function ContactDoors({ pinElemRef, triggerElemRef }: ContactDoorsProps) {
    const door1Ref = useRef<HTMLDivElement>(null);
    const door2Ref = useRef<HTMLDivElement>(null);
    const contactBannerRef = useRef<HTMLImageElement>(null);
    // const galleryContentRef = useRef<HTMLDivElement>(null);

    const horiBarDetailsRef = useRef<HoriBarDetails | null>(null);

    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 1300);

    const launchPhone = (phone: string) => window.location.href = `tel:${phone}`;
    const launchEmail = (email: string) => window.location.href = `mailto:${email}`;

    const calculateHoriBarPos = () => {
        const contactItems = document.getElementsByClassName(styles.contactItem);
        const firstRowItem = contactItems[0];
        const firstRowRelPos = firstRowItem.getBoundingClientRect().top

        const secondRowItem = contactItems[window.innerWidth <= 1300 ? 1 : 3]

        if (!secondRowItem) return;
        const secondRowRelPos = secondRowItem.getBoundingClientRect().top

        // const barGapThreshold = 100;
        let barGap = Math.round(secondRowRelPos - firstRowRelPos);
        // if (barGap > barGapThreshold) 
        barGap = barGap / 2;//Math.round(barGap / 100);

        const firstRowAbsPos = firstRowRelPos + (door1Ref.current?.getBoundingClientRect().top || 0);

        const firstBarPos = Math.round(firstRowAbsPos % barGap);
        const numOfBars = Math.round((door1Ref.current?.clientHeight || 0 - firstBarPos || 0) / barGap);

        // if (setHoriBarDetails) setHoriBarDetails({numOfBars, firstBarPos, barGap})
        horiBarDetailsRef.current = { numOfBars, firstBarPos, barGap };
    }

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        console.log(triggerElemRef.current, pinElemRef.current)

        const animateContactBanner = (animation: gsap.TimelineVars) => gsap.to(contactBannerRef.current, { ...animation, duration: 0.3 })

        const doorTimeLine = gsap.timeline({
            scrollTrigger: {
                trigger: triggerElemRef.current,
                start: "top bottom",
                end: `+=${window.innerHeight - 1}`,
                scrub: 0.5,
                pin: pinElemRef.current,
                pinSpacing: false,
                onEnter: calculateHoriBarPos,
                onLeave: () => {
                    animateContactBanner({ y: "0%", autoAlpha: 1 })
                    gsap.set(`.${styles.contactSection}`, {pointerEvents: "all"})
                },
                onEnterBack: () => {
                    animateContactBanner({ y: "-100%", autoAlpha: 0 })
                    gsap.set(`.${styles.contactSection}`, {pointerEvents: "none"})
                },
                snap: {
                    snapTo: [0, 1],
                    directional: false
                }
            }
        })

        doorTimeLine
            .from(door1Ref.current, { x: "-100%", }, 0)
            .from(door2Ref.current, { x: "100%", }, 0)
        // .from(galleryContentRef.current, {autoAlpha: 0})
    });

    useEffect(() => {

        const handleResize = () => {
            ScrollTrigger.refresh();
            ScrollTrigger.update();
            setIsMobile(window.innerWidth <= 1300);
            calculateHoriBarPos();
        }

        calculateHoriBarPos();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    return (
        <div className={styles.contactSection}>
            <div className={styles.contactSectionContent}>
                <div className={styles.contactHeading}>
                    <img className={styles.contactBanner} src={contactBanner} ref={contactBannerRef}></img>
                </div>
                <div className={styles.contactDoors}>
                    <div className={styles.contactDoor} ref={door1Ref} style={{ backgroundImage: `url('${isMobile ? door1mobile : door1}')` }}>
                        {/* <img className={styles.contactDoorImg} src={door1} /> */}
                        <div className={styles.horiBarContainer}>
                            {
                                Array(horiBarDetailsRef.current?.numOfBars).fill(null).map((_, i) =>
                                    <div
                                        className={styles.horiBar}
                                        key={i}
                                        style={{
                                            top: `${i * (horiBarDetailsRef.current?.barGap || 0) + (horiBarDetailsRef.current?.firstBarPos || 0)}px`
                                        }}
                                    >
                                        {
                                            Array(2).fill(null).map(() => <div />)
                                        }
                                    </div>
                                )
                            }
                        </div>
                        <div className={styles.contactsContainer}>
                            {
                                (isMobile ? contacts.filter((_, i) => i % 2 === 0) : contacts.slice(0, 4))
                                    .map((contact, index) => (
                                        <div className={styles.contactItem} key={index}>
                                            <div className={styles.contactCard}>
                                                <div className={styles.contactImgContainer}>
                                                    <img src={contact.imageURL} alt={contact.name} />
                                                </div>
                                                <div className={styles.contactDetails}>
                                                    <div className={styles.contactName} title={contact.name}>{contact.name}</div>
                                                    <div className={styles.contactPosition} title={contact.role}>{contact.role}</div>
                                                    <div className={styles.contactLinks}>
                                                        <div className={styles.contactPhone} onClick={() => launchPhone(contact.phone)}><FaPhone className={styles.contactIcon} /></div>
                                                        <div className={styles.contactEmail} onClick={() => launchEmail(contact.email)}><FaEnvelope className={styles.contactIcon} /></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                            }
                        </div>
                    </div>
                    <div className={styles.contactDoor} ref={door2Ref} style={{ backgroundImage: `url('${isMobile ? door2mobile : door2}')` }}>
                        {/* <img className={styles.contactDoorImg} src={door2} /> */}
                        <div className={styles.horiBarContainer}>
                            {
                                Array(horiBarDetailsRef.current?.numOfBars).fill(null).map((_, i) =>
                                    <div
                                        className={styles.horiBar}
                                        key={i}
                                        style={{
                                            top: `${i * (horiBarDetailsRef.current?.barGap || 0) + (horiBarDetailsRef.current?.firstBarPos || 0)}px`
                                        }}
                                    >
                                        {
                                            Array(2).fill(null).map(() => <div />)
                                        }
                                    </div>
                                )
                            }
                        </div>
                        <div className={styles.contactsContainer}>
                            {
                                (isMobile ? contacts.filter((_, i) => i % 2 === 1) : contacts.slice(4, 8))
                                    .map((contact, index) => (
                                        <div className={styles.contactItem} key={index}>
                                            <div className={styles.contactCard}>
                                                <div className={styles.contactImgContainer}>
                                                    <img src={contact.imageURL} alt={contact.name} />
                                                </div>
                                                <div className={styles.contactDetails}>
                                                    <div className={styles.contactName} title={contact.name}>{contact.name}</div>
                                                    <div className={styles.contactPosition} title={contact.role}>{contact.role}</div>
                                                    <div className={styles.contactLinks}>
                                                        <div className={styles.contactPhone} onClick={() => launchPhone(contact.phone)}><FaPhone className={styles.contactIcon} /></div>
                                                        <div className={styles.contactEmail} onClick={() => launchEmail(contact.email)}><FaEnvelope className={styles.contactIcon} /></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className={styles.contactSectionContent} ref={galleryContentRef}>
                <ContactGallery />
            </div> */}
        </div>
    )
}
