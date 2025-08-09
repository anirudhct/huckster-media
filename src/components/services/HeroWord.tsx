import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";

const letters = "HUCKSTER".split("");
const ROW_COUNT = 5;

export default function HeroWord() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div className="h-[300vh] overflow-hidden bg-black text-white">
      <div
        ref={containerRef}
        className="sticky top-0 flex h-screen flex-col items-center justify-center perspective-[1000px]"
      >
        {Array.from({ length: ROW_COUNT }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex">
            {letters.map((letter, letterIndex) => {
              const progressStart = rowIndex * 0.15;
              const progressEnd = progressStart + 0.2;

              const translateY = useTransform(
                scrollYProgress,
                [progressStart, progressEnd],
                ["0%", "-150%"],
              );

              const rotateX = useTransform(
                scrollYProgress,
                [progressStart, progressEnd],
                ["0deg", `${360 + letterIndex * 5}deg`],
              );

              const opacity = useTransform(
                scrollYProgress,
                [progressStart, progressEnd],
                [0, 1],
              );

              const springY = useSpring(translateY, {
                stiffness: 80,
                damping: 20,
              });
              const springRotate = useSpring(rotateX, {
                stiffness: 80,
                damping: 20,
              });

              return (
                <motion.span
                  key={letterIndex}
                  style={{
                    translateY: springY,
                    rotateX: springRotate,
                    opacity,
                    transformStyle: "preserve-3d",
                  }}
                  whileHover={{
                    rotateX: "+=180deg",
                    transition: { duration: 0.6 },
                  }}
                  className="font-anton px-1 text-[10vw] leading-none will-change-transform sm:text-[12vw]"
                >
                  {letter}
                </motion.span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
