import { useState } from 'react';
import styles from './Gallery.module.scss';
import galleryItemList from './galleryItemList';
import { FaLeftLong, FaRightLong } from 'react-icons/fa6';
import closeButton from '/images/gallery/close_button.png'

interface ImagePopupProps {
    index: number;
    onClose: () => void;
}

export default function ImagePopup({ index, onClose }: ImagePopupProps) {
    
    const [currentImageIndex, setCurrentImageIndex] = useState(index);

    return (
        <div className={styles.imagePopup}>
            <div className={styles.imageCycleContainer}>
                <div className={styles.cycleButtonContainer}>
                    <div 
                        className={styles.cycleButton}
                        onClick={() => setCurrentImageIndex(prev => (prev - 1) < 0 ? galleryItemList.length - 1 : prev - 1)}
                    ><FaLeftLong className={styles.cycleButtonIcon} /></div>
                </div>
                <div className={styles.imagePopupImageContainer}>
                    <img 
                        className={styles.imagePopupImage} 
                        src={galleryItemList[currentImageIndex].src}
                    />
                </div>
                <div className={styles.cycleButtonContainer}>
                    <div 
                        className={styles.cycleButton}
                        onClick={() => setCurrentImageIndex(prev => (prev + 1) === galleryItemList.length ? 0 : prev + 1)}
                    ><FaRightLong className={styles.cycleButtonIcon} /></div>
                </div>
            </div>
            <div className={styles.closeButton} onClick={onClose} style={{backgroundImage: `url(${closeButton})`}}></div>
        </div>
    )
}
