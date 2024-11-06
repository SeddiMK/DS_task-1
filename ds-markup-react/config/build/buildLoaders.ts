import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";

export const buildLoaders = ({
  mode,
}: BuildOptions): ModuleOptions["rules"] => {
  const isDev = mode === "development";

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings

      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      "css-loader",
      // Compiles Sass to CSS
      "sass-loader",
    ],
  };

  const cssLoader = {
    test: /\.css$/,
    use: [
      // Creates `style` nodes from JS strings
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      "css-loader",
    ],
  };

  // png|svg|jpg|jpeg|gif
  const assetLoader = {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: "asset/resource",
    loader: "file-loader",
    include: "/*/**",
  };

  const fontsLoader = {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: "asset/resource",
  };

  const svgrLoader = {
    // test: /\.svg$/i,
    // issuer: /\.[jt]sx?$/,
    // use: [{ loader: "@svgr/webpack", options: { icon: true } }],
  };

  const tsLoader = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  };

  return [fontsLoader, cssLoader, assetLoader, svgrLoader, tsLoader];
};
