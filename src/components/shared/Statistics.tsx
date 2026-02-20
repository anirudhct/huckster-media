import CurvedCard from "@/components/shared/CurvedCard";
import ClientMarquee from "./ClientMarquee";
import Img from "../ui/Image";

export default function Statistics() {
  return (
    <CurvedCard
      className="font-anton bg-black text-[25vw] md:text-left"
      padding={false}
    >
      <div className="overflow-hidden p-5 sm:p-8 md:p-10 lg:p-12 xl:p-14">
        <span className="relative block leading-none">
          10{" "}
          <div className="absolute top-10 left-10 w-full sm:left-14 md:left-40">
            <Img
              src="/assets/svg/years-in-mena.svg"
              className="object-conatin w-[50vw] sm:mx-0 h-auto 2xl:w-[60vw]"
            />
          </div>
        </span>
        <span className="relative block leading-none">
          500+{" "}
          <div className="absolute top-10 left-10 w-full sm:left-14 md:left-40">
            <Img
              src="/assets/svg/brnads-transformed.svg"
              className="object-conatin w-[70vw] sm:mx-0 h-auto 2xl:w-[82vw] "
            />
          </div>
        </span>
        <span className="relative block leading-none ml-8 md:ml-40">
          800+{" "}
          <div className="absolute top-10 left-6 w-full sm:left-20 md:left-40">
            <Img
              src="/assets/svg/campaigns.svg"
              className="object-conatin w-[50vw] md:w-[55vw] sm:mx-0 2xl:w-[55vw] h-auto"
            />
            <Img
              src="/assets/svg/(in-a-good-way).svg"
              className="object-conatin mx-auto w-[55vw] sm:mx-0"
            />
          </div>
        </span>
        <span className="relative block leading-none ml-8 md:ml-40">
          3{" "}
          <div className="absolute top-10 left-6 sm:left-20 md:left-40 flex gap-3 sm:gap-5 w-[90vw] sm:w-[80vw] md:w-auto">

            <Img
              src="/assets/svg/continents.svg"
              className="object-contain w-38 sm:w-64 md:w-[34vw] h-auto 2xl:w-[42vw] "
            />

            <Img
              src="/assets/svg/covered.svg"
              className="object-contain w-28 sm:w-52 md:w-[25vw] h-auto 2xl:w-[30vw]"
            />

          </div>
        </span>

        <span className="relative block leading-none ml-8 md:ml-40">
          50+{" "}
          <div className="absolute top-10 left-6 w-full sm:left-20 md:left-40">
            <Img
              src="/assets/svg/creative-minds.svg"
              className="object-conatin  w-[60vw] sm:mx-0 2xl:w-[72vw] h-auto"
            />
          </div>
        </span>
      </div>

      <ClientMarquee />
    </CurvedCard>
  );
}
