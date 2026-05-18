import { useState, useEffect } from "react";
import Img from "../ui/Image";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const getVideoSrc = (video?: string) => {
  if (!video) return "";
  if (video.startsWith("http") || video.startsWith("/")) return video;
  return `${import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "")}/${video}`;
};

export default function PlayVideo() {
  const [show, setShow] = useState(false);
  const { data } = useSiteSettings();
  const videoSrc = getVideoSrc(data?.data?.recapVideo);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  return (
    <>
      <div className="relative overflow-hidden rounded-t-4xl">
        {videoSrc && (
          <video
            loop
            playsInline
            muted
            autoPlay
            className="absolute -z-10 h-full w-full object-cover"
          >
            <source src={videoSrc} />
          </video>
        )}
        <div className="font-anton ml-[-2.5%] flex h-full min-h-[60vh] flex-col justify-between pt-3 uppercase sm:min-h-[87vh] sm:pt-0 lg:min-h-screen lg:flex-row lg:items-center lg:justify-between">
          <div className="flex h-[60vh] w-full items-center justify-center sm:h-[87vh] sm:text-[3vw]">
            <button
              className="m-auto h-auto w-[4rem] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 sm:w-[7.5rem]"
              disabled={!videoSrc}
              onClick={() => setShow(true)}
            >
              <video preload="metadata" playsInline>
                <source src="/assets/play.webm" type="video/mp4" />
              </video>
            </button>
          </div>
        </div>
      </div>

      {/* YOUTUBE IFRAME - FULLSCREEN & AUTOPLAY */}
      {show && (
        <div 
          className="fixed inset-0 z-[9999] h-screen w-screen bg-black"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShow(false);
          }}
        >
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/KsVSO9laB3k?si=ZabX4Wyld5OEvItx&autoplay=1&mute=1&controls=1&modestbranding=1&rel=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="h-full w-full"
          ></iframe>

          {/* Close button - Bottom Right Corner */}
          <button
            onClick={() => setShow(false)}
            className="fixed bottom-4 right-4 z-[10000] cursor-pointer duration-300 hover:rotate-[720deg] bg-black/50 hover:bg-black/70 rounded-full p-2 sm:bottom-6 sm:right-6 backdrop-blur-sm"
            style={{ 
              pointerEvents: "auto",
              position: "fixed",
              zIndex: 99999
            }}
          >
            <Img src="/assets/close.png" className="size-10 sm:size-14 2xl:size-20" />
          </button>
        </div>
      )}
    </>
  );
}