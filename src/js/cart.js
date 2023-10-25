import { loadHeaderFooter, cartCounter, cartTotal } from "./utils.mjs";
import shoppingCart from "./shoppingCart.mjs";

const headerFooter = async () => {
  await loadHeaderFooter();
};

headerFooter();

shoppingCart();
cartCounter();
cartTotal();
