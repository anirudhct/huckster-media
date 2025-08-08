import { useEffect } from "react";

export function useHideScroll({ show }: { show: boolean }) {
  useEffect(() => {
    if (show) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Clean up on unmount
    return () => document.body.classList.remove("overflow-hidden");
  }, [show]);
}
