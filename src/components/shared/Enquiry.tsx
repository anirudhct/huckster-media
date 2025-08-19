import ContactForm from "@/components/contact/ContactForm";

export default function Enquiry() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-5 rounded-t-3xl bg-white p-5 text-black sm:grid-cols-2 sm:p-8 md:p-10 lg:p-14">
      <div className="font-anton flex h-full flex-col justify-between overflow-hidden">
        <span>Let's make some noise!</span>
        <h4 className="mt-5 text-[10vw] leading-none sm:text-[8vw]">
          Got a Minute?
          <br /> Tell Us More
        </h4>
      </div>
      <ContactForm />
    </div>
  );
}
