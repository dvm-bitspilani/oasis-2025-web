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
        <div className={styles.galleryImageContainer} onClick={onClick} role="button" tabIndex={0} aria-label={`Open festival photograph ${index + 1}`} onKeyDown={event => {if(event.key === "Enter") onClick()}}>
            <div className={isLoading ? styles.overlayVisible : styles.overlayHidden}>
                <p className={styles.overlayText}>{!isError ? "Loading" : "Could not load image"}</p>
            </div>
            <img
                className={styles.galleryImage}
                style={galleryItem.modifiers}
                src={galleryItem.src.replace("/gallery/", "/gallery/responsive/").replace(".webp", "-800.webp")}
                srcSet={`${galleryItem.src.replace("/gallery/", "/gallery/responsive/").replace(".webp", "-400.webp")} 400w, ${galleryItem.src.replace("/gallery/", "/gallery/responsive/").replace(".webp", "-800.webp")} 800w`}
                sizes={index % 16 === 1 || index % 16 === 3 || index % 16 >= 4 ? "(max-width: 768px) 90vw, (max-width: 1200px) 60vw, 45vw" : "(max-width: 768px) 45vw, (max-width: 1200px) 30vw, 23vw"}
                alt={`Oasis festival photograph ${index + 1}`}
                decoding="async"
                onLoad={handleLoad}
                onError={handleError}
                loading={index < 3 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                id={`gallery-image-${index}`}
            />
        </div>
    )
}

export default GalleryItem;
