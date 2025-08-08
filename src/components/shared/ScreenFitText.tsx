import { cn } from "@/lib/utils";
import { useEffect, useRef, type ReactNode } from "react";

export default function ScreenFitText({
  maximum = 2500,
  children,
  className,
  padding = false, // ✅ new optional prop
}: {
  maximum?: number;
  children: ReactNode;
  className?: string;
  padding?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    resizeText();
    window.addEventListener("resize", resizeText);
    return () => window.removeEventListener("resize", resizeText);
  }, [padding]);

  const resizeText = () => {
    const container = containerRef.current;
    const text = textRef.current;

    if (!container || !text) return;

    const containerWidth = container.offsetWidth;

    let min = 1;
    let max = maximum;

    while (min <= max) {
      const mid = Math.floor((min + max) / 2);

      text.style.fontSize = mid + "px";

      if (text.offsetWidth <= containerWidth) {
        min = mid + 1;
      } else {
        max = mid - 1;
      }
    }

    text.style.fontSize = !padding ? max + "px" : max - 10 + "px";
  };

  return (
    <div
      className="mx-auto w-full items-center overflow-hidden"
      ref={containerRef}
    >
      <span
        className={cn(
          "font-anton text-center leading-none whitespace-nowrap",
          className,
        )}
        ref={textRef}
      >
        {children}
      </span>
    </div>
  );
}
