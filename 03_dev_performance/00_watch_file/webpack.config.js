const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "none",
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 9000,
    proxy: {
      "/api/": {
        // https://localhost:8088/api/users -> https://api.github.com/api/users
        target: "https://api.github.com",
        // https://localhost:8088/api/users -> https://api.github.com/users
        pathRewrite: {
          "^/api": "",
        },
        /**
         * 不能使用 localhost:8080 作为请求的 Github 的主机名，
         * github 服务器不会响应主机名字段(host)为 localhost 的请求
         */
        changeOrigin: true,
      },
    },
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
  ],
};
