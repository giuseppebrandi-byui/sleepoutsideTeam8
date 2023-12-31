const form = document.querySelector(".reg-form");
const wrapper = document.querySelector(".wrapper");
const closeButton = document.querySelector(".ModalCloseBtn");
const signupCloseBtn = document.querySelector(".signUpCloseBtn");

wrapper.style.display = "none";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const fullname = document.querySelector("[name=fullname].value");
  const email = document.querySelector("[name=email].value");
  const password = document.querySelector("[name=password].value");
  if (fullname !== "" && email !== "" && password !== "") {
    wrapper.classList.remove("active");
  }
});

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
