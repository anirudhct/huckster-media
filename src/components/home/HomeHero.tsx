import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";

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

  return (
    <motion.div
      className="relative w-full overflow-hidden -mt-25 mb-10 pb-8 sm:pb-0"
      initial={{ scale: 1.35, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── HAPPEN video — base layer, full width, never cropped ── */}
      <video
        src="/assets/HAPPEN-TEXT-VIDEO.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="block w-full h-auto"
      />

      {/* ── Sliding strip — starts below the fixed header ── */}
      <motion.div
        ref={heroRef}
        className={`absolute left-0 w-full overflow-hidden whitespace-nowrap transition-colors duration-500
          top-[72px] mt-0 sm:top-[88px] sm:mt-20
          2xl:top-[clamp(72px,8vw,120px)] 2xl:mt-0
          ${bgClasses[bgIndex]}`}
      >
        <span className="sr-only">We're here to make it</span>

        <motion.div
          className="font-anton flex w-max leading-none text-white
                     text-[8vw]
                     sm:text-[10vw]
                     md:text-[9vw]"
          transition={{ duration: 10, ease: "linear", repeat: Infinity }}
          animate={{ x: ["0%", "-50%"] }}
        >
          <HeroText />
          <HeroText />
          <HeroText />
          <HeroText />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function HeroText() {
  return (
    <h1 className="font-anton flex shrink-0 items-center gap-5 px-5 py-1.5 leading-none sm:px-8 sm:py-2 md:px-10">
      We're here to make it
    </h1>
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
          transition={{ duration: 0.6, delay: i * 0.06, ease: "easeInOut" }}
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