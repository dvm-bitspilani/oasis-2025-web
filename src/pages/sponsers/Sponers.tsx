import styles from "./Sponsers.module.scss";
import background from "/images/mediaPartners/bg1.jpg";
import heading from "/images/logo.png";
import dummy from "/images/logo.png";
import Back from "/svgs/registration/back.svg";
import { useContext } from "react";
import { navContext } from "../../App";

const sponsors = {
  title: {
    head: "Official Title Sponsor",
    img: dummy,
    name: "L&T",
    link: "https://www.larsentoubro.com/",
  },
  otherSponsers: [
    {
      head: "Official Powered by Sponsor",
      img: dummy,
      name: "Micron",
      link: "https://www.micron.com/",
    },
    {
      head: "Official Technology Partner",
      img: dummy,
      name: "Arcesium",
      link: "https://www.arcesium.com/",
    },
    {
      head: "Official Platinum Partner",
      img: dummy,
      name: "QSW",
      link: "https://quicksmartwash.com/",
    },
    {
      head: "Official Bath and Body Care Partner",
      img: dummy,
      name: "Plum",
      link: "https://plumgoodness.com/",
    },
    {
      head: "Official Music Streaming Partner",
      img: dummy,
      name: "JioSaavn",
      link: "https://www.jiosaavn.com/",
    },
    {
      head: "",
      img: dummy,
      name: "Unicorn India",
      link: "https://www.unicornivc.com/",
    },
    {
      head: "",
      img: dummy,
      name: "IIC",
      link: "https://iic.mic.gov.in/login",
    },
    {
      head: "",
      img: dummy,
      name: "XTCY",
      link: "https://drinkxtcy.com/",
    },
    // {
    //   head: "",
    //   img: dummy,
    //   name: "ICFDR",
    //   link: "https://icfdr.org/",
    // },
    {
      head: "",
      img: dummy,
      name: "ICICI Bank",
      link: "https://www.icicibank.com/",
    },
    {
      head: "",
      img: dummy,
      name: "EaseMyTrip",
      link: "https://www.easemytrip.com/flights.html?msclkid=4e959a8a43391623fe37fd68f1fdb553&utm_source=bing&utm_medium=cpc&utm_campaign=Bing_Search_AllAudience_%20Brand%20(EaseMyTrip.Com)&utm_term=easemytrip&utm_content=EaseMyTrip%20Exact",
    },
    // {
    //   head: "",
    //   img: dummy,
    //   name: "Yana",
    //   link: "https://yana.travel/tabs/hosted-trips",
    // },
    {
      head: "",
      img: dummy,
      name: "Umeed Social and Economic Development",
      link: "https://umeedfoundation.co.in/",
    },
    {
      head: "",
      img: dummy,
      name: "Unstop",
      link: "https://unstop.com/",
    },
    {
      head: "",
      img: dummy,
      name: "StockGro",
      link: "https://www.stockgro.club/",
    },
    {
      head: "Official Assessment Partner",
      img: dummy,
      name: "Languify",
      link: "https://www.languify.in/",
    },
    {
      head: "Campus Ambassador Partner",
      img: dummy,
      name: "Etasha",
      link: "https://www.etashasociety.org/",
    },
    {
      head: "Official Savings Partner",
      img: dummy,
      name: "GrabOn",
      link: "https://www.grabon.in/",
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
