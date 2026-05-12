import FloatingInput from "@/components/ui/FloatingInput";
import FloatingTextarea from "@/components/ui/FloatingTextarea";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import Button from "../ui/Button";
import { usePostContactForm } from "@/hooks/useContactForm";
import type { TContactForm } from "@/types/api";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback": () => void;
          "error-callback": () => void;
        },
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

export default function ContactForm() {
  const { mutate } = usePostContactForm();
  const captchaRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
  const isCaptchaConfigured = Boolean(turnstileSiteKey);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TContactForm>();

  useEffect(() => {
    if (!turnstileSiteKey || !captchaRef.current || widgetIdRef.current) {
      return;
    }

    const renderCaptcha = () => {
      if (!window.turnstile || !captchaRef.current || widgetIdRef.current) {
        return;
      }

      widgetIdRef.current = window.turnstile.render(captchaRef.current, {
        sitekey: turnstileSiteKey,
        callback: (token) => {
          setCaptchaToken(token);
          setCaptchaError("");
        },
        "expired-callback": () => setCaptchaToken(""),
        "error-callback": () => {
          setCaptchaToken("");
          setCaptchaError(
            "Captcha failed to load. Please refresh and try again.",
          );
        },
      });
    };

    if (window.turnstile) {
      renderCaptcha();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    script.onload = renderCaptcha;
    document.head.appendChild(script);
  }, [turnstileSiteKey]);

  const onSubmit = (values: TContactForm) => {
    mutate(
      { ...values, captchaToken },
      {
        onSuccess: () => {
          reset();
          setCaptchaToken("");
          window.turnstile?.reset(widgetIdRef.current ?? undefined);
        },
      },
    );
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

      <div className="col-span-full">
        {isCaptchaConfigured ? (
          <div ref={captchaRef} />
        ) : (
          <p className="text-red text-sm">
            Captcha setup is required before this form can be submitted.
          </p>
        )}
        {captchaError && (
          <p className="text-red mt-1 text-sm">{captchaError}</p>
        )}
      </div>

      <Button
        type="submit"
        className="col-span-full"
        disabled={!isCaptchaConfigured || !captchaToken}
      >
        Send
      </Button>
    </motion.form>
  );
}
