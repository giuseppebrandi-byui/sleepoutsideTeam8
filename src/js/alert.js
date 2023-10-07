const main = document.querySelector("main");
const section = document.createElement("section");
section.className = "alert-list";
main.prepend(section);

fetch("/json/alert.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((post) => {
      section.insertAdjacentHTML(
        "beforeend",
        `<p style="background:${post.background}; color:${post.color}; padding:.3rem">${post.message}<span class="closeBtn">&times;</span></p>`
      );
    });
  });

// Remove alert
document.addEventListener("click", function (e) {
  if (e.target.className == "closeBtn") {
    let p = e.target.parentNode;
    section.removeChild(p);
  }
});
