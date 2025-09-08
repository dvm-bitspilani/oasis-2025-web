// import React from 'react'
import Back from "/images/events/backg.png"
import styles from "./Eventspage.module.scss"
import top from "/svgs/events/top.svg"
import bottom from "/svgs/events/bottom.svg"
const Eventspage = () => {
  return (
    <div>
      <div className={styles.page}  style={{ backgroundImage: `url("${Back}")` }}>
        <img src={top} alt="" className={styles.toplef} />
        <img src={bottom} alt="" className={styles.botright} />
      </div>
    </div>
  )
}

export default Eventspage
