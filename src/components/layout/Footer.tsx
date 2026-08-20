import Link from "next/link";
import { mainNav } from "@/lib/nav";
import { contacts } from "@/lib/contacts";
import Logo from "./Logo";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <div className={styles.logo}>
            <Logo />
          </div>
          <p className={styles.tagline}>Платите за заявки и выручку, а не за позиции</p>
        </div>

        <nav className={styles.links} aria-label="Футер — навигация">
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.contacts}>
          <a href={contacts.phoneHref}>{contacts.phoneDisplay}</a>
          <a href={contacts.telegramHref}>{contacts.telegramHandle}</a>
        </div>
      </div>
    </footer>
  );
}
