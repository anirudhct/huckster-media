import { useFeaturedWork } from "@/hooks/useWork";
import type { TWork } from "@/types/api";
import WorkCard from "../shared/WorkCard";

export default function HomeWork() {
  const { data } = useFeaturedWork();

  return (
    <>
      {data?.data?.map((d: TWork, idx: number) => (
        <WorkCard idx={idx} work={d} />
      ))}
    </>
  );
}
