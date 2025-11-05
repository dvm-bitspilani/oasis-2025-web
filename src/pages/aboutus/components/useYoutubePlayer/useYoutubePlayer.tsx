import { useEffect, useRef, useState } from "react";

export const useYouTubePlayer = (videos: string[],containerRef: React.RefObject<HTMLDivElement | null>) => {
  const playerRef = useRef<any>(null);
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const initPlayer = () => {
      if (playerRef.current || !window.YT || !containerRef.current) return;

      playerRef.current = new window.YT.Player(containerRef.current, {
        height: "100%",
        width: "100%",
        videoId: videos[0],
        playerVars: { autoplay: 0, controls: 0, rel: 0, modestbranding: 1 },
        events: {
          onStateChange: (e: any) => {
            const s = window.YT.PlayerState;
            if (e.data === s.PLAYING) setIsPlaying(true);
            if (e.data === s.PAUSED) setIsPlaying(false);
            if (e.data === s.ENDED) nextVideo();
          },
        },
      });
    };

    if (window.YT && window.YT.Player) initPlayer();
    else {
      window.onYouTubeIframeAPIReady = initPlayer;
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    return () => playerRef.current?.destroy?.();
  }, [videos, containerRef]);

  const loadByIndex = (i: number) => {
    if (!playerRef.current) return;
    setCurrent(i);
    playerRef.current.loadVideoById(videos[i]);
  };

  const nextVideo = () => loadByIndex((current + 1) % videos.length);
  const prevVideo = () => loadByIndex((current - 1 + videos.length) % videos.length);

  const togglePlayPause = () => {
  if (!playerRef.current || !window.YT) return;
  const s = playerRef.current.getPlayerState();
  const YTState = window.YT.PlayerState;

  if (s === YTState.PLAYING) {
    playerRef.current.pauseVideo();
    setIsPlaying(false);
  } else {
    playerRef.current.playVideo();
    setIsPlaying(true); 
  }
};

  return { playerRef, current, isPlaying, nextVideo, prevVideo, togglePlayPause };
};
