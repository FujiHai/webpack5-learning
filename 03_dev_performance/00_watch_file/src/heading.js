import "./heading.css";

export default () => {
  const element = document.createElement("h2");

  element.textContent = "Hello World1688";
  element.classList.add("heading");
  element.addEventListener("click", () => {
    alert("helloWorld");
  });

  return element;
};
