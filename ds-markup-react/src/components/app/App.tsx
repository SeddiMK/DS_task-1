import { SmartHeader } from "@/containers/smartHeader";
import { Footer } from "@/containers/footerBlock/footer";
import { Gaming } from "@/containers/gaming";
import { Articles } from "@/containers/articlesBlock/articles";
import { Webinars } from "@/containers/webinarsBlock/webinars";
import { SubscribeBlock } from "@/containers/subscribe";

export const App = () => {
  return (
    <div className="wrapper">
      {/* <SmartHeader /> */}
      <Gaming />
      <Articles />
      {/* <Webinars /> */}
      {/* <SubscribeBlock /> */}
      {/* <Footer /> */}
    </div>
  );
};
