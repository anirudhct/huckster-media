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

      {/* HAPPEN — letter by letter fade-up animation */}
      <motion.div
        initial={{ scale: 1.35, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 1.8,
          delay: 0.3,
          ease: [0.1, 1, 0.25, 1],
        }}
      >
        <ScreenFitText
          padding
          stagger={false}
          slam={false}
          letterStagger={true}
        >
          HAPPEN
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
  );
}

function HeroText() {
  return (
    <h1 className="font-anton flex shrink-0 items-center gap-5 px-5 py-2 text-2xl leading-none sm:px-8 sm:py-3 sm:text-[8vw] md:px-10">
      <h1>We're here to make it</h1>
    </h1>
  );
}

// // New component for letter-by-letter fade-up animation
// function LetterByLetterText({ text }: { text: string }) {
//   const letters = text.split("");

//   return (
//     <span className="inline-flex">
//       {letters.map((letter, i) => (
//         <motion.span
//           key={i}
//           initial={{ y: 30, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{
//             duration: 0.4,
//             delay: i * 0.08,
//             ease: [0.33, 1, 0.68, 1],
//           }}
//           style={{ display: "inline-block" }}
//         >
//           {letter === " " ? "\u00A0" : letter}
//         </motion.span>
//       ))}
//     </span>
//   );
// }

export function TextFlip({ children }: { children: string }) {
  const { ref, inView } = useInView({ threshold: 0.2 });
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
            duration: 0.4,
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
