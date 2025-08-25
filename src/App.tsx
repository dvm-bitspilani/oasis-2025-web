import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect, createContext } from "react";
import Preloader from "./pages/registration/components/Preloader/Preloader";
import Homepage from "./Homepage";
import Registration from "./pages/registration/Registration";
import DoorTransition from "./pages/components/page-transition/DoorTransition";
import AboutUs from "./pages/aboutus/AboutUs";
import Contact from "./pages/contact/ContactPage";
import ComingSoon from "./pages/comingSoon/ComingSoon";
import assetList from './assetList';

export const navContext = createContext<{goToPage?: (page: string) => void}>({});

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
    const path = location.pathname.replace("/", "");
    const pages = ["register", "events", "aboutus", "contact"]

    setCurrentPage(pages.includes(path) ? path as typeof currentPage : (path === "" ? "home" : "comingSoon"))
    setIsPreloading(Object.keys(assetList).includes(path))
    
  }, [location.pathname]);

  const handleDoorsClosed = async () => {
    setDoorPhase("waiting");

    const page = nextRoute.current?.replace("/", "");
    if (page && Object.keys(assetList).includes(page)) await loadAssets(page as keyof typeof assetList)
    console.log("Reached")

    if (nextRoute.current) {
      navigate(nextRoute.current, { state: { startAnimation: true } });
    }

    if (nextRoute.current && !(Object.keys(assetList)).includes(nextRoute.current)) {
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

  const loadAssets = async (page: keyof typeof assetList) => {
    
    const promises = [
      ...assetList[page].images.map((path) => (
        new Promise((resolve, reject) => {
          const image = new Image();
          image.src = path;
          image.onload = () => {resolve(image), console.log("loaded asset")};
          image.onerror = (error) => reject(error);
        })
      )),
      ...assetList[page].videos.map((path) => (
        new Promise((resolve, reject) => {
          const video = document.createElement("video");
          video.src = path;
          video.onloadeddata = () => resolve(video);
          video.onerror = (error) => reject(error);
        })
      )),
      
    ]

    await Promise.allSettled(promises)//.catch((error) => console.log(error))
    console.log("loaded")
  }

  return (
    <navContext.Provider value={{ goToPage }}>
      <DoorTransition
        phase={doorPhase}
        onClosed={handleDoorsClosed}
        onOpened={handleDoorsOpened}
        page={location.pathname}
      />

      {isPreloading && <Preloader onEnter={handlePreloaderEnter} targetLocation={nextRoute.current} />}

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
      {!isPreloading && currentPage === "aboutus" && <AboutUs goToPage={goToPage} />}
      {!isPreloading && currentPage === "contact" && <Contact />}
      {!isPreloading && currentPage === "comingSoon" && <ComingSoon />}
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
