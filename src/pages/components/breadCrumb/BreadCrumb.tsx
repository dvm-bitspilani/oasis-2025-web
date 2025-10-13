// src/components/JsonLd.tsx
import { useEffect } from "react";

interface JsonLdProps {
  data: object;
}

const BreadCrumb: React.FC<JsonLdProps> = ({ data }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [data]);

  return null;
};

export default BreadCrumb;
