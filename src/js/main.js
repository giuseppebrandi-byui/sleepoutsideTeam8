import { loadHeaderFooter } from "./utils.mjs";
import functionForMain from "./productListMain.mjs";

const headerFooter = async () => {
  await loadHeaderFooter();
};

headerFooter();
functionForMain();
