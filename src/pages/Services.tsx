import HomeVideo from "@/components/shared/PlayVideo";
import CurvedCard from "@/components/shared/CurvedCard";
import Head from "@/layout/Head";
import Parallax from "@/components/shared/Parallax";
import ScreenFitText from "@/components/shared/ScreenFitText";
import Img from "@/components/ui/Image";
import { useInView } from "react-intersection-observer";
import { motion } from "motion/react";

const data = [
  {
    title: "Monitor",
    services: [
      {
        image: "https://huckster-media-backend.vual.in/uploads/work/1754590906633-218818372.webp",
        title: "Market Analysis",
        description:
          "To move the needle on retirement preparedness in the black community, we had to move the needle on what a campaign is. We tapped a Hip Hop icon to put our message to music and kickstart a movement.",
        video: "https://huckster-media-backend.vual.in/uploads/work/1754590906633-218818372.webp",
      },
      {
        image: "https://huckster-media-backend.vual.in/uploads/work/1754590906633-218818372.webp",
        title: "Trend Spotting",
        description:
          "To move the needle on retirement preparedness in the black community, we had to move the needle on what a campaign is. We tapped a Hip Hop icon to put our message to music and kickstart a movement.",
        video: "https://huckster-media-backend.vual.in/uploads/work/1754590906633-218818372.webp",
      },
      {
        image: "https://huckster-media-backend.vual.in/uploads/work/1754590906633-218818372.webp",
        title: "Analysis, Reporting, and Optimization",
        description:
          "To move the needle on retirement preparedness in the black community, we had to move the needle on what a campaign is. We tapped a Hip Hop icon to put our message to music and kickstart a movement.",
        video: "https://huckster-media-backend.vual.in/uploads/work/1754590906633-218818372.webp",
      },
    ],
  },
  {
    title: "Map",
    services: [
      {
        image: "https://huckster-media-backend.vual.in/uploads/work/1754590906633-218818372.webp",
        title: "Target Analysis & Segmentation",
        description:
          "To move the needle on retirement preparedness in the black community, we had to move the needle on what a campaign is. We tapped a Hip Hop icon to put our message to music and kickstart a movement.",
        video: "https://huckster-media-backend.vual.in/uploads/work/1754590906633-218818372.webp",
      },
      {
        image: "https://huckster-media-backend.vual.in/uploads/work/1754590906633-218818372.webp",
        title: "Brand Architecture and Positioning",
        description:
          "To move the needle on retirement preparedness in the black community, we had to move the needle on what a campaign is. We tapped a Hip Hop icon to put our message to music and kickstart a movement.",
        video: "https://huckster-media-backend.vual.in/uploads/work/1754590906633-218818372.webp",
      },
      {
        image: "https://huckster-media-backend.vual.in/uploads/work/1754590906633-218818372.webp",
        title: "Brand Identity System",
        description:
          "To move the needle on retirement preparedness in the black community, we had to move the needle on what a campaign is. We tapped a Hip Hop icon to put our message to music and kickstart a movement.",
        video: "https://huckster-media-backend.vual.in/uploads/work/1754590906633-218818372.webp",
      },
    ],
  },
  {
    title: "Market",
    services: [
      {
        image: "https://huckster-media-backend.vual.in/uploads/work/1754590906633-218818372.webp",
        title: "Campaign Planning Development & Execution",
        description:
          "To move the needle on retirement preparedness in the black community, we had to move the needle on what a campaign is. We tapped a Hip Hop icon to put our message to music and kickstart a movement.",
        video: "https://huckster-media-backend.vual.in/uploads/work/1754590906633-218818372.webp",
      },
      {
        image: "https://huckster-media-backend.vual.in/uploads/work/1754590906633-218818372.webp",
        title: "Social Media Magic",
        description:
          "To move the needle on retirement preparedness in the black community, we had to move the needle on what a campaign is. We tapped a Hip Hop icon to put our message to music and kickstart a movement.",
        video: "https://huckster-media-backend.vual.in/uploads/work/1754590906633-218818372.webp",
      },
      {
        image: "https://huckster-media-backend.vual.in/uploads/work/1754590906633-218818372.webp",
        title: "Influencer Connections",
        description:
          "To move the needle on retirement preparedness in the black community, we had to move the needle on what a campaign is. We tapped a Hip Hop icon to put our message to music and kickstart a movement.",
        video: "https://huckster-media-backend.vual.in/uploads/work/1754590906633-218818372.webp",
      },
      {
        image: "https://huckster-media-backend.vual.in/uploads/work/1754590906633-218818372.webp",
        title: "Media Partnerships",
        description:
          "To move the needle on retirement preparedness in the black community, we had to move the needle on what a campaign is. We tapped a Hip Hop icon to put our message to music and kickstart a movement.",
        video: "https://huckster-media-backend.vual.in/uploads/work/1754590906633-218818372.webp",
      },
    ],
  },
];

export default function Services() {
  const scrollOffsets: Record<string, number> = {
    monitor: -10,
    map: -900,
    market: -1800,
  };

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) {
      const yOffset = scrollOffsets[id.toLowerCase()] ?? -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const titleVariant = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        easeInOut: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <>
      <Head title="Services | Huckster Productions" />
      <div className="flex min-h-dvh items-end justify-center pt-10 text-center">
        <p className="text-blue-dark absolute inset-0 right-0 mx-auto flex h-full w-full max-w-[90vw] items-end justify-between pb-10 text-lg sm:pb-20 sm:text-[5vw]">
          <span className="font-anton">Where</span>
          <span className="font-anton">Wild</span>
          <span className="font-anton">Ideas</span>
          <span className="font-anton">Thrive</span>
        </p>
        <h1 className="font-anton mb-20 text-[20vw] leading-none sm:text-[25vw]">
          Huckster
        </h1>
      </div>

      <Parallax offsetY={-140}>
        <CurvedCard className="bg-[#102423] text-center">
          <ScreenFitText>Behind the Lens</ScreenFitText>

          <div className="mx-auto mt-5 mb-20 text-[2.2vw] sm:max-w-[90%]">
            Our diverse community values human connection and strives for high
            creative standards. We specialize in delivering the right message to
            the right audience at the right time, forging meaningful connections
            between visionary brands and their communities through creativity,
            culture, and technology.
          </div>
        </CurvedCard>
      </Parallax>

      <Parallax offsetY={-200}>
        <HomeVideo />
      </Parallax>

      <Parallax offsetY={-200}>
        <CurvedCard className="bg-[#121212] text-center">
          <div className="mx-auto mt-10 grid w-fit justify-items-center">
            <button
              onClick={() => handleScrollToSection("monitor")}
              className="font-anton bg-yellow mx-auto cursor-pointer rounded-2xl px-5 text-center text-[10vw] text-black uppercase"
            >
              Monitor
            </button>
            <button
              onClick={() => handleScrollToSection("map")}
              className="font-anton bg-yellow w-fit cursor-pointer px-5 text-center text-[10vw] leading-none text-black uppercase"
            >
              Map
            </button>
            <button
              onClick={() => handleScrollToSection("market")}
              className="font-anton bg-yellow mx-auto cursor-pointer rounded-2xl px-5 text-center text-[10vw] text-black uppercase"
            >
              Market
            </button>
          </div>
        </CurvedCard>
      </Parallax>

      <>
        {data.map((d) => {
          const [ref, inView] = useInView({
            triggerOnce: false,
            threshold: 0.3,
          });

          return (
            <section key={d.title} id={d.title.toLowerCase()}>
              <CurvedCard className="bg-[#1F1F1F]">
                <motion.h5
                  ref={ref}
                  variants={titleVariant}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="font-anton text-left text-[20vw] leading-none"
                >
                  {d.title}
                </motion.h5>
              </CurvedCard>
              {d.services.map((s, i) => (
                <Parallax offsetY={-200} key={`${s.title}-${i}`}>
                  <div className="relative overflow-hidden rounded-t-4xl">
                    <Img
                      src={s.image}
                      className="absolute inset-0 -z-10 h-full w-full object-cover"
                    />

                    <div className="relative z-10 mt-10 space-y-10 p-5 text-center sm:p-8 md:p-10">
                      <ScreenFitText>{s.title}</ScreenFitText>

                      <p className="text-[1.75vw] font-medium text-white">
                        {s.description}
                      </p>

                      <Parallax offsetY={-100} className="py-20">
                        <video
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="mx-auto mt-20 mb-10 aspect-video max-w-2xl object-contain"
                        >
                          <source src={s.video} />
                        </video>
                      </Parallax>
                    </div>
                  </div>
                </Parallax>
              ))}
            </section>
          );
        })}
      </>
    </>
  );
}
