import { loadHeaderFooter, getParam } from "./utils.mjs";
import { userLogin } from "./auth.mjs";

const headerFooter = async () => {
  await loadHeaderFooter();
};

headerFooter();
const redirectAddress = getParam("redirect");

const loginBtn = document.querySelector(".loginBtn");

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.querySelector("#loginEmail").value;
  const password = document.querySelector("#loginPassword").value;
  userLogin({ email, password }, redirectAddress);
});
