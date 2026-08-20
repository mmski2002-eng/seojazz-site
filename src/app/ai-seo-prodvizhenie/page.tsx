import PageRenderer from "@/components/templates/PageRenderer";
import { getPageConfig } from "@/lib/pageConfigs";

const page = getPageConfig("aiSeo");

export const metadata = {
  title: page.title,
  description: page.description,
};

export default function AiSeoPage() {
  return <PageRenderer page={page} />;
}
