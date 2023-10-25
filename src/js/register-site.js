const wrapper = document.querySelector(".wrapper");
const signupButton = document.querySelector(".signupBtn");
const closeButton = document.querySelector(".ModalCloseBtn");
const signupCloseBtn = document.querySelector(".signUpCloseBtn");

signupButton.addEventListener("click", () => {
  wrapper.classList.remove("active");
});

wrapper.style.display = "none";

window.addEventListener("load", function () {
  setTimeout(function open() {
    wrapper.style.display = "block";
  }, 1000);
});

signupCloseBtn.addEventListener("click", () => {
  wrapper.style.display = "none";
});

closeButton.addEventListener("click", () => {
  wrapper.style.display = "none";
});
