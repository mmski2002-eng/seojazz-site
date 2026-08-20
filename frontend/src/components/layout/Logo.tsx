// Реальный логотип с seojazz.ru (wp-content/uploads/2022/06/seojazz-logo.svg).
// Загружен в /public как /seojazz-logo.svg и подкрашивается через CSS mask,
// чтобы наследовать цвет из шапки/футера.
export default function Logo({ className }: { className?: string }) {
  return (
    <span
      className={className}
      role="img"
      aria-label="SEO Jazz"
      style={{
        display: "inline-block",
        width: "132px",
        height: "22px",
        backgroundColor: "currentColor",
        WebkitMaskImage: "url(/seojazz-logo.svg)",
        maskImage: "url(/seojazz-logo.svg)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "left center",
        maskPosition: "left center",
      }}
    />
  );
}
