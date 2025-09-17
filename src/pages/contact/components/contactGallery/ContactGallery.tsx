import { FaEnvelope } from 'react-icons/fa6';
import styles from './ContactGallery.module.scss';
import contacts from './contacts';
import contactBanner from '/images/contact/contact-banner.png'
import { useEffect, useState } from 'react';

interface HoriBarDetails {
    numOfBars: number,
    firstBarPos: number,
    barGap: number
}

export default function ContactGallery({ setHoriBarDetails }: { setHoriBarDetails?: React.Dispatch<React.SetStateAction<HoriBarDetails | undefined>> }) {

    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 1300);

    // const launchPhone = (phone: string) => window.location.href = `tel:${phone}`;
    const launchEmail = (email: string) => window.location.href = `mailto:${email}`;

    useEffect(() => {
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

            const firstRowAbsPos = firstRowRelPos + (document.scrollingElement?.scrollTop || 0);
            
            const firstBarPos = Math.round(firstRowAbsPos % barGap);
            const numOfBars = Math.round((document.body.clientHeight - firstBarPos || 0)/barGap);

            if (setHoriBarDetails) setHoriBarDetails({numOfBars, firstBarPos, barGap})
        }

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1300)
            calculateHoriBarPos()
        }
        document.body.style.position = "static";
        calculateHoriBarPos()
        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <div className={styles.contactContent}>
            <div className={styles.contactHeading}>
                <img className={styles.contactBanner} src={contactBanner}></img>
            </div>
            <div className={styles.contactGalleryContainer}>
                <div className={styles.contactGallery}>
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
                                            {/* <div className={styles.contactPhone} onClick={() => launchPhone(contact.phone)}><FaPhone className={styles.contactIcon} /></div> */}
                                            <div className={styles.contactEmail} onClick={() => launchEmail(contact.email)}><FaEnvelope className={styles.contactIcon} /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className={styles.contactGallery}>
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
                                            {/* <div className={styles.contactPhone} onClick={() => launchPhone(contact.phone)}><FaPhone className={styles.contactIcon} /></div> */}
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
    )
}
