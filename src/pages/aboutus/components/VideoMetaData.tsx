import React from "react";
import { Helmet } from "react-helmet";

interface VideoMetadataType {
  videoId: string;
  title: string;
  description: string;
  uploadDate: string;
}

const VideoMetaData: React.FC<VideoMetadataType> = ({
  videoId,
  title,
  description,
  uploadDate,
}) => {
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: title,
    description,
    thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    uploadDate,
    contentUrl: videoUrl,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};

export default VideoMetaData;
