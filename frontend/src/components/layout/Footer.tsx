import Link from "next/link";
import { mainNav } from "@/lib/nav";
import { contacts } from "@/lib/contacts";
import { trustMetrics } from "@/lib/sharedContent";
import { FooterLeadForm } from "@/components/blocks";
import Logo from "./Logo";
import TelegramIcon from "./TelegramIcon";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandCol}>
          <div className={styles.logo}>
            <Logo />
          </div>
          <p className={styles.tagline}>
            Платите за&nbsp;заявки и&nbsp;выручку, а&nbsp;не&nbsp;за&nbsp;позиции. Собираем SEO, GEO/AI и&nbsp;площадки в&nbsp;единую систему роста.
          </p>
          <div className={styles.metrics}>
            {trustMetrics.map((metric) => (
              <div key={metric.label} className={styles.metric}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
          <p className={styles.ratingBadge}>
            Рейтинг Яндекс.Справочника — виджет подключим после подтверждения карточки компании заказчиком.
          </p>
        </div>

        <div>
          <p className={styles.colTitle}>Навигация</p>
          <nav className={styles.links} aria-label="Футер — навигация">
            {mainNav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className={styles.colTitle}>Связаться</p>
          <div className={styles.contacts}>
            <a href={contacts.phoneHref}>{contacts.phoneDisplay}</a>
            <a href={contacts.telegramHref}><TelegramIcon />{contacts.telegramHandle}</a>
            <Link href="/contacts/">Все контакты и карты →</Link>
          </div>
          <FooterLeadForm />
        </div>
      </div>

      <div className={styles.bottomBar}>
        <span>© {currentYear} SEO Jazz. Все права защищены.</span>
        <Link href="/privacy-policy/">Политика конфиденциальности</Link>
      </div>
    </footer>
  );
}
