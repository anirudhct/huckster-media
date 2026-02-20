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

  
  const itemCount = data?.data?.length || 1;
  const translateX = useTransform(
    scrollYProgress,
    [0, 1],
    ["45vw", `-${itemCount * 20}vw`] 
  );

  return (
    <CurvedCard className="relative min-h-[100vh] overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-0 z-0">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-60"
          playsInline
          muted
          loop
          autoPlay
        >
          <source src="/banner.mp4" />
        </video>
      </div>

      {/* Desktop View */}
      <motion.div
        className="mb-20 hidden lg:block"
        ref={containerRef}
        style={{ x: translateX }}
      >
        <div className="flex flex-col">
           {data?.data?.map((d: TBlog, idx: number) => (
            <AnimatedBlogCard key={d.slug || idx} data={d} index={idx} />
          ))}
        </div>
      </motion.div>

      {/* Mobile View */}
      <div className="relative z-10 mx-auto space-y-10 px-6 lg:hidden">
        {data?.data?.map((d: TBlog, idx: number) => (
          <Link
            className="mx-auto flex h-full w-full max-w-[318px] -rotate-3 flex-col"
            to={`/blogs/${d.slug}`}
            key={idx}
          >
            {/* ... keeping mobile code the same ... */}
            <div className="relative h-[360px] w-[318px]">
               <Img src="/assets/frame.avif" className="absolute h-full w-full object-contain" />
               <Img dynamic src={d.image} className="absolute inset-0 z-20 h-full w-full object-cover p-3" />
            </div>
            <p className="font-anton p-4 text-lg text-white">{d.title}</p>
          </Link>
        ))}
      </div>

      <div className="relative z-20 flex justify-center pb-20">
        <Button onClick={() => navigate("/blogs")} className="text-[4vw] lg:text-[2vw]">
          check all blogs
        </Button>
      </div>
    </CurvedCard>
  );
}