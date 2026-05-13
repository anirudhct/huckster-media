import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import ScreenFitText from "../shared/ScreenFitText";
import HeroVideo from "../shared/HeroVideo";

const bgClasses = ["bg-red", "bg-pink", "bg-yellow", "bg-green", "bg-cyan"];

export default function HomeHero() {
  const heroRef = useRef(null);
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgClasses.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Split HAPPEN into individual letters
  const happenText = "HAPPEN".split("");

  return (
    <motion.div
      className="flex min-h-screen flex-col justify-center gap-5 text-center sm:justify-end mb-20"
      initial={{ scale: 1.35, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* marquee container */}
      <motion.div
        ref={heroRef}
        className={`w-full overflow-hidden whitespace-nowrap transition-colors duration-500 ${bgClasses[bgIndex]}`}
      >
        <span className="sr-only">We're here to make it</span>

        <motion.div
          className="font-anton flex w-max text-[45vw] leading-none text-white sm:text-[48vw]"
          transition={{
            duration: 10,
            ease: "linear",
            repeat: Infinity,
          }}
          animate={{ x: ["0%", "-50%"] }}
        >
          <HeroText />
          <HeroText />
          <HeroText />
          <HeroText />
        </motion.div>
      </motion.div>

      {/* HAPPEN — Bloom/Morph effect with increased size (75% instead of 65%) */}
      <div className="relative py-8 my-4 scale-[0.95] -mt-10">
        <ScreenFitText padding stagger={false} slam={false}>
          <div className="relative inline-flex items-center justify-center ">
            <span className="font-anton text-center leading-none tracking-tighter inline-flex ">
              {happenText.map((char, index) => (
                <span
                  key={index}
                  className="inline-block animate-bloom"
                  style={{ animationDelay: `${0.8 + index * 0.12}s` }}
                >
                  {char}
                </span>
              ))}
            </span>
          </div>
        </ScreenFitText>
      </div>

      {/* Video fades in last */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <HeroVideo />
      </motion.div>

      {/* Add keyframe animation styles */}
      <style>{`
        .animate-bloom {
          opacity: 0;
          display: inline-block;
          animation: bloom 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        @keyframes bloom {
          0% { 
            transform: scale(1.3); 
            filter: blur(40px); 
            opacity: 0; 
          }
          40% { 
            opacity: 1; 
          }
          100% { 
            transform: scale(1); 
            filter: blur(0px); 
            opacity: 1; 
          }
        }
      `}</style>
    </motion.div>
  );
}

function HeroText() {
  return (
    <h1 className="font-anton flex shrink-0 items-center gap-5 px-5 py-2 text-2xl leading-none sm:px-8 sm:py-3 sm:text-[8vw] md:px-10">
      <span>We're here to make it</span>
    </h1>
  );
}