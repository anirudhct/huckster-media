import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useInView } from "react-intersection-observer";
import ScreenFitText from "../shared/ScreenFitText";
import HeroVideo from "../shared/HeroVideo";

const bgClasses = ["bg-red", "bg-pink", "bg-yellow", "bg-green", "bg-cyan"];

export default function HomeHero() {
  const heroRef = useRef(null);
  const [bgIndex, setBgIndex] = useState(0);
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  // Kinetic scaling based on scroll
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1.2, 0.9]);
  const letterSpacing = useTransform(scrollYProgress, [0, 0.5, 1], ["-0.02em", "0.1em", "-0.01em"]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgClasses.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={targetRef}>
      <motion.div
        className="flex min-h-[calc(100dvh-3.5rem)] flex-col justify-center gap-5 text-center sm:justify-end"
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

        {/* HAPPEN — SVG displacement + RGB glitch + kinetic scroll (reduced size by 15%) */}
        <motion.div
          style={{ scale, letterSpacing }}
          className="relative scale-[0.85]"
        >
          <ScreenFitText padding stagger={false} slam={false}>
            <SVGDisplacementGlitchText text="HAPPEN" />
          </ScreenFitText>
        </motion.div>

        {/* Video fades in last */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <HeroVideo />
        </motion.div>
      </motion.div>
    </div>
  );
}

function HeroText() {
  return (
    <h1 className="font-anton flex shrink-0 items-center gap-5 px-5 py-2 text-2xl leading-none sm:px-8 sm:py-3 sm:text-[8vw] md:px-10">
      <span>We're here to make it</span>
    </h1>
  );
}

// SVG Displacement + RGB Glitch + Kinetic Text Component (no opacity fading on the text itself)
function SVGDisplacementGlitchText({ text }: { text: string }) {
  const [isGlitching, setIsGlitching] = useState(false);
  const filterId = useRef(`glitch-${Math.random().toString(36).substr(2, 9)}`);
  
  // Random glitch trigger every 2-5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 120);
    }, Math.random() * 3000 + 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative inline-block">
      {/* SVG Filter Definition */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id={filterId.current} x="-20%" y="-20%" width="140%" height="140%">
            {/* Turbulence for displacement map - creates the "wobbly/water" distortion */}
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.04" 
              numOctaves="3" 
              result="noise"
              seed={Math.floor(Math.random() * 100)}
            >
              {isGlitching && (
                <animate 
                  attributeName="baseFrequency" 
                  values="0.04;0.12;0.04;0.08;0.04" 
                  dur="0.15s" 
                  repeatCount="indefinite" 
                />
              )}
            </feTurbulence>
            
            {/* Displacement map that creates the wobbly/stretching effect */}
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="noise" 
              scale={isGlitching ? 20 : 5}
              xChannelSelector="R" 
              yChannelSelector="G"
              result="displaced"
            >
              {isGlitching && (
                <animate 
                  attributeName="scale" 
                  values="5;20;15;25;10;5" 
                  dur="0.2s" 
                  repeatCount="indefinite" 
                />
              )}
            </feDisplacementMap>
          </filter>
        </defs>
      </svg>

      {/* Main text with displacement filter - ALWAYS VISIBLE, no fade */}
      <div 
        className="relative font-anton tracking-tighter"
        style={{ 
          filter: `url(#${filterId.current})`,
        }}
      >
        <span className="relative z-10">{text}</span>
      </div>

      {/* RGB Chromatic Aberration Layers - they appear only during glitch, but base text stays */}
      {/* Red channel */}
      <motion.div
        className="absolute inset-0 font-anton tracking-tighter text-red-500/90"
        style={{ left: "4px" }}
        animate={{
          x: isGlitching ? [0, -4, 3, -2, 5, -3, 2, 0] : 0,
          y: isGlitching ? [0, 1, -2, 2, -1, 0] : 0,
          opacity: isGlitching ? [0, 1, 0.8, 1, 0.5, 0] : 0,
        }}
        transition={{ duration: 0.12, ease: "linear" }}
      >
        {text}
      </motion.div>

      {/* Green channel */}
      <motion.div
        className="absolute inset-0 font-anton tracking-tighter text-green-500/90"
        style={{ left: "0px" }}
        animate={{
          x: isGlitching ? [0, 2, -3, 4, -2, 3, -1, 0] : 0,
          y: isGlitching ? [0, -1, 2, -2, 1, 0] : 0,
          opacity: isGlitching ? [0, 1, 0.7, 0.9, 0.4, 0] : 0,
        }}
        transition={{ duration: 0.1, ease: "linear", delay: 0.02 }}
      >
        {text}
      </motion.div>

      {/* Blue channel */}
      <motion.div
        className="absolute inset-0 font-anton tracking-tighter text-blue-500/90"
        style={{ left: "-4px" }}
        animate={{
          x: isGlitching ? [0, -2, 4, -3, 2, -4, 1, 0] : 0,
          y: isGlitching ? [0, 2, -1, -2, 1, 0] : 0,
          opacity: isGlitching ? [0, 1, 0.8, 0.9, 0.6, 0] : 0,
        }}
        transition={{ duration: 0.14, ease: "linear", delay: 0.01 }}
      >
        {text}
      </motion.div>

      {/* CSS Keyframes-style jitter - separate slices for scanline glitch effect */}
      {isGlitching && (
        <>
          <motion.div
            className="absolute inset-0 overflow-hidden font-anton tracking-tighter"
            style={{ clipPath: "inset(5% 0 85% 0)" }}
            animate={{
              x: [0, -5, 3, -2, 4, -3, 2, 0],
              skewX: [0, 5, -3, 4, -2, 0],
            }}
            transition={{ duration: 0.08, repeat: 2 }}
          >
            {text}
          </motion.div>
          <motion.div
            className="absolute inset-0 overflow-hidden font-anton tracking-tighter"
            style={{ clipPath: "inset(45% 0 45% 0)" }}
            animate={{
              x: [0, 4, -3, 5, -2, 3, -1, 0],
              skewX: [0, -4, 3, -5, 2, 0],
            }}
            transition={{ duration: 0.07, repeat: 2, delay: 0.03 }}
          >
            {text}
          </motion.div>
          <motion.div
            className="absolute inset-0 overflow-hidden font-anton tracking-tighter"
            style={{ clipPath: "inset(75% 0 15% 0)" }}
            animate={{
              x: [0, -3, 5, -4, 2, -2, 1, 0],
              skewX: [0, 3, -5, 4, -3, 0],
            }}
            transition={{ duration: 0.09, repeat: 2, delay: 0.05 }}
          >
            {text}
          </motion.div>
        </>
      )}
    </div>
  );
}

export function TextFlip({ children }: { children: string }) {
  const { ref, inView } = useInView({ threshold: 0.5 });
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (inView) setCycle((c) => c + 1);
  }, [inView]);

  const letters = children.split("");

  return (
    <span ref={ref} className="inline-block">
      {letters.map((letter, i) => (
        <motion.span
          key={`${cycle}-${i}`}
          className="relative inline-block [transform-style:preserve-3d]"
          initial={{ rotateX: 90 }}
          animate={{ rotateX: 0 }}
          transition={{
            duration: 0.6,
            delay: i * 0.06,
            ease: "easeInOut",
          }}
        >
          <span className="block [backface-visibility:hidden]">
            {letter === " " ? "\u00A0" : letter}
          </span>
          <span className="absolute inset-0 block rotate-x-180 [backface-visibility:hidden]">
            {letter === " " ? "\u00A0" : letter}
          </span>
        </motion.span>
      ))}
    </span>
  );
}