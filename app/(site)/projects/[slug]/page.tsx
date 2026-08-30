import { getProjectBySlug, getProjects } from "@/lib/content";
import { projectCover } from "@/lib/project-media";
import { MediaCard } from "@/components/site/MediaCard";
import { LightboxGallery } from "@/components/site/Lightbox";
import { VideoFrame } from "@/components/site/VideoFrame";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getProjectBySlug(slug);
  return { title: item?.title || "عمل" };
}

export default async function ProjectDetail({ params }: Props) {
  const { slug } = await params;
  const item = await getProjectBySlug(slug);
  if (!item) notFound();
  const others = (await getProjects())
    .filter((p: { slug: string }) => p.slug !== slug)
    .slice(0, 2);

  const images = (item.images?.length ? item.images : item.image ? [item.image] : []).filter(Boolean) as string[];
  const videos = (item.videos || []).filter(Boolean) as string[];

  return (
    <div>
      <section className="mx-auto max-w-site px-4 pt-12 md:px-6">
        <Link href="/projects" className="text-sm font-bold text-ems-gold">
          ← كل الأعمال
        </Link>
        <h1 className="mt-4 max-w-4xl font-changa text-4xl md:text-6xl">{item.title}</h1>
        {images.length ? (
          <div className="mt-8 rounded-[2rem] border border-ems-gold/30 p-2">
            <LightboxGallery images={images} title={item.title} />
          </div>
        ) : null}
      </section>
      <section className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
        <p className="text-lg leading-9 text-ems-muted">{item.description}</p>
        <Link href="/contact" className="mt-10 inline-flex rounded-full bg-ems-gold px-7 py-3.5 font-bold text-white">
          اطلب عرض سعر
        </Link>
      </section>
      {videos.length ? (
        <section className="mx-auto max-w-site px-4 pb-12 md:px-6">
          <h2 className="mb-6 font-changa text-3xl">فيديو</h2>
          <div className={`grid gap-4 ${videos.length > 1 ? "md:grid-cols-2" : ""}`}>
            {videos.map((src: string) => (
              <VideoFrame key={src} src={src} title={item.title} />
            ))}
          </div>
        </section>
      ) : null}
      {others.length ? (
        <section className="mx-auto max-w-site px-4 pb-20 md:px-6 md:pb-28">
          <h2 className="mb-8 font-changa text-3xl">أعمال أخرى</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {others.map((p: { _id: string; slug: string; title: string; description: string; image?: string; images?: string[] }) => (
              <MediaCard
                key={p._id}
                href={`/projects/${p.slug}`}
                image={projectCover(p)}
                title={p.title}
                description={p.description}
                kicker="عمل"
              />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
