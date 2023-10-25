import { loadHeaderFooter, cartCounter, cartTotal } from "./utils.mjs";
import shoppingCart from "./shoppingCart.mjs";


// function renderCartContents() {
//   let cartItems = getLocalStorage("so-cart");
//   cartItems = cartItems ? getLocalStorage("so-cart") : [];
//   const htmlItems = cartItems.map((item) => cartItemTemplate(item));
//   document.querySelector(".product-list").innerHTML = htmlItems.join("");
//   let value = "";
//   document.addEventListener("click", function (e) {
//     if (e.target.classList.contains("cart-card__remover")) {
//       let clickedOn = e.target.id;
//       cartItems.forEach((item) => {
//         if (item.Id == clickedOn) {
//           value = cartItems.findIndex((element) => element.Id === clickedOn);
//           return value;
//         }
//       });
//       cartItems.splice(value, 1);
//       setLocalStorage("so-cart", cartItems);
//     }
//     renderCartContents();
//     cartCounter();
//   });
// }


const headerFooter = async () => {
  await loadHeaderFooter();
};

headerFooter();
// renderCartContents();
shoppingCart();
cartCounter();
cartTotal();
