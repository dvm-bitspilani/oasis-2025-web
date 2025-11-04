import { useGSAP } from '@gsap/react';
import styles from './ScrollLabel.module.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ScrollLabel = () => {

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        const scrollLabelAnim = gsap.to(`.${styles.scrollLabel}`, {
            scrollTrigger: {
                trigger: document.scrollingElement,
                start: 'top top',
                end: '+=300',
                scrub: true,
                onLeave: () => {
                    scrollLabelAnim.kill()

                },
            },
            alpha: 0,
            y: -90,
            ease: `power1.out`,
        })
    })

    return (
        <div className={styles.scrollLabel}>
            <div className={styles.scrollArrows}>
                {
                    Array(parseInt(styles.numberOfArrows)).fill(null).map((_, index) => <div key={index} className={styles.scrollArrow} />)
                }
            </div>
            {/* <div className={styles.labelText}>Scroll down to explore</div> */}
        </div>
    );
};

export default ScrollLabel;