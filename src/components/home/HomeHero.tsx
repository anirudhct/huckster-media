import { useInView } from "react-intersection-observer";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import ScreenFitText from "../shared/ScreenFitText";

const bgClasses = ["bg-red", "bg-pink", "bg-yellow", "bg-green", "bg-cyan"];
export default function HomeHero() {
  const heroRef = useRef(null);
  const { ref: inViewRef, inView: heroInView } = useInView({
    triggerOnce: false,
  });
  const setRefs = (node: any) => {
    heroRef.current = node;
    inViewRef(node);
  };

  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgClasses.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-[calc(100dvh-3.5rem)] flex-col justify-center gap-5 text-center sm:justify-end">
      <motion.div
        ref={setRefs}
        className={`w-full overflow-hidden whitespace-nowrap transition-colors duration-500 ${bgClasses[bgIndex]}`}
      >
        <span className="sr-only">We're here to make it</span>
        {heroInView && (
          <motion.div
            className="font-anton flex w-full text-[45vw] leading-none text-white sm:text-[48vw]"
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity,
            }}
            initial={{ translateX: 0 }}
            animate={{ x: ["0%", "-200%"] }}
          >
            {[1, 2, 3, 4].map((i) => (
              <h1
                key={`a-${i}`}
                className="font-anton flex shrink-0 items-center gap-10 px-5 py-2 text-2xl leading-none sm:px-8 sm:py-3 sm:text-[8vw] md:px-10"
              >
                <span>We're</span>
                <span>here</span>
                <span>to</span>
                <span>make</span>
                <span>it</span>
              </h1>
            ))}
          </motion.div>
        )}
      </motion.div>
      <ScreenFitText padding>HAPPEN</ScreenFitText>

      <video
        className="absolute top-0 -z-10 h-full w-full object-cover"
        playsInline
        muted
        loop
        autoPlay
      >
        <source src="/banner-2.mp4" />
      </video>
    </div>
  );
}