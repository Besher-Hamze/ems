import { getServiceBySlug, getServices } from "@/lib/content";
import { PRODUCT_IMAGES } from "@/lib/media";
import { CatalogCard } from "@/components/site/MediaCard";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getServiceBySlug(slug);
  return { title: item?.title || "منتج" };
}

export default async function ServiceDetail({ params }: Props) {
  const { slug } = await params;
  const item = await getServiceBySlug(slug);
  if (!item) notFound();
  const others = (await getServices()).filter((s: { slug: string }) => s.slug !== slug).slice(0, 3);

  return (
    <div>
      <section className="mx-auto max-w-site px-4 pt-12 md:px-6">
        <Link href="/services" className="text-sm font-bold text-ems-gold">
          ← كل المنتجات
        </Link>
        <h1 className="mt-4 max-w-4xl font-changa text-4xl md:text-6xl">{item.title}</h1>
        <div className="mt-8 rounded-[2rem] border border-ems-gold/30 p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image || PRODUCT_IMAGES[0]}
            alt={item.title}
            className="h-[280px] w-full rounded-[1.6rem] object-cover md:h-[460px]"
          />
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
        <p className="whitespace-pre-wrap text-lg leading-9 text-ems-muted">{item.description}</p>
        <Link href="/contact" className="mt-10 inline-flex rounded-full bg-ems-gold px-7 py-3.5 font-bold text-white">
          اطلب هذا المنتج
        </Link>
      </section>
      {others.length ? (
        <section className="mx-auto max-w-site px-4 pb-20 md:px-6 md:pb-28">
          <h2 className="mb-8 font-changa text-3xl">منتجات أخرى</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {others.map((s: { _id: string; slug: string; title: string; description?: string; image?: string }) => (
              <CatalogCard key={s._id} href={`/services/${s.slug}`} image={s.image} title={s.title} description={s.description} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
