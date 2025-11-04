import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect, createContext } from "react";
import Preloader from "./pages/registration/components/Preloader/Preloader";
import Homepage from "./Homepage";
import Registration from "./pages/registration/Registration";
import DoorTransition from "./pages/components/page-transition/DoorTransition";
import AboutUs from "./pages/aboutus/AboutUs";
import Contact from "./pages/contact/ContactPage";
import ComingSoon from "./pages/comingSoon/ComingSoon";
import assetList from "./assetList";
import useCanonicalUrl from "./UseCanonicalUrl";

// import Eventspage from "./pages/events/components/Eventspage";

import Events from "./pages/events/Events";

export const navContext = createContext<{ goToPage?: (page: string) => void }>(
  {}
);

import ReactGA from "react-ga4";
import Brochure from "./pages/brochure/Brochure";
import Sponsors from "./pages/sponsers/Sponers";
import MediaPatners from "./pages/mediaPartners/MediaPartners";
import Gallery from "./pages/gallery/Gallery";

const TRACKING_ID = "G-57YBBH7RXW";
if (window.location.hostname.search("bits-oasis.org") !== -1) {
  ReactGA.initialize(TRACKING_ID);
  console.log("Hey :)");
}

export default function App() {
  useCanonicalUrl("https://www.bits-oasis.org");
  const navigate = useNavigate();
  const location = useLocation();

  interface LocationState {
    startAnimation?: boolean;
  }

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
  }, [location]);

  const pageList = [
    "home",
    "register",
    "events",
    "aboutus",
    "contact",
    "brochure",
    "sponsors",
    "mediaPartners",
    "gallery",
  ];

  const [currentPage, setCurrentPage] = useState<
    (typeof pageList)[number] | "comingSoon"
  >(
    location.pathname === "/"
      ? "home"
      : pageList.includes(location.pathname.replace("/", ""))
      ? location.pathname.replace("/", "")
      : "comingSoon"
  );
  console.log("Current Page:", currentPage);

  const [doorPhase, setDoorPhase] = useState<
    "idle" | "closing" | "waiting" | "opening"
  >("idle");
  const [doorPLPercentageLoaded, setDoorPLPercentageLoaded] =
    useState<number>(0);

  const [isPreloading, setIsPreloading] = useState(location.pathname !== "/");

  const nextRoute = useRef<string | null>(null);

  useEffect(() => {
    const path = location.pathname.replace("/", "");
    // const pages = ["register", "events", "aboutus", "contact", "brochure"];

    setCurrentPage(
      pageList.includes(path)
        ? (path as typeof currentPage)
        : path === ""
        ? "home"
        : "comingSoon"
    );
    setIsPreloading(Object.keys(assetList).includes(path));
  }, [location.pathname]);

  const handleDoorsClosed = async () => {
    setDoorPhase("waiting");

    const page = nextRoute.current?.replace("/", "");
    if (page && Object.keys(assetList).includes(page))
      await loadAssets(page as keyof typeof assetList);
    // await new Promise((resolve) => setTimeout(resolve, 10000))

    if (nextRoute.current) {
      navigate(nextRoute.current, { state: { startAnimation: true } });
    }

    if (
      nextRoute.current &&
      !Object.keys(assetList).includes(nextRoute.current)
    ) {
      setTimeout(() => {
        setDoorPhase("opening");
      }, 500);
    }
  };

  const handleDoorsOpened = () => {
    setDoorPhase("idle");
    nextRoute.current = null;
    setDoorPLPercentageLoaded(0);
  };

  const goToPage = (path: string) => {
    if (location.pathname !== path) {
      nextRoute.current = path;
      setDoorPhase("closing");
    }
  };

  const handlePreloaderEnter = () => {
    setIsPreloading(false);

    if (location.pathname === "/register") {
      setTimeout(() => {
        setDoorPhase("opening");
      }, 300);
    }
  };

  const loadAssets = async (page: keyof typeof assetList) => {
    const handleLoadedAsset = (callback: (param?: any) => void) => {
      setDoorPLPercentageLoaded((prev) => prev + 100 / promises.length);
      callback();
    };

    const promises = [
      ...assetList[page].images.map(
        (path) =>
          new Promise((resolve, reject) => {
            const image = new Image();
            image.src = path;
            image.onload = () => handleLoadedAsset(() => resolve(image));
            image.onerror = () => handleLoadedAsset((error) => reject(error));
          })
      ),
      ...assetList[page].videos.map(
        (path) =>
          new Promise((resolve, reject) => {
            const video = document.createElement("video");
            video.src = path;
            video.onloadeddata = () => handleLoadedAsset(() => resolve(video));
            video.onerror = () => handleLoadedAsset((error) => reject(error));
          })
      ),
    ];

    await Promise.allSettled(promises); //.catch((error) => console.log(error))
    console.log("loaded");
  };

  return (
    <navContext.Provider value={{ goToPage }}>
      <DoorTransition
        phase={doorPhase}
        onClosed={handleDoorsClosed}
        onOpened={handleDoorsOpened}
        percentageLoaded={doorPLPercentageLoaded}
        targetPageRef={nextRoute}
      />
      <h1 style={{ display: "none" }}>OASIS 2025 | Whispers Of Edo</h1>
      {isPreloading && (
        <Preloader
          onEnter={handlePreloaderEnter}
          targetLocation={nextRoute.current}
        />
      )}

      {!isPreloading && currentPage === "home" && (
        <Homepage goToPage={goToPage} />
      )}

      {!isPreloading && currentPage === "register" && (
        <Registration
          goToPage={goToPage}
          startAnimation={
            (location.state as LocationState)?.startAnimation || false
          }
        />
      )}

      {!isPreloading && currentPage === "events" && <Events />}
      {!isPreloading && currentPage === "aboutus" && <AboutUs />}
      {!isPreloading && currentPage === "contact" && <Contact />}
      {!isPreloading && currentPage === "brochure" && <Brochure />}
      {!isPreloading && currentPage === "gallery" && <Gallery />}
      {!isPreloading && currentPage === "comingSoon" && <ComingSoon />}
      {!isPreloading && currentPage === "sponsors" && <Sponsors />}
      {!isPreloading && currentPage === "mediaPartners" && <MediaPatners />}
      {/* 
      <Routes>
        <Route path="/" element={null} errorElement={<ComingSoon />} />
        <Route path="/events" element={null} errorElement={<ComingSoon />} />
        <Route path="/register" element={null} />
        <Route path="/events" element={null} />
        <Route path="/contact" element={null} />
        <Route path="/aboutus" element={null} />
        <Route path="/comingSoon" element={null} />
      </Routes> */}
    </navContext.Provider>
  );
}
