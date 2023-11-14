// import { userLogin } from "./accountCreation.mjs";
import  accountProcess  from "./accountCreation.mjs";

const address = "/user/account.html";

document.forms["account"].addEventListener("submit", (e) => {
  e.preventDefault();
  
  console.log(e.target);
  accountProcess.newAccount(e.target);
  setTimeout(function () {
    window.location = address
  }, 5000
  );
});
