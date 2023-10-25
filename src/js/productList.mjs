import { getProductsByCategory } from "./externalServices.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
            <a href="../product_pages/index.html?product=${product.Id}">
            <picture>
              <source media="(min-width: 480px)" srcset="${
                product.Images.PrimaryLarge
              }" />
              <img
                src="${product.Images.PrimaryMedium}"
                alt="Image of ${product.Name}"
              />
            </picture>
              <h3 class="card__brand">${product.Brand.Name}</h3>
              <h2 class="card__name">${product.NameWithoutBrand}</h2>
              <p class="msrp">$${product.SuggestedRetailPrice}</p>
              <p class="product-card__price">$${product.FinalPrice}</p></a>
              <p class="product-card__discount">You save $${(
                product.SuggestedRetailPrice - product.FinalPrice
              ).toFixed(2)}</li>`;
}


export default async function productList(selector, category) {
  const el = document.querySelector(selector);
  const products = await getProductsByCategory(category);
  const selectMenu = document.querySelector("#sort-by");

  let selectedProducts = products.filter(
    (product) => product.Id !== "989CG" && product.Id !== "880RT"
  );
  renderListWithTemplate(productCardTemplate, el, selectedProducts);
  document.querySelector(".title").innerHTML = category;

  selectMenu.addEventListener("change", () => {
    const selectEl = document.querySelector("select[name='sort-by']");
    let selectValue = selectEl.value;

    if (selectValue === "name") {
      selectedProducts.sort(
        (a, b) => (a.NameWithoutBrand > b.NameWithoutBrand) - 1
      );
    } else if (selectValue === "price") {
      selectedProducts.sort(
        (price1, price2) => price1.FinalPrice - price2.FinalPrice
      );
    }
    renderListWithTemplate(productCardTemplate, el, selectedProducts);
  });

}


