import FloatingInput from "@/components/ui/FloatingInput";
import FloatingTextarea from "@/components/ui/FloatingTextarea";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import Button from "../ui/Button";
import { usePostContactForm } from "@/hooks/useContactForm";
import type { TContactForm } from "@/types/api";

export default function ContactForm() {
  const { mutate } = usePostContactForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TContactForm>();

  const onSubmit = (values: TContactForm) => {
    mutate(values, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <motion.form
      className="grid gap-10 sm:grid-cols-2"
      onSubmit={handleSubmit(onSubmit)}
      initial={{ y: 10 }}
    >
      <div className="col-span-full">
        <FloatingInput
          id="email"
          label="YOUR EMAIL*"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <p className="text-red mt-1 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <FloatingInput
          id="name"
          label="Your name*"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <p className="text-red mt-1 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <FloatingInput
          id="phone"
          label="Your phone*"
          {...register("phone", { required: "Phone is required" })}
        />
        {errors.phone && (
          <p className="text-red mt-1 text-sm">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <FloatingInput
          id="companyName"
          label="Company name"
          {...register("companyName")}
        />
      </div>

      <div>
        <FloatingInput id="role" label="Your role" {...register("role")} />
      </div>

      <div className="col-span-full">
        <FloatingTextarea
          id="message"
          label="Message*"
          {...register("message", { required: "Message is required" })}
        />
        {errors.message && (
          <p className="text-red mt-1 text-sm">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" className="col-span-full">
        Send
      </Button>
    </motion.form>
  );
}
