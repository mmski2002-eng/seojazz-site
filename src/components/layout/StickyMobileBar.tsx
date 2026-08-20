// Компонент из библиотеки блоков: vibecode-seojazz/02-bloki-analiz/00-svodka-master-shablon.md §7 (StickyMobileBar)
// "Позвонить · TG · Заявка" — только мобильный, фиксирован снизу (dizajn-sistema.md §9)

import { contacts } from "@/lib/contacts";
import Link from "next/link";
import styles from "./StickyMobileBar.module.css";

export default function StickyMobileBar() {
  return (
    <div className={styles.bar}>
      <a href={contacts.phoneHref} className={styles.item}>
        Позвонить
      </a>
      <a href={contacts.telegramHref} className={styles.item}>
        Telegram
      </a>
      <Link href="/uslugi/" className={`${styles.item} ${styles.cta}`}>
        Заявка
      </Link>
    </div>
  );
}
