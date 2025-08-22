import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Preloader from "./pages/registration/components/Preloader/Preloader";
import Homepage from "./Homepage";
import Registration from "./pages/registration/Registration";
import DoorTransition from "./pages/components/page-transition/DoorTransition";
import AboutUs from "./pages/aboutus/AboutUs";
import Contact from "./pages/contact/ContactPage";
import ComingSoon from "./pages/comingSoon/ComingSoon";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  interface LocationState {
    startAnimation?: boolean;
  }

  const [currentPage, setCurrentPage] = useState<
    "home" | "register" | "events" | "aboutus" | "contact" | "comingSoon"
  >(
    location.pathname === "/"
      ? "home"
      : location.pathname === "/register"
      ? "register"
      : location.pathname === "/events"
      ? "events"
      : location.pathname === "/aboutus"
      ? "aboutus"
      : location.pathname === "/contact"
      ? "contact"
      : "comingSoon"
  );

  const [doorPhase, setDoorPhase] = useState<
    "idle" | "closing" | "waiting" | "opening"
  >("idle");

  const [isPreloading, setIsPreloading] = useState(location.pathname !== "/");

  const nextRoute = useRef<string | null>(null);

  useEffect(() => {
    const path = location.pathname;

    if (path === "/") {
      setCurrentPage("home");
      setIsPreloading(false);
    } else if (path === "/register") {
      setCurrentPage("register");
      setIsPreloading(true);
    } else if (path === "/events") {
      setCurrentPage("events");
      setIsPreloading(true);
    } else if (path === "/aboutus") {
      setCurrentPage("aboutus");
      setIsPreloading(true);
    } else if (path === "/contact") {
      setCurrentPage("contact");
      setIsPreloading(true);
    } else {
      setCurrentPage("comingSoon");
      setIsPreloading(false);
    }
  }, [location.pathname]);

  const handleDoorsClosed = () => {
    setDoorPhase("waiting");

    if (nextRoute.current) {
      navigate(nextRoute.current, { state: { startAnimation: true } });
    }

    if (nextRoute.current === "/register") {
    } else {
      setTimeout(() => {
        setDoorPhase("opening");
      }, 500);
    }
  };

  const handleDoorsOpened = () => {
    setDoorPhase("idle");
    nextRoute.current = null;
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

  return (
    <>
      <DoorTransition
        phase={doorPhase}
        onClosed={handleDoorsClosed}
        onOpened={handleDoorsOpened}
        page={location.pathname}
      />

      {isPreloading && <Preloader onEnter={handlePreloaderEnter} />}

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

      {!isPreloading && currentPage === "events" && <ComingSoon />}
      {!isPreloading && currentPage === "aboutus" && <AboutUs />}
      {!isPreloading && currentPage === "contact" && <Contact />}
      {!isPreloading && currentPage === "comingSoon" && <ComingSoon />}

      <Routes>
        <Route path="/" element={null} errorElement={<ComingSoon />} />
        <Route path="/events" element={null} errorElement={<ComingSoon />} />
        <Route path="/register" element={null} />
        <Route path="/events" element={null} />
        <Route path="/aboutus" element={null} />
        <Route path="/comingSoon" element={null} />
      </Routes>
    </>
  );
}
