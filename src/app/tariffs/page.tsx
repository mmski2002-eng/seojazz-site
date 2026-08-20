import PageRenderer from "@/components/templates/PageRenderer";
import { PageConfig } from "@/lib/pageConfig";
import { cta, defaultCases, guaranteesItems, pricing5, trustMetrics } from "@/lib/sharedContent";

const page: PageConfig = {
  slug: "tariffs",
  title: "Тарифы SEO Jazz — SEO, AI-SEO и продвижение под заявки",
  description:
    "Тарифы SEO Jazz: Старт, Рост, Бизнес, Лидер и Под ключ. SEO, контент, разработка и аналитика под заявки, лиды и выручку.",
  template: "Тарифы",
  source: "ПЛАН.md §2, пункт 8 + sharedContent.ts",
  crumbs: [{ label: "Тарифы" }],
  blocks: [
    {
      type: "hero",
      eyebrow: "Тарифы",
      title: "Тарифы SEO Jazz: выбираем темп роста под задачу, а не продаём позиции",
      text: "Пакеты собраны из решений проекта: 45 / 65 / 95 / 140 / 220 тыс ₽ в месяц. Итоговый состав фиксируется после аудита, KPI привязываются к заявкам, лидам или выручке.",
      metrics: trustMetrics,
      actions: cta,
    },
    {
      type: "article",
      title: "Как читать тарифы",
      sections: [
        {
          heading: "Что входит в модель",
          items: [
            "Старт подходит для аудита, базовой регулярной работы и проверки гипотез.",
            "Рост закрывает семантику, структуру, контент, ссылки и контроль KPI.",
            "Бизнес нужен для конкурентных ниш, нескольких направлений и более плотной разработки.",
            "Лидер и Под ключ добавляют расширение структуры, больше экспериментов, приоритет команды и финансовую гарантию для верхних пакетов.",
          ],
        },
        {
          heading: "Что уточняется перед запуском",
          items: [
            "Финальный состав работ зависит от текущего состояния сайта, спроса, конкуренции и готовности внедрять правки.",
            "Для GEO/AI-направлений отдельно согласуются платформы, пул промптов, публикации и метрики цитируемости.",
          ],
        },
      ],
    },
    { type: "pricing", tiers: pricing5 },
    { type: "guarantees", items: guaranteesItems },
    { type: "cases", cases: defaultCases },
    {
      type: "links",
      title: "Связанные услуги",
      links: [
        { label: "SEO под ключ", href: "/seo-pod-kljuch/", price: "от 45 тыс ₽/мес" },
        { label: "AI-SEO продвижение", href: "/ai-seo-prodvizhenie/" },
        { label: "GEO-продвижение", href: "/geo-prodvizhenie/" },
        { label: "Услуги", href: "/uslugi/" },
        { label: "Кейсы", href: "/cases/" },
      ],
    },
    { type: "leadForm", title: "Подобрать тариф" },
  ],
};

export const metadata = {
  title: page.title,
  description: page.description,
};

export default function TariffsPage() {
  return <PageRenderer page={page} />;
}
