import { ReactNode } from "react";
import {
  BadgeCheck,
  BarChart3,
  Bot,
  Building2,
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
          <h1>{title}</h1>
          {text && <p className={styles.heroText}>{text}</p>}
          <Actions actions={actions} />
          {metrics?.length ? <MetricsRow metrics={metrics} compact /> : null}
        </div>
        <div className={styles.heroAside}>{aside ?? <HeroDashboard metrics={metrics} />}</div>
      </div>
    </section>
  );
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
        <div className={styles.panel}>
          <h3>Подходит</h3>
          <Checklist items={fit} />
        </div>
        <div className={styles.panelMuted}>
          <h3>Не подходит</h3>
          <Checklist items={notFit} />
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


export function CaseCardsAB({
  cases,
}: {
  cases: Array<{ title: string; before: string; after: string; metric: string; href?: string }>;
}) {
  return (
    <Section title="Кейсы A→B">
      <div className={styles.scrollRow}>
        {cases.map((item) => {
          const content = (
            <>
              <h3>{item.title}</h3>
              <div className={styles.caseVisual} aria-hidden="true">
                <span style={{ height: "28%" }} />
                <span style={{ height: "44%" }} />
                <span style={{ height: "64%" }} />
                <span style={{ height: "88%" }} />
              </div>
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
        {people.map((person) => (
          <article className={styles.card} key={person.name}>
            <div className={styles.avatar}>{person.name.slice(0, 1)}</div>
            <h3>{person.name}</h3>
            <p className={styles.muted}>{person.role}</p>
            {person.text && <p>{person.text}</p>}
          </article>
        ))}
      </div>
    </Section>
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
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <Actions actions={[action]} />
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
