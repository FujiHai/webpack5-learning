module.exports = {
  mode: "none",
  output: {
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: {
          loader: "babel-loader",
          options: {
            // presets: [["@babel/preset-env", { modules: "commonjs" }]],
            presets: [["@babel/preset-env", { modules: false }]],
          },
        },
      },
    ],
  },
  optimization: {
    sideEffects: true,
    //   只导出被引用过的模块代码，标记[枯树叶]
    usedExports: true,
    concatenateModules: true,
    //  未引用的代码会被移除掉，摇树叶
    // minimize: true,
  },
};
