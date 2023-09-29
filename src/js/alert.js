const main = document.querySelector("main");
const section = document.createElement("section");
section.className = "alert-list";
main.prepend(section);

fetch("../alert.json")
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);
    data.forEach((post) => {
      section.insertAdjacentHTML(
        "beforeend",
        `<p style="background:${post.background}; color:${post.color}; padding:.3rem">${post.message}</p>`
      );
    });
  });
