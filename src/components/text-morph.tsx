"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function TextRotator({
  items,
  interval = 2600,
  className,
}: {
  items: string[];
  interval?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setI((p) => (p + 1) % items.length), interval);
    return () => window.clearInterval(t);
  }, [items.length, interval]);

  return (
    <span className={"relative inline-block align-baseline " + (className ?? "")}>
      <AnimatePresence mode="wait">
        <motion.span
          key={items[i]}
          initial={{ y: "0.6em", opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-0.6em", opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          {items[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
