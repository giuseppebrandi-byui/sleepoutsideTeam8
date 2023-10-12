import { getParam, loadHeaderFooter, cartCounter } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

await loadHeaderFooter();
cartCounter();
const productId = getParam("product");
productDetails(productId);
