import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function MediaCard({
  href,
  image,
  title,
  description,
  kicker,
  large = false,
}: {
  href: string;
  image?: string;
  title: string;
  description?: string;
  kicker?: string;
  large?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group relative overflow-hidden rounded-[1.75rem] bg-ems-black ${
        large ? "min-h-[360px] sm:col-span-2 sm:min-h-[420px]" : "min-h-[280px]"
      }`}
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
        {kicker ? <p className="text-[11px] font-bold tracking-[0.16em] text-ems-gold">{kicker}</p> : null}
        <h3 className="mt-1 font-changa text-2xl text-white">{title}</h3>
        {description ? (
          <p className="mt-2 line-clamp-2 max-w-lg text-sm leading-7 text-white/75">{description}</p>
        ) : null}
      </div>
    </Link>
  );
}

export function CatalogCard({
  href,
  image,
  title,
  description,
}: {
  href: string;
  image?: string;
  title: string;
  description?: string;
}) {
  return (
    <Link href={href} className="group overflow-hidden rounded-[1.75rem] border border-ems-line bg-white">
      <div className="relative h-52 overflow-hidden">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        ) : null}
      </div>
      <div className="p-6">
        <h3 className="font-changa text-2xl">{title}</h3>
        {description ? (
          <p className="mt-2 line-clamp-3 text-sm leading-7 text-ems-muted">{description}</p>
        ) : null}
        <p className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-ems-gold">
          اعرف أكثر
          <ArrowLeft className="h-4 w-4" />
        </p>
      </div>
    </Link>
  );
}
