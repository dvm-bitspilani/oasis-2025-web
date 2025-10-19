import styles from "./Contact.module.scss";
import { useEffect, useRef, useState } from "react";
import door1 from "/images/contact/Door1.png";
import door2 from "/images/contact/Door2.png";
import door1mobile from "/images/contact/Door1Mobile.png";
import door2mobile from "/images/contact/Door2Mobile.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import contactBanner from "/images/contact/contact-banner.png";
import contacts from "./components/contactGallery/contacts";
// import ContactGallery from './components/contactGallery/ContactGallery';
import { FaEnvelope } from "react-icons/fa6";
import debouncedHandler from "../../utils/debounce";

interface ContactDoorsProps {
  pinElemRef: React.RefObject<HTMLDivElement | null>;
  triggerElemRef: React.RefObject<HTMLDivElement | null>;
}

interface HoriBarDetails {
  numOfBars: number;
  firstBarPos: number;
  barGap: number;
}

export default function ContactDoors({
  pinElemRef,
  triggerElemRef,
}: ContactDoorsProps) {
  const door1Ref = useRef<HTMLDivElement>(null);
  const door2Ref = useRef<HTMLDivElement>(null);
  const contactBannerRef = useRef<HTMLImageElement>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null);
  // const galleryContentRef = useRef<HTMLDivElement>(null);
  const horiBarDetailsRef = useRef<HoriBarDetails | null>(null);

  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 900);
  const [isTab, setIsTab] = useState<boolean>(window.innerWidth <= 1300);

  // const launchPhone = (phone: string) => window.location.href = `tel:${phone}`;
  const launchEmail = (email: string) =>
    (window.location.href = `mailto:${email}`);

  const calculateHoriBarPos = (contactItems: HTMLCollection) => {
    // const contactItems = document.getElementsByClassName(styles.contactItem);
    const firstRowItem = contactItems[0];
    const firstRowRelPos = firstRowItem.getBoundingClientRect().top;

    const secondRowItem = contactItems[window.innerWidth <= 1300 ? 1 : 3];

    if (!secondRowItem) return;
    const secondRowRelPos = secondRowItem.getBoundingClientRect().top;

    // const barGapThreshold = 100;
    let barGap = Math.round(secondRowRelPos - firstRowRelPos);
    // if (barGap > barGapThreshold)
    barGap = barGap / 2; //Math.round(barGap / 100);

    const firstRowAbsPos =
      firstRowRelPos - (door1Ref.current?.getBoundingClientRect().top || 0);

    const firstBarPos = Math.round(firstRowAbsPos % barGap);
    const numOfBars = Math.round(
      (door1Ref.current?.clientHeight || 0 - firstBarPos || 0) / barGap
    );

    // if (setHoriBarDetails) setHoriBarDetails({numOfBars, firstBarPos, barGap})
    horiBarDetailsRef.current = { numOfBars, firstBarPos, barGap };
  };

  const { contextSafe } = useGSAP();
  const animateContactItems = contextSafe((angle: number) => {
    const angleLimit = 30;
    if (Math.abs(angle) >= angleLimit) return;

    gsap.to(`.${styles.contactItemsLeft}`, { rotateZ: angle });
    gsap.to(`.${styles.contactItemsRight}`, { rotateZ: -angle });
  });

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.normalizeScroll(true);

    const animateContactBanner = (animation: gsap.TimelineVars) =>
      gsap.to(contactBannerRef.current, { ...animation, duration: 0.3 });

    const doorTimeLine = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElemRef.current,
        // start: `+=${(triggerElemRef.current?.clientHeight || 0) - window.innerHeight}`,
        start: "bottom bottom",
        end: () => `+=${window.innerHeight}`,
        scrub: isMobile ? true : 0.5,
        pin: pinElemRef.current,
        pinSpacing: false,
        invalidateOnRefresh: true,
        // anticipatePin: 1,
        // fastScrollEnd: 1,
        // onEnter: calculateHoriBarPos,
        onLeave: () => {
          animateContactBanner({ y: "0%", autoAlpha: 1 });
          animateContactItems(0);
          gsap.set(`.${styles.contactSection}`, { pointerEvents: "all" });
        },
        onEnterBack: () => {
          animateContactBanner({ y: "-100%", autoAlpha: 0 });
          gsap.set(`.${styles.contactSection}`, { pointerEvents: "none" });
        },
        snap: {
          snapTo: [0, 1],
          directional: false,
        },
        onUpdate: (self) => {
          const scrollVelocity = self.getVelocity();
          const swingSensitivity = 0.003;

          animateContactItems(scrollVelocity * swingSensitivity);
        },
      },
    });

    doorTimeLine
      .from(door1Ref.current, { x: "-120%" }, 0)
      .from(door2Ref.current, { x: "120%" }, 0)
      .to(
        document.body,
        {
          "--navlink-color": "#ffdfd0",
          reverse: true,
        },
        0
      );
    // .from(galleryContentRef.current, {autoAlpha: 0})

    // if (contactSectionRef.current) contactSectionRef.current.style.transform = "translateY(-100vh)"//`translateY(${-((pinElemRef.current?.clientHeight || 0) - (contactSectionRef.current?.clientHeight || 0))})`
  });

  useEffect(() => {
    const contactItems = document.getElementsByClassName(styles.contactItem);

    const handleResize = () => {
      // location.reload()
      const newIsTab = window.innerWidth <= 1300;
      const newIsMobile = window.innerWidth <= 900;
      if (newIsTab !== isTab) setIsTab(newIsTab);
      if (newIsMobile !== isMobile) setIsMobile(newIsMobile);
      calculateHoriBarPos(contactItems);
      // ScrollTrigger.update();
      ScrollTrigger.refresh();
      animateContactItems(0);
      // if (windowWidth.current !== window.innerWidth) location.reload();
    };

    const debouncedHandleResize = debouncedHandler(handleResize, 1000);

    calculateHoriBarPos(contactItems);

    (window.visualViewport || window).addEventListener(
      "resize",
      debouncedHandleResize
    );
    
    return () =>
      (window.visualViewport || window).removeEventListener(
        "resize",
        debouncedHandleResize
      );
  }, []);

  // useEffect(() => {
  //     ScrollTrigger.refresh();
  //     // ScrollTrigger.update();
  // }, [isMobile, isTab])

  // useEffect(() => console.log("ContactDoors just unmounted"), []);

  return (
    <div className={styles.contactSection} ref={contactSectionRef}>
      <div className={styles.contactSectionContent}>
        <div className={styles.contactHeading}>
          <img
            className={styles.contactBanner}
            alt="contactBanner"
            src={contactBanner}
            ref={contactBannerRef}
          ></img>
        </div>
        <div className={styles.contactDoors}>
          <div
            className={styles.contactDoor}
            ref={door1Ref}
            style={{
              backgroundImage: `url('${isMobile ? door1mobile : door1}')`,
            }}
          >
            {/* <img className={styles.contactDoorImg} src={door1} /> */}
            <div className={styles.horiBarContainer}>
              {Array(horiBarDetailsRef.current?.numOfBars)
                .fill(null)
                .map((_, i) => (
                  <div
                    className={styles.horiBar}
                    key={i}
                    style={{
                      top: `${
                        i * (horiBarDetailsRef.current?.barGap || 0) +
                        (horiBarDetailsRef.current?.firstBarPos || 0)
                      }px`,
                    }}
                  >
                    {Array(2)
                      .fill(null)
                      .map(() => (
                        <div />
                      ))}
                  </div>
                ))}
            </div>
            <div className={styles.contactsContainer}>
              {(isTab
                ? contacts.filter((_, i) => i % 2 === 0)
                : contacts.slice(0, 4)
              ).map((contact, index) => (
                <div
                  className={`${styles.contactItem} ${styles.contactItemsLeft}`}
                  key={index}
                >
                  <div className={styles.contactCard}>
                    <div className={styles.contactImgContainer}>
                      <img src={contact.imageURL} alt={contact.name} />
                    </div>
                    <div className={styles.contactDetails}>
                      <div className={styles.contactName} title={contact.name}>
                        {contact.name}
                      </div>
                      <div
                        className={styles.contactPosition}
                        title={contact.role}
                      >
                        {contact.role}
                      </div>
                      <div className={styles.contactLinks}>
                        {/* <div className={styles.contactPhone} onClick={() => launchPhone(contact.phone)}><FaPhone className={styles.contactIcon} /></div> */}
                        <div
                          className={styles.contactEmail}
                          onClick={() => launchEmail(contact.email)}
                        >
                          <FaEnvelope className={styles.contactIcon} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className={styles.contactDoor}
            ref={door2Ref}
            style={{
              backgroundImage: `url('${isMobile ? door2mobile : door2}')`,
            }}
          >
            {/* <img className={styles.contactDoorImg} src={door2} /> */}
            <div className={styles.horiBarContainer}>
              {Array(horiBarDetailsRef.current?.numOfBars)
                .fill(null)
                .map((_, i) => (
                  <div
                    className={styles.horiBar}
                    key={i}
                    style={{
                      top: `${
                        i * (horiBarDetailsRef.current?.barGap || 0) +
                        (horiBarDetailsRef.current?.firstBarPos || 0)
                      }px`,
                    }}
                  >
                    {Array(2)
                      .fill(null)
                      .map(() => (
                        <div />
                      ))}
                  </div>
                ))}
            </div>
            <div className={styles.contactsContainer}>
              {(isTab
                ? contacts.filter((_, i) => i % 2 === 1)
                : contacts.slice(4, 8)
              ).map((contact, index) => (
                <div
                  className={`${styles.contactItem} ${styles.contactItemsRight}`}
                  key={index}
                >
                  <div className={styles.contactCard}>
                    <div className={styles.contactImgContainer}>
                      <img src={contact.imageURL} alt={contact.name} />
                    </div>
                    <div className={styles.contactDetails}>
                      <div className={styles.contactName} title={contact.name}>
                        {contact.name}
                      </div>
                      <div
                        className={styles.contactPosition}
                        title={contact.role}
                      >
                        {contact.role}
                      </div>
                      <div className={styles.contactLinks}>
                        {/* <div className={styles.contactPhone} onClick={() => launchPhone(contact.phone)}><FaPhone className={styles.contactIcon} /></div> */}
                        <div
                          className={styles.contactEmail}
                          onClick={() => launchEmail(contact.email)}
                        >
                          <FaEnvelope className={styles.contactIcon} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <div className={styles.contactSectionContent} ref={galleryContentRef}>
                <ContactGallery />
            </div> */}
    </div>
  );
}
