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
        <p className="absolute inset-0 right-0 mx-auto flex h-full w-full max-w-[90vw] items-center justify-between text-lg text-white sm:text-[5vw]">
          <Img
            src="/assets/about/it.svg"
            className="object-contain w-[12rem] h-auto"
          />
          <Img
            src="/assets/about/cloud.svg"
            className="object-contain w-[20rem] h-auto"
          />

          <Img
            src="/assets/about/be.svg"
            className="object-contain w-[12rem] h-auto"
          />
          <Img
            src="/assets/about/yours.svg"
            className="object-contain w-[18rem] h-auto"
          />
          <Img
            src="/assets/about/too.svg"
            className="object-contain w-[14rem] h-auto"
          />
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
            <h3 className="absolute top-0 grid h-full w-full grid-cols-5 items-center justify-items-center text-[5vw] text-white">
               <Img
            src="/assets/about/and.svg"
            className="object-contain w-[15rem] h-auto"
          />
          <Img
            src="/assets/about/why.svg"
            className="object-contain w-[15rem] h-auto"
          />

          <Img
            src="/assets/about/you.svg"
            className="object-contain w-[26rem] h-auto"
          />
          <Img
            src="/assets/about/love.svg"
            className="object-contain w-[18rem] h-auto"
          />
          <Img
            src="/assets/about/it1.svg"
            className="object-contain w-[10rem] h-auto"
          />
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
