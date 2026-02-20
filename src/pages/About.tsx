import HomeVideo from "@/components/shared/PlayVideo";
import CurvedCard from "@/components/shared/CurvedCard";
import Head from "@/layout/Head";
import Parallax from "@/components/shared/Parallax";
import Statistics from "@/components/shared/Statistics";
import ScreenFitText from "@/components/shared/ScreenFitText";
import AboutService from "@/components/about/AboutService";
import Team from "@/components/about/Team";
import Enquiry from "@/components/shared/Enquiry";
import HeroVideo from "@/components/shared/HeroVideo";
import Img from "@/components/ui/Image";

export default function About() {
  return (
    <>
      <Head title="About Us | Huckster Group" />

      <HeroVideo />

      <div className="relative flex min-h-[80vh] items-center justify-center pt-10 text-center">
        <ScreenFitText padding className="text-white h-full w-full">
          Our Journey
        </ScreenFitText>

        <p className="absolute top-4 md:top-0 grid h-full w-full grid-cols-5 
               items-center justify-items-center 
               text-[8vw] sm:text-[6vw] md:text-[5vw] text-white">

          <Img src="/assets/about/it.svg" className="object-contain w-12 sm:w-14 md:w-40  xl:w-[12vw]" />
          <Img src="/assets/about/cloud.svg" className="object-contain w-28 sm:w-40 md:w-56 xl:w-[40vw]" />
          <Img src="/assets/about/be.svg" className="object-contain w-12 sm:w-28 md:w-40 xl:w-[12vw]" />
          <Img src="/assets/about/yours.svg" className="object-contain w-24 sm:w-36 md:w-52 xl:w-[40vw]" />
          <Img src="/assets/about/too.svg" className="object-contain w-12 sm:w-32 md:w-44 xl:w-[12vw]" />

        </p>
      </div>


      <Parallax offsetY={-200}>
        <Statistics />
      </Parallax>

      <Parallax offsetY={-100}>
        <HomeVideo />
      </Parallax>

      <Parallax offsetY={-200}>
        <CurvedCard className="overlow-hidden bg-black pb-0 sm:pb-0 md:pb-0">
          <div className="font-anton relative text-center">
            <h3 className="text-white overflow-hidden text-[18vw] leading-none sm:text-[19vw]">
              What We Do
            </h3>
            <h3 className="absolute top-0 grid h-full w-full grid-cols-5 
               items-center justify-items-center 
               text-[8vw] sm:text-[6vw] md:text-[5vw] text-white">

              <Img src="/assets/about/and.svg" className="object-contain w-14 sm:w-20 md:w-60 xl:w-[18vw]" />
              <Img src="/assets/about/why.svg" className="object-contain w-14 sm:w-20 md:w-60 xl:w-[20vw]" />
              <Img src="/assets/about/you.svg" className="object-contain w-22 sm:w-32 md:w-96 xl:w-[28vw]" />
              <Img src="/assets/about/love.svg" className="object-contain w-18 sm:w-24 md:w-72 xl:w-[18vw]" />
              <Img src="/assets/about/it1.svg" className="object-contain w-12 sm:w-16 md:w-40 xl:w-[12vw]" />

            </h3>

          </div>
        </CurvedCard>
      </Parallax>

      <Parallax offsetY={-150}>
        <AboutService />
      </Parallax>

      <Parallax offsetY={-200}>
        <Team />
      </Parallax>

      <Enquiry />
    </>
  );
}
