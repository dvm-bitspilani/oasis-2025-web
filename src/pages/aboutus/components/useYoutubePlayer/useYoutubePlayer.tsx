import {useEffect, useRef, useState} from "react";
let apiPromise: Promise<void> | undefined;
function loadApi() {
  if (window.YT?.Player) return Promise.resolve();
  if (!apiPromise) apiPromise = new Promise<void>((resolve, reject) => {
    const old = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {old?.(); resolve()};
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.onerror = () => {apiPromise = undefined; script.remove(); reject(new Error("Video unavailable"))};
    document.body.appendChild(script);
  });
  return apiPromise;
}
export const useYouTubePlayer = (videos: string[], containerRef: React.RefObject<HTMLDivElement | null>) => {
  const playerRef = useRef<any>(null);
  const mounted = useRef(true);
  const pending = useRef(false);
  const currentRef = useRef(0);
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {mounted.current = true; return () => {mounted.current = false; playerRef.current?.destroy?.(); playerRef.current = null}}, []);
  const loadByIndex = (index: number) => {
    currentRef.current = index; setCurrent(index);
    playerRef.current?.loadVideoById(videos[index]);
  };
  const nextVideo = () => loadByIndex((currentRef.current + 1) % videos.length);
  const prevVideo = () => loadByIndex((currentRef.current - 1 + videos.length) % videos.length);
  const togglePlayPause = async () => {
    if (pending.current) return;
    if (playerRef.current) {
      if (playerRef.current.getPlayerState() === window.YT.PlayerState.PLAYING) playerRef.current.pauseVideo();
      else playerRef.current.playVideo();
      return;
    }
    pending.current = true; setError(false);
    try {
      await loadApi();
      if (!mounted.current || !containerRef.current) return;
      const mount = document.createElement("div"); containerRef.current.replaceChildren(mount);
      playerRef.current = new window.YT.Player(mount, {
        host: "https://www.youtube-nocookie.com", height: "100%", width: "100%", videoId: videos[currentRef.current],
        playerVars: {autoplay: 1, controls: 1, rel: 0},
        events: {
          onReady: () => {pending.current = false; playerRef.current?.playVideo()},
          onError: () => {pending.current = false; setError(true)},
          onStateChange: (event: any) => {if(!mounted.current) return; setIsPlaying(event.data === window.YT.PlayerState.PLAYING); if(event.data === window.YT.PlayerState.ENDED) nextVideo()},
        }
      });
    } catch {if(mounted.current) setError(true); pending.current = false}
  };
  return {playerRef, current, isPlaying, nextVideo, prevVideo, togglePlayPause, error};
};
