import { Link } from "react-router-dom";
import styles from "./ComingSoon.module.scss";

const ComingSoon: React.FC = () => {
  return (
    <div className={styles.comingSoon}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1>Coming Soon</h1>
        <p>The page you are looking for is still under construction.</p>
        <div className={styles.buttons}>
          <Link to="/" className={styles.btn}>
            Go Home
          </Link>
          <Link to="/events" className={`${styles.btn} ${styles.secondary}`}>
            Explore Events
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
