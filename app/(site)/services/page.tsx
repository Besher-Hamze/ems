import { getServices } from "@/lib/content";
import { ProductSearch } from "@/components/site/ProductSearch";
import { PageHero } from "@/components/site/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "المنتجات" };

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const services = await getServices();
  const { q } = await searchParams;
  return (
    <div>
      <PageHero
        kicker="المنتجات"
        title="لاصق. تسوية. عزل."
        text="خط EMS.PRO للسيراميك والحجر والتسوية والعزل — عبوات 20 كغ للمهني وللبيت."
      />
      <section className="mx-auto max-w-site px-4 py-14 md:px-6 md:pb-28">
        <ProductSearch items={services} initialQuery={q || ""} />
      </section>
    </div>
  );
}
