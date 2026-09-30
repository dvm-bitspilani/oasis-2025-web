import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect, createContext, lazy, Suspense, useCallback } from "react";

import Homepage from "./Homepage";
const Registration = lazy(() => import("./pages/registration/Registration"));
import DoorTransition from "./pages/components/page-transition/DoorTransition";
const AboutUs = lazy(() => import("./pages/aboutus/AboutUs"));
const Contact = lazy(() => import("./pages/contact/ContactPage"));
const ComingSoon = lazy(() => import("./pages/comingSoon/ComingSoon"));

import useCanonicalUrl from "./UseCanonicalUrl";

// import Eventspage from "./pages/events/components/Eventspage";

const Events = lazy(() => import("./pages/events/Events"));

export const navContext = createContext<{ goToPage?: (page: string) => void }>(
  {}
);


const Brochure = lazy(() => import("./pages/brochure/Brochure"));
const Sponsors = lazy(() => import("./pages/sponsers/Sponers"));
const MediaPatners = lazy(() => import("./pages/mediaPartners/MediaPartners"));
const Gallery = lazy(() => import("./pages/gallery/Gallery"));

export default function App() {
  useCanonicalUrl("https://oasis2025.bits-oasis.org");
  const navigate = useNavigate();
  const location = useLocation();

  interface LocationState {
    startAnimation?: boolean;
  }



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

  const isPreloading = false;

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

  }, [location.pathname]);

  const handleDoorsClosed = useCallback(() => {
    if (nextRoute.current) navigate(nextRoute.current, {state:{startAnimation:true}});
    setDoorPLPercentageLoaded(100);
    setDoorPhase("opening");
  }, [navigate]);

  const handleDoorsOpened = useCallback(() => {
    setDoorPhase("idle");
    nextRoute.current = null;
    setDoorPLPercentageLoaded(0);
  }, []);

  const goToPage = (path: string) => {
    if (location.pathname !== path) {
      nextRoute.current = path;
      setDoorPhase("closing");
    }
  };


  return (
    <navContext.Provider value={{ goToPage }}>
      <div className="portfolio-archive" role="note">OASIS 2025 · Portfolio archive · Registration demo only</div>
      <DoorTransition
        phase={doorPhase}
        onClosed={handleDoorsClosed}
        onOpened={handleDoorsOpened}
        percentageLoaded={doorPLPercentageLoaded}
        targetPageRef={nextRoute}
      />
      <Suspense fallback={<div className="archive-loading">Opening archived page…</div>}>
      <h1 style={{ display: "none" }}>OASIS 2025 | Whispers Of Edo</h1>


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
    </Suspense>
    </navContext.Provider>
  );
}
