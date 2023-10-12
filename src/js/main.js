import { cartCounter, loadHeaderFooter } from "./utils.mjs";
import productList from "./productList.mjs";

await loadHeaderFooter();
productList(".product-list", "tents");
cartCounter();
