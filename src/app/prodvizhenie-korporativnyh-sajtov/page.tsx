import PageRenderer from "@/components/templates/PageRenderer";
import { getPageConfig } from "@/lib/pageConfigs";

const page = getPageConfig("corporate");

export const metadata = {
  title: page.title,
  description: page.description,
};

export default function KorporativnyeSajtyPage() {
  return <PageRenderer page={page} />;
}
