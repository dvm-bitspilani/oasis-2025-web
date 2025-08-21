import styles from "./ContactSection.module.scss";
import ContactGallery from './components/contactGallery/ContactGallery';

export default function ContactSection() {
    return (
        <div className={styles.contactSection}>
            <div className={styles.contactContent}>
                <ContactGallery />
            </div>
        </div>
    )
}
