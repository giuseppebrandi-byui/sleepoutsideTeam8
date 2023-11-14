
const wrapper = document.querySelector(".wrapper");

const signupCloseBtn = document.querySelector(".signUpCloseBtn");

wrapper.style.display = "none";

window.addEventListener("load", function () {
  const cookie = this.sessionStorage.getItem("modal");
  const modal = document.querySelector(".form");
  if (!cookie) {
  setTimeout(function open() {
    wrapper.style.display = "block";
  }, 1000);
  modal.style.display = "block";
  sessionStorage.setItem("modal", "blah");
  } else {
    modal.style.display = "none";
  }
});

signupCloseBtn.addEventListener("click", () => {
  wrapper.style.display = "none";
});
