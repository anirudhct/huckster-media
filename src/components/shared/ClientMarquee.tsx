import { motion, useAnimation } from "framer-motion";
import Img from "../ui/Image";
import { useClients } from "@/hooks/useClients";

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
        duration: 10,
      },
    });
  };

  const stopMarquee = async () => {
    await controls.stop();
    await controls.set({ x: "0%" });
  };

  const clients = data?.data ?? [];
  const logos = [...clients, ...clients];

  return (
    <div
      className="relative my-10 w-full cursor-pointer overflow-hidden sm:my-14 md:my-16 lg:my-20"
      onMouseEnter={() => {
        startMarquee();
      }}
      onMouseLeave={() => {
        stopMarquee();
      }}
    >
      <motion.div
        animate={controls}
        className="mx-auto flex w-full justify-center gap-5 sm:gap-10"
      >
        {logos.map((l, i) => (
          <Img dynamic
            src={l.image}
            key={i}
            className="h-20 object-contain sm:h-[5vw]"
          />
        ))}
      </motion.div>
    </div>
  );
}
