import { getProductsByCategory } from "./externalServices.mjs";
import { renderListWithTemplate } from "./utils.mjs";

var products;

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
              <p class="card__description" style="display:none">${
                product.DescriptionHtmlSimple
              }</p>
              <p class="msrp">$${product.SuggestedRetailPrice.toFixed(2)}</p>
              <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p></a>
              <p class="product-card__discount">You save $${(
                product.SuggestedRetailPrice - product.FinalPrice
              ).toFixed(2)}</li>`;
}

export default async function productList(selector, category) {
  category = category ?? window.location.search.split("?q=")[1];
  const el = document.querySelector(selector);
  products = await getProductsByCategory(category);

  if (products.length < 1) {
    const tents = await getProductsByCategory("tents");
    const backpacks = await getProductsByCategory("backpacks");
    const sleeping = await getProductsByCategory("sleeping-bags");
    const hammocks = await getProductsByCategory("hammocks");

    products = tents.concat(backpacks, sleeping, hammocks);
  }
  const selectMenu = document.querySelector("#sort-by");

  // It displays the full list of products by category
  renderListWithTemplate(productCardTemplate, el, products);
  document.querySelector(".title").innerHTML =
    category.replace("-", " ").replace(/(?:^|\s)\S/g, a => a.toUpperCase()) + "(" + products.length + ")";

  // It displays products depending on the user input
  if (window.location.search.split("?q=")[1]) filterProducts();
  const filterInput = document.querySelector("#filterInput");
  filterInput.addEventListener("keyup", filterProducts);

  // It displays the list of products in alphabetical order or from law price to high
  selectMenu.addEventListener("change", () => {
    const selectEl = document.querySelector("select[name='sort-by']");
    let selectValue = selectEl.value;

    if (selectValue === "name") {
      products.sort((a, b) => (a.NameWithoutBrand > b.NameWithoutBrand) - 1);
    } else if (selectValue === "price") {
      products.sort((price1, price2) => price1.FinalPrice - price2.FinalPrice);
    }
    renderListWithTemplate(productCardTemplate, el, products);
    if (window.location.search.split("?q=")[1]) filterProducts();
  });
}

// It filters the products according to the user input
function filterProducts() {
  const productList = document.querySelector(".product-list");
  let filterValue = (
    filterInput.value ||
    window.location.search.split("?q=")[1] ||
    ""
  ).toUpperCase();
  let item = productList.querySelectorAll(".product-card");
  for (let i = 0; i < item.length; i++) {
    let brand = item[i].querySelector(".card__brand");
    let nameWithoutBrand = item[i].querySelector(".card__name");
    let description = item[i].querySelector(".card__description");
    if (
      brand.innerHTML.toUpperCase().indexOf(filterValue) > -1 ||
      nameWithoutBrand.innerHTML.toUpperCase().indexOf(filterValue) > -1 ||
      description.innerHTML.toUpperCase().indexOf(filterValue) > -1
    ) {
      item[i].style.display = "initial";
    } else {
      item[i].style.display = "none";
    }
  }
}
