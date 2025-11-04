import styles from "./Sponsers.module.scss";
import background from "/images/mediaPartners/bg1.jpg";
import heading from "/svgs/sponsors/sponsorsHead.svg";
import dummy from "/images/logo.png";
import Back from "/svgs/registration/back.svg";
import { useContext } from "react";
import { navContext } from "../../App";

import abhibusLogo from "/images/sponsors/abhibus.png";
import easeMyTripLogo from "/images/sponsors/EaseMyTrip.png";
import nutribs from "/images/sponsors/Nutribs.png";
import qoneqt from "/images/sponsors/Qoneqt.png";
import suno from "/images/sponsors/Suno.png";
import rtc from "/images/sponsors/rtc.jpg";
import snapchat from "/images/sponsors/Snapchat.png";

const sponsors = {
  title: {
    head: "Official Title Sponsor",
    img: dummy,
    name: "L&T",
    link: "https://www.larsentoubro.com/",
  },
  otherSponsers: [
    {
      head: "Powered-By",
      img: dummy,
      name: "NetApp",
      link: "",
    },
    {
      head: "Diamond Sponsor",
      img: suno,
      name: "Suno AI",
      link: "",
    },
    {
      head: "Official Skincare Partner",
      img: nutribs,
      name: "Nutribs",
      link: "https://nutribs.com/",
    },
    {
      head: "Official Community Partner",
      img: qoneqt,
      name: "Qoneqt",
      link: "https://qoneqt.com/",
    },
    {
      head: "Co-Powered By",
      img: snapchat,
      name: "Snap Inc.",
      link: "https://www.snap.com/",
    },
    {
      head: "Official Partner",
      img: dummy,
      name: "Zebronics",
      link: "",
    },
    {
      head: "Official Travel Partner",
      img: easeMyTripLogo,
      name: "EaseMyTrip",
      link: "https://www.easemytrip.com/",
    },
    {
      head: "Official Infrastructure Partner",
      img: dummy,
      name: "Maa Karni",
      link: "",
    },
    {
      head: "",
      img: dummy,
      name: "Plum",
      link: "",
    },
    {
      head: "Official Commute Partner",
      img: abhibusLogo,
      name: "Abhibus",
      link: "https://www.abhibus.com/",
    },
    {
      head: "",
      img: dummy,
      name: "Posterwa",
      link: "",
    },
    {
      head: "",
      img: dummy,
      name: "Travelzada",
      link: "",
    },
    {
      head: "",
      img: dummy,
      name: "HDFC Bank",
      link: "",
    },
    {
      head: "Pasta Partner",
      img: dummy,
      name: "Gustora",
      link: "",
    },
    {
      head: "Official Music Streaming Partner",
      img: dummy,
      name: "JioSaavn",
      link: "",
    },
    {
      head: "",
      img: dummy,
      name: "Coca-Cola",
      link: "",
    },
    {
      head: "Official Technology Partner",
      img: rtc,
      name: "Round The Technologies",
      link: "https://rtctek.com/",
    },
  ],
};

const Sponsors = () => {
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
        <div className={styles.buttonWrapper}></div>

        <div className={styles.backgroundImage}>
          <img src={background} alt="background image" draggable={false} />
        </div>

        <div className={styles.heading}>
          <img src={heading} alt="heading" draggable={false} />
        </div>
        <div className={styles.sponsors}>
          <a
            href={sponsors.title.link}
            target="_blank"
            rel="noreferrer"
            draggable={false}
          >
            <div className={styles.titleSponsor}>
              <div className={styles.head}>{sponsors.title.head}</div>
              <div className={styles.titleSponsImage}>
                <img
                  src={sponsors.title.img}
                  alt={sponsors.title.name}
                  draggable={false}
                />
              </div>
              <div className={`${styles.titleSponsName} ${styles.sponsName}`}>
                {sponsors.title.name}
              </div>
            </div>
          </a>

          <div className={styles.otherSponsors}>
            {sponsors.otherSponsers.map((sponsor, index) => (
              <a
                href={sponsor.link}
                target="_blank"
                rel="noreferrer"
                key={index}
                draggable={false}
              >
                <div className={styles.otherSponsor}>
                  <div
                    className={
                      sponsor.head
                        ? styles.head
                        : `${styles.head} ${styles.other}`
                    }
                  >
                    {sponsor.head}
                  </div>

                  <div
                    className={`${styles.otherSponsImage} ${styles.sponsImage}`}
                  >
                    <img
                      src={sponsor.img}
                      alt={sponsor.name}
                      draggable={false}
                    />
                  </div>
                  <div
                    className={`${styles.otherSponsName} ${styles.sponsName}`}
                  >
                    {sponsor.name}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sponsors;
