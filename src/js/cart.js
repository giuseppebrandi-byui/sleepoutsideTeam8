import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart");
  cartItems = cartItems ? getLocalStorage("so-cart") : [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
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
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

function cartCounter() {
  let cart = getLocalStorage("so-cart");
  cart = cart ? getLocalStorage("so-cart") : [];
  let count = cart.length;
  document.getElementById("count").innerText = count;
}

function cartTotal() {
  //calling localStorage to see if there is anything in cart and then adding to an array
  let total = getLocalStorage("so-cart");
  total = total ? getLocalStorage("so-cart") : [];
  //setting the cart total to zero
  let totalCart = 0;
  //looping through to make sure that it adds all items in localStorage to add their final prices
  for (let i = 0; i < total.length; i++) {
    let items = total[i];
    totalCart += items.FinalPrice;
  }
  //checking the total in my cart. If not 0, then display the total of the cart
  if (totalCart > 0) {
    const cartTotalEl = document.querySelector(".cart-footer");
    cartTotalEl.classList.remove("hide");
    cartTotalEl.innerText = `Total: $${totalCart}`;
  }
  
}

renderCartContents();
cartCounter();
cartTotal();