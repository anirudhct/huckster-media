import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
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

  return (
    <div className="flex min-h-[calc(100dvh-3.5rem)] flex-col justify-center gap-5 text-center sm:justify-end">
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

      <ScreenFitText padding>HAPPEN</ScreenFitText>

      <HeroVideo />
    </div>
  );
}

function HeroText() {
  return (
    <h1 className="font-anton flex shrink-0 items-center gap-5 px-5 py-2 text-2xl leading-none sm:px-8 sm:py-3 sm:text-[8vw] md:px-10">
      <h1>We're here to make it</h1>
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
          transition={{
            duration: 0.6,
            delay: i * 0.06,
            ease: "easeInOut",
          }}
        >
          {/* Front face */}
          <span className="block [backface-visibility:hidden]">
            {letter === " " ? "\u00A0" : letter}
          </span>

          {/* Back face */}
          <span className="absolute inset-0 block rotate-x-180 [backface-visibility:hidden]">
            {letter === " " ? "\u00A0" : letter}
          </span>
        </motion.span>
      ))}
    </span>
  );
}
