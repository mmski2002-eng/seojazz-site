import PageRenderer from "@/components/templates/PageRenderer";
import { getPageConfig } from "@/lib/pageConfigs";

const page = getPageConfig("avito");

export const metadata = {
  title: page.title,
  description: page.description,
};

export default function AvitoPage() {
  return <PageRenderer page={page} />;
}
