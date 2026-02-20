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
    if (!el) return;

    const yOffset = scrollOffsets[id.toLowerCase()] ?? -80;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  /* ------------------------- Title Split Logic ------------------------ */
  const renderSplitTitle = (title: string) => {
    if (title.length <= 22) {
      return <span className="block">{title}</span>;
    }

    const mid = Math.floor(title.length / 2);
    const before = title.lastIndexOf(" ", mid);
    const after = title.indexOf(" ", mid);

    let splitIndex = mid;
    if (before === -1 && after === -1) return <span>{title}</span>;
    if (before === -1) splitIndex = after;
    else if (after === -1) splitIndex = before;
    else splitIndex = mid - before < after - mid ? before : after;

    return (
      <>
        <span className="block">{title.slice(0, splitIndex).trim()}</span>
        <span className="block">{title.slice(splitIndex).trim()}</span>
      </>
    );
  };

  const isSplitTitle = (title: string) => title.length > 22;

const getTitleFontSize = (title: string) => {
  const len = title.length;
  const split = isSplitTitle(title);

  // ========================
  // Double-line titles
  // ========================
  if (split) {
    if (len <= 31)
      return "text-[clamp(4.0rem,19vw,13rem)] lg:text-[clamp(3.3rem,14vw,14rem)] 2xl:text-[clamp(6vw,18vw,15vw)]";

    if (len <= 35)
      return "text-[clamp(4.2rem,20vw,13rem)] lg:text-[clamp(3.2rem,13vw,13rem)] 2xl:text-[clamp(5vw,15vw,13vw)]";

    if (len <= 37)
      return "text-[clamp(4.5rem,18vw,13rem)] lg:text-[clamp(3.2rem,13vw,13rem)] 2xl:text-[clamp(6vw,15vw,12vw)]";

    if (len <= 42)
      return "text-[clamp(3.8rem,16vw,10rem)] lg:text-[clamp(2.9rem,12vw,10rem)] 2xl:text-[clamp(4vw,12vw,10vw)]";

    return "text-[clamp(3rem,12vw,7rem)] lg:text-[clamp(2.3rem,9vw,7rem)] 2xl:text-[clamp(5vw,15vw,12vw)]";
  }

  // ========================
  // Single-line titles
  // ========================
  if (len <= 14)
    return "text-[clamp(6rem,30vw,17rem)] lg:text-[clamp(4.1rem,18vw,15rem)] 2xl:text-[clamp(6vw,20vw,16vw)]";

  if (len <= 16)
    return "text-[clamp(5.8rem,28vw,15rem)] lg:text-[clamp(4rem,18vw,14rem)] 2xl:text-[clamp(6vw,19vw,15vw)]";

  if (len <= 18)
    return "text-[clamp(4rem,18vw,8rem)] lg:text-[clamp(3.5rem,16vw,12rem)] 2xl:text-[clamp(4.5vw,16vw,12.5vw)]";

  if (len <= 20)
    return "text-[clamp(4.5rem,20vw,10rem)] lg:text-[clamp(3rem,14vw,10rem)] 2xl:text-[clamp(4.5vw,16vw,12.5vw)]";

  if (len <= 21)
    return "text-[clamp(4rem,18vw,8rem)] lg:text-[clamp(3.2rem,13vw,11rem)] 2xl:text-[clamp(4vw,15vw,11vw)]";

  if (len <= 22)
    return "text-[clamp(4rem,20vw,10rem)] lg:text-[clamp(3rem,14vw,10rem)] 2xl:text-[clamp(4vw,15vw,11vw)]";

  return "text-[clamp(4rem,15vw,9rem)] lg:text-[clamp(3rem,10vw,9rem)] 2xl:text-[clamp(5vw,18vw,14vw)]";
};

  const titleVariant = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, easeInOut: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <>
      <Head title="Services | Huckster Group" />
      <HeroVideo />

      <div className="relative flex min-h-[80vh] items-center justify-center pt-10 text-center">
        <p className="absolute inset-0 mx-auto flex h-full w-full max-w-[90vw] items-center ">
          <Img
            src="/assets/svg/where-wild-ideas-thrive.svg"
            className="w-full h-auto"
          />
        </p>
        <h1 className="font-anton mb-10 text-[20vw] sm:text-[25vw] leading-none">
          Huckster
        </h1>
      </div>

      <Parallax offsetY={-140}>
        <CurvedCard className="bg-yellow text-center">
          <ScreenFitText>Behind the Lens</ScreenFitText>
          <div className="mx-auto mt-5 mb-20 text-[2.2vw] sm:max-w-[90%]">
            Our diverse community values human connection and strives for high
            creative standards. We deliver the right message to the right
            audience at the right time through creativity, culture, and
            technology.
          </div>
        </CurvedCard>
      </Parallax>

      <Parallax offsetY={-200}>
        <HomeVideo />
      </Parallax>

      <Parallax offsetY={-200}>
        <CurvedCard className="bg-[#121212] text-center">
          <div className="mx-auto mt-10 flex w-full justify-between gap-5 text-[9vw]">
            {services.map((cat) => (
              <button
                key={cat.title}
                onClick={() => handleScrollToSection(cat.title)}
                className={`font-anton uppercase cursor-pointer transition-colors hover:${cat.color}`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </CurvedCard>
      </Parallax>

      {services.map((category) => {
        const [ref, inView] = useInView({ threshold: 0.3 });

        return (
          <section key={category.title} id={category.title.toLowerCase()}>
            <CurvedCard className="bg-[#1F1F1F]">
              <motion.h5
                ref={ref}
                variants={titleVariant}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className={`font-anton text-left text-[20vw] leading-none ${category.color}`}
              >
                {category.title}
              </motion.h5>
            </CurvedCard>

            {category.services.map((service, i) => (
              <Parallax key={i} offsetY={-200}>
                <div className="relative overflow-hidden rounded-t-4xl min-h-screen">
                  <Img
                    src={service.image}
                    className="absolute inset-0 -z-10 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 -z-10 bg-black/50" />

                  <div className="relative z-10 mt-10 space-y-10 p-5 sm:p-8 md:p-10">
                    <div className="w-screen -ml-[calc(50vw-50%)] text-center">
                      <h1
                        className={`font-anton uppercase tracking-tight text-white
                        ${
                          isSplitTitle(service.title)
                            ? "leading-[1.05]"
                            : "leading-[0.9]"
                        }
                        ${getTitleFontSize(service.title)}`}
                      >
                        {renderSplitTitle(service.title)}
                      </h1>
                    </div>

                    <p className="mx-auto max-w-[90vw] text-left text-[1.5vw] font-medium text-white">
                      {service.description}
                    </p>

                    <Parallax offsetY={-100} className="py-20">
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="mx-auto aspect-video max-w-2xl object-contain"
                      >
                        <source src={service.video} />
                      </video>
                    </Parallax>
                  </div>
                </div>
              </Parallax>
            ))}
          </section>
        );
      })}

      <Enquiry />
    </>
  );
}