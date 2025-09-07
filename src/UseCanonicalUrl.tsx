// useCanonicalUrl.ts
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useCanonicalUrl = (baseUrl: string) => {
  const location = useLocation();
  const BaseUrl = baseUrl;
  useEffect(() => {
    const canonicalUrl = BaseUrl + location.pathname;

    let canonicalLink: HTMLLinkElement | null = document.querySelector(
      "link[rel='canonical']"
    );

    if (canonicalLink) {
      canonicalLink.href = canonicalUrl;
    } else {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      canonicalLink.setAttribute("href", canonicalUrl);
      document.head.appendChild(canonicalLink);
    }

    // Optional cleanup if you want to remove the link tag on unmount or route change:
    return () => {
      if (canonicalLink && canonicalLink.parentNode) {
        canonicalLink.parentNode.removeChild(canonicalLink);
      }
    };
  }, [location.pathname, baseUrl]);
};

export default useCanonicalUrl;
