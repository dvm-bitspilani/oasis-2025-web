import BackButton from '../components/backButton/BackButton';
import styles from './Brochure.module.scss';
import pdfFile from '../../assets/Oasis\'25 Brochure.pdf';

export default function Brochure() {
    return (
        <div className={styles.brochurePageBg}>
            <div className={styles.brochurePage}>
                <BackButton />
                <div className={styles.title}>Brochure</div>
                <div className={styles.brochureContainer}>
                    <iframe 
                        src={`${pdfFile}#toolbar=0&scrollbar=0`}
                        className={styles.brochureIframe}
                        title="Oasis 2025 Brochure"
                        typeof='application/pdf'
                    />
                </div>
            </div>
        </div>
    )
}
