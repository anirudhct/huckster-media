import { useNavigate, useSearchParams } from "react-router";
import { motion } from "motion/react";
import ContactForm from "@/components/contact/ContactForm";
import CareerForm from "@/components/contact/CareersForm";

const data = [
  { href: "brand-partners", title: "Brand Partners" },
  { href: "careers", title: "Careers" },
  { href: "lets-create-together", title: "Let’s  Create  Together!" },
];

export default function Contact() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const formType = searchParams.get("form");

  return (
    <div>
      <h1 className="font-anton text-cyan text-center text-7xl sm:text-[18vw]">
        What’s next?
      </h1>

      <div className="font-anton sm:text:2xl grid grid-cols-3 text-sm md:text-2xl lg:text-3xl xl:text-4xl">
        {data.map((d) => (
          <button
            className="cursor-pointer uppercase"
            onClick={() => navigate(`?form=${d.href}`)}
            key={d.href}
          >
            {d.title}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 rounded-t-3xl bg-white p-5 text-black sm:grid-cols-2 sm:p-8 md:p-10 lg:p-14">
        <div className="font-anton flex h-full flex-col justify-between overflow-hidden">
          <span>Let's make some noise!</span>
          <motion.h4
            className="mt-5 text-[10vw] leading-none sm:text-[8vw]"
            initial={{ y: -10 }}
          >
            Got a Minute?
            <br /> Tell Us More
          </motion.h4>
        </div>
        {formType === "careers" ? <CareerForm /> : <ContactForm />}
      </div>
    </div>
  );
}
