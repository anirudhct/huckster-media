import ContactForm from "@/components/contact/ContactForm";
import Img from "@/components/ui/Image";

export default function Enquiry() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-5 rounded-t-3xl bg-white p-5 text-black sm:grid-cols-2 sm:p-8 md:p-10 lg:p-14">
      <div className="font-anton flex h-full flex-col justify-between overflow-hidden">
        <Img
          src="/assets/svg/Huckster Web Texts R1.svg"
          className="h-auto w-64 object-center xl:w-[38vw]"
        />
        <h4 className="mt-5 text-[10vw] leading-none sm:text-[8vw]">
          Got a Minute?
          <br /> Tell Us More
        </h4>
      </div>
      <ContactForm />
    </div>
  );
}