import { getLocalStorage } from "./utils.mjs";
import productList from "./productList.mjs";

function cartCounter() {
  let cart = getLocalStorage("so-cart");
  cart = cart ? getLocalStorage("so-cart") : [];
  let count = cart.length;
  document.getElementById("count").innerText = count;
}
cartCounter();

productList(".product-list", "tents");
