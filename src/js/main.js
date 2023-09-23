import { getLocalStorage } from "./utils.mjs";


function cartCounter() {
  var cart = getLocalStorage("so-cart");
  cart = (cart) ? getLocalStorage("so-cart") : [];
  var count = cart.length; 
  console.log(count);
  document.getElementById("count").innerText = count;
}
cartCounter();
