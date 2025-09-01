import HomeVideo from "@/components/shared/PlayVideo";
import CurvedCard from "@/components/shared/CurvedCard";
import Head from "@/layout/Head";
import Parallax from "@/components/shared/Parallax";
import ScreenFitText from "@/components/shared/ScreenFitText";
import Img from "@/components/ui/Image";
import { useInView } from "react-intersection-observer";
import { motion } from "motion/react";
import Enquiry from "@/components/shared/Enquiry";
import HeroVideo from "@/components/shared/HeroVideo";
import { services } from "@/lib/services";

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
      <Head title="Services | Huckster Group" />
      <HeroVideo />
      <div className="flex min-h-dvh items-end justify-center pt-10 text-center">
        <p className="absolute inset-0 right-0 mx-auto flex h-full w-full max-w-[90vw] items-end justify-between pb-10 text-lg sm:pb-20 sm:text-[5vw]">
          <Img src="/assets/svg/where-wild-ideas-thrive.png" className="w-full h-auto"/>
        </p>
        <h1 className="font-anton mb-20 text-[20vw] leading-none sm:text-[25vw]">
          Huckster
        </h1>
      </div>

      <Parallax offsetY={-140}>
        <CurvedCard className="bg-blue-dark text-center">
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
          <div className="mx-auto mt-10 flex w-full justify-between gap-5 text-[9vw]">
            {services.map((s) => (
              <button
                onClick={() => handleScrollToSection(s.title.toLowerCase())}
                className={`font-anton cursor-pointer uppercase ${s.color}`}
              >
                {s.title}
              </button>
            ))}
          </div>
        </CurvedCard>
      </Parallax>

      <>
        {services.map((s) => {
          const [ref, inView] = useInView({
            triggerOnce: false,
            threshold: 0.3,
          });

          return (
            <section key={s.title} id={s.title.toLowerCase()}>
              <CurvedCard className="bg-[#1F1F1F]">
                <motion.h5
                  ref={ref}
                  variants={titleVariant}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className={`font-anton text-left text-[20vw] leading-none ${s.color}`}
                >
                  {s.title}
                </motion.h5>
              </CurvedCard>
              {s.services.map((s, i) => (
                <Parallax offsetY={-200} key={`${s.title}-${i}`}>
                  <div className="relative overflow-hidden rounded-t-4xl">
                    <Img
                      src={s.image}
                      className="absolute inset-0 -z-10 h-full w-full object-cover"
                    />

                    <div className="relative z-10 mt-10 space-y-10 p-5 text-center sm:p-8 md:p-10">
                      <ScreenFitText>{s.title}</ScreenFitText>

                      <p className="text-[1.75vw] font-medium text-white text-left">
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

      <Enquiry />
    </>
  );
}
