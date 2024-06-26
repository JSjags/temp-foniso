import React, { useRef, useEffect, useState } from "react";
import { Maximize2, Minimize2, PauseIcon, Play } from "lucide-react";
import { FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  stopOuterPlay?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  stopOuterPlay = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const currentVideoRef = videoRef.current;
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // if (autoPlay) {
          currentVideoRef?.play();
          setIsPlaying(true);
          // }
        } else {
          currentVideoRef?.pause();
          setIsPlaying(false);
        }
      });
    }, options);

    if (currentVideoRef) {
      observer.observe(currentVideoRef);
    }

    // Cleanup
    return () => {
      if (currentVideoRef) {
        observer.unobserve(currentVideoRef);
      }
    };
  }, []);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current?.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const seekBar = e.currentTarget;
    const newTime =
      (e.nativeEvent.offsetX / seekBar.offsetWidth) *
      (videoRef.current?.duration || 0);
    setCurrentTime(newTime);
    videoRef.current!.currentTime = newTime;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const toggleMute = () => {
    videoRef.current!.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current!.requestFullscreen().catch((err) => {
        console.log(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        );
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.log(
          `Error attempting to exit full-screen mode: ${err.message} (${err.name})`
        );
      });
    }
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className="rounded-md">
      {/* Video element */}
      <video
        className="w-full h-full max-h-[80vh] rounded-md"
        poster={poster}
        controls={false}
        ref={videoRef}
        src={src}
        autoPlay={stopOuterPlay ?? isPlaying}
        loop
        muted={isMuted}
        onTimeUpdate={() => setCurrentTime(videoRef.current!.currentTime)}
      ></video>

      {/* Custom UI overlay */}
      <div className="absolute bottom-0 inset-0 flex flex-col items-start justify-end h-full rounded-md">
        <div onClick={(e) => e.stopPropagation()} className="w-full">
          {/* Seek bar */}
          <div className="flex items-center px-4" onClick={handleSeek}>
            <div className="bg-gray-400 h-1 w-full relative rounded-full">
              <div
                className="bg-white h-1 absolute rounded-full"
                style={{
                  width: `${
                    (currentTime / (videoRef.current?.duration || 1)) * 100
                  }%`,
                }}
              ></div>
              <div
                className="absolute h-4 w-4 bg-white rounded-full"
                style={{
                  left: `${
                    (currentTime / (videoRef.current?.duration || 1)) * 100
                  }%`,
                  transform: "translate(-50%, -40%)",
                }}
              ></div>
            </div>
          </div>
        </div>
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full h-fit bg-gradient-to-b from-black/0 to-black/70 flex justify-between p-3 px-4 pb-5 rounded-b-md"
        >
          <button
            className="hover:bg-transparent text-white font-bold py-0 px-4 rounded relative z-50 focus:ring-colorPrimary active:ring-colorPrimary focus:ring-offset-colorPrimary"
            onClick={handlePlayPause}
          >
            {isPlaying ? <PauseIcon /> : <Play />}
          </button>

          <div className="flex gap-x-2 items-center">
            <span className="ml-2 bg-[#0C0F0E]/80 hover:bg-[#0C0F0E] text-sm px-1 rounded-full text-white font-medium">
              {formatTime(currentTime)} /{" "}
              {formatTime(videoRef.current?.duration || 0)}
            </span>
            {/* Add more custom controls/buttons here */}
            <button
              className="bg-[#0C0F0E]/80 hover:bg-[#0C0F0E] text-white font-bold p-1 px-2 rounded-full"
              onClick={toggleFullScreen}
            >
              {isFullScreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
            <button
              className="bg-[#0C0F0E]/80 hover:bg-[#0C0F0E] text-white font-bold p-1 px-2 rounded-full"
              onClick={toggleMute}
            >
              {isMuted ? (
                <FaVolumeXmark size={14} fill="white" />
              ) : (
                <FaVolumeHigh size={14} fill="white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
