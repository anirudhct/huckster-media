import ScreenFitText from "./ScreenFitText";
import Parallax from "./Parallax";
import { Link } from "react-router";
import Img from "../ui/Image";
import type { TWork } from "@/types/api";

export default function WorkCard({ work, idx }: { work: TWork; idx: number }) {
  return (
    <Parallax offsetY={-200} className="overflow-hidden rounded-t-4xl">
      <Link to={`/work/${work.slug}`} className="relative" key={work.title}>
        <Img
          dynamic
          src={work.image}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />

        <div className="relative z-10 space-y-10 p-5 text-center sm:p-8 md:p-10">
          <div>
            <ScreenFitText>{work.title}</ScreenFitText>

            <p className="text-[1.75vw] font-medium text-white">
              {work.description}
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
                src={`${import.meta.env.VITE_API_BASE_URL}/${work.shortVideo}`}
              />
            </video>
          </Parallax>
        </div>
      </Link>
    </Parallax>
  );
}
