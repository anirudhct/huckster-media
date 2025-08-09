import { Suspense, lazy, useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Route, Routes, useLocation } from "react-router";
import Layout from "./layout/Layout";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Work = lazy(() => import("./pages/work/Work"));
const DetailWork = lazy(() => import("./pages/work/DetailWork"));
const Services = lazy(() => import("./pages/Services"));
const Blogs = lazy(() => import("./pages/blogs/Blogs"));
const DetailBlog = lazy(() => import("./pages/blogs/DetailBlog"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  const location = useLocation();
  const isFirstRender = useRef(true);
  const [enableAnimation, setEnableAnimation] = useState(false);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      setEnableAnimation(true);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [location]);

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={enableAnimation ? { y: "100%" } : false}
          animate={enableAnimation ? { y: 0 } : false}
          exit={enableAnimation ? { scaleX: 0.9, y: "10%" } : {}}
          transition={
            enableAnimation ? { duration: 1, ease: [0.65, 0, 0.35, 1] } : {}
          }
          className="min-h-screen w-full"
        >
          <Suspense fallback={<div className="min-h-dvh bg-black" />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/work" element={<Work />} />
              <Route path="/work/:id" element={<DetailWork />} />
              <Route path="/services" element={<Services />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:id" element={<DetailBlog />} />
              <Route path="/contact-us" element={<Contact />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}
