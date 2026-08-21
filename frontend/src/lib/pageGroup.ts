// Группировка страницы по URL для дифференциации CTA/форм (ТЗ §11: по типу
// страницы должны различаться главный CTA и лид-форма, не один набор на всё).
// Префиксы — из IA-дерева ТЗ §4 / vibecode-seojazz/02-bloki-analiz.

export type PageGroup = "home" | "formats" | "geo" | "platform" | "creation" | "commercial";

const formatsExact = new Set([
  "/prodvizhenie-po-pozicijam/",
  "/prodvizhenie-po-trafiku/",
  "/prodvizhenie-s-oplatoj-za-lidy/",
  "/prodvizhenie-za-rezultat/",
]);

const geoPrefixes = [
  "/geo-prodvizhenie/",
  "/ai-seo-prodvizhenie/",
  "/aeo-prodvizhenie/",
  "/llm-optimizacija/",
  "/prodvizhenie-v-otvety-",
  "/prodvizhenie-v-google-ai-overview/",
  "/prodvizhenie-v-yandex-neuro/",
];

const platformPrefixes = [
  "/geomarketing/",
  "/prodvizhenie-na-ploshhadkah/",
  "/lokalnoe-seo/",
  "/prodvizhenie-na-avito",
  "/prodvizhenie-v-2gis/",
  "/prodvizhenie-google-maps/",
  "/prodvizhenie-v-google-maps/",
  "/prodvizhenie-v-yandex-kartah/",
  "/prodvizhenie-yandex-biznes/",
];

const creationPrefixes = ["/sozdanie-sajtov/", "/razrabotka-"];

function normalizeUrl(url: string) {
  if (!url || url === "/") return "/";
  const withSlashes = url.startsWith("/") ? url : `/${url}`;
  return withSlashes.endsWith("/") ? withSlashes : `${withSlashes}/`;
}

export function getPageGroup(url: string): PageGroup {
  const normalized = normalizeUrl(url);

  if (normalized === "/") return "home";
  if (formatsExact.has(normalized)) return "formats";
  if (geoPrefixes.some((prefix) => normalized.startsWith(prefix))) return "geo";
  if (platformPrefixes.some((prefix) => normalized.startsWith(prefix))) return "platform";
  if (creationPrefixes.some((prefix) => normalized.startsWith(prefix))) return "creation";
  return "commercial";
}
