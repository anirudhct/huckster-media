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
    ["-22deg", "0deg", "-22deg"]
  );

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setIsVisible(v >= 0.35 && v <= 0.7);
  });

  const marginTop = 150;
  const marginLeft = 920 + 420 * index;

  return (
    <div
      ref={containerRef}
      style={{
        marginTop: index === 0 ? 0 : -marginTop,
        paddingLeft: marginLeft,
      }}
      className="w-fit"
    >


      <Link to={`/blogs/${data.slug}`}>
        <motion.div className="sticky top-[32vh] flex h-[80vh] items-center justify-center">
          <motion.div
            style={{ rotate }}

            className="absolute h-[520px] w-[460px]"
          >
            <div className="relative h-full w-full">
              <Img
                src="/assets/frame.avif"
                className="pointer-events-none absolute h-full w-full object-contain"
              />
              <Img
                dynamic
                src={data.image}
                className="absolute inset-0 z-20 h-full w-full object-cover p-5"
              />
            </div>

            {isVisible && (
              <>
                <p className="font-anton z-30 w-[90%] p-5 text-2xl text-white">
                  {data.title}
                </p>

                <Img
                  src="/assets/svg/learn-more.png"
                  className="h-auto w-44 object-contain"
                />
              </>
            )}
          </motion.div>
        </motion.div>
      </Link>
    </div>
  );
}
