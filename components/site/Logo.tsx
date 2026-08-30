export function BrandLogo({ className = "h-11" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/brand/logo.png" alt="EMS.PRO" className={`${className} w-auto`} />
  );
}
