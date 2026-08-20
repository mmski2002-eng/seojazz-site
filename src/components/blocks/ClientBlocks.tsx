"use client";





import { FormEvent, ReactNode, useMemo, useState } from "react";


import { contacts } from "@/lib/contacts";
import { BadgeCheck, Calculator as CalculatorIcon, CheckCircle2, Send, ShieldCheck, Sparkles } from "lucide-react";


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
                <Sparkles aria-hidden="true" size={15} />
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


            <Actions


              actions={[


                { label: "Оставить контакт", href: "#lead" },


              ]}


            />


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





  async function submit(event: FormEvent<HTMLFormElement>) {


    event.preventDefault();


    const formElement = event.currentTarget;


    const form = new FormData(formElement);


    const phone = String(form.get("phone") ?? "").trim();


    const telegram = String(form.get("telegram") ?? "").trim();


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





      if (!response.ok) {


        throw new Error("Lead submit failed");


      }





      trackEvent("submit_recommendations", { channel: payload.preferredChannel, page: payload.page });


      setStatus("success");


      setMessage("Заявка сохранена в мок-эндпойнте. Реальная CRM не подключалась.");


      formElement.reset();


    } catch {


      setStatus("error");


      setMessage("Не удалось сохранить заявку в мок-эндпойнте. Попробуйте написать в Telegram.");


    }


  }





  return (


    <Section>


      <div className={styles.leadGrid} id="lead">


        <div className={styles.contactPanel}>


          <p className={styles.eyebrow}>Контакты</p>


          <h2>{title}</h2>


          <a href={contacts.phoneHref} onClick={() => trackEvent("click_call")}>


            {contacts.phoneDisplay}


          </a>


          <a href={contacts.telegramHref} onClick={() => trackEvent("click_telegram")}>


            Telegram {contacts.telegramHandle}


          </a>


          <p>WA/Max не выводятся: в архиве подтверждены только телефон и Telegram.</p>


        </div>


        <form className={styles.form} onSubmit={submit}>


          <label>


            Имя


            <input name="name" placeholder="Как к вам обращаться" autoComplete="name" />


          </label>


          <label>


            Телефон


            <input name="phone" placeholder="+7" autoComplete="tel" />


          </label>


          <label>


            Telegram


            <input name="telegram" placeholder="@username" autoComplete="off" />


          </label>


          <label>


            Предпочтительный канал


            <select name="preferredChannel" defaultValue="phone">


              <option value="phone">Позвонить</option>


              <option value="telegram">Написать в Telegram</option>


            </select>


          </label>


          <label>


            Задача


            <textarea name="message" placeholder="Коротко о проекте" rows={4} />


          </label>


          <label className={styles.honeypot}>


            Сайт


            <input name="website" tabIndex={-1} autoComplete="off" />


          </label>


          <label className={styles.consent}>


            <input name="consent" required type="checkbox" />


            <span>Согласен на обработку данных для ответа на заявку</span>


          </label>


          <button className={styles.primaryAction} disabled={status === "loading"} type="submit">


            <Send aria-hidden="true" size={16} />
            {status === "loading" ? "Отправляем" : "Отправить"}


          </button>


          {status === "error" && <p className={styles.error}>{message}</p>}


          {status === "success" && <p className={styles.success}>{message}</p>}


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
