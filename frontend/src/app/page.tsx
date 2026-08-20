import PageRenderer from "@/components/templates/PageRenderer";
import { getPageConfig } from "@/lib/pageConfigs";

const page = getPageConfig("home");

export const metadata = {
  title: page.title,
  description: page.description,
};

export default function Home() {
  return <PageRenderer page={page} />;
}
