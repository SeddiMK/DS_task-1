import "@/null.css";
import "@public/assets/fonts/Archivo_Black/ArchivoBlack-Regular.ttf";
import "@public/assets/fonts/Nunito/Nunito-Regular.ttf";
import "@public/assets/fonts/Nunito/Nunito-Medium.ttf";
import "@public/assets/fonts/Nunito/Nunito-Bold.ttf";
import "@/index.css";
import { createRoot } from "react-dom/client";
import { App } from "@/components/app/App";
import { ThemeProvider } from "@/containers/utils/themeProvider";

const root = document.getElementById("root") as HTMLElement;

if (!root) {
  throw new Error("root not found");
}

const container = createRoot(root);

container.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
);
