import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/types";

export const buildDevServer = (
  options: BuildOptions,
): DevServerConfiguration => {
  return {
    historyApiFallback: true, // перенаправление всех маршрутов на index.html для роутинга
    port: options.port ?? 5000,
    open: true,
  };
};
