import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Button from "../ui/Button";
import CurvedCard from "../shared/CurvedCard";
import AnimatedBlogCard from "./AnimateBlogCard";
import { Link, useNavigate } from "react-router";
import Img from "../ui/Image";
import { useFeaturedBlog } from "@/hooks/useBlog";
import type { TBlog } from "@/types/api";

export default function HomeBlogs() {
  const { data } = useFeaturedBlog();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Move the whole container to the left as you scroll
  const translateX = useTransform(scrollYProgress, [0, 1], [0, -600]);

  return (
    <CurvedCard className="overflow-hidden bg-black">
      <motion.div
        className="mb-20 hidden lg:block"
        ref={containerRef}
        style={{ x: translateX }}
      >
        {data?.data?.map((d: TBlog, idx: number) => (
          <AnimatedBlogCard data={d} index={idx} />
        ))}
      </motion.div>

      <div className="mx-auto space-y-10 lg:hidden">
        {data?.data?.map((d: TBlog, idx: number) => (
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
                src={d.image}
                className="absolute inset-0 z-20 h-full w-full object-cover p-3"
              />
            </div>

            <p className="font-anton z-30 p-4 text-lg text-white">{d.title}</p>

            <Img
              src="/assets/svg/learn-more.png"
              className="h-auto w-32 object-contain"
            />
          </Link>
        ))}
      </div>

      <Button onClick={() => navigate("/blogs")} className="mt-40 text-[5vw]">
        check all blogs
      </Button>
    </CurvedCard>
  );
}
