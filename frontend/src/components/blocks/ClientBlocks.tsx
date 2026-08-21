"use client";

import Link from "next/link";
import { FormEvent, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import {
  BadgeCheck,
  Calculator as CalculatorIcon,
  CheckCircle2,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { contacts } from "@/lib/contacts";
import TelegramIcon from "../layout/TelegramIcon";
import styles from "./Blocks.module.css";

type Action = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

type SectionProps = {
  eyebrow?: string;
  title?: string;
  intro?: string;
  children: ReactNode;
};

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
          {action.href.includes("t.me") && <TelegramIcon />}
          {action.label}
        </a>
      ))}
    </div>
  );
}

export function PricingTiers({
  tiers,
}: {
  tiers: Array<{
    name: string;
    price: string;
    period?: string;
    description?: string;
    features: string[];
    action?: Action;
    featured?: boolean;
  }>;
}) {
  const defaultIndex = Math.max(0, tiers.findIndex((tier) => tier.featured));
  const [active, setActive] = useState(defaultIndex);

  return (
    <Section title="Тарифы">
      <div className={styles.segmented} aria-label="Тарифы">
        {tiers.map((tier, index) => (
          <button
            aria-pressed={active === index}
            className={active === index ? styles.segmentActive : styles.segment}
            key={tier.name}
            onClick={() => setActive(index)}
            type="button"
          >
            {tier.name}
          </button>
        ))}
      </div>
      <div className={styles.pricingGrid}>
        {tiers.map((tier, index) => (
          <article className={index === active ? styles.priceCardActive : styles.priceCard} key={tier.name}>
            {tier.featured && (
              <span className={styles.featuredBadge}>
                <Sparkles aria-hidden="true" size={13} />
                рекомендуем
              </span>
            )}
            <h3>{tier.name}</h3>
            <p className={styles.price}>
              {tier.price}
              {tier.period && <span>{tier.period}</span>}
            </p>
            {tier.description && <p>{tier.description}</p>}
            <ul>
              {tier.features.map((feature) => (
                <li key={feature}>
                  <CheckCircle2 aria-hidden="true" size={16} />
                  {feature}
                </li>
              ))}
            </ul>
            <p className={styles.guaranteeNote}>
              <ShieldCheck aria-hidden="true" size={16} />
              KPI и гарантия фиксируются в договорной модели.
            </p>
            <Actions actions={tier.action ? [tier.action] : undefined} />
          </article>
        ))}
      </div>
    </Section>
  );
}

export function Calculator({
  steps,
  resultLabel = "Прогноз",
}: {
  steps: Array<{ label: string; options: Array<{ label: string; value: number }> }>;
  resultLabel?: string;
}) {
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(steps.map((step) => [step.label, step.options[0]?.value ?? 0])),
  );
  const selectedCount = Object.keys(values).filter((key) => values[key] > 0).length;
  const total = useMemo(() => Object.values(values).reduce((sum, value) => sum + value, 0), [values]);
  const rangeStart = Math.max(0, Math.round(total * 0.7));
  const rangeEnd = Math.round(total * 1.3);

  return (
    <Section title="Калькулятор" intro="Оценка нужна для первичной квалификации заявки; итог уточняется после аудита.">
      <div className={styles.interactive}>
        <div className={styles.interactiveHead}>
          <CalculatorIcon aria-hidden="true" size={22} />
          <span>Быстрый прогноз без обещаний позиций</span>
        </div>
        {steps.map((step) => (
          <fieldset className={styles.fieldset} key={step.label}>
            <legend>{step.label}</legend>
            <div className={styles.options}>
              {step.options.map((option) => (
                <button
                  className={values[step.label] === option.value ? styles.optionActive : styles.option}
                  key={option.label}
                  onClick={() => setValues((current) => ({ ...current, [step.label]: option.value }))}
                  type="button"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </fieldset>
        ))}
        <output className={styles.result} aria-live="polite">
          <span>
            {resultLabel}
            <small>{selectedCount} из {steps.length} параметров выбрано</small>
          </span>
          <strong>{rangeStart}-{rangeEnd}</strong>
        </output>
      </div>
    </Section>
  );
}

export function Quiz({
  steps,
  finalText,
}: {
  steps: Array<{ question: string; options: string[] }>;
  finalText: string;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const progress = steps.length ? Math.min(100, Math.round((answers.length / steps.length) * 100)) : 100;
  const current = steps[step];

  function choose(option: string) {
    setAnswers((currentAnswers) => [...currentAnswers.slice(0, step), option]);
    setStep((value) => value + 1);
    trackEvent("submit_quiz_step", { step: step + 1, option });
  }

  function reset() {
    setAnswers([]);
    setStep(0);
  }

  return (
    <Section title="Квиз">
      <div className={styles.interactive}>
        <div className={styles.interactiveHead}>
          <BadgeCheck aria-hidden="true" size={22} />
          <span>Ответьте на несколько вопросов — покажем следующий шаг</span>
        </div>
        <div className={styles.progress} aria-label={`Готово ${progress}%`}>
          <span style={{ width: `${progress}%` }} />
        </div>

        {current ? (
          <>
            <h3>{current.question}</h3>
            <div className={styles.options}>
              {current.options.map((option) => (
                <button className={styles.option} key={option} onClick={() => choose(option)} type="button">
                  {option}
                </button>
              ))}
            </div>
            {step > 0 && (
              <button className={styles.secondaryAction} onClick={() => setStep((value) => value - 1)} type="button">
                Назад
              </button>
            )}
          </>
        ) : (
          <div className={styles.quizFinal}>
            <p className={styles.intro}>{finalText}</p>
            <ul>
              {answers.map((answer, index) => (
                <li key={`${answer}-${index}`}>
                  <span>{steps[index]?.question}</span>
                  <strong>{answer}</strong>
                </li>
              ))}
            </ul>
            <Actions actions={[{ label: "Оставить контакт", href: "#lead" }]} />
            <button className={styles.resetButton} onClick={reset} type="button">
              Сбросить ответы
            </button>
          </div>
        )}
      </div>
    </Section>
  );
}

export const LeadQuiz = Quiz;

export function FAQAccordion({
  items,
  action,
}: {
  items: Array<{ question: string; answer: string }>;
  action?: Action;
}) {
  const [open, setOpen] = useState(0);

  return (
    <Section title="FAQ">
      <div className={styles.faq}>
        {items.map((item, index) => (
          <article className={styles.faqItem} key={item.question}>
            <button
              aria-expanded={open === index}
              className={styles.faqButton}
              onClick={() => setOpen((current) => (current === index ? -1 : index))}
              type="button"
            >
              <span>{item.question}</span>
              <span>{open === index ? "−" : "+"}</span>
            </button>
            {open === index && <p>{item.answer}</p>}
          </article>
        ))}
      </div>
      {action && <Actions actions={[action]} />}
    </Section>
  );
}

// Дифференциация лид-форм по типу страницы (ТЗ §11: GEO-аудит цитируемости,
// бесплатный аудит/прогноз, аудит присутствия на площадках — раньше все типы
// страниц получали один и тот же generic LeadForm без различий).
type LeadFormVariant = "default" | "geo-audit" | "seo-audit" | "platform-audit";

const LEAD_FORM_VARIANTS: Record<
  LeadFormVariant,
  { intro: string; successMessage: string; messageTag?: string }
> = {
  default: {
    intro: "Ответим в рабочее время: телефон или Telegram — как удобно.",
    successMessage: "Заявка отправлена. Свяжемся с вами в течение рабочего дня.",
  },
  "geo-audit": {
    intro: "Проверим упоминания бренда в ответах ChatGPT, Claude, Gemini, Perplexity, YandexGPT и Google AI Overview.",
    successMessage: "Заявка на проверку видимости принята. Пришлём результат и рекомендации в течение рабочего дня.",
    messageTag: "GEO-аудит цитируемости",
  },
  "seo-audit": {
    intro: "Посмотрим сайт, конкурентов и точки роста — пришлём аудит и прогноз заявок.",
    successMessage: "Заявка на аудит принята. Пришлём аудит и прогноз заявок в течение рабочего дня.",
    messageTag: "Бесплатный аудит/прогноз",
  },
  "platform-audit": {
    intro: "Проверим карточки, отзывы и позиции на картах и площадках — пришлём аудит присутствия.",
    successMessage: "Заявка на аудит присутствия принята. Ответим в течение рабочего дня.",
    messageTag: "Аудит присутствия на площадках",
  },
};

function formatPhone(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("8")) digits = "7" + digits.slice(1);
  if (!digits.startsWith("7")) digits = "7" + digits;
  digits = digits.slice(0, 11);
  const rest = digits.slice(1);
  let out = "+7";
  if (rest.length > 0) out += ` (${rest.slice(0, 3)}`;
  if (rest.length >= 3) out += `)`;
  if (rest.length > 3) out += ` ${rest.slice(3, 6)}`;
  if (rest.length > 6) out += `-${rest.slice(6, 8)}`;
  if (rest.length > 8) out += `-${rest.slice(8, 10)}`;
  return out;
}

function isPhoneValid(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length === 11 && digits.startsWith("7");
}

export function LeadForm({
  title = "Получить рекомендации",
  variant = "default",
}: {
  title?: string;
  variant?: LeadFormVariant;
}) {
  const [status, setStatus] = useState<"idle" | "error" | "loading" | "success">("idle");
  const [message, setMessage] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const phoneRef = useRef<HTMLInputElement>(null);
  const variantConfig = LEAD_FORM_VARIANTS[variant];

  // Uncontrolled input + native listeners to bypass React 19 + Turbopack quirk
  useEffect(() => {
    const el = phoneRef.current;
    if (!el) return;

    const onFocus = () => {
      if (!el.value) el.value = "+7 ";
    };
    const onInput = () => {
      const raw = el.value;
      if (raw.trim() === "" || raw.trim() === "+") {
        el.value = "";
        setPhoneError("");
        return;
      }
      el.value = formatPhone(raw);
      if (phoneError) setPhoneError("");
    };
    const onBlur = () => {
      if (el.value && el.value !== "+7 " && !isPhoneValid(el.value)) {
        setPhoneError("Введите телефон в формате +7 (999) 999-99-99");
      }
    };

    el.addEventListener("focus", onFocus);
    el.addEventListener("input", onInput);
    el.addEventListener("blur", onBlur);
    return () => {
      el.removeEventListener("focus", onFocus);
      el.removeEventListener("input", onInput);
      el.removeEventListener("blur", onBlur);
    };
  }, [phoneError]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const phoneRaw = phoneRef.current?.value.trim() ?? "";
    const phone = phoneRaw && phoneRaw !== "+7" && phoneRaw !== "+7 " ? phoneRaw : "";
    const telegram = String(form.get("telegram") ?? "").trim();

    if (phone && !isPhoneValid(phone)) {
      setPhoneError("Введите телефон в формате +7 (999) 999-99-99");
      setStatus("error");
      setMessage("Проверьте номер телефона.");
      return;
    }

    const rawMessage = String(form.get("message") ?? "").trim();

    const payload = {
      name: String(form.get("name") ?? "").trim(),
      phone,
      telegram,
      message: variantConfig.messageTag
        ? `[${variantConfig.messageTag}] ${rawMessage}`.trim()
        : rawMessage,
      preferredChannel: String(form.get("preferredChannel") ?? "phone"),
      website: String(form.get("website") ?? "").trim(),
      consent: form.get("consent") === "on",
      page: window.location.pathname,
    };

    if ((!phone && !telegram) || !payload.consent) {
      setStatus("error");
      setMessage("Укажите телефон или Telegram и подтвердите согласие.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Lead submit failed");
      trackEvent("submit_recommendations", { channel: payload.preferredChannel, page: payload.page, formVariant: variant });
      setStatus("success");
      setMessage(variantConfig.successMessage);
      formElement.reset();
      if (phoneRef.current) phoneRef.current.value = "";
    } catch {
      setStatus("error");
      setMessage("Не удалось отправить заявку. Попробуйте написать в Telegram.");
    }
  }

  return (
    <Section>
      <div className={styles.leadGrid} id="lead">
        <div className={styles.contactPanel}>
          <p className={styles.eyebrow}>Контакты</p>
          <h2>{title}</h2>
          <a href={contacts.phoneHref} onClick={() => trackEvent("click_call")} data-testid="lead-phone-link">
            {contacts.phoneDisplay}
          </a>
          <a href={contacts.telegramHref} onClick={() => trackEvent("click_telegram")} data-testid="lead-telegram-link">
            <TelegramIcon />Telegram {contacts.telegramHandle}
          </a>
          <p>{variantConfig.intro}</p>
        </div>

        <form className={styles.form} onSubmit={submit} data-testid="lead-form">
          <label>
            Имя
            <input name="name" placeholder="Как к вам обращаться" autoComplete="name" data-testid="lead-name" />
          </label>

          <label>
            Телефон
            <input
              ref={phoneRef}
              name="phone"
              placeholder="+7 (___) ___-__-__"
              autoComplete="tel"
              inputMode="tel"
              defaultValue=""
              aria-invalid={phoneError ? "true" : "false"}
              data-testid="lead-phone"
            />
            {phoneError && (
              <small className={styles.error} data-testid="lead-phone-error">
                {phoneError}
              </small>
            )}
          </label>

          <label>
            Telegram
            <input name="telegram" placeholder="@username" autoComplete="off" data-testid="lead-telegram" />
          </label>

          <label>
            Предпочтительный канал
            <select name="preferredChannel" defaultValue="phone" data-testid="lead-channel">
              <option value="phone">Позвонить</option>
              <option value="telegram">Написать в Telegram</option>
            </select>
          </label>

          <label>
            Задача
            <textarea name="message" placeholder="Коротко о проекте" rows={4} data-testid="lead-message" />
          </label>

          <label className={styles.honeypot}>
            Сайт
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>

          <label className={styles.consent}>
            <input name="consent" required type="checkbox" data-testid="lead-consent" />
            <span>
              Согласен на обработку данных для ответа на заявку —{" "}
              <Link href="/privacy-policy/" target="_blank" rel="noopener noreferrer">
                политика конфиденциальности
              </Link>
            </span>
          </label>

          <button
            className={styles.primaryAction}
            disabled={status === "loading"}
            type="submit"
            data-testid="lead-submit"
          >
            <Send aria-hidden="true" size={16} />
            {status === "loading" ? "Отправляем" : "Отправить"}
          </button>

          {status === "error" && (
            <p className={styles.error} data-testid="lead-status-error">
              {message}
            </p>
          )}
          {status === "success" && (
            <p className={styles.success} data-testid="lead-status-success">
              {message}
            </p>
          )}
        </form>
      </div>
    </Section>
  );
}

// Отдельная компактная форма обратного звонка (ТЗ §5/§6/§11: «Обратный
// звонок» — телефон + время звонка, отдельно от общей заявки). Раньше в
// шапке/sticky-панели был только прямой tel:-линк без формы.
export function CallbackForm({ onSubmitted }: { onSubmitted?: () => void }) {
  const [status, setStatus] = useState<"idle" | "error" | "loading" | "success">("idle");
  const [message, setMessage] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const phoneRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = phoneRef.current;
    if (!el) return;

    const onFocus = () => {
      if (!el.value) el.value = "+7 ";
    };
    const onInput = () => {
      const raw = el.value;
      if (raw.trim() === "" || raw.trim() === "+") {
        el.value = "";
        setPhoneError("");
        return;
      }
      el.value = formatPhone(raw);
      if (phoneError) setPhoneError("");
    };

    el.addEventListener("focus", onFocus);
    el.addEventListener("input", onInput);
    return () => {
      el.removeEventListener("focus", onFocus);
      el.removeEventListener("input", onInput);
    };
  }, [phoneError]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const phone = phoneRef.current?.value.trim() ?? "";
    const consent = form.get("consent") === "on";

    if (!phone || !isPhoneValid(phone)) {
      setPhoneError("Введите телефон в формате +7 (999) 999-99-99");
      setStatus("error");
      setMessage("Проверьте номер телефона.");
      return;
    }
    if (!consent) {
      setStatus("error");
      setMessage("Подтвердите согласие на обработку данных.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "",
          phone,
          telegram: "",
          message: "[Обратный звонок]",
          preferredChannel: "phone",
          website: "",
          consent,
          page: window.location.pathname,
        }),
      });
      if (!response.ok) throw new Error("Callback submit failed");
      trackEvent("submit_callback", { page: window.location.pathname });
      setStatus("success");
      setMessage("Перезвоним в течение 15 минут в рабочее время.");
      formElement.reset();
      if (phoneRef.current) phoneRef.current.value = "";
      onSubmitted?.();
    } catch {
      setStatus("error");
      setMessage("Не удалось отправить. Позвоните нам сами или напишите в Telegram.");
    }
  }

  return (
    <form className={styles.form} onSubmit={submit} data-testid="callback-form">
      <label>
        Телефон
        <input
          ref={phoneRef}
          name="phone"
          placeholder="+7 (___) ___-__-__"
          autoComplete="tel"
          inputMode="tel"
          defaultValue=""
          aria-invalid={phoneError ? "true" : "false"}
          data-testid="callback-phone"
        />
        {phoneError && (
          <small className={styles.error} data-testid="callback-phone-error">
            {phoneError}
          </small>
        )}
      </label>
      <label className={styles.consent}>
        <input name="consent" required type="checkbox" data-testid="callback-consent" />
        <span>
          Согласен на{" "}
          <Link href="/privacy-policy/" target="_blank" rel="noopener noreferrer">
            обработку данных
          </Link>
        </span>
      </label>
      <button className={styles.primaryAction} disabled={status === "loading"} type="submit" data-testid="callback-submit">
        <Send aria-hidden="true" size={16} />
        {status === "loading" ? "Отправляем" : "Перезвоните мне"}
      </button>
      {status === "error" && <p className={styles.error}>{message}</p>}
      {status === "success" && <p className={styles.success}>{message}</p>}
    </form>
  );
}

export function FooterLeadForm() {
  const [status, setStatus] = useState<"idle" | "error" | "loading" | "success">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const contact = String(form.get("contact") ?? "").trim();
    const consent = form.get("consent") === "on";

    if (!contact || !consent) {
      setStatus("error");
      setMessage("Укажите телефон или Telegram и подтвердите согласие.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "",
          phone: contact,
          telegram: "",
          message: "Короткая заявка из футера",
          preferredChannel: "phone",
          website: "",
          consent,
          page: window.location.pathname,
        }),
      });
      if (!response.ok) throw new Error("Lead submit failed");
      trackEvent("submit_footer_lead", { page: window.location.pathname });
      setStatus("success");
      setMessage("Заявка отправлена, свяжемся с вами.");
      formElement.reset();
    } catch {
      setStatus("error");
      setMessage("Не удалось отправить. Напишите в Telegram.");
    }
  }

  return (
    <form className={`${styles.form} ${styles.footerForm}`} onSubmit={submit} data-testid="footer-lead-form">
      <label>
        Короткая заявка
        <input name="contact" placeholder="Телефон или Telegram" autoComplete="tel" data-testid="footer-lead-contact" />
      </label>
      <label className={styles.consent}>
        <input name="consent" required type="checkbox" data-testid="footer-lead-consent" />
        <span>
          Согласен на{" "}
          <Link href="/privacy-policy/" onClick={(event) => event.stopPropagation()}>
            обработку данных
          </Link>
        </span>
      </label>
      <button className={styles.primaryAction} disabled={status === "loading"} type="submit" data-testid="footer-lead-submit">
        <Send aria-hidden="true" size={16} />
        {status === "loading" ? "Отправляем" : "Отправить"}
      </button>
      {status === "error" && <p className={styles.error}>{message}</p>}
      {status === "success" && <p className={styles.success}>{message}</p>}
    </form>
  );
}

export function trackEvent(name: string, payload?: Record<string, unknown>) {
  const event = { event: name, ...(payload ?? {}) };
  const analyticsWindow = window as Window & {
    dataLayer?: Array<Record<string, unknown>>;
    ym?: (counterId: number, action: string, goal: string, params?: Record<string, unknown>) => void;
  };
  analyticsWindow.dataLayer?.push(event);

  const metrikaId = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID);
  if (analyticsWindow.ym && metrikaId) {
    analyticsWindow.ym(metrikaId, "reachGoal", name, payload);
  }

  if (!analyticsWindow.dataLayer) {
    console.info("[mock-analytics]", event);
  }
}
