"use client";

import { useEffect } from "react";

/**
 * ScrollReveal — глобальный IntersectionObserver, который снимает [data-reveal],
 * когда элемент попадает во viewport. Один инстанс на страницу, работает
 * для всех блоков без пропсов.
 */
export default function ScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Автоматически помечаем секции и карточки для reveal
    const targets = document.querySelectorAll<HTMLElement>(
      "section, [data-reveal]"
    );
    targets.forEach((el) => {
      if (!el.hasAttribute("data-reveal")) {
        el.setAttribute("data-reveal", "");
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
