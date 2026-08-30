import "dotenv/config";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { connectDB } from "../lib/db";
import { User } from "../lib/models/User";
import { Settings } from "../lib/models/Settings";
import { Page } from "../lib/models/Page";
import { Service } from "../lib/models/Service";
import { Project } from "../lib/models/Project";

async function seed() {
  await connectDB();

  const email = (process.env.ADMIN_EMAIL || "admin@ems.pro").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const hash = await bcrypt.hash(password, 10);

  await User.findOneAndUpdate(
    { email },
    { name: "مدير EMS", email, password: hash },
    { upsert: true }
  );

  await Settings.findOneAndUpdate(
    {},
    {
      companyName: "EMS.PRO",
      slogan: "أساس جمال بيتك يبدأ من تحت البلاط",
      logo: "/brand/logo.png",
      phone: "0944010556",
      whatsapp: "0944010556",
      email: "info@ems.pro",
      address: "سورية — حلب",
      facebook: "",
      instagram: "",
    },
    { upsert: true }
  );

  await Page.findOneAndUpdate(
    { key: "home" },
    {
      key: "home",
      title: "أساس جمال بيتك يبدأ من تحت البلاط",
      body: "جودة تثق بها… نتائج تدوم. إي إم إس برو صناعات كيميائية بخبرة تركية وتصنيع سوري: لاصق سيراميك عالي الأداء، تسوية، عزل، وإضافات خرسانية للمهني وللبيت.",
      image: "/gallery/img-46.jpg",
    },
    { upsert: true }
  );

  await Page.findOneAndUpdate(
    { key: "about" },
    {
      key: "about",
      title: "شركة إي إم إس للصناعات الكيميائية",
      body: "EMS.PRO متخصصة في اللاصق الإسمنتي للسيراميك والرخام وحلول التسوية والعزل والإضافات الخرسانية. المنتجات مطوّرة بخبرة تركيا، وتُصنَّع في سورية بعبوات احترافية 20 كغ، مع تغطية في المحافظات من حلب إلى دمشق.\n\nنعمل وفق معايير لاصق C1 وC2 مع بوليمرات عالية الأداء: التصاق قوي، ثبات عالي، ومقاومة للرطوبة للاستخدام الداخلي والخارجي. شركاؤنا عيسى الشريف وحسن جميل أوغلو يجمعون الخبرة التركية والسورية في منتج واحد يثق به البنّاء.",
      image: "/gallery/img-03.jpg",
    },
    { upsert: true }
  );

  await Service.deleteMany({});
  await Service.insertMany([
    {
      title: "لاصق سيراميك C1",
      description:
        "لاصق إسمنتي للسيراميك مع بوليمرات عالية الأداء. للجدران والأرضيات، داخلي وخارجي. عبوة 20 كغ. تغطية تقريبية 2–3 كغ/م².",
      image: "/gallery/img-10.jpg",
      slug: "c1-adhesive",
      hidden: false,
    },
    {
      title: "GOLD FLEX C2TE",
      description:
        "لاصق مرن عالي الأداء للأحمال الثقيلة والحركة الكثيفة. مناسب للبلاط الكبير والرخام في الأماكن ذات الازدحام.",
      image: "/gallery/img-11.jpg",
      slug: "gold-flex",
      hidden: false,
    },
    {
      title: "POWER FIX C2",
      description:
        "لاصق عالي الالتصاق للتطبيقات الشاقة. ثبات قوي على الأسطح الصعبة والاستخدام المهني الكثيف.",
      image: "/gallery/img-01.jpg",
      slug: "power-fix",
      hidden: false,
    },
    {
      title: "STONE BOND الأبيض",
      description:
        "لاصق متخصص للحجر الطبيعي والرخام، لا يغيّر لون الحجر. اختيار الواجهات والرخام الفاتح.",
      image: "/gallery/img-17.jpg",
      slug: "stone-bond",
      hidden: false,
    },
    {
      title: "LEVEL MAX",
      description:
        "مادة تسوية ذاتية لتحضير الأرضيات قبل البلاط. سطح مستوٍ سريع التطبيق للمشاريع السكنية والتجارية.",
      image: "/gallery/img-40.jpg",
      slug: "level-max",
      hidden: false,
    },
    {
      title: "WATER PRO",
      description:
        "عازل مائي عالي الأداء للخزانات والمناطق الرطبة. حماية من التسرب قبل التشطيب.",
      image: "/gallery/img-06.jpg",
      slug: "water-pro",
      hidden: false,
    },
    {
      title: "CONCRETE REMIX",
      description:
        "إضافة خرسانية لتحسين خواص الخرسانة وزيادة المتانة في الأعمال الإنشائية.",
      image: "/gallery/img-04.jpg",
      slug: "concrete-remix",
      hidden: false,
    },
  ]);

  await Project.deleteMany({});
  await Project.insertMany([
    {
      title: "خطوط الإنتاج والتعبئة",
      description: "تصنيع وتعبئة عبوات 20 كغ في منشأتنا، بمعايير تغليف صناعي جاهز للشحن على الطبليات.",
      image: "/gallery/img-03.jpg",
      images: ["/gallery/img-03.jpg", "/gallery/img-04.jpg", "/gallery/img-06.jpg"],
      videos: ["/videos/vid-01.mp4"],
      slug: "production-line",
      hidden: false,
    },
    {
      title: "التوزيع والشحن",
      description: "شحن الطبليات إلى مواقع العمل والمستودعات. عبوات محكمة التغليف، جاهزة للنقل داخل سورية.",
      image: "/gallery/img-02.jpg",
      slug: "distribution",
      hidden: false,
    },
    {
      title: "حضور في دمشق",
      description: "حملات إعلانية في قلب العاصمة — أساس جمال بيتك يبدأ من تحت البلاط.",
      image: "/gallery/img-39.jpg",
      slug: "damascus-presence",
      hidden: false,
    },
    {
      title: "تغطية المحافظات",
      description: "منتجات EMS.PRO حاضرة في المحافظات السورية: حلب، دمشق، حمص، اللاذقية والمزيد.",
      image: "/gallery/img-30.jpg",
      slug: "nationwide",
      hidden: false,
    },
  ]);

  console.log("تم تجهيز البيانات.");
  console.log("الدخول:", email, "/", password);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
