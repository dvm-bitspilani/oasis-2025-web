import styles from "./ContactSection.module.scss";
import contactBanner from '/images/contact/contact-banner.png';
import ContactGallery from './components/contactGallery/ContactGallery';

export default function ContactSection() {
    return (
        <div className={styles.contactSection}>
            <div className={styles.contactContent}>
                <div className={styles.contactBanner}>
                    <img className={styles.contactBanner} src={contactBanner} alt="banner" />
                </div>
                <ContactGallery />
            </div>
        </div>
    )
}
