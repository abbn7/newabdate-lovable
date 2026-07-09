import { cn } from "@/lib/utils";

export function Logo({
  className,
  size = 32,
  withWordmark = false,
}: {
  className?: string;
  size?: number;
  withWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        width={size}
        height={size}
        className="shrink-0 drop-shadow-[0_4px_16px_rgba(125,108,255,0.35)]"
        aria-label="AN — Abdelhamed Nada"
      >
        <defs>
          <linearGradient id="an-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7d6cff" />
            <stop offset="50%" stopColor="#5fc8e8" />
            <stop offset="100%" stopColor="#e89cd8" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="none" stroke="url(#an-g)" strokeWidth="2" opacity="0.6" />
        <circle cx="32" cy="32" r="26" fill="url(#an-g)" opacity="0.18" />
        <path
          d="M19 46 L29 18 L35 18 L45 46"
          fill="none"
          stroke="url(#an-g)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M24 36 L40 36" fill="none" stroke="url(#an-g)" strokeWidth="3" strokeLinecap="round" />
        <path
          d="M30 46 L30 22 L44 42 L44 18"
          fill="none"
          stroke="url(#an-g)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {withWordmark && (
        <span className="font-display text-[1.05rem] leading-none tracking-tight">
          Abdelhamed&nbsp;Nada
        </span>
      )}
    </span>
  );
}

export function MonogramMark({ className, size = 64 }: { className?: string; size?: number }) {
  return <Logo className={className} size={size} />;
}
