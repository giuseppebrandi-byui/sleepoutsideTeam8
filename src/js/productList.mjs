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
              <p class="product-card__price">$${product.FinalPrice}</p></a></li>`;
}

export default async function productList(selector, category) {
  const el = document.querySelector(selector);
  const products = await getData(category);
  const selectMenu = document.querySelector("#sort-by");
  const selectEl = document.querySelector('select[name="sort-by"]');
  let selectValue = selectEl.value;
  let selectedProducts = products.filter(
    (product) => product.Id !== "989CG" && product.Id !== "880RT"
  );
  // selectMenu.addEventListener("change", (event) => {
  //   if (selectValue === "name") {
  //     console.log("This is a name");
  //   }
  // });
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
}

//  const selectElement = document.querySelector(".Colours");
//  selectElement.addEventListener("change", (event) => {
//    const result = document.querySelector(".tutorial");
//    result.textContent = `You like ${event.target.value}`;
//  });

// .sort((price1, price2) => price1.FinalPrice - price2.FinalPrice)
// .sort((a, b) => (a.NameWithoutBrand > b.NameWithoutBrand) - 1)
