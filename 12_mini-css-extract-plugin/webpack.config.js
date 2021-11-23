const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "none",
  //   entry: "./src/index.js",
  entry: {
    index: "./src/index.js",
    album: "./src/album/album.js",
  },
  output: {
    // filename: "[name]-[hash].bundle.js",
    // filename: "[name]-[chunkhash].bundle.js",
    filename: "[name]-[contenthash:8].bundle.js",
  },
  // 所有的公共模块都提取到 bundle 中
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimizer: [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin(),
    ],
  },
  module: {
    rules: [
      {
        test: /.css$/,
        use: [
          // "style-loader",   // 将样式通过 style 标签注入到代码中
          MiniCssExtractPlugin.loader,
          "css-loader",
        ],
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
      template: "./src/album/album.html",
      filename: "album.html",
      chunks: ["album"],
    }),
    new MiniCssExtractPlugin({
      // filename: "[name]-[hash].bundle.css",
      // filename: "[name]-[chunkhash].bundle.css",
      // filename: "[name]-[contenthash].bundle.css",
      filename: "[name]-[contenthash:8].bundle.css",
    }),
    // new OptimizeCssAssetsWebpackPlugin(),
  ],
};
