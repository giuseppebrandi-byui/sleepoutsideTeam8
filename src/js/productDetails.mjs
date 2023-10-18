import { findProductById } from "./productData.mjs";
import { getLocalStorage, setLocalStorage, cartCounter } from "./utils.mjs";

// Grab a reference to the cart button, the h2 element, and the product details
// section
const cartButton = document.querySelector("#addToCart");
const h2 = document.querySelector("#productNameWithoutBrand");
const productDetailSection = document.querySelector(".product-detail");

// Set the product details section with class "center"
productDetailSection.classList.add("center");
// Creates a new div element node
const div = document.createElement("div");
// Fill the div element with a 404 not found image
div.innerHTML = `<img src="../images/not-found.jpg">`;

let product = {};

export default async function productDetails(productId) {
  try {
    // get the details for the current product. findProductById will return a promise! use await or .then() to process it
    product = await findProductById(productId);
  } catch (error) {
    console.error("Error:", error);
  }
  if (product !== undefined) {
    // once we have the product details we can render out the HTML
    renderProductDetails();
    // once the HTML is rendered we can add a listener to Add to Cart button
    document.getElementById("addToCart").addEventListener("click", addToCart);
  } else {
    // Append div with images to the product detail section
    productDetailSection.append(div);
    // Add the class hidden to both the h2 and cart button element
    h2.classList.add("hidden");
    cartButton.classList.add("hidden");
  }
}

function addToCart() {
  let cart = getLocalStorage("so-cart");
  cart = cart ? getLocalStorage("so-cart") : [];
  cart.push(product);
  setLocalStorage("so-cart", cart);
  cartCounter();
}

function renderProductDetails() {
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Images.PrimaryLarge;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
  document.querySelector("#productColorName").innerText =
    product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}

cartCounter();
