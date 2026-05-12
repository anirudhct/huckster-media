import { motion, useAnimation } from "motion/react";
import Img from "../ui/Image";
import { useClients } from "@/hooks/useClients";
import { useEffect } from "react";

export default function ClientMarquee() {
  const controls = useAnimation();
  const { data } = useClients();

  const startMarquee = async () => {
    await controls.start({
      x: ["0%", "-50%"],
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        duration: 100, // Reduced from 10 to 5 seconds (2x faster)
        repeatDelay: 0,
      },
    });
  };

  const stopMarquee = async () => {
    await controls.stop();
  };

  const clients = data?.data ?? [];
  const logos = [...clients, ...clients];

  useEffect(() => {
    if (logos.length > 0) {
      startMarquee();
    }
  }, [logos.length]);

  return (
    <div
      className="relative my-10 w-full cursor-pointer overflow-hidden sm:my-14 md:my-16 lg:my-20"
      onMouseEnter={stopMarquee}
      onMouseLeave={startMarquee}
    >
      <motion.div
        animate={controls}
        className="flex gap-5 sm:gap-10"
        style={{ width: "max-content" }}
      >
        {logos.map((l, i) => (
          <Img
            dynamic
            src={l.image}
            key={i}
            className="h-48 flex-shrink-0 object-contain sm:h-[12vw]"
          />
        ))}
      </motion.div>
    </div>
  );
}