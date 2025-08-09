import CurvedCard from "@/components/shared/CurvedCard";
import Img from "@/components/ui/Image";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import ScreenFitText from "../shared/ScreenFitText";
import { useEffect, useState } from "react";
import { useTeams } from "@/hooks/useTeam";

const colors = [
  "text-pink",
  "text-red",
  "text-yellow",
  "text-green",
  "text-cyan",
];

export default function Team() {
  const { data } = useTeams();
  const { ref, inView } = useInView({
    threshold: 0.3,
  });

  const [currentColor, setCurrentColor] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColor((prev) => (prev + 1) % colors.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <CurvedCard className="bg-[#121212]">
      <ScreenFitText className={colors[currentColor]}>
        With HUCKSTER,
      </ScreenFitText>

      <div className="font-anton grid w-full grid-cols-3 justify-items-center text-xs sm:-mt-10 sm:text-[3vw]">
        <span>you don’t</span>
        <span>chase attention</span>
        <span>- you own it.</span>
      </div>

      <div
        className="grid grid-cols-2 gap-5 py-10 sm:grid-cols-3 sm:gap-8 sm:px-8 md:grid-cols-4 md:px-10"
        ref={ref}
      >
        {data?.data?.map(
          (d: { image: string; _id: string; name: string; role: string }) => (
            <motion.div
              className="group relative overflow-hidden"
              initial={{ scaleX: 1.1 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 1.1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              key={d._id}
            >
              <Img
                dynamic
                src={d.image}
                className="p-2 grayscale-100 group-hover:grayscale-0"
              />
              <Img src="/assets/team-frame.avif" className="absolute inset-0" />

              <div className="font-anton mt-3 flex flex-wrap items-start gap-1">
                <span className="overflow-hidden text-lg leading-none sm:text-2xl">
                  {d?.name}
                </span>
                <span className="text-sm text-[#8D8C84]">{d?.role}</span>
              </div>
            </motion.div>
          ),
        )}
      </div>
    </CurvedCard>
  );
}
