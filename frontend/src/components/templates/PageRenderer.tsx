import {
  Awards,
  AIRatingWidget,
  Calculator,
  CaseCardsAB,
  ComparisonTable,
  Counters,
  FAQAccordion,
  FitDisqualify,
  GeoAIBlock,
  Guarantees,
  Hero,
  ArticleContent,
  LeadForm,
  LeadMagnet,
  LinkMatrix,
  MapsWidgets,
  PricingTiers,
  ProblemsGrid,
  ProvenByData,
  Quiz,
  Reviews,
  StepsTimeline,
  Team,
  TrustBar,
  UTPTriplet,
  WhatIncluded,
} from "@/components/blocks";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { BlockConfig, PageConfig } from "@/lib/pageConfig";
import { buildPageJsonLd, stringifyJsonLd } from "@/lib/seo";

export default function PageRenderer({ page }: { page: PageConfig }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: stringifyJsonLd(buildPageJsonLd(page)) }}
      />
      <Breadcrumbs items={page.crumbs} />
      {page.blocks.map((block, index) => (
        <BlockRenderer block={block} key={`${page.slug}-${block.type}-${index}`} />
      ))}
    </>
  );
}

function BlockRenderer({ block }: { block: BlockConfig }) {
  switch (block.type) {
    case "hero":
      return <Hero {...block} />;
    case "article":
      return <ArticleContent title={block.title} sections={block.sections} />;
    case "utp":
      return <UTPTriplet items={block.items} />;
    case "trust":
      return <TrustBar metrics={block.metrics} />;
    case "problems":
      return <ProblemsGrid title={block.title} intro={block.intro} items={block.items} />;
    case "fit":
      return <FitDisqualify fit={block.fit} notFit={block.notFit} />;
    case "included":
      return <WhatIncluded title={block.title} intro={block.intro} items={block.items} />;
    case "steps":
      return <StepsTimeline steps={block.steps} />;
    case "pricing":
      return <PricingTiers tiers={block.tiers} />;
    case "calculator":
      return <Calculator steps={block.steps} resultLabel={block.resultLabel} />;
    case "quiz":
      return <Quiz steps={block.steps} finalText={block.finalText} />;
    case "aiRating":
      return <AIRatingWidget title={block.title} items={block.items} />;
    case "cases":
      return <CaseCardsAB cases={block.cases} action={block.action} />;
    case "team":
      return <Team people={block.people} />;
    case "counters":
      return <Counters metrics={block.metrics} />;
    case "awards":
      return <Awards items={block.items} />;
    case "reviews":
      return <Reviews items={block.items} />;
    case "guarantees":
      return <Guarantees items={block.items} />;
    case "proven":
      return <ProvenByData items={block.items} />;
    case "comparison":
      return <ComparisonTable columns={block.columns} rows={block.rows} />;
    case "faq":
      return <FAQAccordion items={block.items} action={block.action} />;
    case "geo":
      return <GeoAIBlock title={block.title} text={block.text} links={block.links} />;
    case "links":
      return <LinkMatrix title={block.title} links={block.links} />;
    case "maps":
      return <MapsWidgets title={block.title} intro={block.intro} />;
    case "leadForm":
      return <LeadForm title={block.title} variant={block.variant} />;
    case "leadMagnet":
      return <LeadMagnet title={block.title} text={block.text} action={block.action} />;
  }
}
