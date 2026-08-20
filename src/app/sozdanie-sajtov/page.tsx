import PageRenderer from "@/components/templates/PageRenderer";
import { getPageConfig } from "@/lib/pageConfigs";

const page = getPageConfig("sozdanieSajtov");

export const metadata = {
  title: page.title,
  description: page.description,
};

export default function SozdanieSajtovPage() {
  return <PageRenderer page={page} />;
}
