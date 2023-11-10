import {
  getLocalStorage,
  setLocalStorage,
  renderListWithTemplate,
  cartCounter,
} from "./utils.mjs";

export default function ShoppingCart() {
  const cartItems = getLocalStorage("so-cart");
  const outputEl = document.querySelector(".product-list");
  renderListWithTemplate(cartItemTemplate, outputEl, cartItems);

  let value = "";
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("cart-card__remover")) {
      let clickedOn = e.target.id;
      let clickedColor = e.target.name;
      cartItems.forEach((item) => {
        if (item.Id == clickedOn) {
          value = cartItems.findIndex((element) => element.Id === clickedOn && element.ColorName === clickedColor);
          return value;
        }
      });
      cartItems.splice(value, 1);
      setLocalStorage("so-cart", cartItems);
    }
    renderListWithTemplate(cartItemTemplate, outputEl, cartItems);
    cartCounter();
    cartTotal();

    // window.location.reload(true);
  });
}

function cartItemTemplate(item) {  
  const newItem = `<li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img
          src="${item.Images.PrimarySmall}"
          alt="${item.Name}"
        /> 
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">Color: ${item.Colors[0].ColorName}</p>
      <span class="cart-card__remover" id="${item.Id}">&#10006</a></span>
      <button class="addButton" id="${item.Id}" name="${item.Colors[0].ColorName}">&#x002B</button>
      <p class="cart-card__quantity">qty:${item.Quantity}</p>
      <p class="cart-card__price">$${(item.FinalPrice * item.Quantity).toFixed(
        2
      )}</p>
      <button class="minusButton" id="${item.Id}" name="${item.Colors[0].ColorName}">&#x2212</button>
    </li>`;

  return newItem;
}

export function cartTotal() {
  //calling localStorage to see if there is anything in cart and then adding to an array
  let cart = getLocalStorage("so-cart");
  // total = total ? getLocalStorage("so-cart") : [];
  //setting the cart total to zero
  let totalCart = 0;
  //looping through to make sure that it adds all items in localStorage to add their final prices
  if (cart != null) {
    cart.forEach((item) => {
      totalCart += item.FinalPrice * item.Quantity;
      return totalCart;
    });
  }
  //checking the total in my cart. If not 0, then display the total of the cart
  document.querySelector(
    ".cart-total"
  ).innerHTML = `Total: $${totalCart.toFixed(2)}`;
}
cartTotal();

function addQuantity() {
  const cart = getLocalStorage("so-cart");
    document.addEventListener("click", function (e) {
      if (e.target.classList.contains("addButton")) {
        let add = e.target.id;
        let color = e.target.name;
        console.log(color);
        let index = cart.findIndex((item) => item.Id == add && item.Colors[0].ColorName == color);
        console.log(index);
        
        let quantity = cart[index].Quantity;
        quantity++;
        cart[index].Quantity = quantity;
        setLocalStorage("so-cart", cart);
        document.location.reload();
      }
    });
  
}

function minusQuantity() {
  const cart = getLocalStorage("so-cart");
  
    document.addEventListener("click", function (e) {
      if (e.target.classList.contains("minusButton")) {
        let minus = e.target.id;
        let color = e.target.name;
        let index = cart.findIndex((item) => item.Id == minus && item.Colors[0].ColorName == color);
        let quantity = cart[index].Quantity;
        --quantity;
        cart[index].Quantity = quantity;
        if (quantity == 0) {
          cart.splice(index, 1);
        }
        setLocalStorage("so-cart", cart);
        document.location.reload();
      }
    });
  
}

addQuantity();
minusQuantity();

cartTotal();
