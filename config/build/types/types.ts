export interface BuildPaths {
  entry: string;
  output: { path: string; publicPath: string };

  html: string;
  src: string;
  public: string;
}

export type BuildMode = "development" | "production";

export interface BuildOptions {
  port: number;
  paths: BuildPaths;
  mode: BuildMode;
}
