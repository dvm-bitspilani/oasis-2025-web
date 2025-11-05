// import Landing from "./pages/landingRevamp/LandingRevamp";
import DrawingPreloader from "./pages/components/drawingPreloader/DrawingPreloader";
import useOverlayStore from "./utils/store";
import LandingRevamp from "./pages/landingRevamp/LandingRevamp";
import { Helmet } from "react-helmet";
import BreadCrumb from "./pages/components/breadCrumb/BreadCrumb";
import bgMusic from "/sounds/bg-music2.mp3";
import { useRef } from "react";
export default function Homepage({
  goToPage,
}: {
  goToPage: (path: string) => void;
}) {
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
    ],
  };
  const removeGif = useOverlayStore((state) => state.removeGif);
  const audioRef = useRef<HTMLAudioElement>(null);
  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };
  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };
  return (
    <div>
      <Helmet>
        <title> OASIS 2025 | Whispers Of Edo</title>
        <meta
          name="description"
          content="The official website of Oasis 2025 | Whispers Of Edo. Asia's Largest Student-Run College Cultural Festival returns for its 53rd edition in 2025! Est. 1971"
        />
        <link rel="canonical" href="https://www.bits-oasis.org/" />
        {/* Open Graph */}
        <meta property="og:title" content=" OASIS 2025 | Whispers Of Edo" />
        <meta
          property="og:description"
          content="The official website of Oasis 2025 | Whispers Of Edo. Asia's Largest Student-Run College Cultural Festival returns for its 53rd edition in 2025! Est. 1971"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.bits-oasis.org/" />
        <meta
          property="og:image"
          content="https://www.bits-oasis.org/logo2.png"
        />
        <meta property="og:site_name" content="OASIS 2025 | Whispers Of Edo" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content=" OASIS 2025 | Whispers Of Edo" />
        <meta
          name="twitter:description"
          content=" Asia's Largest Student-Run College Cultural Festival returns for its 53rd edition in 2025! Est. 1971"
        />
        <meta
          name="twitter:image"
          content="https://www.bits-oasis.org/logo2.png"
        />
      </Helmet>
      <BreadCrumb data={breadcrumbJsonLd} />
      <div
        style={
          removeGif ? { display: "none" } : { zIndex: 50, position: "relative" }
        }
      >
        <DrawingPreloader onEnter={playMusic} />
      </div>
      <audio
        src={bgMusic}
        loop
        ref={(el) => {
          audioRef.current = el;
          if (el) el.volume = 0.2; // set volume between 0.0 and 1.0
        }}
      />
      <div style={{ zIndex: 100, position: "relative" }}>
        <LandingRevamp
          goToPage={goToPage}
          onToggle={toggleMusic}
          audioRef={audioRef}
        />
      </div>
    </div>
  );
}
