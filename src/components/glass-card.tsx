import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "subtle" | "default" | "strong";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  noise?: boolean;
  glow?: boolean;
  as?: keyof HTMLElementTagNameMap;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(function GlassCard(
  { className, variant = "default", noise = true, glow = false, children, ...rest },
  ref,
) {
  const v =
    variant === "strong" ? "glass-strong" : variant === "subtle" ? "glass-subtle" : "glass";

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-2xl",
        v,
        noise && "noise",
        className,
      )}
      {...rest}
    >
      {glow && (
        <div
          aria-hidden
          className="pointer-events-none absolute -top-1/2 left-1/2 h-[120%] w-[80%] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "conic-gradient(from 90deg at 50% 50%, #7d6cff, #5fc8e8, #e89cd8, #7d6cff)",
          }}
        />
      )}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
});
