import PageRenderer from "@/components/templates/PageRenderer";
import { PageConfig } from "@/lib/pageConfig";
import { cta } from "@/lib/sharedContent";

const page: PageConfig = {
  slug: "contacts",
  title: "Контакты SEO Jazz — телефон, Telegram, карты",
  description: "Как связаться с SEO Jazz: телефон, Telegram, форма заявки, карты Москвы.",
  template: "Контакты",
  source: "dizajn-sistema.md §12 (виджет карты на странице контактов) + contacts.ts",
  crumbs: [{ label: "Контакты" }],
  blocks: [
    {
      type: "hero",
      eyebrow: "Контакты",
      title: "Свяжитесь с SEO Jazz",
      text: "Отвечаем по телефону и в Telegram в рабочее время. Работаем с клиентами по Москве и России.",
      actions: cta,
    },
    { type: "maps" },
    { type: "leadForm", title: "Оставить заявку" },
  ],
};

export const metadata = {
  title: page.title,
  description: page.description,
};

export default function ContactsPage() {
  return <PageRenderer page={page} />;
}
