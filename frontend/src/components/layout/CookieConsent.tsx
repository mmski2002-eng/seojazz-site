"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./CookieConsent.module.css";

const STORAGE_KEY = "cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  // SSR всегда рендерит баннер скрытым (localStorage недоступен на сервере) —
  // показываем после монтирования на клиенте, чтобы не ловить hydration mismatch.
  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // localStorage недоступен — баннер просто закроется до перезагрузки страницы
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className={styles.banner} role="dialog" aria-label="Согласие на использование cookies">
      <p>
        Используем cookies для аналитики и работы сайта. Продолжая пользоваться сайтом, вы соглашаетесь с{" "}
        <Link href="/privacy-policy/">политикой конфиденциальности</Link>.
      </p>
      <button type="button" className={styles.accept} onClick={accept}>
        Хорошо
      </button>
    </div>
  );
}
