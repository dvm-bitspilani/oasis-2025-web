import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect, createContext, lazy, Suspense, useCallback, startTransition } from "react";

const Homepage = lazy(() => import("./Homepage"));
import RegistrationClosed from "./pages/components/RegistrationClosed";
const Registration = lazy(() => import("./pages/registration/Registration"));
const DoorTransition = lazy(() => import("./pages/components/page-transition/DoorTransition"));
const AboutUs = lazy(() => import("./pages/aboutus/AboutUs"));
const Contact = lazy(() => import("./pages/contact/ContactPage"));
const ComingSoon = lazy(() => import("./pages/comingSoon/ComingSoon"));

import useCanonicalUrl from "./UseCanonicalUrl";

// import Eventspage from "./pages/events/components/Eventspage";

const Events = lazy(() => import("./pages/events/Events"));

const routeImports = {
  aboutus: () => import("./pages/aboutus/AboutUs"),
  contact: () => import("./pages/contact/ContactPage"),
  comingSoon: () => import("./pages/comingSoon/ComingSoon"),
  events: () => import("./pages/events/Events"),
  brochure: () => import("./pages/brochure/Brochure"),
  sponsors: () => import("./pages/sponsers/Sponers"),
  mediaPartners: () => import("./pages/mediaPartners/MediaPartners"),
  gallery: () => import("./pages/gallery/Gallery"),
};
const routeCache = new Map<string, Promise<unknown>>();
function preloadRoute(path: string) {
  const key = path.replace(/^\/|\/$/g, "") as keyof typeof routeImports;
  if (!(key in routeImports)) return Promise.resolve();
  if (!routeCache.has(key)) routeCache.set(key, routeImports[key]().catch(error => {routeCache.delete(key); throw error}));
  return routeCache.get(key)!;
}
export const navContext = createContext<{ goToPage?: (page: string) => void; preloadPage?: (page: string) => void }>(
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
  const [registrationClosed, setRegistrationClosed] = useState(false);
  const [routeError, setRouteError] = useState(false);

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

  const handleDoorsClosed = useCallback(async () => {
    const target = nextRoute.current;
    if (!target) return;
    setDoorPhase("waiting");
    try {
      await preloadRoute(target);
      startTransition(() => navigate(target, {state:{startAnimation:true}}));
      // Keep the covered screen until React can commit the already downloaded page.
      requestAnimationFrame(() => requestAnimationFrame(() => setDoorPhase("opening")));
    } catch {
      setRouteError(true);
      setDoorPhase("opening");
    }
    setDoorPLPercentageLoaded(100);
  }, [navigate]);

  const handleDoorsOpened = useCallback(() => {
    setDoorPhase("idle");
    nextRoute.current = null;
    setDoorPLPercentageLoaded(0);
  }, []);

  const goToPage = (path: string) => {
    if (path === "/register") { setRegistrationClosed(true); return; }
    if (doorPhase !== "idle" || location.pathname === path) return;
    setRouteError(false);
    void preloadRoute(path).catch(() => {});
    nextRoute.current = path;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      void preloadRoute(path).then(() => startTransition(() => navigate(path))).catch(() => setRouteError(true));
    } else setDoorPhase("closing");
  };



  return (
    <navContext.Provider value={{ goToPage, preloadPage: path => {void preloadRoute(path).catch(() => {})} }}>
      {registrationClosed && <RegistrationClosed onClose={() => setRegistrationClosed(false)} />}
      {routeError && <div className="route-error" role="alert">This page could not load. <button onClick={() => window.location.reload()}>Reload</button><button onClick={() => {setRouteError(false); setDoorPhase("idle"); nextRoute.current = null; navigate("/")}}>Home</button></div>}
      {doorPhase !== "idle" && <Suspense fallback={null}><DoorTransition
        phase={doorPhase}
        onClosed={handleDoorsClosed}
        onOpened={handleDoorsOpened}
        percentageLoaded={doorPLPercentageLoaded}
        targetPageRef={nextRoute}
      /></Suspense>}
      <Suspense fallback={<div className="page-loading" role="status">Loading…</div>}>
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
