import { motion, AnimatePresence } from "framer-motion";
import styles from "../Eventspage.module.scss";
import EventImage from "../ImagePreloader/ImagePreloader";
import Location from "/svgs/events/location.svg";
import Right from "/svgs/events/Next1.svg";

interface DesktopEventsProps {
  events: any[];
  currentIndex: number;
  handleNext: () => void;
  handlePrev: () => void;
  category: string;
}

const DesktopEvents: React.FC<DesktopEventsProps> = ({
  events,
  currentIndex,
  handleNext,
  handlePrev,
  category,
}) => (
  <AnimatePresence mode="wait">
    {events.length > 0 ? (
      <div className={styles.eventdesktop}>
        <motion.div
          className={styles.eventContentWrapper}
          key={currentIndex}
          initial={{ opacity: 0, x: 150 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -150 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className={styles.leftevent}>
            <div className={styles.imageholder}>
              <EventImage
                imageUrl={events[currentIndex]?.image_url}
                alt={events[currentIndex]?.name}
                className={styles.imagenew}
                previewClass={styles.imagenewpreview}
              />
            </div>

            <div className={styles.venname}>
              <p>{events[currentIndex].club_name}</p>
              <div className={styles.venue}>
                <img src={Location} alt="" />
                <p>{events[currentIndex].venue}</p>
              </div>
            </div>
          </div>

          <div className={styles.rightevent}>
            <h4>{events[currentIndex].name}</h4>
            <p>{events[currentIndex].description}</p>
          </div>
        </motion.div>

        <div className={styles.controls}>
          <div className={styles.left} onClick={handlePrev}>
            <img src={Right} alt="Prev" className={styles.prev} />
          </div>
          <div className={styles.right} onClick={handleNext}>
            <img src={Right} alt="Next" className={styles.next} />
          </div>
        </div>
      </div>
    ) : (
      <p className={styles.centerText}>
        {`No events found in "${category}"`}
      </p>
    )}
  </AnimatePresence>
);

export default DesktopEvents;
