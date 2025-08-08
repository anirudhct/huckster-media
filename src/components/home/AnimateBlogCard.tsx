import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
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
    ["-20deg", "0deg", "-20deg"],
  );

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setIsVisible(v >= 0.5 && v <= 0.8);
  });

  const marginTop = 100;
  const marginLeft = index * 650;

  return (
    <div
      ref={containerRef}
      style={{
        marginTop: index === 0 ? 0 : -marginTop,
        marginLeft,
      }}
      className="relative"
    >
      <Link className="relative" to={`/blogs/${data.slug}`}>
        <motion.div className="sticky top-[20vh] flex h-[60vh] items-center justify-center">
          <motion.div
            style={{ rotate }}
            className="absolute h-[379px] w-[338px]"
          >
            <div className="relative h-full w-full">
              <Img
                src="/assets/frame.avif"
                className="pointer-events-none absolute h-full w-full object-contain"
              />
              <Img
                src="/assets/blog.png"
                className="absolute inset-0 z-20 h-full w-full object-cover p-3"
              />
            </div>

            {isVisible && (
              <>
                <p className="font-anton z-30 w-[90%] p-4 text-lg text-white">
                  {data.title}
                </p>

                <Img
                  src="/assets/svg/learn-more.svg"
                  className="h-auto w-32 object-contain"
                />
              </>
            )}
          </motion.div>
        </motion.div>
      </Link>
    </div>
  );
}
