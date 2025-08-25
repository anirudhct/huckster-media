import Enquiry from "@/components/shared/Enquiry";
import HeroVideo from "@/components/shared/HeroVideo";
import Parallax from "@/components/shared/Parallax";
import ScreenFitText from "@/components/shared/ScreenFitText";
import Img from "@/components/ui/Image";
import { useWorks } from "@/hooks/useWork";
import Head from "@/layout/Head";
import type { TWork } from "@/types/api";
import { Link } from "react-router";

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

                <p className="-mt-10 text-[1.75vw] font-medium text-white">
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

      <Enquiry />
    </>
  );
}
