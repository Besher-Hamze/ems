import Link from "next/link";
import { getPage, getProjects, getServices, getSettings } from "@/lib/content";
import { FACTORY_IMAGES, HERO_POSTER, HERO_VIDEO, PRODUCT_IMAGES } from "@/lib/media";
import { projectCover } from "@/lib/project-media";
import { CatalogCard, MediaCard } from "@/components/site/MediaCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { FaqList } from "@/components/site/FaqList";
import { ArrowLeft, Phone } from "lucide-react";

const reasons = [
  { title: "منتج من المصنع", text: "تصنيع وتعبئة عبوات 20 كغ بمعايير تغليف صناعي جاهز للشحن." },
  { title: "خبرة تركية وتصنيع سوري", text: "المواصفات من الخبرة التركية، والتنفيذ على خطوطنا في سورية." },
  { title: "التصاق وثبات", text: "بوليمرات عالية الأداء للسيراميك والرخام، داخلي وخارجي." },
  { title: "تغطية المحافظات", text: "حلب، دمشق، وكل المحافظات — توريد للموقع أو للمستودع." },
  { title: "اختيار حسب المشروع", text: "من C1 إلى GOLD FLEX وSTONE BOND حسب البلاط والحركة." },
  { title: "للمهني وللبيت", text: "عبوة احترافية يثق فيها البنّاء، ونتيجة تدوم تحت البلاط." },
];

const steps = [
  { n: "1", title: "طلب عرض سعر", text: "واتساب أو اتصال. اذكر نوع البلاط ومساحة المشروع." },
  { n: "2", title: "تحديد المنتج", text: "نحدد اللاصق أو التسوية أو العزل المناسب لسطح العمل." },
  { n: "3", title: "التوريد", text: "شحن الطبليات إلى الموقع أو المستودع داخل سورية." },
  { n: "4", title: "المتابعة", text: "دعم فني بعد التوريد حتى يطلع الشغل نظيف." },
];

type CatalogItem = {
  _id: string;
  slug: string;
  title: string;
  description: string;
  image?: string;
  images?: string[];
};

export default async function HomePage() {
  const [settings, home, services, projects] = await Promise.all([
    getSettings(),
    getPage("home"),
    getServices(),
    getProjects(),
  ]);

  const headline = home.title || settings.slogan || "";
  const goldPart = "من تحت البلاط";
  const split = headline.includes(goldPart) ? headline.split(goldPart) : null;

  return (
    <div>
      <section className="relative overflow-hidden bg-ems-black text-white">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={HERO_POSTER}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-ems-black/55" />
        <div className="hero-grid absolute inset-0 opacity-40" />
        <div className="relative mx-auto flex min-h-[88svh] max-w-site flex-col justify-end px-4 pb-8 pt-24 md:px-6 md:pb-10">
          <p className="mb-5 text-xs font-bold tracking-[0.22em] text-ems-gold">صناعة كيميائية · صنع في سورية</p>
          <h1 className="max-w-4xl font-changa text-4xl font-extrabold leading-[1.2] md:text-6xl lg:text-7xl">
            {split ? (
              <>
                {split[0]}
                <span className="text-ems-gold">{goldPart}</span>
                {split[1]}
              </>
            ) : (
              headline
            )}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/75 md:text-lg">{home.body}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-ems-gold px-6 py-3 text-sm font-bold text-white"
            >
              اطلب عرض سعر
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Link
              href="/projects"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-bold hover:bg-white/10"
            >
              شوف أعمالنا
            </Link>
            <a
              href="tel:0944010556"
              className="inline-flex items-center gap-2 px-2 py-3 text-sm font-bold text-white/85"
              dir="ltr"
            >
              <Phone className="h-4 w-4" />
              0944 010 556
            </a>
          </div>

          <div className="mt-10 grid overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/45 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["العبوة", "20 كغ"],
              ["التصنيف", "C1 / C2"],
              ["الصنع", "سورية"],
              ["التغطية", "كل المحافظات"],
            ].map(([label, value]) => (
              <div key={label} className="border-white/10 p-5 sm:border-l">
                <p className="text-[11px] font-bold tracking-[0.18em] text-ems-gold">{label}</p>
                <p className="mt-2 font-changa text-2xl md:text-3xl">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-site px-4 py-20 md:px-6 md:py-28">
        <p className="text-xs font-bold tracking-[0.22em] text-ems-gold">من نحن</p>
        <h2 className="mt-3 max-w-3xl font-changa text-3xl leading-tight md:text-5xl">
          من المصنع إلى تحت البلاط — منتج واحد يثق فيه البنّاء
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-9 text-ems-muted">
          إي إم إس برو صناعات كيميائية بخبرة تركية وتصنيع سوري: لاصق سيراميك، تسوية، عزل، وإضافات خرسانية للمهني وللبيت.
        </p>
        <Link href="/about" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-ems-gold">
          اعرف أكثر
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="mt-10 rounded-[2rem] border border-ems-gold/30 p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={FACTORY_IMAGES[0]} alt="مصنع EMS.PRO" className="h-[280px] w-full rounded-[1.6rem] object-cover md:h-[420px]" />
        </div>
      </section>

      <section className="mx-auto max-w-site px-4 pb-8 md:px-6">
        <SectionHeading
          kicker="المنتجات"
          title="خط كامل تحت البلاط"
          text="لاصق، تسوية، عزل، وإضافات — عبوات 20 كغ جاهزة للموقع."
          href="/services"
          linkLabel="كل المنتجات"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((item: CatalogItem, idx: number) => (
            <CatalogCard
              key={item._id}
              href={`/services/${item.slug}`}
              image={item.image || PRODUCT_IMAGES[idx % PRODUCT_IMAGES.length]}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-site px-4 py-20 md:px-6 md:py-28">
        <SectionHeading
          kicker="أعمال مختارة"
          title="أعمال تقدر تمشي عليها"
          text="من خطوط الإنتاج إلى الحملات في دمشق وتغطية المحافظات."
          href="/projects"
          linkLabel="كل الأعمال"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.slice(0, 4).map((item: CatalogItem, i: number) => (
            <MediaCard
              key={item._id}
              href={`/projects/${item.slug}`}
              image={projectCover(item)}
              title={item.title}
              description={item.description}
              kicker="عمل"
              large={i === 0}
            />
          ))}
        </div>
        {!projects.length ? (
          <p className="rounded-[1.75rem] border border-ems-line bg-white p-10 text-center text-ems-muted">
            الأعمال رح تظهر هون بعد إضافتها من لوحة التحكم.
          </p>
        ) : null}
      </section>

      <section className="border-y border-ems-line bg-ems-cream">
        <div className="mx-auto max-w-site px-4 py-20 md:px-6 md:py-24">
          <SectionHeading kicker="ليش EMS.PRO" title="جودة تثق بها. نتائج تدوم." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((item) => (
              <div key={item.title} className="rounded-[1.5rem] border border-ems-line bg-white p-6">
                <h3 className="font-changa text-xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-ems-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-site px-4 py-20 md:px-6 md:py-24">
        <SectionHeading
          kicker="كيف نشتغل"
          title="من الطلب إلى التوريد"
          text="مسار واضح: عرض سعر، اختيار المنتج، شحن، ومتابعة."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item) => (
            <div key={item.n} className="rounded-[1.5rem] border border-ems-line bg-white p-6">
              <p className="font-outfit text-3xl font-black text-ems-gold">{item.n}</p>
              <p className="mt-1 text-xs font-bold tracking-[0.16em] text-ems-muted">خطوة {item.n}</p>
              <h3 className="mt-3 font-changa text-xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-ems-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-site px-4 pb-8 md:px-6">
        <SectionHeading kicker="أسئلة" title="أجوبة قبل ما تسأل" />
        <FaqList />
      </section>

      <section className="mx-auto max-w-site px-4 py-16 md:px-6 md:pb-28">
        <div className="rounded-[2rem] bg-ems-black px-8 py-14 text-white md:px-14">
          <h2 className="font-changa text-3xl md:text-5xl">خبرنا عن مشروعك</h2>
          <p className="mt-4 max-w-xl text-lg leading-8 text-white/70">
            اكتب نوع البلاط والمساحة، أو ابعت صورة. منعطيك المنتج المناسب وعرض السعر.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-full bg-ems-gold px-6 py-3 text-sm font-bold text-white">
              اطلب عرض سعر
            </Link>
            <a href="tel:0944010556" className="rounded-full border border-white/25 px-6 py-3 text-sm font-bold" dir="ltr">
              0944 010 556
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
