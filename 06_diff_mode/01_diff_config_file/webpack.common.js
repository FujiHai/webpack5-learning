const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "none",
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: path.join(__dirname, "node_modules"),
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /.jpg$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10 * 1024, //10 KB，小于 10 KB 的图片会转换成 Data URLs 内容
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    // 默认实例为 index.html
    new HtmlWebpackPlugin({
      title: "Webpack Plugin Sample",
      meta: {
        viewport: "width=device-width",
      },
      template: "./src/index.html",
    }),
    // 生成一个 about.html
    new HtmlWebpackPlugin({
      title: "About Page",
      filename: path.join(__dirname, "./dist/about.html"),
      meta: {
        viewport: "width=device-width",
      },
    }),
    // 将 public 目录文件复制到 dist 文件夹下
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, "/public"),
          to: path.join(__dirname, "/dist"),
        },
      ],
    }),
  ],
};
