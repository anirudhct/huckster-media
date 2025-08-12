import { Link } from "react-router";
import Parallax from "../shared/Parallax";
import ScreenFitText from "../shared/ScreenFitText";
import Img from "../ui/Image";
import { useFeaturedWork } from "@/hooks/useWork";
import type { TWork } from "@/types/api";

export default function HomeWork() {
  const { data } = useFeaturedWork();

  return (
    <>
      {data?.data?.map((d: TWork, idx: number) => (
        <Parallax offsetY={-200} className="overflow-hidden rounded-t-4xl">
          <Link to={`/work/${d.slug}`} className="relative" key={d.title}>
            <Img
              dynamic
              src={d.image}
              className="absolute inset-0 -z-10 h-full w-full object-cover"
            />

            <div className="relative z-10 space-y-10 p-5 text-center sm:p-8 md:p-10">
              <div>
                <ScreenFitText>{d.title}</ScreenFitText>

                <p className="text-[1.75vw] font-medium text-white -mt-10">
                  {d.description}
                </p>
              </div>

              <div className="flex flex-col items-center text-white">
                <div className="h-10 w-px bg-white" />
                <span className="mt-2">{idx + 1} / 07</span>
              </div>

              <Parallax offsetY={-40} className="mb-40">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="object-conain mx-auto mb-10 aspect-video md:max-w-2xl"
                >
                  <source
                    src={`${import.meta.env.VITE_API_BASE_URL}/${d.shortVideo}`}
                  />
                </video>
              </Parallax>
            </div>
          </Link>
        </Parallax>
      ))}
    </>
  );
}
