import { ContentPackage, getAllContentPackages } from "./contentLayer";
import { getLaunchPriority } from "./contentPriority";
import { LinkItemConfig } from "./pageConfig";

// Группировка по реальному полю tip_stranicy из JSON-handoff каждой страницы
// (04-kontent/*.md) — без выдуманных категорий, только то, что уже в архиве.
type Bucket = { title: string; test: (content: ContentPackage) => boolean };

const buckets: Bucket[] = [
  {
    title: "Форматы оплаты",
    test: (c) => /формат/i.test(c.page.tip_stranicy ?? ""),
  },
  {
    title: "GEO / AI-продвижение",
    test: (c) => /GEO|AEO|LLM|нейросет/i.test(c.page.tip_stranicy ?? "") || /GEO|AEO|LLM|otvety-|neuro|ai-overview|ai-seo/.test(c.url),
  },
  {
    title: "По CMS",
    test: (c) => /CMS|Bitrix|Tilda|WordPress|InSales/i.test(c.page.tip_stranicy ?? ""),
  },
  {
    title: "По типу сайта",
    test: (c) => /типа сайта|интернет-магазин/i.test(c.page.tip_stranicy ?? ""),
  },
  {
    title: "Разработка и создание сайтов",
    test: (c) => /разработ/i.test(c.page.tip_stranicy ?? "") || c.url.startsWith("/razrabotka-"),
  },
  {
    title: "Карты и площадки",
    test: (c) => /площадк/i.test(c.page.tip_stranicy ?? ""),
  },
  {
    title: "Отрасли и ниши",
    test: (c) => /нишевая/i.test(c.page.tip_stranicy ?? ""),
  },
];

function contentLabel(content: ContentPackage) {
  return content.page.meta?.h1 ?? content.page.meta?.title ?? content.url;
}

export type DirectoryCluster = { title: string; links: LinkItemConfig[] };

/** Полный реальный каталог страниц сайта, сгруппированный по типу из архива. Источник — 04-kontent/*.md, ничего не придумано. */
export function buildContentDirectory(): DirectoryCluster[] {
  const all = getAllContentPackages().filter((c) => c.url !== "/");
  const used = new Set<string>();
  const clusters: DirectoryCluster[] = [];

  for (const bucket of buckets) {
    const matched = all.filter((c) => !used.has(c.url) && bucket.test(c));
    matched.forEach((c) => used.add(c.url));

    if (matched.length) {
      clusters.push({
        title: bucket.title,
        links: matched
          .map((c) => ({ label: contentLabel(c), href: c.url }))
          .sort((a, b) => a.label.localeCompare(b.label, "ru")),
      });
    }
  }

  const rest = all.filter((c) => !used.has(c.url));
  if (rest.length) {
    clusters.push({
      title: "SEO-инструменты и методы",
      links: rest
        .map((c) => ({ label: contentLabel(c), href: c.url }))
        .sort((a, b) => a.label.localeCompare(b.label, "ru")),
    });
  }

  return clusters;
}

export type FaqDigestItem = { question: string; answer: string; source: string };

/** Реальные FAQ из приоритетных страниц (P1/P2), без дублей вопросов. Источник — тот же JSON-handoff, ничего не сочинено заново. */
export function buildFaqDigest(limit = 24): FaqDigestItem[] {
  const all = getAllContentPackages();
  const withPriority = all
    .map((c) => ({ content: c, priority: getLaunchPriority(c.url).priority }))
    .filter(({ priority }) => priority !== "P3")
    .sort((a, b) => (a.priority === b.priority ? 0 : a.priority === "P1" ? -1 : 1));

  const seen = new Set<string>();
  const digest: FaqDigestItem[] = [];

  for (const { content } of withPriority) {
    for (const item of content.faq) {
      const key = item.question.trim().toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      digest.push({ ...item, source: contentLabel(content) });
      if (digest.length >= limit) return digest;
    }
  }

  return digest;
}
