import { Kicker } from "./section-reveal";

export function SectionHeader({
  kicker,
  title,
  sub,
  align = "start",
}: {
  kicker: string;
  title: string;
  sub?: string;
  align?: "start" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}>
      <Kicker>{kicker}</Kicker>
      <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.6rem)] leading-[1.02] tracking-[-0.02em]">
        {title}
      </h2>
      {sub && <p className="mt-4 text-base text-muted-foreground">{sub}</p>}
    </div>
  );
}
