import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

type ButtonProps = {
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
};

export default function Button({
  type = "button",
  variant = "primary",
  children,
  className,
  disabled,
  onClick,
}: ButtonProps) {
  const variantsStyles = {
    primary: "bg-red text-white",
    secondary: "bg-white text-pink",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        `font-anton buttonHoverEffect relative w-full cursor-pointer rounded-2xl py-5 text-3xl uppercase hover:scale-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 sm:text-5xl md:text-6xl ${variantsStyles[variant]}`,
        className,
      )}
      onClick={onClick}
    >
      <span className="shakeText">{children}</span>
    </button>
  );
}
