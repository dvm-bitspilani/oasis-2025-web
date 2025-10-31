import styles from "./MediaPartners.module.scss";
import background from "/images/mediaPartners/bg1.jpg";
import heading from "/images/logo.png";
import dummy from "/images/logo.png";
import Back from "/svgs/registration/back.svg";
import { useContext } from "react";
import { navContext } from "../../App";

let mediaPatners = [
  {
    head: "Official Media Partner",
    img: dummy,
    name: "Campus Times Pune",
    link: "https://www.campustimespune.com/",
  },
  {
    head: "Official Media Partner",
    img: dummy,
    name: "Silicon India",
    link: "https://www.siliconindia.com/",
  },
  {
    head: "Official Media Partner",
    img: dummy,
    name: "Youth Inc",
    link: "https://youthincmag.com/",
  },
  {
    head: "Official Media Partner",
    img: dummy,
    name: "Sach Kahoon",
    link: "https://epaper.sachkahoon.com/",
  },
  {
    head: "Official Media Partner",
    img: dummy,
    name: "Zex PR",
    link: "https://zexprwire.com/",
  },
  {
    head: "Official Media Partner",
    img: dummy,
    name: "Sachi Shiksha",
    link: "https://sachishiksha.com/",
  },
  {
    head: "Official Media Partner",
    img: dummy,
    name: "DU Express",
    link: "https://duexpress.in/",
  },
  {
    head: "Official Media Partner",
    img: dummy,
    name: "Techstory",
    link: "https://techstory.in/",
  },
  {
    head: "Official Media Partner",
    img: dummy,
    name: "Rashtriya Sahara",
    link: "https://rashtriyasahara.com/indexnext.php",
  },
  {
    head: "Official Media Partner",
    img: dummy,
    name: "Computer Science Meme Yojana",
    link: "https://www.instagram.com/computer_science_meme_yojana?igsh=eHAzaXJxcTk3dmkx",
  },
  {
    head: "Official Media Partner",
    img: dummy,
    name: "ATP STAR",
    link: "https://atpstar.com/",
  },
  {
    head: "Official Coverage Partner",
    img: dummy,
    name: "Eclipse Media",
    link: "https://www.instagram.com/the.eclipse.media?igsh=MWkzanp2cmhxMjd3aA==",
  },
  {
    head: "Official Knowledge Partner",
    img: dummy,
    name: "Amar Ujala",
    link: "https://www.amarujala.com/",
  },
  {
    head: "Official Media Partner",
    img: dummy,
    name: "The Global Hues",
    link: "https://theglobalhues.com/",
  },
  {
    head: "Official Media Partner",
    img: dummy,
    name: "Fluxus, IIT Indore",
    link: "https://www.instagram.com/fluxus_iit_indore/?hl=en",
  },
];

const MediaPatners = () => {
  const { goToPage } = useContext(navContext);

  const backButtonHandler = () => {
    goToPage?.("/");
  };

  return (
    <>
      <div
        className={styles.Wrapper}
        style={{
          opacity: 1,
          transition: "opacity 0.8s ease-in-out",
        }}
      >
        <button onClick={backButtonHandler} className={styles.backBtn}>
          <img src={Back} alt="Back Button" />
        </button>
        <div className={styles.backgroundImage}>
          <img src={background} alt="background image" draggable={false} />
        </div>

        <div className={styles.heading}>
          <img src={heading} alt="heading" draggable={false} />
        </div>
        <div className={styles.mediaPatners}>
          <div className={styles.otherMediaPatners}>
            {mediaPatners.map((mediaPatner, index) => (
              <a
                href={mediaPatner.link}
                target="_blank"
                rel="noreferrer"
                draggable={false}
              >
                <div key={index} className={styles.mediaPatner}>
                  {mediaPatner.head != "" && (
                    <div className={styles.head}>{mediaPatner.head}</div>
                  )}
                  <div className={styles.patnersImage}>
                    <img
                      src={mediaPatner.img}
                      alt={mediaPatner.name}
                      draggable={false}
                    />
                  </div>
                  <div className={styles.patnersName}>{mediaPatner.name}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MediaPatners;
