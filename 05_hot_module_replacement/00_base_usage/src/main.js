import createEditor from "./editor.js";
import "./global.css";
import editorWrapperBg from "./editor-wrapper-bg.jpg";

// 引入图片
const img = new Image();
img.src = editorWrapperBg;
document.body.append(img);

// 引入编辑器
const editor = createEditor();
document.body.append(editor);

// 手动处理 JS 模块的 HMR
/**
 * accept 参数说明如下：
 *  1. 模块路径
 *  2. 对于模块更新后的处理函数
 * 对于 editor 模块，我们需要记录运行状态，处理状态的变化
 */

console.logrewr("editor module updated...", lastEditorText);

let lastEditor = editor;
module.hot.accept("./editor", () => {
  console.log("editor module updated...", lastEditorText);

  const lastEditorText = editor.innerHTML;
  document.body.removeChild(lastEditor);
  const newEditor = createEditor();
  newEditor.innerHTML = lastEditorText;
  document.body.append(newEditor);
  lastEditor = newEditor;
});

// 手动图片模块
module.hot.accept("./editor-wrapper-bg.jpg", () => {
  img.src = editorWrapperBg;
  console.log("img module updated...");
});
