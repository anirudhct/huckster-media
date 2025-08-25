import Enquiry from "@/components/shared/Enquiry";
import HeroVideo from "@/components/shared/HeroVideo";
import WorkCard from "@/components/shared/WorkCard";
import { useWorks } from "@/hooks/useWork";
import Head from "@/layout/Head";
import type { TWork } from "@/types/api";

export default function Work() {
  const { data } = useWorks();

  return (
    <>
      <Head title="Work | Huckster Group" />

      <HeroVideo />
      <div className="flex items-end justify-center pt-10 text-center">
        <h1 className="font-anton mb-20 text-[30vw] leading-none sm:text-[43vw]">
          work
        </h1>
      </div>

      {data?.data?.map((d: TWork, idx: number) => (
        <WorkCard work={d} idx={idx} />
      ))}

      <Enquiry />
    </>
  );
}
