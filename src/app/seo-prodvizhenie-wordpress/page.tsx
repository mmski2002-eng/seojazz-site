import PageRenderer from "@/components/templates/PageRenderer";
import { getPageConfig } from "@/lib/pageConfigs";

const page = getPageConfig("wordpress");

export const metadata = {
  title: page.title,
  description: page.description,
};

export default function WordpressPage() {
  return <PageRenderer page={page} />;
}
