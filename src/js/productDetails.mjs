import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

let product = {};

export default async function productDetails(productId) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);
  // once we have the product details we can render out the HTML
  renderProductDetails();
  // once the HTML is rendered we can add a listener to Add to Cart button
  document.getElementById("addToCart").addEventListener("click", addToCart);
}
function addToCart() {
  setLocalStorage("so-cart", product);
  cartCounter();
}
function renderProductDetails() {
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Image;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
  document.querySelector("#productColorName").innerText =
    product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}

// function cartCounter() {
//   let counter = 0;
//   let cart = [getLocalStorage("so-cart")];
//   if (cart.length > 0) {
//     counter = cart.length;
//     document.getElementById("count").innerText = counter;
//   }
// }

function cartCounter() {
  let counter = 0;
  let cart = [getLocalStorage("so-cart")];
  if (addToCart) {
    cart.push(getLocalStorage("so-cart"));
  }
  // cart = cart ? getLocalStorage("so-cart") : {};
  // var count = cart.length;
  // document.getElementById("count").innerText = count;
}
