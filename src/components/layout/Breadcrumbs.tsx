// Требование: dizajn-sistema.md §10 "Хлебные крошки (BreadcrumbList) на всех посадочных"
// JSON-LD для BreadcrumbList строится в SEO-слое; здесь — видимая текстовая навигация.

import Link from "next/link";
import styles from "./Breadcrumbs.module.css";

export type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className={styles.crumbs} aria-label="Хлебные крошки">
      <ol>
        <li>
          <Link href="/">Главная</Link>
        </li>
        {items.map((item, i) => (
          <li key={item.href ?? item.label}>
            <span className={styles.sep}>/</span>
            {item.href && i < items.length - 1 ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
