import BackButton from '../components/backButton/BackButton';
import styles from './Gallery.module.scss';
import galleryItemList from './galleryItemList';
import GalleryItem from './GalleryItem';
import { useRef, useState } from 'react';
import ImagePopup from './ImagePopup';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import photogLogo from '/images/gallery/photog white logo.png'

function Gallery() {

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const activeImageIndex = useRef<number>(0);

    const handleGalleryItemClick = (index: number) => {
        activeImageIndex.current = index;
        setIsPopupOpen(true);
    }

    ScrollTrigger.normalizeScroll(true);

    return (
        <div className={styles.galleryPage}>
            <div className={styles.background} />
            <BackButton className={styles.backButton} to="/" />
            <h1 className={styles.galleryTitle}>Gallery</h1>
            <div className={styles.galleryContent}>
                {
                    galleryItemList.map((galleryItem, index) => 
                        <GalleryItem 
                            key={index} 
                            galleryItem={galleryItem} 
                            index={index} 
                            onClick={() => handleGalleryItemClick(index)}
                        />
                    )
                }
            </div>
            <footer>
                <img className={styles.footerImage} src={photogLogo} />
            </footer>
            {isPopupOpen && <ImagePopup index={activeImageIndex.current} onClose={() => setIsPopupOpen(false)} />}
        </div>
    )
}

export default Gallery;