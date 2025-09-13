// src/components/Events/Events.tsx
// import React from "react";
import styles from "./Events.module.scss";
import EventBack from "/svgs/events/eventsback.svg";
import Text from "/images/events/text.png";
import dance from "/images/events/dance.png";
import music from "/images/events/music.png";

import misc from "/images/events/misc.png";
import photography from "/images/events/photography.png";
// import Photography from "/svgs/events/Photography.svg";
// import dan from "/svgs/events/dan.svg";
//  import mus from "/svgs/events/music.svg";
import quizzes from "/images/events/quizzes.png";

const Events = () => {
  return (
    <div className={styles.eventsmaincontainer} 
        style={{ backgroundImage: `url("${EventBack}")` }}>
            <img src={Text} alt="Text" className={styles.text} />
      {/* Updated SVG with clipPathUnits="objectBoundingBox" for true responsiveness */}
      {/* <svg
        width="0"
        height="0"
        viewBox="0 0 1 1"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="photography-clip" clipPathUnits="objectBoundingBox">
            <path
              d="M0.311685 0.999661C0.369764 0.985072 0.438574 0.978411 0.498802 0.978411C0.563961 0.978411 0.618683 0.983486 0.685361 0.99999L0.992523 0.00216164L0.0100956 0.0035081L0.311685 0.999661Z"
            />
          </clipPath>
        </defs>
      </svg> */}

      <div
        className={styles.eventscontainer}
      >
        <img src={music} alt="Drama" className={styles.music} />
        <img src={quizzes} alt="Quizzes" className={styles.quizzes} />
        
        <div className={styles.photographyWrapper}>
          <img
            src={photography}
            alt="Photography"
            className={styles.photography}
          />
        </div>

        <div className={styles.danceWrapper}>
          <img src={dance} alt="Dance" className={styles.dance} />
        </div>
        <img src={misc} alt="Misc" className={styles.misc} />
        {/* <img src={Text} alt="Text" className={styles.text} /> */}
      </div>
    </div>
  );
};

export default Events;