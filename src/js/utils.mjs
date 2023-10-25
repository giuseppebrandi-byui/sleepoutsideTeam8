// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
//get a parameter from URL when needed
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  //const product = urlParams.get("product");
  return urlParams.get(param);
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = true
) {
  if (clear && parentElement !== null) {
    parentElement.innerHTML = "";
  }
  const htmlString = list.map(templateFn);
  if (parentElement !== null) {
    parentElement.insertAdjacentHTML(position, htmlString.join(""));
  }
}

export async function renderWithTemplate(
  templateFn,
  parentElement,
  data,
  callback,
  position = "afterbegin",
  clear = true
) {
  if (clear && parentElement !== null) {
    parentElement.innerHTML = "";
  }
  const htmlString = await templateFn(data);
  if (parentElement !== null) {
    parentElement.insertAdjacentHTML(position, htmlString);
  }
  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      return html;
    }
  };
}

export async function loadHeaderFooter() {
  const headerTemplateFn = await loadTemplate("/partials/header.html");
  const footerTemplateFn = await loadTemplate("/partials/footer.html");
  const headerEl = document.querySelector("#main-header");
  const footerEl = document.querySelector("#main-footer");
  await renderWithTemplate(headerTemplateFn, headerEl);
  await renderWithTemplate(footerTemplateFn, footerEl);

  cartCounter();
}

export function cartCounter() {
  let cart = getLocalStorage("so-cart");
  cart = cart ? getLocalStorage("so-cart") : [];
  let count = cart.length;
  const span = document.querySelector("#count");
  if (count === null) {
    span.textContent = count;
  } else if (count > 0 && span) {
    span.textContent = count;
  }
}
export function cartTotal() {
  //calling localStorage to see if there is anything in cart and then adding to an array
  let total = getLocalStorage("so-cart");
  total = total ? getLocalStorage("so-cart") : [];
  //setting the cart total to zero
  let totalCart = 0;
  //looping through to make sure that it adds all items in localStorage to add their final prices
  for (let i = 0; i < total.length; i++) {
    let items = total[i];
    totalCart += items.FinalPrice;
  }
  //checking the total in my cart. If not 0, then display the total of the cart
  if (totalCart > 0) {
    const cartTotalEl = document.querySelector(".cart-footer");
  
    // cartTotalEl.innerText = `Total: $${totalCart.toFixed(2)}`;
  }
}
cartTotal();