import { loadHeaderFooter, getParam } from "./utils.mjs";
import { login } from "./auth.mjs";

const headerFooter = async () => {
  await loadHeaderFooter();
};

headerFooter();
const redirectAddress = getParam("redirect");
console.log("redirectAddress: ", redirectAddress);

const loginBtn = document.querySelector(".loginBtn");

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const emailValue = document.querySelector("#loginEmail").value;
  const passwordValue = document.querySelector("#loginPassword").value;
  login({ email: emailValue, password: passwordValue }, redirectAddress);
});
