import Footer from "./Footer";
import { Navigation } from "@/types";
import { useSiteContext } from "@/contexts/SiteContextProvider";
const defaultNavigation: Navigation = {
  data: { level1: [] },
  ownerId: "",
  lastUpdateBy: null,
  createdDate: 0,
  id: "default",
  "@version": 1,
  name: "Default Navigation",
  modelId: "navigation",
  published: "published",
  priority: 0,
  query: [],
  lastUpdated: 0,
  firstPublished: 0,
  testRatio: 0,
  createdBy: "",
  lastUpdatedBy: "",
};

export default function DefaultFooter() {
  const { siteContext } = useSiteContext();

  const footerNav =
    (siteContext?.data?.footerNavigation1?.value as Navigation) ||
    defaultNavigation;

  return <Footer navigation={footerNav} />;
}
