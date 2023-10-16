import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
            <a href="product_pages/index.html?product=${product.Id}">
              <img
                src="${product.Image}"
                alt="${product.Name}"
              />
              <h3 class="card__brand">${product.Brand.Name}</h3>
              <h2 class="card__name">${product.NameWithoutBrand}</h2>
              <p class="msrp">$${product.SuggestedRetailPrice}</p>
              <p class="product-card__price">$${product.FinalPrice}</p></a>
              <p class="product-card__discount">You save $${(product.SuggestedRetailPrice - product.FinalPrice).toFixed(2)}</li>`;
}

export default async function productList(selector, category) {
  const el = document.querySelector(selector);
  const products = await getData(category);
  const selectedProducts = products.filter(
    (product) => product.Id !== "989CG" && product.Id !== "880RT"
  );
  renderListWithTemplate(productCardTemplate, el, selectedProducts);
}
