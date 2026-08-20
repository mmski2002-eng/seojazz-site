import PageRenderer from "@/components/templates/PageRenderer";
import { getPageConfig } from "@/lib/pageConfigs";

const page = getPageConfig("stomatologia");

export const metadata = {
  title: page.title,
  description: page.description,
};

export default function StomatologiaPage() {
  return <PageRenderer page={page} />;
}
