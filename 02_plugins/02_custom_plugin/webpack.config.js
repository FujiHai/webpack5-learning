const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

class MyPlugin {
  apply(compiler) {
    console.log("My Plugin 启动");

    compiler.hooks.emit.tap("MyPlugin", (compilation) => {
      // compilation => 可以理解为此次打包的上下文，存储打包结果
      for (const name in compilation.assets) {
        // console.log("[asset-name]", name);

        // 获取文件内容
        console.log(compilation.assets[name].source());

        if (name.endsWith(".js")) {
          const contents = compilation.assets[name].source();
          const withoutComments = contents.replace(/\/\*\*+\*\//g, "");

          compilation.assets[name] = {
            source: () => withoutComments,
            size: () => withoutComments.length,
          };
        }
      }
    });
  }
}

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
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, "/public"),
          to: path.join(__dirname, "/dist"),
        },
      ],
    }),
    new MyPlugin(),
  ],
};
