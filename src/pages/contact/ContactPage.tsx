import ContactGallery from './components/contactGallery/ContactGallery';
import styles from './Contact.module.scss';
import doors from '/images/contact/DoorsCombined.png';
import doorsMobile from '/images/contact/DoorsMobile.png';
import BackButton from '../components/backButton/BackButton';
import { useEffect, useState } from 'react';

export default function Contact() {

    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 900)

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 900)

        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    })

    return (
        <div className={styles.contactPageWrapper}>
            <div className={styles.contactPage} style={{backgroundImage: `url(${isMobile ? doorsMobile : doors})`}} >
                    {/* <div className={styles.contactBg}> */}
                    {/* <img className={styles.contactBgImg} src={door1} />
                    <img className={styles.contactBgImg} src={door2} /> */}
                    {/* <div className={styles.contactBgImg} style={{backgroundImage: door1}} />
                    <div className={styles.contactBgImg} style={{backgroundImage: door2}} />
                </div> */}
                <div className={styles.contactContent}>
                    <ContactGallery />
                </div>
                <BackButton />
            </div>
        </div>
    );
}