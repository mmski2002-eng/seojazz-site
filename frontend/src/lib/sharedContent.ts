import { ActionConfig, MetricConfig, TextItemConfig } from "./pageConfig";
import { PageGroup } from "./pageGroup";

// Общие данные для demo-конфигов (pageConfigs.ts) и авто-сгенерированных
// страниц контентного слоя (contentLayer.ts) — единый источник, без дублей.
// Цифры и кейсы — из vibecode-seojazz/04-kontent/kejsy.md ("источник правды").

export const cta: ActionConfig[] = [
  { label: "Получить рекомендации", href: "#lead", variant: "primary" },
  { label: "Написать в Telegram", href: "https://t.me/IldarNev", variant: "secondary" },
];

const telegramAction: ActionConfig = { label: "Написать в Telegram", href: "https://t.me/IldarNev", variant: "secondary" };

// Дифференциация hero-CTA и лид-формы по типу страницы (ТЗ §11: «Рассчитать
// стоимость» форматы · «Проверить видимость бесплатно» GEO · «Бесплатный
// аудит присутствия» площадки · «Обсудить проект» создание сайтов).
export type LeadFormVariant = "default" | "geo-audit" | "seo-audit" | "platform-audit";

export type PageGroupContent = {
  cta: ActionConfig[];
  leadFormVariant: LeadFormVariant;
  leadFormTitle: string;
};

export const pageGroupContent: Record<PageGroup, PageGroupContent> = {
  home: { cta, leadFormVariant: "default", leadFormTitle: "Получить рекомендации" },
  formats: {
    cta: [{ label: "Рассчитать стоимость", href: "#lead", variant: "primary" }, telegramAction],
    leadFormVariant: "seo-audit",
    leadFormTitle: "Рассчитать стоимость услуги",
  },
  geo: {
    cta: [{ label: "Проверить видимость бесплатно", href: "#lead", variant: "primary" }, telegramAction],
    leadFormVariant: "geo-audit",
    leadFormTitle: "Проверить видимость в нейросетях",
  },
  platform: {
    cta: [{ label: "Бесплатный аудит присутствия", href: "#lead", variant: "primary" }, telegramAction],
    leadFormVariant: "platform-audit",
    leadFormTitle: "Аудит присутствия на площадках",
  },
  creation: {
    cta: [{ label: "Обсудить проект", href: "#lead", variant: "primary" }, telegramAction],
    leadFormVariant: "default",
    leadFormTitle: "Обсудить проект",
  },
  commercial: {
    cta,
    leadFormVariant: "seo-audit",
    leadFormTitle: "Бесплатный аудит и прогноз",
  },
};

export const postCasesAction: ActionConfig = { label: "Хочу такие результаты", href: "#lead", variant: "primary" };
export const postFaqAction: ActionConfig = { label: "Задать вопрос эксперту", href: "#lead", variant: "secondary" };

export const trustMetrics: MetricConfig[] = [
  { value: "107 650", label: "заявок за прошлый год", note: "Яндекс + Google" },
  { value: "до 15 000", label: "заявок в месяц", note: "для клиентов агентства" },
  { value: "8 из 10", label: "остаются постоянно" },
];

export const pricing3 = [
  {
    name: "Старт",
    price: "45 тыс ₽",
    period: "/мес",
    description: "Для проверки гипотез и базовой регулярной работы.",
    features: ["Аудит и план роста", "Техническая база", "Контентные задачи", "Ежемесячный отчёт"],
    action: { label: "Обсудить Старт", href: "#lead" },
  },
  {
    name: "Рост",
    price: "65 тыс ₽",
    period: "/мес",
    description: "Для системного роста заявок и видимости.",
    features: ["Семантика и структура", "Контент и коммерческие блоки", "Ссылки и доверие", "Контроль KPI"],
    action: { label: "Обсудить Рост", href: "#lead" },
    featured: true,
  },
  {
    name: "Бизнес",
    price: "95 тыс ₽",
    period: "/мес",
    description: "Для конкурентных ниш и нескольких направлений.",
    features: ["Расширенная стратегия", "Приоритетная разработка", "Сквозная аналитика", "GEO/AI-блоки"],
    action: { label: "Обсудить Бизнес", href: "#lead" },
  },
];

export const pricing5 = [
  ...pricing3,
  {
    name: "Лидер",
    price: "140 тыс ₽",
    period: "/мес",
    description: "Для плотной конкуренции и быстрого расширения структуры.",
    features: ["Больше контента", "Больше экспериментов", "Команда под проект", "Усиление E-E-A-T"],
    action: { label: "Обсудить Лидер", href: "#lead" },
  },
  {
    name: "Под ключ",
    price: "220 тыс ₽",
    period: "/мес",
    description: "SEO, контент, разработка и аналитика как единый контур.",
    features: ["Полный цикл", "Приоритетная команда", "Финансовая гарантия", "Регулярные гипотезы роста"],
    action: { label: "Обсудить пакет", href: "#lead" },
  },
];

export const commonSteps: TextItemConfig[] = [
  { title: "Диагностика", text: "Смотрим спрос, технику, структуру, конкурентов и точки потерь." },
  { title: "Стратегия", text: "Собираем дорожную карту по заявкам, а не по абстрактным позициям." },
  { title: "Внедрение", text: "Закрываем технику, контент, коммерческие блоки, ссылки и аналитику." },
  { title: "Рост", text: "Ежемесячно сверяем KPI и переносим бюджет в работающие направления." },
];

export const commonFaq = [
  {
    question: "Вы гарантируете позиции?",
    answer: "Нет. В архиве зафиксирован акцент на заявках, лидах, выручке и KPI, а не обещаниях позиций.",
  },
  {
    question: "Можно начать с аудита?",
    answer: "Да. Аудит нужен, чтобы увидеть потенциал, ограничения сайта и реалистичный порядок работ.",
  },
  {
    question: "Куда отправляется заявка?",
    answer: "В тестовом проекте форма работает как локальный мок-сценарий, без реальной CRM-интеграции.",
  },
];

export const team = [
  { name: "Ильдар", role: "Стратегия и коммуникация", text: "Контакт из архива: Telegram @IldarNev." },
  { name: "SEO Jazz", role: "Команда SEO, контента и разработки", text: "Работает как единая система под заявки и KPI." },
];

export const awards: TextItemConfig[] = [
  { title: "Рейтинг-бейдж", text: "В архиве указан рейтинг Яндекс.Справочника как трастовый элемент." },
  { title: "Договорные KPI", text: "Гарантия результата фиксируется через заявки, лиды или стоимость заявки." },
];

export const guaranteesItems: TextItemConfig[] = [
  { title: "KPI в договоре", text: "Фокус на заявках, лидах и стоимости заявки — не на позициях в выдаче." },
  { title: "Не достигли — продлеваем", text: "Средний тариф: бесплатный месяц или перенос бюджета; верхние — финансовая гарантия по выручке." },
];

export const geoBlock = {
  type: "geo" as const,
  title: "Чтобы бренд попадал не только в поиск, но и в ответы нейросетей",
  text: "Для страниц добавлен GEO/AI-блок: сущности, answer-first структура, Schema и связка с видимыми внутренними ссылками.",
  links: [
    { label: "AI-SEO продвижение", href: "/ai-seo-prodvizhenie/" },
    { label: "GEO-продвижение", href: "/geo-prodvizhenie/" },
    { label: "SEO под ключ", href: "/seo-pod-kljuch/" },
  ],
};

export type CaseItem = { title: string; before: string; after: string; metric: string; href?: string };

// Кейсы по умолчанию — используются, когда тема страницы не распознана
// ни в одном из бакетов ниже (хабы, форматы услуг, общие страницы).
export const defaultCases: CaseItem[] = [
  {
    title: "Antos+, стоматология",
    before: "10% видимость в ТОП-10",
    after: "78% видимость в ТОП-10",
    metric: "посетители ×4,5, конверсия 3,42%",
    href: "/cases/",
  },
  {
    title: "SWG, B2B-логистика",
    before: "низкая органическая опора",
    after: "77% ТОП-10",
    metric: "×63 трафик, +1200 лидов",
    href: "/cases/",
  },
  {
    title: "vsemanipulyatory.ru, GEO",
    before: "нет устойчивой AI-видимости",
    after: "+21,21%",
    metric: "Perplexity 43%, Алиса 27%, AI Overview 12%",
    href: "/cases/",
  },
];

type ThematicCase = CaseItem & { keywords: string[] };

// Бакеты кейсов по тематике — сведены из vibecode-seojazz/04-kontent/kejsy.md,
// раздел «Карта «кейс → страница»» (реальные метрики, не выдуманные).
const caseLibrary: ThematicCase[] = [
  {
    title: "Antos+, стоматология",
    before: "10% видимость в ТОП-10",
    after: "78% видимость в ТОП-10",
    metric: "посетители ×4,5, конверсия 3,42%",
    href: "/cases/",
    keywords: ["stomatolog", "implant"],
  },
  {
    title: "premiumzdravclinic.ru, неврология/ортопедия",
    before: "низкая видимость",
    after: "75% ТОП-10",
    metric: "посетители ×227, конверсия 2,51%",
    href: "/cases/",
    keywords: ["nevrolog", "ortoped", "medicinsk", "klinik", "vrach", "reabilitac", "mrt", "laborator", "vakcinac"],
  },
  {
    title: "vladimirzlenko.ru, пластическая хирургия",
    before: "низкий трафик",
    after: "64% ТОП-10",
    metric: "трафик ×8, конверсия +4%",
    href: "/cases/",
    keywords: ["plasticheskoj-hirurgii", "kosmetolog", "dermatolog", "lazernoj-epiljacii"],
  },
  {
    title: "lesaspb.com, стройлеса и металлоконструкции",
    before: "средняя видимость",
    after: "62% ТОП-10",
    metric: "×5 трафик, конверсия 2,8%",
    href: "/cases/",
    keywords: ["stroitelnyh-lesov", "metallokonstrukcij", "fundamentov", "krovel", "fasadnyh", "asfaltirovanij", "blagoustrojstv", "svarochnyh", "demontazh", "okon-osteklenij", "natjazhnyh-potolkov", "zaborov"],
  },
  {
    title: "super-manipulyator.ru, аренда кранов-манипуляторов",
    before: "мало заявок",
    after: "85% ТОП-10",
    metric: "×10,8 трафик, +412 звонков/заявок",
    href: "/cases/",
    keywords: ["arendy-spectehniki", "prodazhi-spectehniki", "dostavki-betona", "prodazhi-betona", "gruzoperevozok", "evakuatorov"],
  },
  {
    title: "gofra-glushitelya.ru, ремонт глушителей/автосервис",
    before: "низкая доля ТОП-3",
    after: "80% фраз в ТОП-3",
    metric: "×13 трафик, +196 заявок",
    href: "/cases/",
    keywords: ["avtoservisa", "avtomoek", "shinomontazha", "avtotjuninga", "remonta-tehniki", "avtoshkol"],
  },
  {
    title: "bobrikovbrothers.ru, кузовной ремонт/покраска авто",
    before: "низкий трафик",
    after: "75% ТОП-10",
    metric: "×7 трафик, конверсия >3%",
    href: "/cases/",
    keywords: ["avtosalonov", "magazina-avtozapchastej", "magazina-avtotovarov", "avtomobilnyh-sajtov", "arendy-avto"],
  },
  {
    title: "sw-global.ru (SWG), международная логистика B2B",
    before: "низкая органическая опора",
    after: "77% ТОП-10",
    metric: "×63 трафик, +1200 лидов",
    href: "/cases/",
    keywords: ["b2b", "gruzoperevozok", "sajtov-uslug", "korporativnyh-sajtov", "inzhenernyh-setej", "promyshlennogo-oborudovanija", "proizvoditelej", "optovyh-kompanij"],
  },
  {
    title: "sellerport.ru, B2B-логистика для маркетплейсов",
    before: "средняя видимость",
    after: "78% ТОП-10",
    metric: "×11 трафик, конверсия 10,8%",
    href: "/cases/",
    keywords: ["marketplejsov", "dostavki-edy", "internet-magazinov"],
  },
  {
    title: "ils-school.com, школа иностранных языков",
    before: "средняя видимость",
    after: "75% ТОП-10",
    metric: "×35 трафик, конверсия до 53%",
    href: "/cases/",
    keywords: ["jazykovyh-shkol", "onlajn-shkol", "kursov", "repetitorov", "obrazovatelnyh-sajtov", "detskih-centrov", "sportivnyh-sekcij", "joga-studij", "fitnes"],
  },
  {
    title: "trend-room.ru, интернет-магазин техники и брендов",
    before: "средняя видимость",
    after: "72% ТОП-10",
    metric: "лиды ×3,6, конверсия 2,17%",
    href: "/cases/",
    keywords: ["magazina-", "internet-magazinov-po-nisham", "sajtov-katalogov"],
  },
  {
    title: "stepanovgroup.ru, юридическая компания",
    before: "средняя видимость",
    after: "73% ТОП-10",
    metric: "×7,5 трафик, конверсия 2,01%",
    href: "/cases/",
    keywords: ["juridicheskih-sajtov", "advokatov", "uslug-bankrotstva", "registracii-biznesa"],
  },
  {
    title: "proffresh.ru, бухгалтерские/юридические услуги",
    before: "средний поток",
    after: "14 000+ посетителей",
    metric: "конверсия 3,5%, до 117 лидов/мес",
    href: "/cases/",
    keywords: ["buhgalterskih-uslug", "kadrovyh-agentstv", "konsaltinga", "ocenochnyh-kompanij", "strahovanija"],
  },
  {
    title: "radist.online, IT-интеграции CRM/мессенджеры",
    before: "средняя видимость",
    after: "67% ТОП-10",
    metric: "×3 трафик, конверсия >20%",
    href: "/cases/",
    keywords: ["it-sajtov", "it-autsorsinga", "saas", "mobilnyh-prilozhenij", "hostingov"],
  },
  {
    title: "fluffywhite.moscow, элитная недвижимость",
    before: "средняя видимость",
    after: "85% ТОП-10",
    metric: "×9 трафик, конверсия 1,33%",
    href: "/cases/",
    keywords: ["nedvizhimosti", "novostroek", "kommercheskoj-nedvizhimosti", "zagorodnoj-nedvizhimosti", "agentstv-nedvizhimosti"],
  },
  {
    title: "btcchange24.com, криптообменник (GEO real)",
    before: "нет AI-видимости",
    after: "+9,33%",
    metric: "Perplexity 36%, Google AI Overview 10%",
    href: "/cases/",
    keywords: ["kriptoobmennikov", "finansovyh-sajtov", "mfo", "kreditnyh-brokerov", "investicionnyh-sajtov"],
  },
  {
    title: "bazisgold.ru, ломбард/скупка ювелирки",
    before: "средняя видимость",
    after: "68% ТОП-10",
    metric: "×4 трафик, 5000+ заявок",
    href: "/cases/",
    keywords: ["juvelirnogo-magazina", "za-rezultat"],
  },
  {
    title: "vsemanipulyatory.ru, GEO/AI-видимость",
    before: "нет устойчивой AI-видимости",
    after: "+21,21%",
    metric: "Perplexity 43%, Алиса 27%, AI Overview 12%",
    href: "/cases/",
    keywords: ["otvety-chatgpt", "otvety-claude", "otvety-gemini", "otvety-perplexity", "otvety-deepseek", "otvety-gigachat", "otvety-grok", "otvety-copilot", "otvety-ii", "otvety-jandeksgpt", "ai-overview", "yandex-neuro", "ai-seo-prodvizhenie", "geo-prodvizhenie", "aeo-prodvizhenie", "llm-optimizacija"],
  },
  {
    title: "многогранник.рф, детский центр раннего развития",
    before: "средняя видимость",
    after: "68% ТОП-10",
    metric: "×64 трафик, конверсия 1,77%",
    href: "/cases/",
    keywords: ["detskih-tovarov", "svadebnyh-uslug", "event-agentstv", "fotografov"],
  },
  {
    title: "top-proektor.ru, гобо/уличные проекторы",
    before: "средняя видимость",
    after: "93% ТОП-10 Я / 75% ТОП Google",
    metric: "×16,5 трафик, 1000+ форм",
    href: "/cases/",
    keywords: ["magazina-elektroniki", "magazina-instrumentov", "magazina-bytovoj-tehniki"],
  },
];

/**
 * Подбирает тематически релевантные кейсы по URL страницы (совпадение по
 * ключевым словам из caseLibrary, как и предписывает kejsy.md — «Карта
 * «кейс → страница»»). Если совпадений меньше count — добирает из общего
 * пула, без дублей.
 */
export function pickThematicCases(url: string, count = 3): CaseItem[] {
  const normalized = url.toLowerCase();

  const scored = caseLibrary
    .map((item) => ({ item, score: item.keywords.filter((keyword) => normalized.includes(keyword)).length }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);

  if (scored.length >= count) {
    return scored.slice(0, count);
  }

  const usedTitles = new Set(scored.map((item) => item.title));
  const fallback = defaultCases.filter((item) => !usedTitles.has(item.title));

  return [...scored, ...fallback].slice(0, count);
}
