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
              <p class="msrp">$${product.SuggestedRetailPrice}</p>
              <p class="product-card__price">$${product.FinalPrice}</p></a>
              <p class="product-card__discount">You save $${(
                product.SuggestedRetailPrice - product.FinalPrice).toFixed(2)}</p>
              <button class="quick-lookup" id ="${product.Id}">Quick View</button></li>
              `;
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
    category.replace('-', ' ').replace(/(?:^|\s)\S/g, a => a.toUpperCase()) + "(" + products.length + ")";

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
  let value = {};
const modal = document.querySelector(".lookup-wrapper");
const modalContent = document.querySelector(".lookup-content"); 
const name = document.querySelector("#productName");  
const image = document.querySelector("#productImage")
const msrp = document.querySelector("#productMsrp")
const price = document.querySelector("#productFinalPrice")
const descrip = document.querySelector("#productDescriptionHtmlSimple")
  const savings = document.querySelector("#productSavings");
  const close = document.querySelector(".modal-closer");
  const link = document.querySelector(".quickProduct");
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("quick-lookup")) {
      let clickedOn = e.target.id;
      value = products.filter(item => item.Id == clickedOn);
          console.log(value);
      modal.classList.add("lookup-wrapper-visible");
      modalContent.classList.add("lookup-content-show");
      name.innerText = value[0].Name;
      image.src = value[0].Images.PrimaryLarge;
      image.alt = value[0].Name;
      msrp.innerText = `$${value[0].SuggestedRetailPrice}`;
      savings.innerText = `You save $${(value[0].SuggestedRetailPrice - value[0].FinalPrice).toFixed(2)}`; 
      price.innerText = `$${value[0].FinalPrice}`;
      descrip.innerHTML = value[0].DescriptionHtmlSimple;   
      link.href = "../product_pages/index.html?product=" + value[0].Id;
        
    }
     
  })
  close.addEventListener("click", () => {
    modal.classList.remove("lookup-wrapper-visible");
    modalContent.classList.remove("lookup-content-show");
  })
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

