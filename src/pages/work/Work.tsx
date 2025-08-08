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
      <Head title="Work | Huckster Productions" />
      <div className="flex items-end justify-center pt-10 text-center">
        <h1 className="font-anton mb-20 text-[30vw] leading-none sm:text-[43vw]">
          work
        </h1>
      </div>

      <div className="px-5 sm:px-8 md:hidden md:px-10">
        {data?.data?.map((d: TWork) => (
          <Link to={`/work/${d.slug}`} className="relative">
            <Img dynamic src={d.image} />
            <div className="absolute inset-0 flex w-full items-end justify-center p-4 text-center">
              <ScreenFitText padding>{d.title}</ScreenFitText>
            </div>
          </Link>
        ))}
      </div>

      <div className="mx-auto my-20 hidden px-5 sm:px-8 md:block md:px-10">
        {data?.data?.map((d: TWork, index: number) => {
          const widths = ["w-[80%]", "w-[60%]", "w-[40%]"];
          const widthClass = widths[index % 3];

          return (
            <Link to={`/work/${d.slug}`} key={d?._id}>
              <Parallax
                offsetY={-50}
                className={`relative ${widthClass} mx-auto`}
              >
                <Img dynamic src={d.image} className="w-full" />
                <div className="absolute inset-0 mb-10 flex items-end justify-center p-4">
                  <div className="w-full max-w-full">
                    <ScreenFitText padding>{d.title}</ScreenFitText>
                  </div>
                </div>
              </Parallax>
            </Link>
          );
        })}
      </div>
    </>
  );
}
