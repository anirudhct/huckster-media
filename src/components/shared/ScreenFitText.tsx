import { cn } from "@/lib/utils";
import { useEffect, useRef, type ReactNode } from "react";

export default function ScreenFitText({
  maximum = 2500,
  children,
  className,
  padding = false,
  stagger = true,
  // animate the whole line as one big "slam up" block (like HEROES)
  slam = false,
}: {
  maximum?: number;
  children: ReactNode;
  className?: string;
  padding?: boolean;
  stagger?: boolean;
  slam?: boolean;
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

  const renderWords = (content: ReactNode) => {
    if (typeof content !== "string") return content;

    // slam=false and stagger=false — render plain text with no internal animation.
    // Used when a parent (e.g. motion.div) is handling the entrance itself.
    if (!slam && !stagger) {
      return content;
    }

    // slam mode = whole line rises as one unit (like HEROES)
    if (slam) {
      return (
        <span className="sft-slam-wrapper">
          <span className="sft-slam">{content}</span>
        </span>
      );
    }

    // stagger mode = word by word (like WE TURN BRANDS INTO)
    if (stagger) {
      return content.split(" ").map((word, i) => (
        <span key={i} className="sft-word-clip">
          <span
            className="sft-word"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {word}
          </span>
          {i < content.split(" ").length - 1 ? "\u00A0" : ""}
        </span>
      ));
    }

    return content;
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
        {renderWords(children)}
      </span>
    </div>
  );
}
