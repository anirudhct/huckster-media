import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "motion/react";
import { useRef, useState } from "react";
import Img from "../ui/Image";
import { Link } from "react-router";

export default function AnimatedBlogCard({
  data,
  index,
}: {
  data: any;
  index: number;
}) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5, 0.9],
    ["-22deg", "0deg", "-22deg"]
  );

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // Range when the card is in the center of the screen
    setIsVisible(v >= 0.35 && v <= 0.7);
  });

  // RESPONSIVE SPACING for 27-inch screens
  const cardWidthVw = 22; // 22% of screen width
  const horizontalGapVw = 6; 
  const marginLeft = `calc(10vw + ${index * (cardWidthVw + horizontalGapVw)}vw)`;
  
  // Vertical overlap for the "staircase" effect
  const overlapY = "10vh"; 

  return (
    <div
      ref={containerRef}
      style={{
        marginTop: index === 0 ? 0 : `-${overlapY}`,
        paddingLeft: marginLeft,
      }}
      className="w-fit"
    >
      <Link to={`/blogs/${data.slug}`} className="block">
        {/* Sticky container needs enough height to hold image + text below it */}
        <motion.div className="sticky top-[10vh] flex h-[85vh] flex-col items-center justify-start">
          
          {/* 1. THE IMAGE FRAME */}
          <motion.div
            style={{ rotate }}
            className="relative h-[65vh] w-[28vw] min-w-[320px] min-h-[400px]"
          >
            <div className="relative h-full w-full">
              <Img
                src="/assets/frame.avif"
                className="pointer-events-none absolute h-full w-full object-contain"
              />
              <Img
                dynamic
                src={data.image}
                className="absolute inset-0 z-20 h-full w-full object-cover p-[6%]" 
              />
            </div>
          </motion.div>

          {/* 2. THE TEXT CONTENT (Positioned Below) */}
          <div className="mt-6 w-[22vw] min-w-[320px] px-2">
            <AnimatePresence>
              {isVisible && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-4"
                >
                  <p className="font-anton text-[1.8vw] leading-[1.1] text-white line-clamp-2 uppercase">
                    {data.title}
                  </p>

                  <Img
                    src="/assets/svg/learn-more.png"
                    className="h-auto w-[12vw] max-w-[180px] object-contain"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </motion.div>
      </Link>
    </div>
  );
}