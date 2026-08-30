import { getProjects } from "@/lib/content";
import { FACTORY_IMAGES } from "@/lib/media";
import { projectCover } from "@/lib/project-media";
import { MediaCard } from "@/components/site/MediaCard";
import { PageHero } from "@/components/site/PageHero";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "الأعمال" };

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <div>
      <PageHero
        kicker="الأعمال"
        title="من المصنع إلى الموقع"
        text="خطوط الإنتاج، التوزيع، والحضور في المحافظات — الأعمال اللي وراء المنتج تحت البلاط."
      />
      <section className="mx-auto max-w-site px-4 py-14 md:px-6 md:pb-28">
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((item: { _id: string; slug: string; title: string; description: string; image?: string; images?: string[] }, i: number) => (
            <MediaCard
              key={item._id}
              href={`/projects/${item.slug}`}
              image={projectCover(item) || FACTORY_IMAGES[0]}
              title={item.title}
              description={item.description}
              kicker="عمل"
              large={i === 0}
            />
          ))}
        </div>
        {!projects.length ? (
          <p className="rounded-[1.75rem] border border-ems-line bg-white p-10 text-center text-ems-muted">
            ما في أعمال معروضة حالياً.
          </p>
        ) : null}
      </section>
    </div>
  );
}
