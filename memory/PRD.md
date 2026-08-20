# SEO Jazz — PRD

## Original Problem
Modernize seojazz-site (Next.js 16) without changing color palette.

## Architecture
- Next.js 16 (App Router, RSC) в PROD mode (yarn start = next start)
- FastAPI backend `/api/leads` mock endpoint
- Real logo /public/seojazz-logo.svg via CSS mask

## Session Log
### 2026-01 — MVP модернизация
- Bricolage Grotesque + Fraunces italic + Manrope типографика
- Hero glass card, floating gradient orbs, KPI dashboard
- Cards с gradient border на hover, scroll-reveal
- Frosted-glass header, radar orbit block

### 2026-01 — Итерация 2 (7 фиксов)
1. Оригинальный логотип с seojazz.ru через CSS mask
2. Nav underline на всю ширину слова (scaleX(1) на hover)
3. Радар GEO/AI: круглый contour + не обрезанный conic-gradient beam
4. Кейсы: 5 разных типов графиков (bars/thin/line/steps/gauge) через CaseChart
5. Телефон в LeadForm: auto +7 при focus, formatPhone с маской, isPhoneValid валидация с error-текстом (native listeners on ref для React 19 + Turbopack)
6. Пустые места заполнены: TeamAvatar SVG-силуэты, LeadMagnet SVG-иллюстрация
7. FitDisqualify — зелёная/приглушённая панели с Check/X иконками

### Инфра
- Пришлось переключиться с `next dev` на PROD build (`next build && next start`), потому что Cloudflare WAF в preview окружении блокировал Turbopack dev chunks с pattern `_<hash>._.js` (403), из-за чего client hydration не запускался и `useEffect` не работал.

## Backlog
- Real CRM integration for leads (сейчас mock)
- Individual case-study pages
- Multi-language (EN)
- Blog/insights section
