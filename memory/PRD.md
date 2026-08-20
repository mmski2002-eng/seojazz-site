# SEO Jazz — Modernization PRD

## Original Problem
"Изучи мой сайт https://github.com/mmski2002-eng/seojazz-site. Нужно его сделать более привлекательным и красивым, современным. Не меняя цветовую гамму."

## User Choices
- Стиль: Минималистичный с крупной типографикой и микроанимациями
- Интерактив: Плавные анимации при скролле, hover-эффекты, микроинтеракции
- Модернизация: Все разделы равномерно
- Цветовая гамма: сохранена (navy #1b2a4a, cyan #00a6f6, amber #f6e120, green #70df54)

## Architecture
- Next.js 16 (App Router, RSC), React 19
- FastAPI backend (`/app/backend`) — mock lead endpoint `/api/leads`
- No DB; leads logged to stdout

## Implemented (Jan 2026)
- New typography stack: Bricolage Grotesque (display) + Manrope (body) + Fraunces italic (accent)
- Automatic serif italic accent word in H1
- Frosted-glass sticky header with animated pill nav and mega-menu
- Hero: floating gradient orbs, subtle grid mask, refined KPI dashboard with staggered bar animation
- Cards: gradient border on hover, rotating icon badges, translate-lift, scroll-reveal fade-in
- Pricing: pill segmented tabs, elevated featured card with amber ring
- FAQ: rounded plus/minus toggles, animated open state
- GEO orbit block: rotating conic gradient
- Timeline: gradient rail behind step numbers
- Footer: dark with radial glow, animated bullet dots, bottom bar
- Global scroll-reveal (IntersectionObserver) on every section
- Micro-animations respect prefers-reduced-motion
- Sticky mobile bar preserved
- Working `/api/leads` FastAPI endpoint

## Backlog
- Real CRM/email integration for leads
- Individual case-study pages
- Blog/insights section
- Multi-language (EN)
- Load real client logos strip
