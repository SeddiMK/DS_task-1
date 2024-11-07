import "./App.css";
import { Footer } from "@/containers/footer";
import { Gaming } from "@/containers/gaming";
import { Header } from "@/containers/header";

export const App = () => {
  return (
    <div className="wrapper">
      {/* <Header /> */}
      <Gaming />
      {/* <Footer /> */}
    </div>
  );
};
