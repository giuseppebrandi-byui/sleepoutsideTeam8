import { findProductById } from "./externalServices.mjs";
import { getLocalStorage, setLocalStorage, cartCounter, alertMessage } from "./utils.mjs";

// Grab a reference to the cart button, the h2 element, and the product details
// section
const cartButton = document.querySelector("#addToCart");
const h2 = document.querySelector("#productNameWithoutBrand");
const productDetailSection = document.querySelector(".product-detail");
const cart = document.querySelector(".count");
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
    addDiscountFlag();
    // once the HTML is rendered we can add a listener to Add to Cart button
    document.getElementById("addToCart").addEventListener("click", addToCart);
  } else {
    // Append div with images to the product detail section
    productDetailSection.append(div);
    // Add the class hidden to both the h2 and cart button element
    h2.classList.add("hidden");
    cartButton.classList.add("hidden");
  }
  return product;
}

export function addToCart() {
  let cart = getLocalStorage("so-cart");
  cart = cart ? getLocalStorage("so-cart") : [];
  //check if product is in the cart, if not add product
  let p = product.Id;
  let found = cart.some((item) => item.Id == p);
  if (found) {
    let index = cart.findIndex((item) => item.Id == product.Id);
    let quantity = cart[index].Quantity;
    quantity++;
    cart[index].Quantity = quantity;
  } else {
    product.Quantity = 1;
    cart.push(product);
  }
  setLocalStorage("so-cart", cart);

  cartCounter(); 
  alertMessage(`${product.NameWithoutBrand} added to cart!`);
};


function renderProductDetails() {
  const largeScreen = window.matchMedia("(min-width: 768px)");
  const mediumScreen = window.matchMedia("(min-width: 320px)");
  document.querySelector(".product-category").innerText =

    product.Category.replace("-", " ").replace(/(?:^|\s)\S/g, a => a.toUpperCase())
      


  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;

  if (largeScreen.matches) {
    document.querySelector("#productImage").src =
      product.Images.PrimaryExtraLarge;
  } else if (mediumScreen.matches) {
    document.querySelector("#productImage").src = product.Images.PrimaryLarge;
  } else {
    document.querySelector("#productImage").src = product.Images.PrimaryMedium;
  }

  document.querySelector("#productImage").alt = product.Name;
  document.querySelector(
    "#productMsrp"
  ).innerText = `$${product.SuggestedRetailPrice.toFixed(2)}`;
  document.querySelector(
    "#productFinalPrice"
  ).innerText = `$${product.FinalPrice.toFixed(2)}`;
  document.querySelector("#productSavings").innerText = `You save $${(
    product.SuggestedRetailPrice - product.FinalPrice
  ).toFixed(2)}`;
  document.querySelector("#productColorName").innerText =
    product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}

function addDiscountFlag() {

  const originalPrice = product.SuggestedRetailPrice;
  const salePrice = product.FinalPrice;

  const discount = Math.round((originalPrice - salePrice) / originalPrice * 100);

  const flag = `Save ${discount}%`;

  // if (discount >= 0 && discount <= 4) {
  //   flag = "low value";
  // } else if (discount >= 5 && discount <= 14) {
  //   flag = "moderate value";
  // } else if (discount >= 15 && discount <= 24) {
  //   flag = "good value";
  // } else if (discount >= 25) {
  //   flag = "excellent value";
  // }

  document.querySelector(".discount-flag").innerHTML = flag;
}

cartCounter();
