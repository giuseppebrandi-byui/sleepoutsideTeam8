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

const span = document.querySelector("#count");
// export function displayCartQuantityIndicator() {
//   span.classList.add("count");
// }

export function cartCounter() {
  let cart = getLocalStorage("so-cart");
  cart = cart ? getLocalStorage("so-cart") : [];
  let count = cart.length;
  // if (count > 0) {
  //   displayCartQuantityIndicator();
  //   document.getElementById("count").innerText = count;
  // } else {
  //   document.getElementById("count").innerText = "";
  //   span.classList.remove("count");
  // }
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

function loadTemplate(path) {
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      return html;
    }
  };
}

export function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");
  const headerEl = document.querySelector("#main-header");
  const footerEl = document.querySelector("#main-footer");
  renderWithTemplate(headerTemplateFn, headerEl);
  renderWithTemplate(footerTemplateFn, footerEl);
}
