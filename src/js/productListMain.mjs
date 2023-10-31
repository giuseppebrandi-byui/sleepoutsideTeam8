import { getProductsByCategory } from "./externalServices.mjs";
import { renderListWithTemplate } from "./utils.mjs";

var products;

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

export default async function functionForMain(selector) {
  const tents = await getProductsByCategory("tents");
  const backpacks = await getProductsByCategory("backpacks");
  const sleeping = await getProductsByCategory("sleeping-bags");
  const hammocks = await getProductsByCategory("hammocks");

  products = tents.concat(backpacks, sleeping, hammocks);

  // It displays products depending on the user input
  const filterInput = document.querySelector("#filterInput");
  filterInput.addEventListener("keyup", filterProducts);
}

// It filters the products according to the user input
export function filterProducts() {
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
  // Get the modal

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  const el = document.querySelector(".product-list");
  renderListWithTemplate(productCardTemplate, el, products);

  const productList = document.querySelector(".product-list");
  let filterValue = filterInput.value.toUpperCase();
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

  var showUrl;
  showUrl = false;

  document.querySelectorAll(".product-card").forEach((e) => {
    if (e.getAttribute("style") != "display: none;") {
      showUrl = true;
    }
  });
  var ul = document.getElementById("all-products");
  if (showUrl) {
    ul.innerHTML = `
    <a href="../product-list/index.html?q=${filterInput.value}">
      <h3 class="card__brand">Click for more </h3>
  </li>`;
  } else {
    ul.innerHTML = `No elements found with your search: ${filterInput.value}`;
  }
}
