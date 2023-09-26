import { getLocalStorage } from "./utils.mjs";

function cartCounter() {
  let cart = getLocalStorage("so-cart");
  cart = cart ? getLocalStorage("so-cart") : [];
  let count = cart.length;
  document.getElementById("count").innerText = count;
}
cartCounter();
