import FloatingInput from "@/components/ui/FloatingInput";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import Button from "../ui/Button";
import type { TCareers } from "@/types/api";
import { usePostCareers } from "@/hooks/useCareers";
import { postUpload } from "@/api/upload";

export default function CareerForm() {
  const { mutate } = usePostCareers();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TCareers>();

  const onSubmit = (values: TCareers) => {
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
          id="desiredPosition"
          label="Desired Position"
          {...register("desiredPosition")}
        />
      </div>

      <div>
        <FloatingInput
          id="linkedin"
          label="LinkedIn"
          {...register("linkedin")}
        />
      </div>

      <div className="col-span-full">
        <label
          htmlFor="resume"
          className="scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-black"
        >
          Resume
        </label>
        <input
          type="file"
          accept="application/pdf"
          className="border-border w-full border-b text-gray-500 focus:border-black"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            try {
              const res = await postUpload({
                file,
                folder: "uploads/job",
              });
              if (res?.filePath) {
                setValue("resume", res.filePath, { shouldValidate: true });
              }
            } catch (error) {
              console.error("Resume upload failed", error);
            }
          }}
        />
        {errors.resume && (
          <p className="text-red mt-1 text-sm">{errors.resume.message}</p>
        )}
      </div>

      <input
        type="hidden"
        {...register("resume", { required: "Resume is required" })}
      />

      <div className="col-span-full">
        <label
          htmlFor="coverLetter"
          className="scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-black"
        >
          Cover Letter
        </label>
        <input
          type="file"
          accept="application/pdf"
          className="border-border w-full border-b text-gray-500 focus:border-black"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            try {
              const res = await postUpload({
                file,
                folder: "uploads/job",
              });
              if (res?.filePath) {
                setValue("coverLetter", res.filePath, { shouldValidate: true });
              }
            } catch (error) {
              console.error("Cover letter upload failed", error);
            }
          }}
        />
        {errors.coverLetter && (
          <p className="text-red mt-1 text-sm">{errors.coverLetter.message}</p>
        )}
      </div>

      <input
        type="hidden"
        {...register("coverLetter", { required: "Cover letter is required" })}
      />

      <Button type="submit" className="col-span-full">
        Send
      </Button>
    </motion.form>
  );
}
