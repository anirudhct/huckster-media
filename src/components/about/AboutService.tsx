import CurvedCard from "@/components/shared/CurvedCard";
import { motion } from "framer-motion"; // ✅ use correct package
import { useInView } from "react-intersection-observer";

const data = [
  {
    title: "Monitor",
    services: [
      "Market Analysis",
      "Trend Spotting",
      "Analysis Reporting and Optimization",
    ],
  },
  {
    title: "Map",
    services: [
      "Target Analysis & Segmentation",
      "Brand Architecture and Positioning",
      "Brand Identity System",
    ],
  },
  {
    title: "Market",
    services: [
      "Campaign Planning Development & Execution",
      "Social Media Magic",
      "Influencer Connections",
      "Media Partnerships",
    ],
  },
];

// animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function AboutService() {
  return (
    <CurvedCard className="space-y-10 bg-[#1F1F1F] sm:space-y-20">
      {data.map((d) => {
        const [ref, inView] = useInView({
          triggerOnce: false,
          threshold: 0.2,
        });

        return (
          <div className="relative" key={d.title}>
            <h4 className="font-anton block overflow-hidden text-center text-[25vw] leading-none sm:text-[25vw]">
              {d.title}
            </h4>

            <motion.div
              ref={ref}
              className="flex flex-wrap justify-center gap-3"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {d.services.map((s, idx) => (
                <motion.p
                  key={idx}
                  variants={itemVariants}
                  className="font-anton sm:text-[2vw]"
                >
                  {s} {idx !== d.services.length - 1 && " |"}
                </motion.p>
              ))}
            </motion.div>
          </div>
        );
      })}
    </CurvedCard>
  );
}

export default AboutService;
