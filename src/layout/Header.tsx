import { Link, NavLink } from "react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useClickOutside } from "../hooks/useOnClickOutside";
import Img from "@/components/ui/Image";

const menus = [
  {
    name: "Huckster",
    href: "/",
    color: "text-blue-dark",
    hover: "hover:text-blue-dark",
  },
  {
    name: "We",
    href: "/about-us",
    color: "text-red",
    hover: "hover:text-red",
  },
  {
    name: "Think big",
    href: "/work",
    color: "text-green",
    hover: "hover:text-green",
  },
  {
    name: "For you",
    href: "/services",
    color: "text-yellow",
    hover: "hover:text-yellow",
  },
  {
    name: "Seen & Heard",
    href: "/blogs",
    color: "text-pink",
    hover: "hover:text-pink",
    activeColor: "text-pink",
  },
  {
    name: "Switch to experts!",
    href: "/contact-us",
    color: "text-cyan",
    hover: "hover:text-cyan",
  },
];

export default function Header() {
  const [show, setShow] = useState(false);
  const [animateNav, setAnimateNav] = useState(false);

  const ref = useClickOutside(() => setShow(false));

  return (
    <>
      <div className="z-50 px-5 py-2.5">
        <div className="flex items-center justify-between">
          <Link to={"/"} className="z-50">
            <img
              // autoPlay
              // muted
              // loop
              // playsInline
              className="h-auto w-28 sm:w-36"
              src="/logo-unscreen.gif"
            />
          </Link>

          {!show && (
            <button
              onClick={() => setShow(true)}
              className="group absolute top-4 right-4 z-30 cursor-pointer space-y-2 p-3 duration-300 hover:-space-y-2"
            >
              <motion.div className="h-1.5 w-8 bg-white transition-transform duration-300" />
              <motion.div className="h-1.5 w-8 bg-white transition-transform duration-300" />
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {show && (
          <div className="fixed top-0 z-50 flex h-full w-full items-center justify-center bg-black/50">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                duration: 0.4,
                type: "tween",
                delay: animateNav ? 0.5 : 0,
              }}
              onAnimationStart={() => setAnimateNav(false)}
              onAnimationComplete={() => setAnimateNav(true)}
              className="absolute top-1 right-2 bottom-1 z-10 flex w-[96vw] origin-top-right flex-col justify-end overflow-hidden rounded-4xl bg-white px-8 text-black md:w-[55%] lg:w-[45%]"
              ref={ref}
            >
              <motion.nav
                initial="hidden"
                animate={animateNav ? "visible" : "hidden"}
                exit="hidden"
                variants={{
                  hidden: {
                    transition: {
                      staggerChildren: 0.1,
                      staggerDirection: -1,
                    },
                  },
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
                className="relative flex flex-1 flex-col justify-end gap-2 text-lg"
              >
                {menus.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: 10 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    className="font-anton z-50 text-left text-[2.75rem] leading-none sm:text-[5.5vw]"
                  >
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        `${isActive ? `${item.color}` : `text-black ${item.hover}`} whitespace-nowrap`
                      }
                      onClick={() => setShow(false)}
                    >
                      {item.name}
                    </NavLink>
                  </motion.div>
                ))}
              </motion.nav>

              <motion.button
                className="absolute top-0 right-0 cursor-pointer duration-300 hover:rotate-[720deg]"
                onClick={() => setShow(false)}
              >
                <Img src="/assets/close.png" className="size-16" />
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
