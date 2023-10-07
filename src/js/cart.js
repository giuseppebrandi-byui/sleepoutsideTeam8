import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart");
  cartItems = cartItems ? getLocalStorage("so-cart") : [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  let value = "";
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("cart-card__remover")) {
      let clickedOn = e.target.id;
      cartItems.forEach((item) => {
        if (item.Id == clickedOn) {
          value = cartItems.findIndex((element) => element.Id === clickedOn);
          return value;
        }
      });
      cartItems.splice(value, 1);
      setLocalStorage("so-cart", cartItems);
    }
    renderCartContents();
    cartCounter();
  });
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
    <span class="cart-card__remover" id="${item.Id}">&#10006</a></span>
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
renderCartContents();
cartCounter();
