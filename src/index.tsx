import ReactDOM from "react-dom/client";
import { App } from "@/components/App";
import "@/null.css";
import "@/index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

if (!root) {
  throw new Error("root not found");
}

root.render(<App />);
