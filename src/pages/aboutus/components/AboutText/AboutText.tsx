import styles from"../../AboutUs.module.scss"
import abtus from "/svgs/aboutus/abtus.svg";
import aboutTextBG from "/images/aboutus/abtbck.png";

interface AboutTextProps {
  isMobile: boolean;
}

const AboutText = ({ isMobile }: AboutTextProps) => (
  <div className={styles.abt}>
    <div
      className={styles.aboutback}
      style={{ backgroundImage: isMobile ? "none" : `url("${aboutTextBG}")` }}
    >
      <p>
        Oasis, the annual cultural extravaganza of Birla Institute of
                Technology and Science, Pilani, has been a vibrant part of
                India's cultural tapestry since 1971. Managed entirely by
                students, it's a dazzling showcase of talent in Dance, Drama,
                Literature, Comedy, Fashion, and Music. It's where dreams come
                alive, laughter fills the air, and creativity knows no bounds.
                Step into the world of Oasis, where youth's boundless potential
                shines.
      </p>
    </div>
    <div className={styles.abtus}>
      <img src={abtus} alt="ABOUT US" />
      <h3>ABOUT US</h3>
    </div>
  </div>
);

export default AboutText;
