import HomeHero from "../components/home/HomeHero";
import HomeBlogs from "@/components/home/HomeBlogs";
import PlayVideo from "@/components/shared/PlayVideo";
import CurvedCard from "@/components/shared/CurvedCard";
import HomeWork from "@/components/home/HomeWork";
import SeenHard from "@/components/home/SeenHeard";
import Parallax from "@/components/shared/Parallax";
import Statistics from "@/components/shared/Statistics";
import ContactForm from "@/components/contact/ContactForm";

export default function Home() {
  return (
    <>
      <HomeHero />

      <Parallax offsetY={-200}>
        <Statistics />
      </Parallax>

      <Parallax offsetY={-100}>
        <PlayVideo />
      </Parallax>

      <Parallax offsetY={-200}>
        <CurvedCard className="bg-yellow font-anton text-center">
          <h4 className="text-[20vw] leading-none">Latest</h4>
          <span className="block text-[5vw] leading-none">work</span>
          <span className="block text-[5vw] leading-none">trendsss</span>
          <span className="block text-[5vw] leading-none">news</span>
        </CurvedCard>
      </Parallax>

      <Parallax offsetY={-200}>
        <HomeWork />
      </Parallax>

      <SeenHard />

      <Parallax offsetY={-200}>
        <HomeBlogs />
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
