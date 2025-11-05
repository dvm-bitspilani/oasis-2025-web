import { motion, AnimatePresence } from "framer-motion";
import styles from "../Eventspage.module.scss";
import EventImage from "../ImagePreloader/ImagePreloader";
import Right from "/svgs/events/Next1.svg";
import Location from "/svgs/events/location.svg";

interface MobileEventsProps {
  events: any[];
  currentIndex: number;
  handleNext: () => void;
  handlePrev: () => void;
  category: string;
}

const MobileEvents: React.FC<MobileEventsProps> = ({
  events,
  currentIndex,
  handleNext,
  handlePrev,
  category,
}) => (
  <div className={styles.mobileEvents}>
    <AnimatePresence mode="wait">
      {events.length > 0 ? (
        <div className={styles.mobileCard}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.mobileContent}>
              <h4>{events[currentIndex].name}</h4>
              <p className={styles.club}>{events[currentIndex].club_name}</p>
              <div className={styles.mobilevenue}>
                <img src={Location} alt="" />
                <p>{events[currentIndex].venue}</p>
              </div>
            </div>

            <div className={styles.imageholder2}>
              <EventImage
                imageUrl={events[currentIndex]?.image_url}
                alt={events[currentIndex]?.name}
                className={styles.mobileImage}
                previewClass={styles.mobileImagepreview}
              />
            </div>

            <div className={styles.eventdesc}>
              <p>{events[currentIndex].description}</p>
            </div>
          </motion.div>

          <div className={styles.controls2}>
            <div className={styles.left2} onClick={handlePrev}>
              <img src={Right} alt="Prev" className={styles.prev} />
            </div>
            <div className={styles.right2} onClick={handleNext}>
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
  </div>
);

export default MobileEvents;
