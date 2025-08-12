import HomeVideo from "@/components/shared/PlayVideo";
import CurvedCard from "@/components/shared/CurvedCard";
import Head from "@/layout/Head";
import Parallax from "@/components/shared/Parallax";
import Statistics from "@/components/shared/Statistics";
import ScreenFitText from "@/components/shared/ScreenFitText";
import AboutService from "@/components/about/AboutService";
import Team from "@/components/about/Team";
import ContactForm from "@/components/contact/ContactForm";

export default function About() {
  return (
    <>
      <Head title="About Us | Huckster Productions" />
      <div className="relative flex min-h-[80vh] items-center justify-center pt-10 text-center">
        <ScreenFitText padding className="text-red h-full w-full">
          Our Journey
        </ScreenFitText>
        <p className="absolute inset-0 right-0 mx-auto flex h-full w-full max-w-[90vw] items-center justify-between text-lg text-white sm:text-[5vw]">
          <span className="font-anton">It</span>
          <span className="font-anton">Could</span>
          <span className="font-anton">Be</span>
          <span className="font-anton">Yours</span>
          <span className="font-anton">Too</span>
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
            <h3 className="text-green overflow-hidden text-[18vw] leading-none sm:text-[19vw]">
              What We Do
            </h3>
            <h3 className="absolute top-0 grid h-full w-full grid-cols-5 items-center justify-items-center text-[5vw] text-white">
              <span>And</span>
              <span>Why</span>
              <span>You'll</span>
              <span>Love</span>
              <span>It</span>
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

      <div className="mt-10 grid grid-cols-1 gap-5 rounded-t-3xl bg-white p-5 text-black sm:grid-cols-2 sm:p-8 md:p-10 lg:p-14">
        <div className="font-anton flex h-full flex-col justify-between overflow-hidden">
          <span>Let's make some noise!</span>
          <h4 className="mt-5 text-[10vw] leading-none sm:text-[8vw]">
            Got a Minute?
            <br /> Tell Us More
          </h4>
        </div>
        <ContactForm />
      </div>
    </>
  );
}
