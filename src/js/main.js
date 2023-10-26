// import { loadHeaderFooter } from "./utils.mjs";
// // import productList from "./productList.mjs";

// const headerFooter = async () => {
//   await loadHeaderFooter();
// };

// headerFooter();
// // productList(".product-list", "tents");

import { loadHeaderFooter } from "./utils.mjs";
import functionForMain from "./productListMain.mjs";

const headerFooter = async () => {
  await loadHeaderFooter();
};

headerFooter();
functionForMain();
