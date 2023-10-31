import { loadHeaderFooter, cartCounter, cartTotal } from "./utils.mjs";
import shoppingCart from "./shoppingCart.mjs";
import filterProducts from "./productListMain.mjs";

const headerFooter = async () => {
  await loadHeaderFooter();
};

headerFooter();

shoppingCart();
filterProducts();
cartCounter();
cartTotal();
