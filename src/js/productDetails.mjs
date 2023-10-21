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
  //check if product is in the cart, if not add product
  let p = product.Id;
  
  let found = cart.some(item => item.Id == p);
  if (!found) { cart.push(product); };
  //if product is already in the cart, remove product add to subarray
  //and readd to the cart
  let subarray = cart.filter(item => item.Id == product.Id);
  if (subarray.length) {
    // let index = cart.findIndex(item => item.Id == product.Id);
    let index = cart[cart.indexOf(subarray[0])].quantity++;
    console.log(subarray);
    // index++;
    console.log(quantity);
  } else {
    cart.push(product);
  }
    //creating multi level arrays of empty stuff    
    // 
    // console.log(index);
    
    // console.log(subarray);
    // console.log(product);
    // subarray.push(product);
    // console.log(subarray);
    // console.log(subarray.length);

    
    //  cart.splice(subarray);
   
  
   
    // subarray.push(product);
    // if (subarray) {
    //   console.log(subarray);
    //   subarray.push(product);
    //   console.log(subarray);
    //   cart.splice(index, 0, subarray);
    // } else {
      // let x = cart.filter(item => item.Id = p);
      // //need to figure out how to remove all the elements and re add as a new
      // //subarray
      // x.push(product);
      // console.log(x);
      // cart.push(x);
      //somewhere in here need to count the length of the array?
      //to add the same number of products back in?
    
    
    //then need to create an array and push that array into the cart array
  
  
  setLocalStorage("so-cart", cart);
  cartCounter();
};

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
