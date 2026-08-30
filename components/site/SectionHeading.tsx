import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function SectionHeading({
  kicker,
  title,
  text,
  href,
  linkLabel,
}: {
  kicker: string;
  title: string;
  text?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="text-xs font-bold tracking-[0.22em] text-ems-gold">{kicker}</p>
      <h2 className="mt-3 font-changa text-3xl leading-tight md:text-5xl">{title}</h2>
      {text ? <p className="mt-4 text-base leading-8 text-ems-muted md:text-lg">{text}</p> : null}
      {href && linkLabel ? (
        <Link href={href} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-ems-gold">
          {linkLabel}
          <ArrowLeft className="h-4 w-4" />
        </Link>
      ) : null}
    </div>
  );
}
