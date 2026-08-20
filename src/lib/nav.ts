// Источник структуры меню: vibecode-seojazz/05-dizajn/dizajn-sistema.md §10
// "Главное меню: Главная · Услуги (мега-меню: форматы, GEO/AI, CMS, типы, отрасли, площадки) ·
//  Создание сайтов · Всё о SEO · Продвижение на Авито · Вопросы · Кейсы · Блог"

export type NavLink = {
  label: string;
  href: string;
  /** страница уже собрана в этом батче (Фаза 0, раздел 2.1 ПЛАН.md) */
  built: boolean;
};

export type NavCluster = {
  title: string;
  links: NavLink[];
};

export const uslugiMegaMenu: NavCluster[] = [
  {
    title: "Форматы оплаты",
    links: [
      { label: "По позициям", href: "/prodvizhenie-po-pozicijam/", built: false },
      { label: "По трафику", href: "/prodvizhenie-po-trafiku/", built: false },
      { label: "С оплатой за лиды", href: "/prodvizhenie-s-oplatoj-za-lidy/", built: false },
      { label: "За результат", href: "/prodvizhenie-za-rezultat/", built: false },
      { label: "SEO под ключ", href: "/seo-pod-kljuch/", built: true },
      { label: "SEO-сопровождение", href: "/seo-soprovozhdenie-sajta/", built: false },
    ],
  },
  {
    title: "GEO/AI-продвижение",
    links: [
      { label: "AI-SEO продвижение", href: "/ai-seo-prodvizhenie/", built: true },
      { label: "GEO-продвижение", href: "/geo-prodvizhenie/", built: false },
      { label: "AEO-продвижение", href: "/aeo-prodvizhenie/", built: false },
      { label: "LLM-оптимизация", href: "/llm-optimizacija/", built: false },
    ],
  },
  {
    title: "По CMS",
    links: [
      { label: "WordPress", href: "/seo-prodvizhenie-wordpress/", built: true },
      { label: "Bitrix", href: "/seo-prodvizhenie-bitrix/", built: false },
      { label: "Tilda", href: "/seo-prodvizhenie-tilda/", built: false },
      { label: "Все CMS", href: "/seo-prodvizhenie-po-cms/", built: false },
    ],
  },
  {
    title: "По типу сайта",
    links: [
      { label: "Корпоративные сайты", href: "/prodvizhenie-korporativnyh-sajtov/", built: true },
      { label: "Интернет-магазины", href: "/prodvizhenie-internet-magazinov/", built: false },
      { label: "Все типы", href: "/seo-po-tipu-sajta/", built: false },
    ],
  },
  {
    title: "По отраслям",
    links: [
      { label: "Стоматология", href: "/prodvizhenie-stomatologii/", built: true },
      { label: "Все отрасли", href: "/seo-po-otraslyam/", built: false },
    ],
  },
  {
    title: "Карты и площадки",
    links: [
      { label: "Геомаркетинг", href: "/geomarketing/", built: true },
      { label: "Продвижение на Авито", href: "/prodvizhenie-na-avito-pod-kljuch/", built: true },
      { label: "Все площадки", href: "/prodvizhenie-na-ploshhadkah/", built: false },
    ],
  },
];

export const mainNav: NavLink[] = [
  { label: "Главная", href: "/", built: true },
  { label: "Услуги", href: "/uslugi/", built: true },
  { label: "Создание сайтов", href: "/sozdanie-sajtov/", built: true },
  { label: "Продвижение на Авито", href: "/prodvizhenie-na-avito-pod-kljuch/", built: true },
  { label: "Кейсы", href: "/cases/", built: true },
];
