import { cartCounter, loadHeaderFooter } from "./utils.mjs";
import productList from "./productList.mjs";

loadHeaderFooter();
cartCounter();
productList(".product-list", "tents");
