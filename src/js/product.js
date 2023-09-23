import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

function addProductToCart(product) {
  var cart = getLocalStorage("so-cart");
  cart = (cart) ? getLocalStorage("so-cart") : [];
  cart.push(product);
  setLocalStorage("so-cart", cart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
  cartCounter();
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);


function cartCounter() {
  var cart = getLocalStorage("so-cart");
  cart = (cart) ? getLocalStorage("so-cart") : [];
  var count = cart.length; 
  console.log(count);
  document.getElementById("count").innerText = count;
}
cartCounter();