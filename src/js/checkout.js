import { loadHeaderFooter } from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";
import filterProducts from "./productListMain.mjs";

const headerFooter = async () => {
  await loadHeaderFooter();
};
headerFooter();
filterProducts();

checkoutProcess.init("so-cart", ".order-summary");

document
  .querySelector("#zip")
  .addEventListener(
    "blur",
    checkoutProcess.calculateOrderTotal.bind(checkoutProcess)
  );

document.forms["checkout"].addEventListener("submit", (e) => {
  e.preventDefault();
  checkoutProcess.checkout(e.target);
});
