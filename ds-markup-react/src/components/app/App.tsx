import { SmartHeader } from "@/containers/smartHeader";
import { Gaming } from "@/containers/blocks/gamingBlock";
import { Articles } from "@/containers/blocks/articlesBlock/articles";
import { Webinars } from "@/containers/blocks/webinarsBlock/webinars";
import { SubscribeBlock } from "@/containers/blocks/subscribeBlock";
import { Footer } from "@/containers/blocks/footerBlock/footer";

export const App = () => {
  return (
    <div className="wrapper">
      <SmartHeader />
      <Gaming />
      <Articles />
      <Webinars />
      <SubscribeBlock />
      <Footer />
    </div>
  );
};
