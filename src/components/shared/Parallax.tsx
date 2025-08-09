import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type ParallaxProps = {
  children: ReactNode;
  offsetY?: number;
  className?: string;
};

export default function Parallax({
  children,
  offsetY = -80,
  className = "",
}: ParallaxProps) {
  const ref = useRef(null);

  const isSmallDevice = useMediaQuery("(max-width: 1000px)"); // Tailwind's sm breakpoint

  const effectiveOffsetY = isSmallDevice ? offsetY * 0.25 : offsetY;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 1", "end 0.9"],
  });

  const marginTop = useTransform(
    scrollYProgress,
    [0, 1],
    [0, effectiveOffsetY],
  );

  return (
    <motion.div
      ref={ref}
      style={{ marginTop }}
      className={`relative z-10 ${className}`}
    >
      {children}
    </motion.div>
  );
}
