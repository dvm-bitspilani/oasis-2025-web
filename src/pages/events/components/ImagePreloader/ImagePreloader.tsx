import { useEffect, useState } from "react";
import Logo from "/svgs/events/oasis_logo.svg";
interface EventImageProps {
  imageUrl?: string;
  alt?: string;
  className?: string;
  previewClass?: string;
}

const EventImage: React.FC<EventImageProps> = ({
  imageUrl,
  alt = "Event image",
  className,
  previewClass,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  useEffect(() => {
    setImageLoaded(false);
    if (!imageUrl) return;
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(false);
  }, [imageUrl]);
  if (!imageLoaded) {
    return (
      <img src={Logo} alt="Loading placeholder" className={previewClass} />
    );
  }
  return <img src={imageUrl} alt={alt} className={className} />;
};
export default EventImage;
