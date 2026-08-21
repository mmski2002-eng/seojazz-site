import Link from "next/link";
import { LeadForm } from "@/components/blocks";

export default function NotFound() {
  return (
    <div
      style={{
        maxWidth: "var(--content-width)",
        margin: "0 auto",
        padding: "var(--space-8) var(--container-padding) var(--section-space-desktop)",
        textAlign: "center",
      }}
    >
      <p style={{ fontWeight: 700, fontSize: "13px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-info)" }}>
        Ошибка 404
      </p>
      <h1 style={{ marginTop: "var(--space-3)" }}>Страница не найдена</h1>
      <p style={{ marginTop: "var(--space-4)", color: "var(--color-text-secondary)", maxWidth: "560px", marginInline: "auto" }}>
        Такой страницы нет или она ещё не готова. Загляните на главную или в раздел услуг —
        там всё, что уже собрано.
      </p>
      <div style={{ marginTop: "var(--space-6)", display: "flex", gap: "var(--space-3)", justifyContent: "center", flexWrap: "wrap" }}>
        <Link
          href="/"
          style={{
            background: "var(--color-brand)",
            color: "var(--color-text-inverse)",
            textDecoration: "none",
            fontWeight: 600,
            padding: "12px 22px",
            borderRadius: "999px",
          }}
        >
          На главную
        </Link>
        <Link
          href="/uslugi/"
          style={{
            border: "1px solid var(--color-border)",
            color: "var(--color-text)",
            textDecoration: "none",
            fontWeight: 600,
            padding: "12px 22px",
            borderRadius: "999px",
          }}
        >
          Все услуги
        </Link>
      </div>
      <LeadForm title="Не нашли нужную страницу? Оставьте заявку" />
    </div>
  );
}
