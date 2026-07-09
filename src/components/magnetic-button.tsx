"use client";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline";

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "ref"> {
  variant?: Variant;
  asChild?: never;
  children: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
}

export function MagneticButton({
  variant = "primary",
  className,
  children,
  href,
  target,
  rel,
  ...rest
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function onMove(e: React.MouseEvent) {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    x.set(mx * 0.18);
    y.set(my * 0.28);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-tight transition will-change-transform select-none active:scale-[0.98]";
  const styles =
    variant === "primary"
      ? "text-primary-foreground bg-foreground hover:opacity-90"
      : variant === "outline"
      ? "glass-subtle hover:bg-[var(--glass-3)]"
      : "text-foreground/80 hover:text-foreground";

  const inner = (
    <motion.span style={{ x: sx, y: sy }} className="relative inline-flex items-center gap-2">
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block">
        <a href={href} target={target} rel={rel} className={cn(base, styles, className)}>
          {inner}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block">
      <button className={cn(base, styles, className)} {...rest}>
        {inner}
      </button>
    </motion.div>
  );
}
