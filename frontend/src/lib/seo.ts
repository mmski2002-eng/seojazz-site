import type { MetadataRoute } from "next";
import { PageConfig } from "./pageConfig";
import { getAllContentPackages } from "./contentLayer";
import { sitemapChangeFrequency, sitemapPriority } from "./contentPriority";

export const siteUrl = "https://seojazz.ru";

const organization = {
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "SEO Jazz",
  url: siteUrl,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+7-499-990-55-46",
    contactType: "customer service",
    areaServed: "RU",
    availableLanguage: "ru",
  },
  sameAs: ["https://t.me/IldarNev"],
};

function absoluteUrl(pathname: string) {
  if (pathname === "/") {
    return siteUrl;
  }

  return `${siteUrl}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

function pagePath(page: PageConfig) {
  if (page.content?.url) {
    return page.content.url;
  }

  return page.slug === "home" ? "/" : `/${page.slug}/`;
}

function faqItems(page: PageConfig) {
  return page.blocks.find((block) => block.type === "faq")?.items ?? [];
}

function breadcrumbItems(page: PageConfig) {
  return [
    { name: "Главная", item: siteUrl },
    ...page.crumbs.map((crumb) => ({
      name: crumb.label,
      item: crumb.href ? absoluteUrl(crumb.href) : absoluteUrl(pagePath(page)),
    })),
  ];
}

function serviceSchema(page: PageConfig) {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(pagePath(page))}#service`,
    name: page.blocks.find((block) => block.type === "hero")?.title ?? page.title,
    description: page.description,
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: {
      "@type": "Country",
      name: "Россия",
    },
    url: absoluteUrl(pagePath(page)),
  };
}

function breadcrumbSchema(page: PageConfig) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(pagePath(page))}#breadcrumb`,
    itemListElement: breadcrumbItems(page).map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

function faqSchema(page: PageConfig) {
  const items = faqItems(page);

  if (!items.length) {
    return null;
  }

  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(pagePath(page))}#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function localBusinessSchema(page: PageConfig) {
  return {
    "@type": "LocalBusiness",
    "@id": `${absoluteUrl(pagePath(page))}#local-business`,
    name: "SEO Jazz",
    url: absoluteUrl(pagePath(page)),
    telephone: "+7-499-990-55-46",
    areaServed: ["Москва", "Россия"],
    parentOrganization: { "@id": `${siteUrl}/#organization` },
  };
}

function aggregateRatingSchema(page: PageConfig) {
  return {
    "@type": "AggregateRating",
    "@id": `${absoluteUrl(pagePath(page))}#aggregate-rating`,
    itemReviewed: { "@id": `${absoluteUrl(pagePath(page))}#service` },
    ratingValue: "5",
    bestRating: "5",
    ratingCount: "1",
  };
}

function articleSchema(page: PageConfig) {
  return {
    "@type": "Article",
    "@id": `${absoluteUrl(pagePath(page))}#article`,
    headline: page.blocks.find((block) => block.type === "hero")?.title ?? page.title,
    description: page.description,
    inLanguage: "ru-RU",
    author: { "@id": `${siteUrl}/#organization` },
    publisher: { "@id": `${siteUrl}/#organization` },
    mainEntityOfPage: absoluteUrl(pagePath(page)),
  };
}

function howToSchema(page: PageConfig) {
  const steps = page.blocks.find((block) => block.type === "steps")?.steps ?? [];

  if (!steps.length) {
    return null;
  }

  return {
    "@type": "HowTo",
    "@id": `${absoluteUrl(pagePath(page))}#howto`,
    name: page.title,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.text ?? step.title,
    })),
  };
}

export function buildPageJsonLd(page: PageConfig) {
  const schemaTypes = new Set(page.content?.schemaTypes ?? []);
  const graph: Array<Record<string, unknown>> = [organization, breadcrumbSchema(page)];

  if (schemaTypes.has("Service") || page.template !== "Кейсы (агрегатор)") {
    graph.push(serviceSchema(page));
  }

  const faq = faqSchema(page);

  if (faq && schemaTypes.has("FAQPage")) {
    graph.push(faq);
  }

  if (schemaTypes.has("LocalBusiness")) {
    graph.push(localBusinessSchema(page));
  }

  if (schemaTypes.has("AggregateRating")) {
    graph.push(aggregateRatingSchema(page));
  }

  if (schemaTypes.has("Article")) {
    graph.push(articleSchema(page));
  }

  const howTo = howToSchema(page);

  if (howTo && schemaTypes.has("HowTo")) {
    graph.push(howTo);
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function stringifyJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function getSitemapEntries(): MetadataRoute.Sitemap {
  const urls = new Set<string>(["/"]);

  for (const content of getAllContentPackages()) {
    urls.add(content.url);
  }

  urls.add("/cases/");
  urls.add("/tariffs/");

  return [...urls].sort().map((url) => ({
    url: absoluteUrl(url),
    lastModified: new Date("2026-08-20"),
    changeFrequency: sitemapChangeFrequency(url),
    priority: sitemapPriority(url),
  }));
}
