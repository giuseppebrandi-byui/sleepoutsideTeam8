import { cartCounter, loadHeaderFooter } from "./utils.mjs";
import productList from "./productList.mjs";

const headerFooter = async () => {
  await loadHeaderFooter();
};
headerFooter();
productList(".product-list", "tents");
cartCounter();
