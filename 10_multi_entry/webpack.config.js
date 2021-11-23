const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "none",
  //   entry: "./src/index.js",
  entry: {
    index: "./src/index.js",
    album: "./src/album.js",
  },
  output: {
    filename: "[name].bundle.js",
  },
  // 所有的公共模块都提取到 bundle 中
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Multi Entry",
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      title: "Multi Entry",
      template: "./src/album.html",
      filename: "album.html",
      chunks: ["album"],
    }),
  ],
};
