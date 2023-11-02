import { loadHeaderFooter, cartCounter, cartTotal } from "./utils.mjs";
import shoppingCart from "./shoppingCart.mjs";
import functionForMain from "./productListMain.mjs";

const headerFooter = async () => {
  await loadHeaderFooter();
};

headerFooter();

shoppingCart();
functionForMain();
cartCounter();
cartTotal();
