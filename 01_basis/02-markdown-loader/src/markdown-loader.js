const marked = require("marked");

module.exports = (source) => {
  console.log("markdown-loader: ", source);
  /**
   * 方式一：返回一段 JavaScript 代码
   */
  //   const html = marked.parse(source);
  //   return `export default ${JSON.stringify(html)}`;

  /**
   * 方式二：生成一段字符串，转给下一个 loader 进行处理
   */
  const html = marked.parse(source);
  return html;
};
