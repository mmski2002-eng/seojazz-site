import PageRenderer from "@/components/templates/PageRenderer";
import { getPageConfig } from "@/lib/pageConfigs";

const page = getPageConfig("uslugi");

export const metadata = {
  title: page.title,
  description: page.description,
};

export default function UslugiPage() {
  return <PageRenderer page={page} />;
}
