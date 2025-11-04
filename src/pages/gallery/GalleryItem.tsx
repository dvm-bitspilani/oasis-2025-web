import { useState } from 'react';
import styles from './Gallery.module.scss';
import { type ImageProperty } from './galleryItemList';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface GalleryItemProps {
    galleryItem: ImageProperty;
    index: number;
    onClick: ()  => void;
}

function GalleryItem({ galleryItem, index, onClick }: GalleryItemProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const handleLoad = () => {
        setIsLoading(false);
    }

    const handleError = () => {
        setIsError(true);
    }

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(`#gallery-image-${index}`, {
            scrollTrigger: {
                trigger: `#gallery-image-${index}`,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
            scale: (0.1 * Math.random()) + 1,
            objectPosition: `center +=${(10 * Math.random())}%`,
        })
    })

    return (
        <div className={styles.galleryImageContainer} onClick={onClick}>
            <div className={isLoading ? styles.overlayVisible : styles.overlayHidden}>
                <p className={styles.overlayText}>{!isError ? "Loading" : "Could not load image"}</p>
            </div>
            <img 
                className={styles.galleryImage} 
                style={galleryItem.modifiers}
                src={galleryItem.src} 
                onLoad={handleLoad}
                onError={handleError}
                loading='lazy'
                id={`gallery-image-${index}`}
            />
        </div>
    )
}

export default GalleryItem;