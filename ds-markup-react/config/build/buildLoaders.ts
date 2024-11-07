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
    test: /\.((c|sa|sc)ss)$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          // Run `postcss-loader` on each CSS `@import` and CSS modules/ICSS imports, do not forget that `sass-loader` compile non CSS `@import`'s into a single file
          // If you need run `sass-loader` and `postcss-loader` on each CSS `@import` please set it to `2`
          importLoaders: 1,
          url: true,
        },
      },
      // {
      //   loader: "postcss-loader",
      //   options: { plugins: () => [postcssPresetEnv({ stage: 0 })] },
      // },
      "sass-loader",
    ],
  };

  // png|svg|jpg|jpeg|gif
  //  use: [
  //     {
  //       loader: "url-loader",
  //       options: {
  //         limit: 8192,
  //       },
  //     },
  //   ],
  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  };

  const fontsLoader = {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: "asset/resource",
  };

  const svgrLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [{ loader: "@svgr/webpack", options: { icon: true } }],
  };

  const tsLoader = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  };

  return [fontsLoader, cssLoader, assetLoader, svgrLoader, tsLoader];
};
