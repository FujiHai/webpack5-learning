const common = require("./webpack.common");
const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = merge(common, {
  mode: "development    ",
  plugins: [new CleanWebpackPlugin(), new CopyWebpackPlugin(["public"])],
});
