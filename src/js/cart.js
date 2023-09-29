import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart");
  cartItems = cartItems ? getLocalStorage("so-cart") : [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
<<<<<<< HEAD
  document
    .getElementById("cart-card__remover")
    .addEventListener("click", removeProduct());
=======
document.getElementById("cart-card__remover").addEventListener("click", removeProduct);
>>>>>>> b3680d33c8f2b9ba707f1062e893ae0105a7b317
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <span class="cart-card__remover" data-id="${item.Id}"><a href="#" >&#10006</a></span>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

// function updateCart() {
//   let cart = getLocalStorage("so-cart");
//   cart = cart ? getLocalStorage("so-cart") : [];
//   let count = cart.length;
//   if (count !== 0) {
//     removeProduct();
//   }
// }

function cartCounter() {
  let cart = getLocalStorage("so-cart");
  cart = cart ? getLocalStorage("so-cart") : [];
  let count = cart.length;
  document.getElementById("count").innerText = count;
}
renderCartContents();
cartCounter();

function removeProduct(item) {
  let cart = getLocalStorage("so-cart");
  let product = cart.indexOf(item);
  if (product !== -1) {
    cart.splice(item);
  }
  setLocalStorage("so-cart", cart);
}
