import ContactGallery from './components/contactGallery/ContactGallery';
import styles from './Contact.module.scss';
import doors from '/images/contact/DoorsCombined.png';
import doorsMobile from '/images/contact/DoorsMobile.png';
import BackButton from '../components/backButton/BackButton';
import { useEffect, useState } from 'react';

interface HoriBarDetails {
    numOfBars: number,
    firstBarPos: number,
    barGap: number
}

export default function Contact() {

    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 900)
    const [horiBarDetails, setHoriBarDetails] = useState<HoriBarDetails>();

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 900);

        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <div className={styles.contactPageWrapper}>
             <title>Contact Us | Oasis 2025 Bits Pilani</title>
            <meta
                name="description"
                content="Contact the organizers of Oasis 2025. Find key contact information for team members, and get in touch with us for partnerships, queries, or support."
            />
            <div className={styles.contactPageBg}>
                {
                    Array(horiBarDetails?.numOfBars).fill(null).map((_, i) => 
                        <div 
                            className={styles.horiBar} 
                            key={i} 
                            style={{
                                top: `${i*(horiBarDetails?.barGap || 0) + (horiBarDetails?.firstBarPos || 0)}px`
                            }} 
                        >
                            {
                                Array(isMobile ? 5 : 3).fill(null).map(() => <div />)
                            }
                        </div>
                    )
                }
            </div>
            <div className={styles.contactPage} style={{backgroundImage: `url(${isMobile ? doorsMobile : doors})`}} >
                    {/* <div className={styles.contactBg}> */}
                    {/* <img className={styles.contactBgImg} src={door1} />
                    <img className={styles.contactBgImg} src={door2} /> */}
                    {/* <div className={styles.contactBgImg} style={{backgroundImage: door1}} />
                    <div className={styles.contactBgImg} style={{backgroundImage: door2}} />
                </div> */}
                
                <div className={styles.contactContent}>
                    <ContactGallery setHoriBarDetails={setHoriBarDetails} />
                </div>
                <BackButton className={styles.contactBB} />
            </div>
        </div>
    );
}