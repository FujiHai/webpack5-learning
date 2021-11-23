const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    filename: "js/bundle.js",
  },
  devtool: "source-map",
  devServer: {
    // hot: true,
    hot: "only",
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
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: "url-loader",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack HMR module",
      template: path.join(__dirname, "/src/index.html"),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
