import { FaEnvelope, FaPhone } from 'react-icons/fa6';
import styles from './ContactGallery.module.scss';
import contacts from './contacts';
import contactBanner from '/images/contact/contact-banner.png'
import { useEffect, useState } from 'react';


export default function ContactGallery() {

    const [isTab, setIsMobile] = useState<boolean>(window.innerWidth >= 900 && window.innerWidth <= 1500);
    const launchPhone = (phone: string) => window.location.href = `tel:${phone}`;
    const launchEmail = (email: string) => window.location.href = `mailto:${email}`;

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth >= 900 && window.innerWidth <= 1500);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    })

    return (
        <div className={styles.contactContent}>
            <div className={styles.contactHeading}>
                <img className={styles.contactBanner} src={contactBanner}></img>
            </div>
            <div className={styles.contactGalleryContainer}>
                <div className={styles.contactGallery}>
                    {
                        (isTab ? contacts.filter((_, i) => i % 2 == 0) : contacts.slice(0, 2).concat(contacts.slice(4, 6)))
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
                <div className={styles.contactGallery}>
                    {
                        (isTab ? contacts.filter((_, i) => i % 2 == 1) : contacts
    
.slice(2, 4).concat(contacts.slice(6, 8)))
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
    )
}
