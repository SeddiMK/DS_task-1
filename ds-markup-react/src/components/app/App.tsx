import "./App.css";
import { Header } from "@/containers/header";
import { Footer } from "@/containers/footer";
import { Gaming } from "@/containers/gaming";
import { Articles } from "@/containers/articlesItems/articles";
import { Webinars } from "@/containers/webinarsItems/webinars";

export const App = () => {
  return (
    <div className="wrapper">
      {/* <Header /> */}
      {/* <Gaming /> */}
      {/* <Articles /> */}
      <Webinars />
      {/* <Footer /> */}
    </div>
  );
};
