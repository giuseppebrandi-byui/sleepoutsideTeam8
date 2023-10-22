import { doc } from "prettier";
import { getLocalStorage, setLocalStorage, renderListWithTemplate, cartCounter } from "./utils.mjs";

export default function ShoppingCart() {
    const cartItems = getLocalStorage("so-cart");
    const outputEl = document.querySelector(".product-list");
  renderListWithTemplate(cartItemTemplate, outputEl, cartItems);
  let value = "";
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("cart-card__remover")) {
      let clickedOn = e.target.id;
      cartItems.forEach(item => {
        if (item.Id == clickedOn) {
          value = cartItems.findIndex((element) => element.Id === clickedOn);
          return value;
        }
      });
      cartItems.splice(value, 1);
      setLocalStorage("so-cart", cartItems);
    }
    renderListWithTemplate(cartItemTemplate, outputEl, cartItems);
    cartCounter();
    cartTotal();
  });
  
};
  


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
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <span class="cart-card__remover" id="${item.Id}">&#10006</a></span>
      <button class="addButton" id="${item.Id}">&#x002B</button>
      <p class="cart-card__quantity">qty:${item.Quantity}</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
      <button class="minusButton" id="${item.Id}">&#x2212</button>
    </li>`;
  
    return newItem;
}

function cartTotal() {
  //calling localStorage to see if there is anything in cart and then adding to an array
  let total = getLocalStorage("so-cart");
  total = total ? getLocalStorage("so-cart") : [];
  //setting the cart total to zero
  const cartTotalEl = document.querySelector(".cart-footer");
  let totalCart = 0;
  cartTotalEl.innerText = `Total: $${totalCart}`; 
  //looping through to make sure that it adds all items in localStorage to add their final prices
  for (let i = 0; i < total.length; i++) {
    let items = total[i];
    totalCart += items.FinalPrice;
  }
  //checking the total in my cart. If not 0, then display the total of the cart
  // if (totalCart > 0) {
  //   cartTotalEl.innerText = `Total: $${totalCart}`;
  // }
}

function addQuantity() {
  const cart = getLocalStorage("so-cart");
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("addButton")) {
      let add = e.target.id;
      let index = cart.findIndex(item => item.Id == add);
      let quantity = cart[index].Quantity;
      quantity++;
      console.log(quantity);
      cart[index].Quantity = quantity;
      
    }
  }
  );
  setLocalStorage("so-cart", cart);
}

function minusQuantity() {
  const cart = getLocalStorage("so-cart");
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("minusButton")) {
      let minus = e.target.id;
      let index = cart.findIndex(item => item.Id == minus);
      let quantity = cart[index].Quantity;
      console.log(quantity);
      --quantity;
      console.log(quantity);
      cart[index].Quantity = quantity;
    }
  }
  );
setLocalStorage("so-cart", cart);
}

// function changeQuantity() {
//   const cart = getLocalStorage("so-cart");
//   document.addEventListener("click", function (e) {
//     if (e.target.classList.contains("addButton")) {
//       let add = e.target.id;
//       let index = cart.findIndex(item => item.Id == add);
//       let quantity = cart[index].Quantity;
//       quantity++;
//       console.log(quantity);
//       cart[index].Quantity = quantity;
      
//     }
//   }
//   );
//   document.addEventListener("click", function (e) {
//     if (e.target.classList.contains("minusButton")) {
//       let minus = e.target.id;
//       let index = cart.findIndex(item => item.Id == minus);
//       let quantity = cart[index].Quantity;
//       console.log(quantity);
//       --quantity;
//       console.log(quantity);
//       cart[index].Quantity = quantity;
//     }
//   }
//   );
//   setLocalStorage("so-cart", cart);
// }
// changeQuantity();
addQuantity();
minusQuantity();