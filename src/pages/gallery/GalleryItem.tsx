import { useEffect, useState } from 'react';
import styles from './Gallery.module.scss';
import { type ImageProperty } from './galleryItemList';

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

    useEffect(() => {
        if (isLoading || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        let disposed = false;
        let animation: {kill: () => void; scrollTrigger?: {kill: () => void}} | undefined;
        const timer = window.setTimeout(async () => {
            const [{default: gsap}, {ScrollTrigger}] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
            if (disposed) return;
            gsap.registerPlugin(ScrollTrigger);
            animation = gsap.to(`#gallery-image-${index}`, {
                scrollTrigger: {trigger: `#gallery-image-${index}`, start: "top bottom", end: "bottom top", scrub: true},
                scale: 1.05, objectPosition: "center +=5%",
            });
        }, 0);
        return () => {disposed = true; clearTimeout(timer); animation?.scrollTrigger?.kill(); animation?.kill()};
    }, [isLoading, index]);


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
