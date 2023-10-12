import { getParam, loadHeaderFooter, cartCounter } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

const headerFooter = async () => {
    await loadHeaderFooter();
}
headerFooter();
cartCounter();
const productId = getParam("product");
productDetails(productId);
