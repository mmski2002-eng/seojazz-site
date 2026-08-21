import fs from "node:fs";
import path from "node:path";
import { BlockConfig, LinkItemConfig, PageConfig, TextItemConfig } from "./pageConfig";
import { getLaunchPriority } from "./contentPriority";
import { getPageGroup } from "./pageGroup";
import {
  geoBlock,
  guaranteesItems,
  pageGroupContent,
  pickThematicCases,
  postCasesAction,
  postFaqAction,
  pricing3,
  trustMetrics,
} from "./sharedContent";

type HandoffLink = {
  kuda?: string;
  ankor?: string;
};

type HandoffPage = {
  url?: string;
  tip_stranicy?: string;
  intent?: string;
  meta?: {
    title?: string;
    description?: string;
    h1?: string;
  };
  bloki_klyuchevye?: string[];
  vnutrennie_ssylki?: HandoffLink[];
  mikrorazmetka?: string[];
  nuzhno_utochnit?: string[];
  status?: string;
};

type HandoffRoot = {
  stranicy?: HandoffPage[];
  obshchie_rekomendacii?: string[];
  kontentnye_riski?: Array<{
    risk?: string;
    gde?: string;
    chto_sdelat?: string;
  }>;
};

export type ContentPackage = {
  fileName: string;
  sourceFile: string;
  markdown: string;
  url: string;
  page: HandoffPage;
  handoff: HandoffRoot;
  faq: Array<{ question: string; answer: string }>;
  heroText?: string;
  keyBlocks: TextItemConfig[];
  links: LinkItemConfig[];
  articleSections: Array<{ heading?: string; items: string[] }>;
};

const CONTENT_DIR = path.resolve(process.cwd(), "content", "04-kontent");

function normalizeUrl(url: string) {
  if (!url || url === "/") {
    return "/";
  }

  const withSlashes = url.startsWith("/") ? url : `/${url}`;
  return withSlashes.endsWith("/") ? withSlashes : `${withSlashes}/`;
}

function extractHandoff(markdown: string): HandoffRoot | null {
  const matches = [...markdown.matchAll(/```json\s*([\s\S]*?)```/g)];
  const json = matches.at(-1)?.[1];

  if (!json) {
    return null;
  }

  try {
    return JSON.parse(json) as HandoffRoot;
  } catch {
    return null;
  }
}

function extractLabeledLine(markdown: string, label: string) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = markdown.match(new RegExp(`- \\*\\*${escaped}:\\*\\*\\s*(.+)`));
  return match?.[1]?.trim();
}

function cleanInlineText(value: string) {
  return value
    .replace(/`[^`]*`/g, "")
    .replace(/\*\*/g, "")
    .replace(/\[[^\]]+\]/g, "")
    .replace(/\s*CTA\s+«[^»]+».*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanContentLine(value: string) {
  return cleanInlineText(value)
    .replace(/^[-*]\s+/, "")
    .replace(/^\d+\.\s+/, "")
    .replace(/^[-–—]\s*/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isTechnicalSection(title: string) {
  return /мета|faq|ссылки|alt|schema|json|конкурент|проверяет человек|уточнить/i.test(title);
}

function extractArticleSections(markdown: string) {
  const withoutJson = markdown.replace(/```json\s*[\s\S]*?```/g, "");
  const sections: Array<{ heading?: string; items: string[] }> = [];
  let current: { heading?: string; items: string[] } | null = null;
  let skipCurrent = false;

  for (const rawLine of withoutJson.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith(">") || line.startsWith("# ")) {
      continue;
    }

    const heading = line.match(/^#{2,3}\s*(.+)$/);

    if (heading) {
      const cleanHeading = cleanContentLine(heading[1].replace(/^\d+[–-]?\d*\.?\s*/, ""));
      skipCurrent = isTechnicalSection(cleanHeading);
      current = skipCurrent ? null : { heading: cleanHeading, items: [] };

      if (current) {
        sections.push(current);
      }

      continue;
    }

    if (skipCurrent) {
      continue;
    }

    const text = cleanContentLine(line);

    if (
      !text ||
      text.startsWith("URL:") ||
      text.startsWith("Title:") ||
      text.startsWith("Description:") ||
      text.startsWith("H1:")
    ) {
      continue;
    }

    if (!current) {
      current = { items: [] };
      sections.push(current);
    }

    current.items.push(text);
  }

  return sections
    .map((section) => ({
      ...section,
      items: section.items.filter(Boolean).slice(0, 12),
    }))
    .filter((section) => section.items.length)
    .slice(0, 8);
}

// Формат A — инлайн-список через "·": "Вопрос (Ответ) · Вопрос (Ответ)" (04-kontent/uslugi.md)
// или "Вопрос — Ответ · Вопрос — Ответ" (04-kontent/prodvizhenie-mobilnyh-prilozhenij.md и т.п.)
function parseDotSeparatedFaq(body: string) {
  if (!body.includes(" · ")) {
    return [];
  }

  return body
    .split(/\s+·\s+/)
    .map((item) => item.trim().replace(/\.$/, ""))
    .map((item) => {
      const paren = item.match(/^(.+?)\s*\((.+)\)$/);

      if (paren) {
        const answer = paren[2].trim();
        return { question: paren[1].trim(), answer: answer.charAt(0).toUpperCase() + answer.slice(1) };
      }

      const dash = item.match(/^(.+?)\s+[—–-]\s+(.+)$/);

      if (dash) {
        const answer = dash[2].trim();
        return { question: dash[1].trim(), answer: answer.charAt(0).toUpperCase() + answer.slice(1) };
      }

      return null;
    })
    .filter((item): item is { question: string; answer: string } => Boolean(item));
}

// Формат B — нумерованный список: "1. **Вопрос?** Ответ" или "1. Вопрос? — Ответ",
// в одну строку или каждый пункт с новой строки (большинство файлов 04-kontent/*.md).
function parseNumberedFaq(body: string) {
  const chunks = body
    .split(/(?=\d+\.\s)/)
    .map((chunk) => chunk.replace(/^\d+\.\s*/, "").trim())
    .filter(Boolean);

  return chunks
    .map((chunk) => {
      const bold = chunk.match(/^\*\*(.+?)\*\*\s*[—:-]*\s*(.+)$/);

      if (bold) {
        return { question: bold[1].trim(), answer: bold[2].trim() };
      }

      const plain = chunk.match(/^(.+?\?)\s*[—:-]*\s*(.+)$/);

      if (plain) {
        return { question: plain[1].trim(), answer: plain[2].trim() };
      }

      return null;
    })
    .filter((item): item is { question: string; answer: string } => Boolean(item?.answer));
}

// Заголовок FAQ встречается и как "## 4. FAQ" (большинство файлов), и как
// "### Блок 9. FAQ" (иерархичные хаб-файлы вроде prodvizhenie-medicinskih-sajtov.md).
// У части файлов ещё до реальной секции есть анонс-заголовок вида
// "### Блок 8. FAQ + GEO/AI + форма" — h2-паттерн приоритетнее и ищется первым,
// иначе он бы перехватывал совпадение раньше настоящей секции.
// Граница секции — следующий заголовок ТОГО ЖЕ или более высокого уровня.
function extractFaqSection(markdown: string) {
  const h2 = markdown.match(/^##\s*\d+\.\s*FAQ\b.*$/im);
  const match = h2 ?? markdown.match(/^###\s*Блок\s*\d+\.\s*FAQ\b.*$/im);

  if (!match || match.index === undefined) {
    return "";
  }

  const level = match[0].startsWith("###") ? 3 : 2;
  const rest = markdown.slice(match.index + match[0].length);
  const boundary = new RegExp(`\\n#{2,${level}}\\s`);
  const next = rest.search(boundary);

  return next === -1 ? rest : rest.slice(0, next);
}

function extractFaq(markdown: string) {
  const body = extractFaqSection(markdown).replace(/\s+/g, " ").trim();

  if (!body) {
    return [];
  }

  const dotSeparated = parseDotSeparatedFaq(body);
  return dotSeparated.length ? dotSeparated : parseNumberedFaq(body);
}

function keyBlocksToItems(blocks: string[] = []) {
  return blocks.slice(0, 6).map((block) => {
    const [title, ...rest] = block.split(/[:—-]/);
    return {
      title: cleanInlineText(title),
      text: cleanInlineText(rest.join(" - ")) || undefined,
    };
  });
}

function handoffLinksToItems(links: HandoffLink[] = []) {
  return links
    .filter((link) => link.kuda && link.ankor)
    .map((link) => ({
      href: normalizeUrl(link.kuda ?? "/"),
      label: link.ankor ?? normalizeUrl(link.kuda ?? "/"),
    }));
}

function parseContentFile(fileName: string): ContentPackage | null {
  const sourceFile = `04-kontent/${fileName}`;
  const filePath = path.join(CONTENT_DIR, fileName);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const markdown = fs.readFileSync(filePath, "utf8");
  const handoff = extractHandoff(markdown);
  const page = handoff?.stranicy?.[0];

  if (!handoff || !page?.url) {
    return null;
  }

  return {
    fileName,
    sourceFile,
    markdown,
    url: normalizeUrl(page.url),
    page,
    handoff,
    faq: extractFaq(markdown),
    heroText: cleanInlineText(extractLabeledLine(markdown, "Hero") ?? ""),
    keyBlocks: keyBlocksToItems(page.bloki_klyuchevye),
    links: handoffLinksToItems(page.vnutrennie_ssylki),
    articleSections: extractArticleSections(markdown),
  };
}

export function getAllContentPackages() {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((fileName) => fileName.endsWith(".md"))
    .map(parseContentFile)
    .filter((item): item is ContentPackage => Boolean(item))
    .sort((left, right) => left.url.localeCompare(right.url));
}

export function getContentPackageByUrl(url: string) {
  const normalized = normalizeUrl(url);
  return getAllContentPackages().find((item) => item.url === normalized);
}

function findContentPackageForPage(page: PageConfig) {
  const sourceFile = page.source.match(/04-kontent\/([^\s+]+)/)?.[1];

  if (sourceFile) {
    const parsed = parseContentFile(sourceFile);

    if (parsed) {
      return parsed;
    }
  }

  return getContentPackageByUrl(page.slug === "home" ? "/" : `/${page.slug}/`);
}

function contentProvenanceBlock(content: ContentPackage): BlockConfig {
  const recommendations = content.handoff.obshchie_rekomendacii ?? [];
  const risks = content.handoff.kontentnye_riski ?? [];
  const launch = getLaunchPriority(content.url);
  const items = [
    {
      title: `Приоритет запуска: ${launch.priority}`,
      text: launch.reason,
    },
    ...recommendations.slice(0, 3).map((title) => ({ title })),
    ...risks.slice(0, 2).map((risk) => ({
      title: risk.risk ?? "Контентный риск",
      text: [risk.gde, risk.chto_sdelat].filter(Boolean).join(": "),
    })),
  ];

  return {
    type: "proven",
    items: items.length
      ? items
      : [{ title: "JSON-handoff подключён", text: `Данные страницы взяты из ${content.sourceFile}.` }],
  };
}

function contentToPageConfig(content: ContentPackage): PageConfig {
  const title = content.page.meta?.title ?? content.page.meta?.h1 ?? content.url;
  const h1 = content.page.meta?.h1 ?? title;
  const group = pageGroupContent[getPageGroup(content.url)];
  const blocks: BlockConfig[] = [
    {
      type: "hero",
      eyebrow: content.page.tip_stranicy,
      title: h1,
      text: content.heroText,
      actions: group.cta,
    },
    contentProvenanceBlock(content),
  ];

  if (content.keyBlocks.length) {
    blocks.push({
      type: "included",
      title: "Ключевые блоки страницы",
      items: content.keyBlocks,
    });
  }

  if (content.articleSections.length) {
    blocks.push({
      type: "article",
      sections: content.articleSections,
    });
  }

  // Обязательные блоки мастер-шаблона (00-svodka-master-shablon.md §2: Прайс,
  // Кейсы, Доверие/счётчики, Гарантии, GEO/AI — ✅ на каждой коммерческой странице).
  blocks.push({ type: "pricing", tiers: pricing3 });
  blocks.push({ type: "cases", cases: pickThematicCases(content.url), action: postCasesAction });
  blocks.push({ type: "counters", metrics: trustMetrics });
  blocks.push({ type: "guarantees", items: guaranteesItems });

  if (content.links.length) {
    blocks.push({
      type: "links",
      title: "Внутренние ссылки",
      links: content.links,
    });
  }

  if (content.faq.length) {
    blocks.push({
      type: "faq",
      items: content.faq,
      action: postFaqAction,
    });
  }

  blocks.push(geoBlock);
  blocks.push({ type: "leadForm", title: group.leadFormTitle, variant: group.leadFormVariant });

  return {
    slug: content.url.replace(/^\/|\/$/g, ""),
    title,
    description: content.page.meta?.description ?? title,
    template: content.page.tip_stranicy ?? "Контентная страница",
    source: content.sourceFile,
    content: {
      url: content.url,
      type: content.page.tip_stranicy,
      intent: content.page.intent,
      status: content.page.status,
      sourceFile: content.sourceFile,
      schemaTypes: content.page.mikrorazmetka ?? [],
      needsReview: content.page.nuzhno_utochnit ?? [],
      launchPriority: getLaunchPriority(content.url).priority,
      launchReason: getLaunchPriority(content.url).reason,
    },
    crumbs: [{ label: h1 }],
    blocks,
  };
}

export function getContentPageConfigBySlug(slug: string) {
  const content = getContentPackageByUrl(`/${slug}/`);
  return content ? contentToPageConfig(content) : null;
}

export function applyContentLayer(page: PageConfig): PageConfig {
  const content = findContentPackageForPage(page);

  if (!content) {
    return page;
  }

  let usedLinks = false;
  let usedFaq = false;
  let usedArticle = false;
  let addedProvenance = false;
  const blocks: BlockConfig[] = [];

  for (const block of page.blocks) {
    if (block.type === "hero") {
      blocks.push({
        ...block,
        eyebrow: content.page.tip_stranicy ?? block.eyebrow,
        title: content.page.meta?.h1 ?? block.title,
        text: content.heroText || block.text,
      });
      blocks.push(contentProvenanceBlock(content));
      addedProvenance = true;
      continue;
    }

    if (!usedLinks && block.type === "links" && content.links.length) {
      blocks.push({
        ...block,
        title: block.title ?? "Внутренние ссылки",
        links: content.links,
      });
      usedLinks = true;
      continue;
    }

    if (!usedArticle && block.type === "pricing" && content.articleSections.length) {
      blocks.push({
        type: "article",
        sections: content.articleSections,
      });
      usedArticle = true;
    }

    if (!usedFaq && block.type === "faq" && content.faq.length) {
      blocks.push({
        ...block,
        items: content.faq,
      });
      usedFaq = true;
      continue;
    }

    blocks.push(block);
  }

  if (!addedProvenance) {
    blocks.unshift(contentProvenanceBlock(content));
  }

  if (!usedArticle && content.articleSections.length) {
    const articleBlock: BlockConfig = { type: "article", sections: content.articleSections };
    const insertAt = blocks.findIndex((block) => block.type === "leadForm");

    if (insertAt === -1) {
      blocks.push(articleBlock);
    } else {
      blocks.splice(insertAt, 0, articleBlock);
    }
  }

  return {
    ...page,
    title: content.page.meta?.title ?? page.title,
    description: content.page.meta?.description ?? page.description,
    source: content.sourceFile,
    content: {
      url: content.url,
      type: content.page.tip_stranicy,
      intent: content.page.intent,
      status: content.page.status,
      sourceFile: content.sourceFile,
      schemaTypes: content.page.mikrorazmetka ?? [],
      needsReview: content.page.nuzhno_utochnit ?? [],
      launchPriority: getLaunchPriority(content.url).priority,
      launchReason: getLaunchPriority(content.url).reason,
    },
    blocks,
  };
}
