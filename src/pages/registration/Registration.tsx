import { Helmet } from "react-helmet";
import styles from "./Registration.module.scss";

import Instructions from "../../pages/registration/components/Instructions/Instructions";
import Register from "../../pages/registration/components/Register/Register";
import Events from "../../pages/registration/components/Events/Events";

import bgExtend from "/images/registration/bg-extended.png";
import banner from "/svgs/registration/reg-banner.svg";
import bgMobile from "/svgs/registration/bg-mobile.svg";
import Back from "/svgs/registration/back.svg";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import BreadCrumb from "../components/breadCrumb/BreadCrumb";
interface RegistrationProps {
  startAnimation: boolean;
  goToPage: (path: string) => void;
}

const Registration = ({ goToPage }: RegistrationProps) => {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.bits-oasis.org/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Registration",
        item: "https://www.bits-oasis.org/register",
      },
    ],
  };
  const { contextSafe } = useGSAP();
  const [currentPage, setCurrentPage] = useState(1);
  const [userEmail, setUserEmail] = useState("");
  const [isAnim, setIsAnim] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [_cookies, setCookies] = useCookies([
    "Authorization",
    "user-auth",
    "Access_token",
  ]);

  const bgRef = useRef<HTMLImageElement>(null);
  const elemRef1 = useRef<HTMLDivElement>(null);
  const elemRef2 = useRef<HTMLDivElement>(null);
  const elemRef3 = useRef<HTMLDivElement>(null);

  const toFirstPage = () => {
    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 1200px) or (aspect-ratio > 1.45)",
      contextSafe(() => {
        gsap.to(bgRef.current, {
          left: "0",
          duration: 1.5,
          // ease: "power1.out",
          onStart: () => setIsAnim(true),
          onComplete: () => setIsAnim(false),
        });
        const tl = gsap.timeline();
        tl.to(elemRef2.current, {
          opacity: 0,
          duration: 1,
          ease: "power1.out",
        })
          .set(elemRef2.current, {
            display: "none",
            ease: "power1.out",
          })
          .set(elemRef1.current, {
            display: "flex",
            ease: "power1.out",
          })
          .to(elemRef1.current, {
            opacity: 1,
            duration: 1,
            ease: "power1.out",
            onComplete: () => setCurrentPage(1),
          });
      })
    );
    mm.add(
      "(max-width: 1200px) and (aspect-ratio < 1.45)",
      contextSafe(() => {
        const tl = gsap.timeline({
          onStart: () => setIsAnim(true),
        });
        tl.to(elemRef2.current, {
          opacity: 0,
          duration: 1,
          ease: "power1.out",
        })
          .set(elemRef2.current, {
            display: "none",
            ease: "power1.out",
          })
          .set(elemRef1.current, {
            display: "flex",
            ease: "power1.out",
          })
          .to(elemRef1.current, {
            opacity: 1,
            duration: 1,
            ease: "power1.out",
            onComplete: () => {
              setCurrentPage(1);
              setIsAnim(false);
            },
          });
      })
    );
  };

  function redirectWithPost(url: string, data: { [key: string]: string }) {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = url;

    // Add each key-value pair to the form
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = data[key];
        form.appendChild(input);
      }
    }

    document.body.appendChild(form);
    form.submit();
  }

  const toRegPage = (back: boolean) => {
    const mm = gsap.matchMedia();
    contextSafe(() => {
      mm.add("(min-width: 1200px) or (aspect-ratio > 1.45)", () => {
        gsap.to(bgRef.current, {
          left: "50%",
          duration: 1.5,
          // ease: "power1.out",
          onStart: () => setIsAnim(true),
          onComplete: () => setIsAnim(false),
        });
        const tl = gsap.timeline();
        tl.to(back ? elemRef3.current : elemRef1.current, {
          opacity: 0,
          duration: 1,
          ease: "power1.out",
        })
          .set(back ? elemRef3.current : elemRef1.current, {
            display: "none",
            ease: "power1.out",
          })
          .set(back ? elemRef2.current : elemRef2.current, {
            display: "flex",
            ease: "power1.out",
          })
          .to(back ? elemRef2.current : elemRef2.current, {
            opacity: 1,
            duration: 1,
            ease: "power1.out",
            onComplete: () => setCurrentPage(2),
          });
      });
      mm.add("(max-width: 1200px) and (aspect-ratio < 1.45)", () => {
        const tl = gsap.timeline({
          onStart: () => setIsAnim(true),
        });
        tl.to(back ? elemRef3.current : elemRef1.current, {
          opacity: 0,
          duration: 1,
          ease: "power1.out",
        })
          .set(back ? elemRef3.current : elemRef1.current, {
            display: "none",
            ease: "power1.out",
          })
          .set(back ? elemRef2.current : elemRef2.current, {
            display: "flex",
            ease: "power1.out",
          })
          .to(back ? elemRef2.current : elemRef2.current, {
            opacity: 1,
            duration: 1,
            ease: "power1.out",
            onComplete: () => {
              setCurrentPage(2);
              setIsAnim(false);
            },
          });
      });
    })();
  };

  useEffect(() => {
    document.body.style.position = "static";
  }, []);
  // useEffect(() => {
  //   // if (startAnimation) {
  //   toRegPage(false);
  //   setTimeout(() => {
  //     toEventPage();
  //   }, 2500);
  //   // }
  // }, []);
  // const prevWidth = useRef(window.innerWidth);
  // const prevHeight = useRef(window.innerHeight);

  // useEffect(() => {
  //   const handleResize = () => {
  //     const newWidth = window.innerWidth;
  //     const newHeight = window.innerHeight;

  //     const widthDiff = Math.abs(newWidth - prevWidth.current);
  //     const heightDiff = Math.abs(newHeight - prevHeight.current);

  //     if (widthDiff >= 100 || heightDiff >= 100) {
  //       window.location.reload();
  //     }
  //   };

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  const toEventPage = () => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1200px) or (aspect-ratio > 1.45)", () => {
      contextSafe(() => {
        gsap.to(bgRef.current, {
          left: "76%",
          duration: 1.5,
          // ease: "power1.out",
          onStart: () => setIsAnim(true),
          onComplete: () => setIsAnim(false),
        });
        const tl = gsap.timeline();
        tl.to(elemRef2.current, {
          opacity: 0,
          duration: 1,
          ease: "power1.out",
        })
          .set(elemRef2.current, {
            display: "none",
            ease: "power1.out",
          })
          .set(elemRef3.current, {
            display: "flex",
            ease: "power1.out",
          })
          .to(elemRef3.current, {
            opacity: 1,
            duration: 1,
            ease: "power1.out",
            onComplete: () => setCurrentPage(3),
          });
      })();
    });
    mm.add("(max-width: 1200px) and (aspect-ratio < 1.45)", () => {
      contextSafe(() => {
        const tl = gsap.timeline({
          onStart: () => setIsAnim(true),
        });
        tl.to(elemRef2.current, {
          opacity: 0,
          duration: 1,
          ease: "power1.out",
        })
          .set(elemRef2.current, {
            display: "none",
            ease: "power1.out",
          })
          .set(elemRef3.current, {
            display: "flex",
            ease: "power1.out",
          })
          .to(elemRef3.current, {
            opacity: 1,
            duration: 1,
            ease: "power1.out",
            onComplete: () => {
              setCurrentPage(3);
              setIsAnim(false);
            },
          });
      })();
    });
  };

  const backButtonHandler = () => {
    switch (currentPage) {
      case 1:
        goToPage("/");
        break;
      case 2:
        toFirstPage();
        break;
      case 3:
        toRegPage(true);
        break;
    }
  };

  const onGoogleSignIn = useGoogleLogin({
    onSuccess: (response) => {
      // console.log(response.access_token);
      axios
        .post("https://bits-oasis.org/2025/main/registrations/google-reg/", {
          access_token: response.access_token,
        })
        .then((res) => {
          setCookies("Access_token", response.access_token);
          if (res.data.exists) {
            setCookies("user-auth", res.data);
            setCookies("Authorization", res.data.tokens.access);
            // window.location.href = `https://bits-oasis.org/2025/main/registrations?token=${res.data.tokens.access}`;
            redirectWithPost("https://bits-oasis.org/2025/main/registrations", {
              token: res.data.tokens.access,
            });
            setUserEmail(res.data.email);
          } else {
            setCookies("user-auth", res.data);
            // setUserState({
            //   ...res.data,
            //   access_token: response.access_token,
            // });
            setUserEmail(res.data.email);
            if (res.data.email) toRegPage(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // onFailure: () => {
    //   console.error("Login failed");
    // },
  });

  return (
    <div className={styles.instrback}>
      {/* <img src={sun} alt="sun" className={styles.sun} ref={sunRef} /> */}
      {/* <div className={styles.overlay}></div> */}
      <Helmet>
        <title>Registration | OASIS 2025 | Whispers Of Edo</title>
        <meta
          name="description"
          content="Register for Oasis 2025, the annual cultural festival of BITS Pilani. Follow our simple instructions to sign up and start participating in events."
        />
        <link rel="canonical" href="https://www.bits-oasis.org/register" />
        {/* Open Graph */}
        <meta
          property="og:title"
          content="Registration | OASIS 2025 | Whispers Of Edo"
        />
        <meta
          property="og:description"
          content="Register for Oasis 2025, the annual cultural festival of BITS Pilani."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.bits-oasis.org/register" />
        <meta
          property="og:image"
          content="https://www.bits-oasis.org/logo2.png"
        />
        <meta property="og:site_name" content="OASIS 2025 | Whispers Of Edo" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Registration | OASIS 2025 | Whispers Of Edo"
        />
        <meta
          name="twitter:description"
          content="Register for Oasis 2025, the annual cultural festival of BITS Pilani."
        />
        <meta
          name="twitter:image"
          content="https://www.bits-oasis.org/logo2.png"
        />
      </Helmet>
      <BreadCrumb data={breadcrumbJsonLd} />
      <img
        src={
          window.matchMedia("(max-width: 1200px) and (max-aspect-ratio: 1.45) ")
            .matches
            ? bgMobile
            : bgExtend
        }
        alt="background"
        className={styles.backgroundImage}
        ref={bgRef}
      />
      <div className={styles.birds}>
        <img src={banner} alt="banner" className={styles.bannerImage} />
      </div>
      <button
        disabled={isAnim}
        onClick={backButtonHandler}
        className={styles.backBtn}
      >
        <img src={Back} alt="Back Button" />
      </button>

      <Instructions onGoogleSignIn={onGoogleSignIn} ref={elemRef1} />
      <Register
        ref={elemRef2}
        onClickNext={toEventPage}
        userEmail={userEmail}
        setUserData={setUserData}
      />
      <Events ref={elemRef3} userData={userData} setUserData={setUserData} />
    </div>
  );
};

export default Registration;
