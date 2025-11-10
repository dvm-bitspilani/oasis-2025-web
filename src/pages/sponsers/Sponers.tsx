import styles from "./Sponsers.module.scss";
import background from "/images/mediaPartners/bg1.jpg";
import heading from "/svgs/sponsors/sponsorsHead.svg";
// import dummy from "/images/logo.png";
import Back from "/svgs/registration/back.svg";
import { useContext } from "react";
import { navContext } from "../../App";

import abhibusLogo from "/images/sponsors/abhibus.png";
import easeMyTripLogo from "/images/sponsors/EaseMyTrip.png";
import nutribs from "/images/sponsors/Nutribs.png";
import qoneqt from "/images/sponsors/Qoneqt.png";
import suno from "/images/sponsors/Suno.png";
import rtc from "/images/sponsors/rtc.jpg";
import acer from "/images/sponsors/acer_logo.avif";
import snapchat from "/images/sponsors/Snapchat.png";
import zebronics from "/images/sponsors/Zebronics.avif";
import maaKarni from "/images/sponsors/maa-karni.jpg";
import plumGoodness from "/images/sponsors/plum-goodness.png";
import posterwa from "/images/sponsors/posterwa.png";
import travelzada from "/images/sponsors/travelzada.jpeg";
import hdfcBank from "/images/sponsors/hdfc.png";
import peeSafe from "/images/sponsors/pee-safe.png";
import plumBodyLovin from "/images/sponsors/plum-body-lovin.png";
import pepero from "/images/sponsors/pepero.jpeg";
import jioSaavn from "/images/sponsors/jio-saavn.png";
import cocaCola from "/images/sponsors/coke.png";
import artisbaazi from "/images/sponsors/artisbaazi.png";
import gustora from "/images/sponsors/gustora.webp";
import netApp from "/images/sponsors/netApp.png";

//nothing is changed

const sponsors = {
  title: {
    head: "Official Title Sponsor",
    img: netApp,
    name: "NetApp",
    link: "https://www.netapp.com/",
  },
  otherSponsers: [
    // {
    //   head: "Powered-By",
    //   img: dummy,
    //   name: "NetApp",
    //   link: "",
    // },
    {
      head: "Associate Title Sponsor",
      img: acer,
      name: "Acer",
      link: "https://www.acer.com",
    },
    {
      head: "Diamond Sponsor",
      img: suno,
      name: "Suno AI",
      link: "https://suno.com/",
    },
    {
      head: "Co-Powered By",
      img: snapchat,
      name: "Snap Inc.",
      link: "https://www.snap.com/",
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
      head: "Official Partner",
      img: zebronics,
      name: "Zebronics",
      link: "https://zebronics.com/",
    },
    {
      head: "Official Travel Partner",
      img: easeMyTripLogo,
      name: "EaseMyTrip",
      link: "https://www.easemytrip.com/",
    },
    {
      head: "Official Infrastructure Partner",
      img: maaKarni,
      name: "Maa Karni",
      link: "",
    },
    {
      head: "Official Beauty and Wellness Partner",
      img: plumGoodness,
      name: "Plum Goodness",
      link: "https://plumgoodness.com/",
    },
    {
      head: "Official Commute Partner",
      img: abhibusLogo,
      name: "Abhibus",
      link: "https://www.abhibus.com/",
    },
    {
      head: "",
      img: posterwa,
      name: "Posterwa",
      link: "https://posterwa.com/",
    },
    {
      head: "",
      img: travelzada,
      name: "Travelzada",
      link: "",
    },
    {
      head: "Official Banking Partner",
      img: hdfcBank,
      name: "HDFC Bank",
      link: "https://www.hdfc.bank.in/",
    },
    {
      head: "Pasta Partner",
      img: gustora,
      name: "Gustora",
      link: "https://www.gustorafoods.com/",
    },
    {
      head: "Official Music Streaming Partner",
      img: jioSaavn,
      name: "JioSaavn",
      link: "https://www.jiosaavn.com/",
    },
    {
      head: "Official Beverage Partner",
      img: cocaCola,
      name: "Coca-Cola",
      link: "https://www.coca-colacompany.com/",
    },
    {
      head: "Official Technology Partner",
      img: rtc,
      name: "Round The Technologies",
      link: "https://rtctek.com/",
    },
    {
      head: "Official Hygiene Partner",
      img: peeSafe,
      name: "Pee Safe",
      link: "https://www.peesafe.com/",
    },
    {
      head: "Bath and BodyCare Partner",
      img: plumBodyLovin,
      name: "Plum Body Lovin'",
      link: "",
    },
    {
      head: "Official Snack Partner",
      img: pepero,
      name: "Pepero",
      link: "",
    },
    {
      head: "",
      img: artisbaazi,
      name: "Artisbaazi",
      link: "",
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
