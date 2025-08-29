// import { Link } from "react-router-dom";
import styles from "./ComingSoon.module.scss";
import { useContext } from "react";
import { navContext } from "../../App";

const ComingSoon: React.FC = () => {

  const { goToPage } = useContext(navContext);

  return (
    <div className={styles.comingSoon}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1>Coming Soon</h1>
        <p>The page you are looking for is still under construction.</p>
        <div className={styles.buttons}>
          <span onClick={() => goToPage && goToPage("/")} className={styles.btn}>
            Go Home
          </span>
          <span onClick={() => goToPage && goToPage("/events")} className={`${styles.btn} ${styles.secondary}`}>
            Explore Events
          </span>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
