/** @type {import("webpack").Configuration} */
module.exports = {
  entry: "./window.js",
  devtool: "inline-source-map",
  target: "electron-renderer",
  output: {
    filename: "window.bundle.js",
    path: __dirname,
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.tsx?$/,
  //       loader: "ts-loader",
  //       /** @type {import("ts-loader").Options} */
  //       options: {
  //         configFile: path.resolve(__dirname, "tsconfig.window.json"),
  //       },
  //       exclude: /node_modules/,
  //     },
  //   ],
  // },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
};
