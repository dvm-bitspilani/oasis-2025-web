import React from "react";
import styles from "./Events.module.scss";
import EventBack from "/svgs/events/eventsback.svg";
import Text from "/images/events/text.png";
import dance from "/images/events/dance.png";
import drama from "/images/events/drama.png";
import music from "/images/events/music.png";
import photography from "/images/events/photography.png";
import quizzes from "/images/events/quizzes.png";

const Events = () => {
  return (
    <div>
      <div
        className={styles.eventscontainer}
        style={{ backgroundImage: `url("${EventBack}")` }}
      >
        <img src={drama} alt="Drama" className={styles.drama} />
        <img src={quizzes} alt="Quizzes" className={styles.quizzes} />
        <img
          src={photography}
          alt="Photography"
          className={styles.photography}
        />
        <img src={dance} alt="Dance" className={styles.dance} />
        <img src={music} alt="Music" className={styles.music} />
        <img src={Text} alt="Text" className={styles.text} />
        {/* <div className={styles.}></div>
        <div className={styles.}></div>
        <div className={styles.}></div>
        <div className={styles.}></div>
        <div className={styles.}></div> */}
      </div>
    </div>
  );
};

export default Events;
