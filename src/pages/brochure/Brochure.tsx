import BackButton from '../components/backButton/BackButton';
import styles from './Brochure.module.scss';
import pdfFile from '../../assets/Oasis_25_Brochure.pdf';
import { FaDownload } from 'react-icons/fa6';

export default function Brochure() {

    return (
        <div className={styles.brochurePageBg}>
            <div className={styles.brochurePage}>
                <BackButton />
                <div className={styles.title}>Brochure</div>
                <div className={styles.brochureWrapper}>
                    <div className={styles.brochureContainer}>
                        <iframe 
                            src={`${pdfFile}#toolbar=0&scrollbar=0`}
                            className={styles.brochureIframe}
                            title="Oasis 2025 Brochure"
                            typeof='application/pdf'
                        />
                        <a href={pdfFile} download>
                            <button className={styles.downloadButton} title='Download Brochure'>
                                <FaDownload className={styles.downloadIcon} />
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
