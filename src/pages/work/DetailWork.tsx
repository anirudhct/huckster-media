import CurvedCard from "@/components/shared/CurvedCard";
import Parallax from "@/components/shared/Parallax";
import ScreenFitText from "@/components/shared/ScreenFitText";
import Img from "@/components/ui/Image";
import { useWork, useWorks } from "@/hooks/useWork";
import Head from "@/layout/Head";
import type { TWork } from "@/types/api";
import { useState } from "react";
import { Link, useParams } from "react-router";

export default function DetailWork() {
  const { id } = useParams();
  const { data, isLoading } = useWork(id ?? "");
  const { data: datas } = useWorks();
  const [show, setShow] = useState<null | string>(null);

  const work = data?.data;
  return (
    <>
      <Head title={`${work?.title} | Huckster Productions`} />
      <div className="relative min-h-screen text-center">
        <Img
          dynamic
          src={work?.image}
          className="absolute -mt-20 h-full w-full"
        />
        <div className="absolute inset-0 z-20 h-full w-full">
          <ScreenFitText maximum={500} padding>
            {work?.title}
          </ScreenFitText>
        </div>
      </div>

      <div className="-mt-20 bg-[#1F1F1F] px-5 sm:px-8 md:px-10">
        <div className="grid gap-5 py-10 lg:grid-cols-2">
          <h4 className="lg:text-2xl xl:text-3xl">Tension?</h4>

          <p className="normal-case lg:text-lg xl:text-xl">{work?.tension}</p>

          <h4 className="lg:text-2xl xl:text-3xl">Shift..</h4>

          <p className="normal-case lg:text-lg xl:text-xl">{work?.shift}</p>

          <h4 className="lg:text-2xl xl:text-3xl">Proof! </h4>

          <p className="normal-case lg:text-lg xl:text-xl">{work?.proof}</p>
        </div>
      </div>

      {!isLoading && (
        <div className="relative h-full w-full">
          <video
            loop
            playsInline
            muted
            autoPlay
            className="h-full w-full object-cover"
          >
            <source
              src={`${import.meta.env.VITE_API_BASE_URL}/${work?.video}`}
            />
          </video>

          <button
            className="absolute inset-0 z-50 flex h-full w-full cursor-pointer items-center justify-center"
            onClick={() =>
              setShow(`${import.meta.env.VITE_API_BASE_URL}/${work?.video}`)
            }
          >
            <video
              className="html-video z-50 !object-fill"
              preload="metadata"
              playsInline
            >
              <source src="/assets/play.webm" type="video/mp4" />
            </video>
          </button>
        </div>
      )}

      {!isLoading && (
        <div className="relative h-full w-full">
          <video
            loop
            playsInline
            muted
            autoPlay
            className="h-full w-full object-cover"
          >
            <source
              src={`${import.meta.env.VITE_API_BASE_URL}/${work?.shortVideo}`}
            />
          </video>

          <button
            className="absolute inset-0 z-50 flex h-full w-full cursor-pointer items-center justify-center"
            onClick={() =>
              setShow(`${import.meta.env.VITE_API_BASE_URL}/${work?.shortVideo}`)
            }
          >
            <video
              className="html-video z-50 !object-fill"
              preload="metadata"
              playsInline
            >
              <source src="/assets/play.webm" type="video/mp4" />
            </video>
          </button>
        </div>
      )}
      {show && (
        <div className="fixed top-0 right-0 left-0 z-50 h-screen w-full bg-black">
          <video
            loop
            playsInline
            autoPlay
            controls
            className="absolute -z-10 h-full w-full object-contain"
          >
            <source src={show} />
          </video>

          <button
            onClick={() => setShow(null)}
            className="fixed top-0 right-0 cursor-pointer duration-300 hover:rotate-[720deg]"
          >
            <Img src="/assets/close.png" className="size-20" />
          </button>
        </div>
      )}

      <Parallax offsetY={-100}>
        <CurvedCard className="bg-red">
          <h4 className="font-anton text-center text-[20vw] leading-none">
            Check out <br /> one more?
          </h4>
        </CurvedCard>
      </Parallax>

      <Parallax
        offsetY={-100}
        className="grid grid-cols-1 gap-5 rounded-2xl bg-white p-5 md:grid-cols-3"
      >
        {datas?.data?.slice(0, 3).map((d: TWork) => (
          <Link
            to={`/work/${d.slug}`}
            key={d._id}
            className="relative overflow-hidden rounded-xl"
          >
            <Img dynamic src={d.image} className="aspect-[3/4]" />

            <span className="font-anton absolute inset-0 flex h-full w-full items-end p-3 text-[5vw] md:p-5">
              {d.title}
            </span>
          </Link>
        ))}
      </Parallax>
    </>
  );
}
