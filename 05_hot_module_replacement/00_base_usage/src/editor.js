import "./editor.css";

export default () => {
  const editorElement = document.createElement("div");

  editorElement.contentEditable = true;
  editorElement.className = "editor";
  editorElement.id = "editor666";

  console.log("editor init complete66re6");

  return editorElement;
};
