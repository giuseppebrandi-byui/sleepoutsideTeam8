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
let quantity = 0;

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
  console.log(product.Id);
  let p = product.Id;
  //if the cart is empty add the product
  cart.length == 0 ? cart.push(product) : void (0);
  if (cart !== null) {
    //if the cart is not empty and the product is not in the cart already, add it
    //it is adding the product compared to already in the cart instead of adding the new product
    
    //this adds the right product, but keeps adding instead of doing nothing
    cart.includes(product) ? void (0) : cart.push(product);
    
  //   cart.forEach(item => {
  //     if (item.Id !== p) {//this is not checking the whole array for any instance of the item
  //       cart.push(product);//it's just seeing it doesnt match the first one and adding it over and over according to the number of items it is checking against
  //       console.log(cart);
  //     }
  //   })
  }
  
  //if the cart is not empty check the array for the product and count the
  //quantity if there is more than 1
  if (cart !== null) {
    cart.forEach(item => {
      if (item.Id == p) {
        let x = cart.filter(product => product.Id == p)
        let quantity = x.length;
        //this is counting wrong
        quantity++;
        console.log(quantity);
        // cart.push(x);//works, but needs refining to be right
      }
    })
  }
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
