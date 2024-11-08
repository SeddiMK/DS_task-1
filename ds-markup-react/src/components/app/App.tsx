import { Header } from "@/containers/header";
import { Footer } from "@/containers/footer";
import { Gaming } from "@/containers/gaming";
import { Articles } from "@/containers/articlesBlock/articles";
import { Webinars } from "@/containers/webinarsBlock/webinars";
import { SubscribeBlock } from "@/containers/subscribe";

export const App = () => {
  return (
    <div className="wrapper">
      {/* <Header /> */}
      {/* <Gaming /> */}
      {/* <Articles /> */}
      {/* <Webinars /> */}
      <SubscribeBlock />
      {/* <Footer /> */}
    </div>
  );
};
