// Временный компонент Фазы 1 — подтверждает, что роутинг/layout работают.
// Заменяется реальным конфигом блоков (Hero, PricingTiers, FAQAccordion и т.д.) в Фазе 4-5.

import Breadcrumbs, { Crumb } from "./Breadcrumbs";

export default function PageStub({
  h1,
  template,
  source,
  crumbs,
}: {
  h1: string;
  template: string;
  source: string;
  crumbs: Crumb[];
}) {
  return (
    <>
      <Breadcrumbs items={crumbs} />
      <div
        style={{
          maxWidth: "var(--content-width)",
          margin: "0 auto",
          padding: "var(--space-8) var(--container-padding) var(--section-space-desktop)",
        }}
      >
        <h1>{h1}</h1>
        <p style={{ marginTop: "var(--space-4)", color: "var(--color-text-secondary)" }}>
          Шаблон: {template}. Контент подключается в Фазе 4-5 (см. ПЛАН.md, раздел 2.1).
        </p>
        <p style={{ marginTop: "var(--space-2)", color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)" }}>
          Источник контента: <code>{source}</code>
        </p>
      </div>
    </>
  );
}
