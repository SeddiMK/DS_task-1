import "./null.css";
import "./assets/fonts/Archivo_Black/ArchivoBlack-Regular.ttf";
import "./assets/fonts/Nunito/Nunito-Regular.ttf";
import "./assets/fonts/Nunito/Nunito-Medium.ttf";
import "./assets/fonts/Nunito/Nunito-Bold.ttf";
import "./index.css";
import { createRoot } from "react-dom/client";
import { App } from "@/components/App";

const root = document.getElementById("root") as HTMLElement;

if (!root) {
  throw new Error("root not found");
}

const container = createRoot(root);

container.render(<App />);
