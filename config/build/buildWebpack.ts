import webpack from "webpack";
import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { BuildOptions } from "./types/types";

export const buildWebpack = (options: BuildOptions): webpack.Configuration => {
  const { mode, paths } = options;
  const isDev = mode === "development";

  return {
    mode: mode === "development" ? "development" : "production",
    entry: paths.entry,
    output: {
      path: paths.output.path,
      filename: "[name].[contenthash].js",
      clean: true,
      publicPath: paths.output.publicPath,
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },

    resolve: buildResolvers(options),
    devtool: isDev ? "inline-source-map" : false,
    devServer: isDev ? buildDevServer(options) : undefined,
  };
};
