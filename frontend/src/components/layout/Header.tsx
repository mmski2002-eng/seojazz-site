"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { mainNav, uslugiMegaMenu } from "@/lib/nav";
import { contacts } from "@/lib/contacts";
import Logo from "./Logo";
import TelegramIcon from "./TelegramIcon";
import styles from "./Header.module.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [uslugiOpen, setUslugiOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openUslugi() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setUslugiOpen(true);
  }

  function closeUslugiDelayed() {
    closeTimer.current = setTimeout(() => setUslugiOpen(false), 150);
  }

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link href="/" className={styles.logo} aria-label="SEO Jazz — на главную">
          <Logo />
        </Link>

        <nav className={styles.nav} aria-label="Главное меню">
          {mainNav.map((item) =>
            item.label === "Услуги" ? (
              <div
                key={item.href}
                className={styles.navItemWithMenu}
                onMouseEnter={openUslugi}
                onMouseLeave={closeUslugiDelayed}
              >
                <Link href={item.href} className={styles.navLink}>
                  {item.label}
                </Link>
                {uslugiOpen && (
                  <div className={styles.megaMenu}>
                    {uslugiMegaMenu.map((cluster) => {
                      const builtLinks = cluster.links.filter((link) => link.built);
                      if (!builtLinks.length) return null;
                      return (
                        <div key={cluster.title} className={styles.megaCluster}>
                          <div className={styles.megaClusterTitle}>{cluster.title}</div>
                          <ul>
                            {builtLinks.map((link) => (
                              <li key={link.href}>
                                <Link href={link.href} className={styles.megaLink}>
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              <Link key={item.href} href={item.href} className={styles.navLink}>
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className={styles.contacts}>
          <a href={contacts.phoneHref} className={styles.phone}>
            {contacts.phoneDisplay}
          </a>
          <a href="#lead" className={styles.cta}>
            Получить рекомендации
          </a>
        </div>

        <button
          className={styles.burger}
          aria-label="Открыть меню"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
          <a href={contacts.phoneHref}>{contacts.phoneDisplay}</a>
          <a href={contacts.telegramHref}><TelegramIcon />{contacts.telegramHandle}</a>
        </div>
      )}
    </header>
  );
}
