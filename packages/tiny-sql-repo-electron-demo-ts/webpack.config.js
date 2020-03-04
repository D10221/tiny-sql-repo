
const path = require("path");
/** @type {import("webpack").Configuration} */
const srcDir = "./src";
module.exports = {
  entry: srcDir + "/window.tsx",
  devtool: "inline-source-map",
  target: "electron-renderer",
  output: {
    filename: "window.js",
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        /** @type {import("ts-loader").Options} */
        options: {
          configFile: path.resolve(__dirname, "tsconfig.window.json"),
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  }
};
