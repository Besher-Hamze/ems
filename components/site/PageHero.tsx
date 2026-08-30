export function PageHero({
  kicker,
  title,
  text,
}: {
  kicker: string;
  title: string;
  text?: string;
}) {
  return (
    <section className="border-b border-ems-line bg-ems-stone">
      <div className="mx-auto max-w-site px-4 py-16 md:px-6 md:py-24">
        <p className="text-xs font-bold tracking-[0.22em] text-ems-gold">{kicker}</p>
        <h1 className="mt-3 max-w-4xl font-changa text-4xl leading-tight md:text-6xl">{title}</h1>
        {text ? <p className="mt-5 max-w-2xl text-lg leading-9 text-ems-muted">{text}</p> : null}
      </div>
    </section>
  );
}
