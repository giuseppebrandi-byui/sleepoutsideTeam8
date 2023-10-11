import { cartCounter, loadHeaderFooter } from "./utils.mjs";
import productList from "./productList.mjs";

loadHeaderFooter();
productList(".product-list", "tents");
cartCounter();