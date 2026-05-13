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
  // new: animate each letter appearing one after another
  letterStagger = false,
}: {
  maximum?: number;
  children: ReactNode;
  className?: string;
  padding?: boolean;
  stagger?: boolean;
  slam?: boolean;
  letterStagger?: boolean;
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

  const renderLetters = (content: string) => {
    const letters = content.split("");
    return letters.map((letter, i) => (
      <span
        key={i}
        className="sft-letter-wrapper inline-block"
        style={{ animationDelay: `${i * 0.18}s` }}
      >
        {letter === " " ? "\u00A0" : letter}
      </span>
    ));
  };

  const renderWords = (content: ReactNode) => {
    if (typeof content !== "string") return content;

    // letterStagger mode — each letter appears one after another
    if (letterStagger) {
      return renderLetters(content);
    }

    // slam=false and stagger=false — render plain text with no internal animation.
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