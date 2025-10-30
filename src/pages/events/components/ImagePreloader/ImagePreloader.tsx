import React, { useState } from "react";
import styles from "./ImagePreloader.module.scss"
const ImagePreloader: React.FC<{ src: string; alt?: string }> = ({ src, alt }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div style={{ position: "relative", width: "300px", height: "200px" }}>
      {/* Preloader (shown while loading) */}
      {loading && (
        <div
          style={{
            position: "absolute",
            // backgroundColor: "#f0f0f0",
          }}
        > 
          <div className={styles.spinner} />
        </div>
      )}

      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoading(false)}
        style={{
          objectFit: "cover",
          opacity: loading ? 0 : 1,
          transition: "opacity 0.4s ease-in-out",
        }}
        className={styles.imagenew}
      />
    </div>
  );
};

export default ImagePreloader;
