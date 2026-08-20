export type LaunchPriority = "P1" | "P2" | "P3";

export type LaunchPriorityInfo = {
  priority: LaunchPriority;
  label: string;
  reason: string;
  source: string;
};

type ContentLike = {
  url: string;
  page?: {
    tip_stranicy?: string;
  };
};

const source = "01-strategicheskiy-brif.md §3 + 00-svodka-master-shablon.md:131";

const p1Exact = new Set([
  "/uslugi/",
  "/seo-pod-kljuch/",
  "/prodvizhenie-po-pozicijam/",
  "/prodvizhenie-po-trafiku/",
  "/prodvizhenie-s-oplatoj-za-lidy/",
  "/prodvizhenie-za-rezultat/",
  "/prodvizhenie-v-yandex/",
  "/prodvizhenie-v-google/",
  "/ai-seo-prodvizhenie/",
  "/geo-prodvizhenie/",
  "/aeo-prodvizhenie/",
  "/llm-optimizacija/",
  "/prodvizhenie-v-google-ai-overview/",
  "/prodvizhenie-v-yandex-neuro/",
  "/prodvizhenie-v-otvety-chatgpt/",
  "/prodvizhenie-v-otvety-claude/",
  "/prodvizhenie-v-otvety-copilot/",
  "/prodvizhenie-v-otvety-deepseek/",
  "/prodvizhenie-v-otvety-gemini/",
  "/prodvizhenie-v-otvety-gigachat/",
  "/prodvizhenie-v-otvety-grok/",
  "/prodvizhenie-v-otvety-perplexity/",
  "/prodvizhenie-stomatologii/",
  "/prodvizhenie-kosmetologii/",
  "/prodvizhenie-arendy-spectehniki/",
  "/prodvizhenie-prodazhi-spectehniki/",
  "/prodvizhenie-krovelnyh-materialov/",
  "/prodvizhenie-stroitelnyh-lesov/",
  "/prodvizhenie-nedvizhimosti/",
  "/prodvizhenie-agentstv-nedvizhimosti/",
  "/prodvizhenie-kommercheskoj-nedvizhimosti/",
  "/prodvizhenie-zagorodnoj-nedvizhimosti/",
  "/prodvizhenie-finansovyh-sajtov/",
  "/prodvizhenie-kriptoobmennikov/",
]);

const p2Exact = new Set([
  "/seo-prodvizhenie-po-cms/",
  "/seo-prodvizhenie-wordpress/",
  "/seo-prodvizhenie-bitrix/",
  "/seo-prodvizhenie-bitrix24/",
  "/seo-prodvizhenie-tilda/",
  "/seo-prodvizhenie-insales/",
  "/seo-po-tipu-sajta/",
  "/prodvizhenie-korporativnyh-sajtov/",
  "/prodvizhenie-internet-magazinov/",
  "/prodvizhenie-lendingov/",
  "/prodvizhenie-b2b-saitov/",
]);

const p3Prefixes = [
  "/sozdanie-sajtov/",
  "/razrabotka-",
  "/prodvizhenie-na-avito",
  "/geomarketing/",
  "/prodvizhenie-v-2gis/",
  "/prodvizhenie-google-maps/",
  "/prodvizhenie-v-google-maps/",
  "/prodvizhenie-v-yandex-kartah/",
  "/prodvizhenie-yandex-biznes/",
  "/lokalnoe-seo/",
  "/prodvizhenie-blogov-media/",
];

const p1Misses = [
  {
    url: "/ceny/",
    reason: "P1 из брифа: цены + калькулятор, но в 04-kontent/ нет ceny.md, поэтому страницу не создаём без источника.",
  },
];

function normalizeUrl(url: string) {
  if (!url || url === "/") {
    return "/";
  }

  const withSlashes = url.startsWith("/") ? url : `/${url}`;
  return withSlashes.endsWith("/") ? withSlashes : `${withSlashes}/`;
}

export function getLaunchPriority(url: string): LaunchPriorityInfo {
  const normalized = normalizeUrl(url);

  if (p1Exact.has(normalized)) {
    return {
      priority: "P1",
      label: "P1 — деньги/кейсы/GEO",
      reason: "Прямой денежный или ценовой интент, GEO/AI-кластер или ниша с кейсом-доказательством.",
      source,
    };
  }

  if (p2Exact.has(normalized) || normalized.startsWith("/seo-prodvizhenie-")) {
    return {
      priority: "P2",
      label: "P2 — коммерческая масса",
      reason: "CMS, типы сайтов и коммерческие кластеры второго запуска.",
      source,
    };
  }

  if (p3Prefixes.some((prefix) => normalized.startsWith(prefix))) {
    return {
      priority: "P3",
      label: "P3 — хвост/площадки/разработка",
      reason: "Площадки, создание сайтов, блог или длинный хвост из брифа.",
      source,
    };
  }

  return {
    priority: "P3",
    label: "P3 — длинный хвост",
    reason: "Страница не входит в явные P1/P2-кластеры, поэтому запускается шаблонно в хвосте.",
    source,
  };
}

export function getLaunchBatchSummary(contents: ContentLike[]) {
  const initial = {
    P1: [] as string[],
    P2: [] as string[],
    P3: [] as string[],
  };

  const batches = contents.reduce((acc, content) => {
    acc[getLaunchPriority(content.url).priority].push(content.url);
    return acc;
  }, initial);

  return {
    batches,
    misses: p1Misses,
  };
}

export function sitemapPriority(url: string) {
  const normalized = normalizeUrl(url);

  if (normalized === "/") return 1;
  if (normalized === "/uslugi/") return 0.9;

  const priority = getLaunchPriority(normalized).priority;

  if (priority === "P1") return 0.85;
  if (priority === "P2") return 0.75;
  return 0.6;
}

export function sitemapChangeFrequency(url: string) {
  const normalized = normalizeUrl(url);

  if (normalized === "/") return "weekly" as const;
  return getLaunchPriority(normalized).priority === "P1" ? ("weekly" as const) : ("monthly" as const);
}
