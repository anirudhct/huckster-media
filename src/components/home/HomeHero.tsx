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

      {/* HAPPEN — Left to right sequential animation */}
      <div className="relative py-8 my-4 scale-[0.95] -mt-10">
        <ScreenFitText padding stagger={false} slam={false}>
          <div className="relative inline-flex items-center justify-center overflow-visible">
            <span className="font-anton text-center leading-none inline-flex items-center justify-center" style={{ letterSpacing: '0.15em' }}>
              {happenText.map((char, index) => {
                // All letters animate left to right in order
                return (
                  <span
                    key={index}
                    className="inline-flex items-center justify-center animate-bloom"
                    style={{ 
                      // Sequential delay from left to right: H=0s, A=0.12s, P=0.24s, P=0.36s, E=0.48s, N=0.6s
                      animationDelay: `${index * 0.12}s`,
                      marginRight: index !== happenText.length - 1 ? '0.1em' : '0',
                      willChange: 'transform, filter',
                      backfaceVisibility: 'hidden',
                      WebkitFontSmoothing: 'antialiased',
                    }}
                  >
                    {char}
                  </span>
                );
              })}
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

      {/* Keyframe animations */}
      <style>{`
        .animate-bloom {
          opacity: 0;
          animation: bloom 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-origin: center center;
        }
        
        @keyframes bloom {
          0% { 
            transform: scale(1.2); 
            filter: blur(30px); 
            opacity: 0; 
          }
          30% { 
            filter: blur(15px);
          }
          60% { 
            opacity: 1;
            filter: blur(5px);
          }
          100% { 
            transform: scale(1); 
            filter: blur(0px); 
            opacity: 1; 
          }
        }

        .overflow-visible {
          overflow: visible !important;
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