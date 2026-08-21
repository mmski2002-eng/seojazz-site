import { Crumb } from "@/components/layout/Breadcrumbs";

export type ActionConfig = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

export type MetricConfig = {
  label: string;
  value: string;
  note?: string;
};

export type TextItemConfig = {
  title: string;
  text?: string;
};

export type LinkItemConfig = {
  label: string;
  href: string;
  note?: string;
  price?: string;
};

export type BlockConfig =
  | {
      type: "hero";
      eyebrow?: string;
      title: string;
      text?: string;
      metrics?: MetricConfig[];
      actions?: ActionConfig[];
    }
  | {
      type: "article";
      title?: string;
      sections: Array<{
        heading?: string;
        items: string[];
      }>;
    }
  | { type: "utp"; items: TextItemConfig[] }
  | { type: "trust"; metrics: MetricConfig[] }
  | { type: "problems"; title?: string; intro?: string; items: TextItemConfig[] }
  | { type: "fit"; fit: TextItemConfig[]; notFit: TextItemConfig[] }
  | { type: "included"; title?: string; intro?: string; items: TextItemConfig[] }
  | { type: "steps"; steps: TextItemConfig[] }
  | {
      type: "pricing";
      tiers: Array<{
        name: string;
        price: string;
        period?: string;
        description?: string;
        features: string[];
        action?: ActionConfig;
        featured?: boolean;
      }>;
    }
  | {
      type: "calculator";
      resultLabel?: string;
      steps: Array<{ label: string; options: Array<{ label: string; value: number }> }>;
    }
  | { type: "quiz"; steps: Array<{ question: string; options: string[] }>; finalText: string }
  | {
      type: "aiRating";
      title?: string;
      items: Array<{ brand: string; score: string; source: string; note?: string }>;
    }
  | {
      type: "cases";
      cases: Array<{ title: string; before: string; after: string; metric: string; href?: string }>;
      action?: ActionConfig;
    }
  | { type: "team"; people: Array<{ name: string; role: string; text?: string }> }
  | { type: "counters"; metrics: MetricConfig[] }
  | { type: "awards"; items: TextItemConfig[] }
  | { type: "reviews"; items: TextItemConfig[] }
  | { type: "guarantees"; items: TextItemConfig[] }
  | { type: "proven"; items: TextItemConfig[] }
  | { type: "comparison"; columns: string[]; rows: Array<{ label: string; values: string[] }> }
  | { type: "faq"; items: Array<{ question: string; answer: string }>; action?: ActionConfig }
  | { type: "geo"; title: string; text: string; links?: LinkItemConfig[] }
  | { type: "links"; title?: string; links: LinkItemConfig[] }
  | { type: "maps"; title?: string; intro?: string }
  | { type: "leadForm"; title?: string; variant?: "default" | "geo-audit" | "seo-audit" | "platform-audit" }
  | { type: "leadMagnet"; title: string; text: string; action: ActionConfig };

export type PageConfig = {
  slug: string;
  title: string;
  description: string;
  template: string;
  source: string;
  content?: {
    url: string;
    type?: string;
    intent?: string;
    status?: string;
    sourceFile: string;
    schemaTypes: string[];
    needsReview: string[];
    launchPriority?: "P1" | "P2" | "P3";
    launchReason?: string;
  };
  crumbs: Crumb[];
  blocks: BlockConfig[];
};
