import CurvedCard from "@/components/shared/CurvedCard";
import ClientMarquee from "./ClientMarquee";
import Img from "../ui/Image";

export default function Statistics() {
  return (
    <CurvedCard
      className="font-anton bg-black text-center text-[25vw] md:text-left"
      padding={false}
    >
      <div className="overflow-hidden p-5 sm:p-8 md:p-10 lg:p-12 xl:p-14">
        <span className="relative block leading-none">
          10{" "}
          <div className="absolute top-10 left-10 w-full sm:left-40">
            <Img
              src="/assets/svg/years-in-mena.svg"
              className="object-conatin mx-auto w-[50vw] sm:mx-0 h-auto"
            />
          </div>
        </span>
        <span className="relative block leading-none">
          500+{" "}
          <div className="absolute top-10 left-10 w-full sm:left-40">
            <Img
              src="/assets/svg/brnads-transformed.svg"
              className="object-conatin mx-auto w-[70vw] sm:mx-0"
            />
          </div>
        </span>
        <span className="relative block leading-none md:ml-40">
          800+{" "}
          <div className="absolute top-10 left-10 w-full sm:left-40">
            <Img
              src="/assets/svg/campaigns.svg"
              className="object-conatin mx-auto w-[60vw] sm:mx-0"
            />
            <Img
              src="/assets/svg/(in-a-good-way).svg"
              className="object-conatin mx-auto w-[55vw] sm:mx-0"
            />
          </div>
        </span>
        <span className="relative block leading-none md:ml-40">
          3{" "}
          <div className="absolute top-10 left-10 sm:left-40 flex gap-5 w-[80vw]">
            <Img
              src="/assets/svg/continents.svg"
              className="object-contain w-[34rem] h-auto"
            />
            <Img
              src="/assets/svg/covered.svg"
              className="object-contain w-[25rem] h-auto"
            />
          </div>

        </span>
        <span className="relative block leading-none md:ml-40">
          50+{" "}
          <div className="absolute top-10 left-10 w-full sm:left-40">
            <Img
              src="/assets/svg/creative-minds.svg"
              className="object-conatin mx-auto w-[60vw] sm:mx-0"
            />
          </div>
        </span>
      </div>

      <ClientMarquee />
    </CurvedCard>
  );
}
