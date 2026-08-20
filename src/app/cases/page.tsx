import PageRenderer from "@/components/templates/PageRenderer";
import { getPageConfig } from "@/lib/pageConfigs";

const page = getPageConfig("cases");

export const metadata = {
  title: page.title,
  description: page.description,
};

export default function CasesPage() {
  return <PageRenderer page={page} />;
}
