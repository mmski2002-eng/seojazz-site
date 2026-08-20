import PageRenderer from "@/components/templates/PageRenderer";
import { getPageConfig } from "@/lib/pageConfigs";

const page = getPageConfig("seoPodKljuch");

export const metadata = {
  title: page.title,
  description: page.description,
};

export default function SeoPodKljuchPage() {
  return <PageRenderer page={page} />;
}
