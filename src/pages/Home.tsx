import HomeHero from "../components/home/HomeHero";
import HomeBlogs from "@/components/home/HomeBlogs";
import PlayVideo from "@/components/shared/PlayVideo";
// import CurvedCard from "@/components/shared/CurvedCard";
import HomeWork from "@/components/home/HomeWork";
import SeenHard from "@/components/home/SeenHeard";
import Parallax from "@/components/shared/Parallax";
import Statistics from "@/components/shared/Statistics";
import Enquiry from "@/components/shared/Enquiry";

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

      {/* <Parallax offsetY={-200}>
        <CurvedCard className="bg-yellow font-anton text-center">
          <h4 className="text-[20vw] leading-none">Latest</h4>
          <span className="block text-[5vw] leading-none">work</span>
          <span className="block text-[5vw] leading-none">trendsss</span>
          <span className="block text-[5vw] leading-none">news</span>
        </CurvedCard>
      </Parallax> */}

      <Parallax offsetY={-200}>
        <HomeWork />
      </Parallax>

      <SeenHard />

      <Parallax offsetY={-200}>
        <HomeBlogs />
      </Parallax>

      <Enquiry />
    </>
  );
}
