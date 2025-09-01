import ScreenFitText from "@/components/shared/ScreenFitText";
import Img from "@/components/ui/Image";
import { useBlogs } from "@/hooks/useBlog";
import Head from "@/layout/Head";
import { formattedDate } from "@/lib/formattedDate";
import type { TBlog } from "@/types/api";
import { Link } from "react-router";

export default function Blogs() {
  const { data } = useBlogs(1);
  return (
    <>
      <Head title="Seen and Heard | Huckster Group" />
      <div className="overflow-hidden">
        <div className="flex items-end justify-center pt-10 text-center">
          <ScreenFitText className="text-red" padding>
            Seen & Heard
          </ScreenFitText>
        </div>

        <div className="my-20 grid grid-cols-1 gap-5 px-5 sm:grid-cols-2 sm:px-8 md:grid-cols-3 md:px-10">
          {data?.data?.map((d: TBlog, i: number) => {
            let className =
              "space-y-3 mt-3 group cursor-pointer relative aspect-[6/9]";

            let rotate =
              "relative aspect-[6/7] group-hover:rotate-6 overflow-hidden";
            if (i === 0 || i === 3 || i === 7 || i == 10)
              rotate += " -rotate-6";

            if (i === 3) className += " md:col-start-2";
            if (i === 4) className += " md:col-start-3";
            if (i === 5) className += " md:col-start-1";
            if (i === 6) className += " md:col-start-2";
            if (i === 7) className += " md:col-start-1";
            if (i === 10) className += " md:col-start-2";

            return (
              <Link to={`/blogs/${d.slug}`} key={i} className={className}>
                <div className={rotate}>
                  <Img
                    src="/assets/blog-frame.png"
                    className="object-conain absolute inset-0 z-10 h-full w-full"
                  />

                  <Img
                    dynamic
                    src={d.image}
                    className="aspet-[6/7] absolute inset-0 z-20 h-full w-full p-4"
                  />
                </div>

                <span>{formattedDate(d.date)}</span>
                <h3 className="font-anton mt-5 text-lg sm:w-[75%] sm:text-xl md:text-[1.3rem]">
                  {d.title}
                </h3>

                <Img
                  src="/assets/svg/learn-more.png"
                  className="h-auto w-32 object-contain"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
