import { ReactNode } from "react";
import {
  BadgeCheck,
  BarChart3,
  Bot,
  Building2,
  Check,
  CircleDollarSign,
  FileSearch,
  LineChart,
  MapPin,
  MessageSquareText,
  PhoneCall,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  X as XIcon,
} from "lucide-react";
import styles from "./Blocks.module.css";

type Action = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

type Metric = {
  label: string;
  value: string;
  note?: string;
};

type TextItem = {
  title: string;
  text?: string;
};

type LinkItem = {
  label: string;
  href: string;
  note?: string;
  price?: string;
};

type SectionProps = {
  eyebrow?: string;
  title?: string;
  intro?: string;
  children: ReactNode;
};

const iconMap = [
  Search,
  TrendingUp,
  ShieldCheck,
  BarChart3,
  Bot,
  MapPin,
  MessageSquareText,
  CircleDollarSign,
  FileSearch,
  Building2,
  BadgeCheck,
  Sparkles,
] as const;

function IconBadge({ index = 0, tone = "default" }: { index?: number; tone?: "default" | "success" | "ai" }) {
  const Icon = iconMap[index % iconMap.length];

  return (
    <span className={`${styles.iconBadge} ${tone === "success" ? styles.iconBadgeSuccess : ""} ${tone === "ai" ? styles.iconBadgeAi : ""}`}>
      <Icon aria-hidden="true" size={20} strokeWidth={2} />
    </span>
  );
}

function Section({ eyebrow, title, intro, children }: SectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {(eyebrow || title || intro) && (
          <div className={styles.sectionHead}>
            {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
            {title && <h2>{title}</h2>}
            {intro && <p className={styles.intro}>{intro}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

function Actions({ actions }: { actions?: Action[] }) {
  if (!actions?.length) return null;

  return (
    <div className={styles.actions}>
      {actions.map((action) => (
        <a
          className={action.variant === "secondary" ? styles.secondaryAction : styles.primaryAction}
          href={action.href}
          key={`${action.href}-${action.label}`}
        >
          {action.label}
        </a>
      ))}
    </div>
  );
}

export function Hero({
  eyebrow,
  title,
  text,
  metrics,
  actions,
  aside,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  metrics?: Metric[];
  actions?: Action[];
  aside?: ReactNode;
}) {
  return (
    <section className={styles.hero}>
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div className={styles.heroContent}>
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          <h1>{renderTitleWithAccent(title)}</h1>
          {text && <p className={styles.heroText}>{text}</p>}
          <Actions actions={actions} />
          {metrics?.length ? <MetricsRow metrics={metrics} compact /> : null}
        </div>
        <div className={styles.heroAside}>{aside ?? <HeroDashboard metrics={metrics} />}</div>
      </div>
    </section>
  );
}

// Выделяет ключевое слово курсивным serif-акцентом (эмоция + иерархия).
function renderTitleWithAccent(title: string) {
  const accents = ["система", "систему", "заявок", "заявки", "выручку", "клиентов", "пациенты", "ключ"];
  const parts = title.split(/(\s+)/);
  let done = false;
  return parts.map((part, i) => {
    const bare = part.toLowerCase().replace(/[.,:;!?«»"]/g, "");
    if (!done && accents.includes(bare)) {
      done = true;
      return (
        <em
          key={i}
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontWeight: 500,
            color: "var(--color-brand-secondary)",
          }}
        >
          {part}
        </em>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function ArticleContent({
  title = "Содержание страницы",
  sections,
}: {
  title?: string;
  sections: Array<{ heading?: string; items: string[] }>;
}) {
  if (!sections.length) return null;

  return (
    <Section title={title}>
      <div className={styles.articleContent}>
        {sections.map((section, index) => (
          <article className={styles.articleSection} key={`${section.heading ?? "section"}-${index}`}>
            {section.heading && <h3>{section.heading}</h3>}
            <div className={styles.articleText}>
              {section.items.map((item, itemIndex) => (
                <p key={`${item.slice(0, 32)}-${itemIndex}`}>{item}</p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function HeroDashboard({ metrics }: { metrics?: Metric[] }) {
  const dashboardMetrics = metrics?.slice(0, 3) ?? [];

  return (
    <div className={styles.heroDashboard} aria-label="Сводка результата">
      <div className={styles.dashboardTop}>
        <span className={styles.dashboardStatus}>
          <Sparkles aria-hidden="true" size={16} />
          KPI-контур
        </span>
        <span className={styles.dashboardLive}>заявки</span>
      </div>
      <div className={styles.dashboardChart} aria-hidden="true">
        <span style={{ height: "34%" }} />
        <span style={{ height: "58%" }} />
        <span style={{ height: "46%" }} />
        <span style={{ height: "76%" }} />
        <span style={{ height: "92%" }} />
      </div>
      <div className={styles.dashboardMetricList}>
        {dashboardMetrics.map((metric, index) => (
          <div className={styles.dashboardMetric} key={`${metric.value}-${metric.label}`}>
            <IconBadge index={index} tone={index === 0 ? "success" : "default"} />
            <span>
              <strong>{metric.value}</strong>
              <small>{metric.label}</small>
            </span>
          </div>
        ))}
      </div>
      <div className={styles.dashboardFlow}>
        <span><Search aria-hidden="true" size={16} />Поиск</span>
        <span><Bot aria-hidden="true" size={16} />AI</span>
        <span><PhoneCall aria-hidden="true" size={16} />Заявка</span>
      </div>
    </div>
  );
}

export function UTPTriplet({ items }: { items: TextItem[] }) {
  return (
    <Section>
      <div className={styles.threeGrid}>
        {items.slice(0, 3).map((item, index) => (
          <article className={styles.card} key={item.title}>
            <IconBadge index={index} />
            <h3>{item.title}</h3>
            {item.text && <p>{item.text}</p>}
          </article>
        ))}
      </div>
    </Section>
  );
}

export function MetricsRow({ metrics, compact = false }: { metrics: Metric[]; compact?: boolean }) {
  return (
    <div className={compact ? styles.metricsCompact : styles.metrics}>
      {metrics.map((metric) => (
        <div className={styles.metric} key={`${metric.value}-${metric.label}`}>
          <LineChart aria-hidden="true" className={styles.metricIcon} size={18} />
          <strong>{metric.value}</strong>
          <span>{metric.label}</span>
          {metric.note && <small>{metric.note}</small>}
        </div>
      ))}
    </div>
  );
}

export function TrustBar({ metrics }: { metrics: Metric[] }) {
  return (
    <Section>
      <div className={styles.trustBar}>
        <MetricsRow metrics={metrics} />
      </div>
    </Section>
  );
}

export function ProblemsGrid({ title, intro, items }: { title?: string; intro?: string; items: TextItem[] }) {
  return (
    <Section title={title} intro={intro}>
      <div className={styles.grid}>
        {items.map((item, index) => (
          <article className={styles.card} key={item.title}>
            <IconBadge index={index} />
            <h3>{item.title}</h3>
            {item.text && <p>{item.text}</p>}
          </article>
        ))}
      </div>
    </Section>
  );
}

export function FitDisqualify({ fit, notFit }: { fit: TextItem[]; notFit: TextItem[] }) {
  return (
    <Section title="Кому подходит">
      <div className={styles.split}>
        <div className={styles.fitPanel}>
          <div className={styles.fitPanelHead}>
            <span className={styles.fitBadge}>
              <ShieldCheck aria-hidden="true" size={22} />
            </span>
            <h3>Подходит</h3>
          </div>
          <ul className={styles.fitList}>
            {fit.map((item) => (
              <li key={item.title}>
                <Check aria-hidden="true" size={20} strokeWidth={2.5} />
                <div>
                  <strong>{item.title}</strong>
                  {item.text && <span>{item.text}</span>}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.notFitPanel}>
          <div className={styles.notFitPanelHead}>
            <span className={styles.notFitBadge}>
              <XIcon aria-hidden="true" size={22} />
            </span>
            <h3>Не подходит</h3>
          </div>
          <ul className={styles.notFitList}>
            {notFit.map((item) => (
              <li key={item.title}>
                <XIcon aria-hidden="true" size={20} strokeWidth={2.5} />
                <div>
                  <strong>{item.title}</strong>
                  {item.text && <span>{item.text}</span>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

export function WhatIncluded({ title, intro, items }: { title?: string; intro?: string; items: TextItem[] }) {
  return (
    <Section title={title} intro={intro}>
      <div className={styles.grid}>
        {items.map((item, index) => (
          <article className={styles.card} key={item.title}>
            <IconBadge index={index} />
            <h3>{item.title}</h3>
            {item.text && <p>{item.text}</p>}
          </article>
        ))}
      </div>
    </Section>
  );
}

export function StepsTimeline({ steps }: { steps: TextItem[] }) {
  return (
    <Section title="Этапы работы">
      <ol className={styles.timeline}>
        {steps.map((step, index) => (
          <li className={styles.step} key={step.title}>
            <span>{index + 1}</span>
            <div>
              <h3>{step.title}</h3>
              {step.text && <p>{step.text}</p>}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}


// Разнообразные визуализации графиков для карточек кейсов.
// Каждый кейс получает уникальный паттерн: столбцы разной формы, линия роста, площадь.
function CaseChart({ variant, index }: { variant: number; index: number }) {
  const seed = (index * 13 + variant * 7) % 100;
  // 5 разных стилей: bars, ascending-bars, line, area, mixed-with-line
  const style = variant % 5;

  // Помощник — псевдо-случайные высоты, стабильные для варианта
  const heights = Array.from({ length: 6 }, (_, i) => {
    const base = 25 + ((seed + i * 17) % 55);
    // всегда растущий тренд, чтобы кейс выглядел «до/после»
    return Math.min(96, Math.round(base * (0.55 + i * 0.11)));
  });

  if (style === 0) {
    // Классические столбцы
    return (
      <div className={styles.caseVisual} aria-hidden="true">
        {heights.map((h, i) => (
          <span key={i} style={{ height: `${h}%` }} />
        ))}
      </div>
    );
  }

  if (style === 1) {
    // Тонкие вертикальные полоски
    return (
      <div className={`${styles.caseVisual} ${styles.caseVisualThin}`} aria-hidden="true">
        {[...heights, ...heights.slice(0, 4)].map((h, i) => (
          <span key={i} style={{ height: `${Math.max(10, h - 10)}%` }} />
        ))}
      </div>
    );
  }

  if (style === 2) {
    // SVG линия роста
    const w = 260;
    const hh = 100;
    const points = heights
      .map((h, i) => {
        const x = (i / (heights.length - 1)) * w;
        const y = hh - (h / 100) * hh;
        return `${x},${y}`;
      })
      .join(" ");
    return (
      <div className={`${styles.caseVisual} ${styles.caseVisualLine}`} aria-hidden="true">
        <svg viewBox={`0 0 ${w} ${hh}`} preserveAspectRatio="none" width="100%" height="100%">
          <defs>
            <linearGradient id={`ln-${index}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--color-info)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--color-info)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={`0,${hh} ${points} ${w},${hh}`} fill={`url(#ln-${index})`} />
          <polyline points={points} fill="none" stroke="var(--color-info)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {heights.map((h, i) => {
            const x = (i / (heights.length - 1)) * w;
            const y = hh - (h / 100) * hh;
            return <circle key={i} cx={x} cy={y} r="3" fill="var(--color-success)" />;
          })}
        </svg>
      </div>
    );
  }

  if (style === 3) {
    // Ступени
    return (
      <div className={`${styles.caseVisual} ${styles.caseVisualSteps}`} aria-hidden="true">
        {heights.map((h, i) => (
          <span key={i} style={{ height: `${h}%`, animationDelay: `${i * 60}ms` }} />
        ))}
      </div>
    );
  }

  // style === 4: donut/gauge SVG
  const percentage = 40 + (seed % 45);
  const r = 42;
  const c = 2 * Math.PI * r;
  const dash = (percentage / 100) * c;
  return (
    <div className={`${styles.caseVisual} ${styles.caseVisualGauge}`} aria-hidden="true">
      <svg viewBox="0 0 120 120" width="100%" height="100%">
        <defs>
          <linearGradient id={`gg-${index}`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--color-info)" />
            <stop offset="100%" stopColor="var(--color-success)" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r={r} fill="none" stroke="var(--color-border)" strokeWidth="8" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke={`url(#gg-${index})`}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}
          transform="rotate(-90 60 60)"
        />
        <text x="60" y="66" textAnchor="middle" fontFamily="var(--font-display)" fontWeight="700" fontSize="24" fill="var(--color-brand)">
          {percentage}%
        </text>
      </svg>
    </div>
  );
}

export function CaseCardsAB({
  cases,
}: {
  cases: Array<{ title: string; before: string; after: string; metric: string; href?: string }>;
}) {
  return (
    <Section title="Кейсы A→B">
      <div className={styles.scrollRow}>
        {cases.map((item, index) => {
          const content = (
            <>
              <h3>{item.title}</h3>
              <CaseChart variant={index} index={index} />
              <div className={styles.beforeAfter}>
                <span>{item.before}</span>
                <strong>{item.after}</strong>
              </div>
              <p className={styles.metricAccent}>{item.metric}</p>
            </>
          );

          return item.href ? (
            <a className={styles.cardLink} href={item.href} key={item.title}>
              {content}
            </a>
          ) : (
            <article className={styles.card} key={item.title}>
              {content}
            </article>
          );
        })}
      </div>
    </Section>
  );
}

export function Team({ people }: { people: Array<{ name: string; role: string; text?: string }> }) {
  return (
    <Section title="Команда и экспертиза">
      <div className={styles.grid}>
        {people.map((person, index) => (
          <article className={styles.card} key={person.name}>
            <TeamAvatar name={person.name} index={index} />
            <h3>{person.name}</h3>
            <p className={styles.muted}>{person.role}</p>
            {person.text && <p>{person.text}</p>}
          </article>
        ))}
      </div>
    </Section>
  );
}

// Декоративный аватар — SVG-иллюстрация человека в стиле сайта, с градиентом бренда.
function TeamAvatar({ name, index }: { name: string; index: number }) {
  const palettes = [
    { bg: "var(--color-info)", accent: "var(--color-accent)" },
    { bg: "var(--color-brand)", accent: "var(--color-success)" },
    { bg: "var(--color-success)", accent: "var(--color-accent)" },
    { bg: "var(--color-brand-secondary)", accent: "var(--color-info)" },
  ];
  const p = palettes[index % palettes.length];
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <div className={styles.teamAvatar} aria-hidden="true">
      <svg viewBox="0 0 80 80" width="72" height="72">
        <defs>
          <linearGradient id={`ta-${index}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={p.bg} stopOpacity="0.95" />
            <stop offset="100%" stopColor={p.bg} stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <rect width="80" height="80" rx="40" fill={`url(#ta-${index})`} />
        <circle cx="40" cy="32" r="12" fill="rgba(255,255,255,0.92)" />
        <path d="M20 66 C 20 52, 60 52, 60 66 Z" fill="rgba(255,255,255,0.92)" />
        <circle cx="62" cy="18" r="8" fill={p.accent} />
      </svg>
      <span className={styles.teamAvatarInitials}>{initials}</span>
    </div>
  );
}

export function Counters({ metrics }: { metrics: Metric[] }) {
  return <TrustBar metrics={metrics} />;
}

export function Awards({ items }: { items: TextItem[] }) {
  return <SimpleCards title="Награды и сертификаты" items={items} />;
}

export function Reviews({ items }: { items: TextItem[] }) {
  return <SimpleCards title="Отзывы" items={items} />;
}

export function Guarantees({ items }: { items: TextItem[] }) {
  return <SimpleCards title="Гарантии" items={items} />;
}

export function ProvenByData({ items }: { items: TextItem[] }) {
  return <SimpleCards title="Подтверждено данными" items={items} />;
}

export function ComparisonTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: Array<{ label: string; values: string[] }>;
}) {
  return (
    <Section title="Сравнение">
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Критерий</th>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <th>{row.label}</th>
                {row.values.map((value, index) => (
                  <td key={`${row.label}-${columns[index]}`}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

export function GeoAIBlock({ title, text, links }: { title: string; text: string; links?: LinkItem[] }) {
  return (
    <Section>
      <div className={styles.geoBlock}>
        <div>
          <p className={styles.eyebrow}>GEO / AI</p>
          <h2>{title}</h2>
          <p>{text}</p>
          <div className={styles.aiPipeline} aria-label="Связка каналов">
            <span><Search aria-hidden="true" size={16} />Поиск</span>
            <span><Bot aria-hidden="true" size={16} />Нейросети</span>
            <span><TrendingUp aria-hidden="true" size={16} />Заявки</span>
          </div>
        </div>
        <div className={styles.geoPanel}>
          <div className={styles.geoOrbit} aria-hidden="true">
            <span>AI</span>
          </div>
          {links?.length ? <LinkList links={links} /> : null}
        </div>
      </div>
    </Section>
  );
}

export function LinkMatrix({ title = "Связанные решения", links }: { title?: string; links: LinkItem[] }) {
  return (
    <Section title={title} intro="Ссылки выводятся обычным HTML и собираются из матрицы handoff, чтобы посадочные усиливали друг друга.">
      <LinkList links={links} cards />
    </Section>
  );
}

export function AIRatingWidget({
  title = "AI-рейтинг брендов",
  items,
}: {
  title?: string;
  items: Array<{ brand: string; score: string; source: string; note?: string }>;
}) {
  return (
    <Section
      title={title}
      intro="Опциональный блок-обгон для GEO/AI. Он показывает только проверяемые строки и явно помечает, что финальный рейтинг должен подтвердить человек."
    >
      <div className={styles.ratingTable}>
        {items.map((item, index) => (
          <article className={styles.ratingRow} key={`${item.brand}-${item.source}`}>
            <span>{index + 1}</span>
            <div>
              <h3>{item.brand}</h3>
              <p>{item.source}</p>
              {item.note && <small>{item.note}</small>}
            </div>
            <strong>{item.score}</strong>
          </article>
        ))}
      </div>
    </Section>
  );
}

export function LeadMagnet({ title, text, action }: { title: string; text: string; action: Action }) {
  return (
    <Section>
      <div className={styles.leadMagnet}>
        <div>
          <p className={styles.eyebrow}>Лид-магнит</p>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className={styles.leadMagnetVisual} aria-hidden="true">
          <svg viewBox="0 0 220 180" width="100%" height="100%">
            <defs>
              <linearGradient id="lm-bg" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--color-info)" stopOpacity="0.16" />
                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.18" />
              </linearGradient>
            </defs>
            <rect x="18" y="14" width="140" height="152" rx="14" fill="rgb(255 255 255)" stroke="var(--color-border)" />
            <rect x="34" y="34" width="88" height="10" rx="5" fill="var(--color-brand)" opacity="0.85" />
            <rect x="34" y="52" width="108" height="6" rx="3" fill="var(--color-border-strong)" />
            <rect x="34" y="64" width="88" height="6" rx="3" fill="var(--color-border-strong)" />
            <rect x="34" y="86" width="108" height="52" rx="8" fill="url(#lm-bg)" />
            <polyline points="42,132 62,110 82,120 102,96 122,104 140,86" fill="none" stroke="var(--color-info)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="140" cy="86" r="3.5" fill="var(--color-success)" />
            <rect x="34" y="146" width="60" height="8" rx="4" fill="var(--color-accent)" />
            <g transform="translate(150 90)">
              <circle r="34" fill="var(--color-accent)" />
              <path d="M -10 0 L -2 10 L 12 -8" stroke="var(--color-brand)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </g>
          </svg>
        </div>
        <div className={styles.leadMagnetAction}>
          <Actions actions={[action]} />
        </div>
      </div>
    </Section>
  );
}

function Checklist({ items }: { items: TextItem[] }) {
  return (
    <ul className={styles.checklist}>
      {items.map((item) => (
        <li key={item.title}>
          <strong>{item.title}</strong>
          {item.text && <span>{item.text}</span>}
        </li>
      ))}
    </ul>
  );
}

function SimpleCards({ title, items }: { title: string; items: TextItem[] }) {
  return (
    <Section title={title}>
      <div className={styles.grid}>
        {items.map((item, index) => (
          <article className={styles.card} key={item.title}>
            <IconBadge index={index} />
            <h3>{item.title}</h3>
            {item.text && <p>{item.text}</p>}
          </article>
        ))}
      </div>
    </Section>
  );
}

function LinkList({ links, cards = false }: { links: LinkItem[]; cards?: boolean }) {
  return (
    <div className={cards ? styles.linkGrid : styles.linkList}>
      {links.map((link) => (
        <a className={cards ? styles.cardLink : styles.textLink} href={link.href} key={link.href}>
          <span>{link.label}</span>
          {link.price && <strong>{link.price}</strong>}
          {link.note && <small>{link.note}</small>}
        </a>
      ))}
    </div>
  );
}
