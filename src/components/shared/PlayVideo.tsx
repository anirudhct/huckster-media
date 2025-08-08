import { useState } from "react";
import Img from "../ui/Image";
// import { motion } from "motion/react";
// import { useInView } from "react-intersection-observer";

export default function PlayVideo() {
  const [show, setShow] = useState(false);
  // const [animationRef, isInView] = useInView({
  //   triggerOnce: false,
  //   threshold: 0.3,
  // });

  return (
    <>
      <div className="relative overflow-hidden rounded-t-4xl">
        <video
          loop
          playsInline
          muted
          autoPlay
          className="absolute -z-10 h-full w-full object-cover"
        >
          <source src="/huckster-recap-R4.mp4" />
        </video>
        <div className="font-anton ml-[-2.5%] flex h-full min-h-[60vh] sm:min-h-[87vh] flex-col justify-between pt-3 uppercase sm:pt-0 lg:min-h-screen lg:flex-row lg:items-center lg:justify-between">
          {/* <h2
            className="font-font-anton text-white2 lh-08 flex w-full justify-between text-[53vw] uppercase lg:text-[33vw]"
            ref={animationRef}
          >
            <div>
              <motion.p
                initial={{ x: -50 }}
                animate={isInView ? { x: 0 } : { x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                p
              </motion.p>
            </div>
            <div>
              <motion.p
                initial={{ x: -50 }}
                animate={isInView ? { x: 0 } : { x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                l
              </motion.p>
            </div>
          </h2> */}
          <div className="flex justify-center sm:text-[3vw] w-full items-center h-[60vh] sm:h-[87vh]">
            <button
              className="m-auto h-auto w-[4rem] cursor-pointer sm:w-[7.5rem]"
              onClick={() => setShow(true)}
            >
              <video preload="metadata" playsInline>
                <source src="/assets/play.webm" type="video/mp4" />
              </video>
            </button>
          </div>
          {/* <h2 className="font-font-anton text-white2 lh-08 flex w-full justify-between text-[53vw] uppercase lg:text-[33vw]">
            <div>
              <motion.p
                initial={{ x: 50 }}
                animate={isInView ? { x: 0 } : { x: 50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                a
              </motion.p>
            </div>
            <div>
              <motion.p
                initial={{ x: 50 }}
                animate={isInView ? { x: 0 } : { x: 50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                y
              </motion.p>
            </div>
          </h2> */}
        </div>
      </div>

      {show && (
        <div className="fixed top-0 right-0 left-0 z-50 h-screen w-full bg-black">
          <video
            loop
            playsInline
            autoPlay
            controls
            className="absolute -z-10 h-full w-full object-contain"
          >
            <source src="/huckster-recap-R4.mp4" />
          </video>

          <button
            onClick={() => setShow(false)}
            className="fixed top-0 right-0 cursor-pointer duration-300 hover:rotate-[720deg]"
          >
            <Img src="/assets/close.png" className="size-20" />
          </button>
        </div>
      )}
    </>
  );
}
