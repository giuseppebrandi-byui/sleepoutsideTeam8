import { getParam, loadHeaderFooter, cartCounter } from "./utils.mjs";
import productDetails from "./productDetails.mjs";
import { getData } from "./productData.mjs";

const headerFooter = async () => {
  await loadHeaderFooter();
};
headerFooter();
cartCounter();
const productId = getParam("product");
productDetails(productId);

async function addDiscountSticker(category) {
  const products = await getData();

  products.forEach((product) => {
    // const msrp = product.querySelector(product.SuggestedRetailPrice);
    // const finalPrice = product.querySelector(product.FinalPrice);

    const discount = Math.round(
      ((product.SuggestedRetailPrice - product.FinalPrice) /
        product.SuggestedRetailPrice) *
        100
    );

    const discountEl = document.createElement("div");
    discountEl.classList.add("discount-sticker");
    discountEl.innerText = `-${discount}%`;

    const img = document.querySelector(`.product[data-id="${product.id}"] img`);
    img.appendChild(discountEl);
  });
}

addDiscountSticker();
