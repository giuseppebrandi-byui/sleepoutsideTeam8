import { loadHeaderFooter, getParam } from "./utils.mjs";
import productList from "./productList.mjs";

const headerFooter = async () => {
  await loadHeaderFooter();
};

headerFooter();
const category = getParam("category");
productList(".product-list", category);
