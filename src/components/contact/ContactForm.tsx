import FloatingInput from "@/components/ui/FloatingInput";
import FloatingTextarea from "@/components/ui/FloatingTextarea";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import Button from "../ui/Button";
import { usePostContactForm } from "@/hooks/useContactForm";
import type { TContactForm } from "@/types/api";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export default function ContactForm() {
  const { mutate, isPending } = usePostContactForm();
  const [captchaError, setCaptchaError] = useState("");

  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const isCaptchaConfigured = Boolean(recaptchaSiteKey);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TContactForm>();

  // ✅ Load reCAPTCHA v3 script
  useEffect(() => {
    if (!recaptchaSiteKey) return;

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`;
    script.async = true;

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [recaptchaSiteKey]);

  // ✅ Submit handler (v3 flow)
  const onSubmit = async (values: TContactForm) => {
    if (!window.grecaptcha) {
      setCaptchaError("Captcha not loaded. Please refresh.");
      return;
    }

    try {
      const token = await new Promise<string>((resolve) => {
        window.grecaptcha!.ready(async () => {
          const t = await window.grecaptcha!.execute(recaptchaSiteKey, {
            action: "submit",
          });
          resolve(t);
        });
      });

      mutate(
        { ...values, captchaToken: token },
        {
          onSuccess: () => {
            reset();
            setCaptchaError("");
          },
          onError: (error: any) => {
            setCaptchaError(
              error?.response?.data?.message ||
                "Captcha verification failed. Try again."
            );
          },
        }
      );
    } catch (err) {
      console.error(err);
      setCaptchaError("Captcha failed. Please try again.");
    }
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
       
      </div>

      {/* ✅ v3 notice instead of checkbox */}
      <div className="col-span-full">
        {isCaptchaConfigured ? (
          <p className="text-xs text-gray-500">
            This site is protected by reCAPTCHA and the Google Privacy Policy
            and Terms of Service apply.
          </p>
        ) : (
          <p className="text-red text-sm">
            Captcha setup is required before submission.
          </p>
        )}

        {captchaError && (
          <p className="text-red mt-1 text-sm">{captchaError}</p>
        )}
      </div>

      <Button
        type="submit"
        className="col-span-full"
        disabled={!isCaptchaConfigured || isPending}
      >
        {isPending ? "Sending..." : "Send"}
      </Button>
    </motion.form>
  );
}