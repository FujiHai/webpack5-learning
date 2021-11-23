const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
  },
  devtool: "eval",
  module: {
    rules: [
      {
        test: /.js$/,
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
  plugins: [new CleanWebpackPlugin()],
};
