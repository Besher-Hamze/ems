import { getPage } from "@/lib/content";
import { FACTORY_IMAGES, VIDEOS } from "@/lib/media";
import { PageHero } from "@/components/site/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "من نحن" };

export default async function AboutPage() {
  const page = await getPage("about");
  return (
    <div>
      <PageHero kicker="من نحن" title={page.title || "شركة إي إم إس للصناعات الكيميائية"} />
      <section className="mx-auto grid max-w-site gap-12 px-4 py-14 md:grid-cols-2 md:px-6 md:pb-28">
        <div className="space-y-6 text-lg leading-10 text-ems-muted">
          {String(page.body || "")
            .split("\n")
            .filter(Boolean)
            .map((para: string, i: number) => (
              <p key={i}>{para}</p>
            ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {FACTORY_IMAGES.slice(0, 4).map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} alt="" className="h-40 w-full rounded-2xl object-cover md:h-52" />
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-site px-4 pb-20 md:px-6 md:pb-28">
        <div className="rounded-[2rem] border border-ems-gold/30 p-2">
          <video className="h-[280px] w-full rounded-[1.6rem] object-cover md:h-[420px]" autoPlay muted loop playsInline poster={FACTORY_IMAGES[0]}>
            <source src={VIDEOS[0]} type="video/mp4" />
          </video>
        </div>
      </section>
    </div>
  );
}
