import Link from "next/link";
import { mainNav } from "@/lib/nav";
import { contacts } from "@/lib/contacts";
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
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <span>© {currentYear} SEO Jazz. Все права защищены.</span>
        <span>KPI-driven SEO&nbsp;+&nbsp;GEO/AI</span>
      </div>
    </footer>
  );
}
