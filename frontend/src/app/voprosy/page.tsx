import PageRenderer from "@/components/templates/PageRenderer";
import { buildFaqDigest } from "@/lib/directory";
import { PageConfig } from "@/lib/pageConfig";
import { cta, commonFaq } from "@/lib/sharedContent";

const digest = buildFaqDigest();
const items = [...commonFaq, ...digest.map(({ question, answer }) => ({ question, answer }))];

const page: PageConfig = {
  slug: "voprosy",
  title: "Вопросы и ответы — SEO Jazz",
  description: "Частые вопросы про SEO, GEO/AI-продвижение, тарифы, гарантии и работу с SEO Jazz.",
  template: "FAQ-хаб",
  source: "sharedContent.commonFaq + 04-kontent/*.md (FAQ-секции приоритетных страниц)",
  crumbs: [{ label: "Вопросы" }],
  blocks: [
    {
      type: "hero",
      eyebrow: "FAQ",
      title: "Вопросы, которые чаще всего задают перед стартом",
      text: "Собрано из общих вопросов и FAQ-секций приоритетных страниц — без дублей.",
      actions: cta,
    },
    { type: "faq", items },
    {
      type: "links",
      title: "Не нашли свой вопрос — посмотрите по теме",
      links: [
        { label: "Все услуги", href: "/uslugi/" },
        { label: "Всё о SEO", href: "/vse-o-seo/" },
        { label: "Кейсы", href: "/cases/" },
      ],
    },
    { type: "leadForm", title: "Задать вопрос напрямую" },
  ],
};

export const metadata = {
  title: page.title,
  description: page.description,
};

export default function VoprosyPage() {
  return <PageRenderer page={page} />;
}
