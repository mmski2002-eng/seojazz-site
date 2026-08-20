import PageRenderer from "@/components/templates/PageRenderer";
import { getAllContentPackages, getContentPageConfigBySlug } from "@/lib/contentLayer";
import { notFound } from "next/navigation";

const explicitSlugs = new Set([
  "ai-seo-prodvizhenie",
  "cases",
  "geomarketing",
  "prodvizhenie-korporativnyh-sajtov",
  "prodvizhenie-na-avito-pod-kljuch",
  "prodvizhenie-stomatologii",
  "seo-pod-kljuch",
  "seo-prodvizhenie-wordpress",
  "sozdanie-sajtov",
  "uslugi",
]);

export function generateStaticParams() {
  return getAllContentPackages()
    .map((item) => item.url.replace(/^\/|\/$/g, ""))
    .filter((slug) => slug && !explicitSlugs.has(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const page = getContentPageConfigBySlug(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
  };
}

export default async function ContentPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const page = getContentPageConfigBySlug(slug);

  if (!page) {
    notFound();
  }

  return <PageRenderer page={page} />;
}
