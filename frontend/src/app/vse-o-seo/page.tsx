import PageRenderer from "@/components/templates/PageRenderer";
import { buildContentDirectory } from "@/lib/directory";
import { PageConfig } from "@/lib/pageConfig";
import { cta, commonFaq } from "@/lib/sharedContent";

const clusters = buildContentDirectory();
const totalPages = clusters.reduce((sum, cluster) => sum + cluster.links.length, 0);

const page: PageConfig = {
  slug: "vse-o-seo",
  title: "Всё о SEO — каталог материалов SEO Jazz",
  description: `Полный каталог из ${totalPages} страниц по SEO, GEO/AI, CMS, типам сайтов, отраслям и площадкам — сгруппированы по темам.`,
  template: "Информационный хаб",
  source: "04-kontent/*.md (автосборка по tip_stranicy)",
  crumbs: [{ label: "Всё о SEO" }],
  blocks: [
    {
      type: "hero",
      eyebrow: "Каталог",
      title: "Всё о SEO: каталог материалов, а не одна общая статья",
      text: `${totalPages} страниц по форматам оплаты, GEO/AI, CMS, типам сайтов, отраслям и площадкам — каждая привязана к своей теме, без свалки в один блог.`,
      actions: cta,
    },
    ...clusters.map((cluster) => ({
      type: "links" as const,
      title: `${cluster.title} (${cluster.links.length})`,
      links: cluster.links,
    })),
    { type: "faq", items: commonFaq },
    { type: "leadForm", title: "Не нашли свою тему — спросите" },
  ],
};

export const metadata = {
  title: page.title,
  description: page.description,
};

export default function VseOSeoPage() {
  return <PageRenderer page={page} />;
}
