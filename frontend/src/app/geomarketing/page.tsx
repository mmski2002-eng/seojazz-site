import PageRenderer from "@/components/templates/PageRenderer";
import { getPageConfig } from "@/lib/pageConfigs";

const page = getPageConfig("geomarketing");

export const metadata = {
  title: page.title,
  description: page.description,
};

export default function GeomarketingPage() {
  return <PageRenderer page={page} />;
}
