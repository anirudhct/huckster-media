import Img from "@/components/ui/Image";
import Head from "@/layout/Head";
import { Link, useNavigate, useParams } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import AnimatedBlogCard from "@/components/home/AnimateBlogCard";
import Parallax from "@/components/shared/Parallax";
import CurvedCard from "@/components/shared/CurvedCard";
import { useBlog, useBlogs } from "@/hooks/useBlog";
import type { TBlog } from "@/types/api";
import { formattedDate } from "@/lib/formattedDate";

export default function DetailBlog() {
  const { id } = useParams();
  const { data: datas } = useBlogs(1);
  const { data } = useBlog(id ?? "");
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const translateX = useTransform(scrollYProgress, [0, 1], [0, -600]);

  const blog = data?.data;

  return (
    <>
      <Head title="Seen and Hard | Huckster Productions" />

      <div className="overflow-hidden">
        <div className="overfow-hidden rounded-t-2xl border-black lg:mx-10 lg:mt-5 lg:rounded-t-4xl lg:bg-white">
          <div className="relative lg:flex">
            <Img
              dynamic
              src={blog?.image}
              className="fixed top-0 left-0 -z-10 w-full object-cover lg:relative lg:z-10 lg:h-auto lg:w-[45%] lg:rounded-4xl"
            />

            <div className="lg:hiden mt-[10rem] w-full space-y-5 overflow-hidden rounded-t-2xl bg-white px-5 py-10 text-black normal-case sm:px-8 md:space-y-8 md:px-10 lg:mt-0 lg:space-y-10 lg:rounded-t-4xl">
              <div className="mb-10 uppercase">
                <p className="text-gray-700 lg:text-lg">Words by</p>
                <h4 className="text-lg font-medium sm:text-xl md:text-2xl lg:text-3xl">
                  {blog?.wordsBy}
                </h4>
                <h4 className="text-red">{formattedDate(blog?.date)}</h4>
              </div>

              <div className="bg-red font-anton w-fit px-5 py-1.5 text-white uppercase">
                {blog?.category}
              </div>

              <h2 className="font-anton text-2xl uppercase sm:text-3xl md:text-4xl lg:text-6xl 2xl:text-8xl">
                {blog?.title}
              </h2>

              <div className="space-y-5 lg:hidden">{blog?.description}</div>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="absolute top-0 right-0 hidden cursor-pointer duration-300 hover:rotate-[720deg] lg:block"
            >
              <Img src="/assets/close.png" />
            </button>
          </div>

          <div className="mx-auto my-10 hidden max-w-4xl space-y-5 pb-20 font-medium text-black normal-case md:text-xl lg:block lg:text-2xl 2xl:w-1/2">
            {blog?.description}
          </div>
        </div>

        <Parallax offsetY={-200}>
          <CurvedCard className="bg-[#1F1F1F]">
            <h5 className="font-anton text-red text-center text-[15vw] leading-none">
              More blogs
            </h5>
            <motion.div
              className="mb-40 hidden lg:block"
              ref={containerRef}
              style={{ x: translateX }}
            >
              {datas?.data
                ?.filter((d: TBlog) => d.slug !== blog?.slug)
                ?.slice(0, 3)
                ?.map((d: TBlog, idx: number) => (
                  <AnimatedBlogCard data={d} index={idx} key={d.slug} />
                ))}
            </motion.div>

            <div className="mx-auto space-y-10 lg:hidden">
              {datas?.data
                ?.filter((d: TBlog) => d.slug !== blog?.slug)
                ?.slice(0, 3)
                ?.map((d: TBlog, idx: number) => (
                  <Link
                    className="mx-auto flex h-full w-full max-w-[318px] -rotate-3 flex-col overflow-hidden"
                    to={`/blogs/${d.slug}`}
                    key={idx}
                  >
                    <div className="relative h-[360px] w-[318px] overflow-hidden">
                      <Img
                        src="/assets/frame.avif"
                        className="pointer-events-none absolute h-full w-full object-contain"
                      />
                      <Img
                        dynamic
                        src={blog?.image}
                        className="absolute inset-0 z-20 h-full w-full object-cover p-3"
                      />
                    </div>

                    <p className="font-anton z-30 p-4 text-lg text-white">
                      {d.title}
                    </p>

                    <Img
                      src="/assets/svg/learn-more.svg"
                      className="h-auto w-32 object-contain"
                    />
                  </Link>
                ))}
            </div>
          </CurvedCard>
        </Parallax>
      </div>
    </>
  );
}
