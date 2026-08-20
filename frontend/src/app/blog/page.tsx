import PageRenderer from "@/components/templates/PageRenderer";
import { PageConfig } from "@/lib/pageConfig";
import { cta } from "@/lib/sharedContent";

// Честно: статей блога в архиве (04-kontent/) нет — только план по брифу
// (01-strategicheskiy-brif.md §3: "контент-план блога TOFU/MOFU/BOFU", приоритет P3).
// Не выдумываем заголовки статей, показываем реальный статус и уводим на готовые разделы.
const page: PageConfig = {
  slug: "blog",
  title: "Блог SEO Jazz — материалы готовятся",
  description: "Блог SEO Jazz в разработке. Пока — каталог «Всё о SEO» и разделы услуг с готовым разбором тем.",
  template: "Блог (в разработке)",
  source: "01-strategicheskiy-brif.md §3 (контент-план блога, приоритет P3)",
  crumbs: [{ label: "Блог" }],
  blocks: [
    {
      type: "hero",
      eyebrow: "Блог",
      title: "Блог готовится: TOFU/MOFU/BOFU-материалы по SEO и GEO/AI",
      text: "По брифу блог — приоритет P3: длинный информационный хвост поверх уже собранных страниц услуг. Статей пока нет — не показываем заглушки вместо контента.",
      actions: cta,
    },
    {
      type: "included",
      title: "Что будет в блоге",
      intro: "По плану из брифа — без выдуманных заголовков статей, только реальные направления.",
      items: [
        { title: "TOFU", text: "Объясняющие статьи для тех, кто ищет «что такое SEO/GEO» — по теме раздела «Всё о SEO»." },
        { title: "MOFU", text: "Сравнения форматов, разборы «как выбрать подрядчика» — ведут к услугам." },
        { title: "BOFU", text: "Кейсы и разборы результатов — уже есть отдельным разделом «Кейсы»." },
      ],
    },
    {
      type: "links",
      title: "Пока материалы готовятся — по теме",
      links: [
        { label: "Всё о SEO", href: "/vse-o-seo/" },
        { label: "Все услуги", href: "/uslugi/" },
        { label: "Кейсы", href: "/cases/" },
        { label: "Вопросы", href: "/voprosy/" },
      ],
    },
    { type: "leadForm", title: "Сообщить, когда выйдет статья" },
  ],
};

export const metadata = {
  title: page.title,
  description: page.description,
};

export default function BlogPage() {
  return <PageRenderer page={page} />;
}
