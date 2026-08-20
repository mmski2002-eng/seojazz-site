"use client";

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

export function FAQAccordion({ items }: { items: Array<{ question: string; answer: string }> }) {
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
    </Section>
  );
}

export function LeadForm({ title = "Получить рекомендации" }: { title?: string }) {
  const [status, setStatus] = useState<"idle" | "error" | "loading" | "success">("idle");
  const [message, setMessage] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const phoneRef = useRef<HTMLInputElement>(null);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const payload = {
      name: String(form.get("name") ?? "").trim(),
      phone,
      telegram,
      message: String(form.get("message") ?? "").trim(),
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
      trackEvent("submit_recommendations", { channel: payload.preferredChannel, page: payload.page });
      setStatus("success");
      setMessage("Заявка отправлена. Свяжемся с вами в течение рабочего дня.");
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
            Telegram {contacts.telegramHandle}
          </a>
          <p>Ответим в рабочее время: телефон или Telegram — как удобно.</p>
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
            <span>Согласен на обработку данных для ответа на заявку</span>
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

function trackEvent(name: string, payload?: Record<string, unknown>) {
  const event = { event: name, ...(payload ?? {}) };
  const analyticsWindow = window as Window & { dataLayer?: Array<Record<string, unknown>> };
  analyticsWindow.dataLayer?.push(event);
  if (!analyticsWindow.dataLayer) {
    console.info("[mock-analytics]", event);
  }
}
