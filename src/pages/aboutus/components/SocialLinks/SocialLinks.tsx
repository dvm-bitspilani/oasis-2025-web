import styles from "../../AboutUs.module.scss";
import instaicon from "/svgs/aboutus/instaicon.svg";
import xicon from "/svgs/aboutus/xicon.svg";
import linkedin from "/svgs/aboutus/linkedin.svg";
import yticon from "/svgs/aboutus/yticon.svg";

const SocialLinks = () => (
  <div className={styles.social}>
    <a href="https://www.linkedin.com/company/oasis24-bits-pilani/"><img src={linkedin} /></a>
    <a href="https://www.youtube.com/@oasisbitspilani6375"><img src={yticon} /></a>
    <a href="https://twitter.com/bitsoasis"><img src={xicon} /></a>
    <a href="https://www.instagram.com/bitsoasis"><img src={instaicon} /></a>
  </div>
);

export default SocialLinks;
