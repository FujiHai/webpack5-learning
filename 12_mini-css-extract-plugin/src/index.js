// import posts from "./posts/posts";
// import album from "./ablum/album";

const render = () => {
  const hash = window.location.hash || "#posts";

  const mainElement = document.querySelector(".main");

  mainElement.innerHTML = "";

  if (hash === "#posts") {
    import("./posts/posts").then(({ default: posts }) => {
      mainElement.appendChild(posts());
    });
  } else if (hash === "#album") {
    import("./posts/posts").then(({ default: posts }) => {
      mainElement.appendChild(album());
    });
  }
};

render();

window.addEventListener("hashchange", render);
