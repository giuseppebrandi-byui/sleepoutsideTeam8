import { getLocalStorage, cartCounter } from "./utils.mjs";
import productList from "./productList.mjs";

cartCounter();

productList(".product-list", "tents");
