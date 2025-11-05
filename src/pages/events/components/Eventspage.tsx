import Back from "/images/events/backg.png";
import MobileBack from "/images/events/evenback.png";
import styles from "./Eventspage.module.scss";
import cl1 from "/svgs/events/cl1.svg";
import cl2 from "/svgs/events/cl2.svg";
import topright from "/svgs/events/topright.svg";
import BackButton from "../../components/backButton/BackButton";
import { useEffect, useState } from "react";
import Star from "/svgs/events/star.svg";
import Star2 from "/svgs/events/star.svg";
import { useFetchEvents } from "./UseFetchEvents/UseFetchEvents";
import FlyingIcons from "./FlyingIcons/FlyingIcons";
import MobileEvents from "./MobileEvents/MobileEvents";
import DesktopEvents from "./DesktopEvents/DesktopEvents";
interface EventspageProps {
  category: string;
}

const Eventspage: React.FC<EventspageProps> = ({ category }) => {
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 1200px) and (max-aspect-ratio: 1.45)")
      .matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(max-width: 1200px) and (max-aspect-ratio: 1.45)"
    );

    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  const [currentIndex, setCurrentIndex] = useState(0);

const events = useFetchEvents(category);
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      events.length > 0 ? (prevIndex + 1) % events.length : 0
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      events.length > 0 ? (prevIndex - 1 + events.length) % events.length : 0
    );
  };
  return (
    <div>
      <div
        className={styles.page}
        style={{
          backgroundImage: `url("${isMobile ? MobileBack : Back}")`,
        }}
      >
        <img src={cl1} alt="Clouds" className={styles.cl1} />
        <img src={cl2} alt="Clouds" className={styles.cl2} />
        <img src={topright} alt="Borders" className={styles.bar1} />
        <img src={topright} alt="Borders" className={styles.bar2} />
        <BackButton
          className={styles.aboutBB}
          onClick={() => window.location.reload()}
        />
         <FlyingIcons icons={[Star, Star2]} /> 

        <div className={styles.evntcontainer}>
          {isMobile ? (
            
            <MobileEvents
            events={events}
            currentIndex={currentIndex}
            handleNext={handleNext}
            handlePrev={handlePrev}
            category={category}
          />
          ) : (
            <DesktopEvents
            events={events}
            currentIndex={currentIndex}
            handleNext={handleNext}
            handlePrev={handlePrev}
            category={category}
          />
          )}
        </div>
      </div>
    </div>
  );
};

export default Eventspage;
