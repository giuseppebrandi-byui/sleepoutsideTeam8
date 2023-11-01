import { getProductsByCategory } from "./externalServices.mjs";
import { renderListWithTemplate } from "./utils.mjs";

var products = [];

function productCardTemplate(product) {
  return `<li class="product-card">
            <a href="../product_pages/index.html?product=${product.Id}">
              <img
                src="${product.Images.PrimaryMedium}"
                alt="${product.Name}"
              />
              <h3 class="card__brand">${product.Brand.Name}</h3>
              <h2 class="card__name">${product.NameWithoutBrand}</h2>
              <p class="card__description" style="display:none">${
                product.DescriptionHtmlSimple
              }</p>
              <p class="msrp">$${product.SuggestedRetailPrice}</p>
              <p class="product-card__price">$${product.FinalPrice}</p></a>
              <p class="product-card__discount">You save $${(
                product.SuggestedRetailPrice - product.FinalPrice
              ).toFixed(2)}</li>`;
}

export default async function getRecommendProducts(category) {
  let selectedCategories = ["tents", "backpacks", "sleeping-bags", "hammocks"];
  selectedCategories.splice(selectedCategories.indexOf(category), 1);
  for (let i = 0; i < selectedCategories.length; i++) {
    const selectedCategory = await getProductsByCategory(selectedCategories[i]);
    products = products.concat(selectedCategory);
  }

  let threeProductsOnly = [];
  // products[getRandomInt(products.length)],
  // products[getRandomInt(products.length)],
  // products[getRandomInt(products.length)],

  while (threeProductsOnly.length < 3) {
    if (threeProductsOnly.length === 0) {
      threeProductsOnly.push(products[getRandomInt(products.length)]);
      continue;
    }
    let newProduct = products[getRandomInt(products.length)];
    if (!threeProductsOnly.includes(newProduct)) {
      threeProductsOnly.push(newProduct);
      continue;
    }
  }

  filterProducts(threeProductsOnly);
}

// It filters the products according to the user input
export function filterProducts(threeProductsOnly) {
  const el = document.querySelector(".recommended-products");
  renderListWithTemplate(productCardTemplate, el, threeProductsOnly);
  const productList = document.querySelector(".recommended-products");
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
