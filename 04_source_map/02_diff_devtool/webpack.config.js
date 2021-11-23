const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const allModes = [
  "eval",
  "eval-cheap-source-map",
  "eval-cheap-module-source-map",
  "eval-source-map",
  "cheap-source-map",
  "cheap-module-source-map",
  "source-map",
  "inline-cheap-source-map",
  "inline-cheap-module-source-map",
  "inline-source-map",
  "eval-nosources-cheap-source-map",
  "eval-nosources-cheap-module-source-map",
  "eval-nosources-source-map",
  "inline-nosources-cheap-source-map",
  "inline-nosources-cheap-source-map",
  "inline-nosources-source-map",
  "nosources-cheap-source-map",
  "nosources-cheap-module-source-map",
  "nosources-source-map",
  "hidden-nosources-cheap-source-map",
  "hidden-nosources-cheap-module-source-map",
  "hidden-nosources-source-map",
  "hidden-cheap-source-map",
  "hidden-cheap-module-source-map",
  "hidden-source-map",
];

module.exports = allModes.map((mode) => {
  return {
    mode: "none",
    devtool: mode,
    entry: "./src/main.js",
    output: {
      filename: `js/${mode}.js`,
    },
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
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: path.join(__dirname, `./dist/html/${mode}.html`),
      }),
    ],
  };
});
