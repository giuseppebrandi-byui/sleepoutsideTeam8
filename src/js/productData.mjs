const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export async function getData(category) {
  if (baseURL.endsWith("/")){
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  } 
  const response = await fetch(baseURL + "/" + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

// export function getData(category = "tents") {
//   return fetch(`../json/${category}.json`)
//     .then(convertToJson)
//     .then((data) => data);
// }

// export async function findProductById(id) {
//   const products = await getData();
//   return products.find((item) => item.Id === id);
// }
export async function findProductById(id) {
  if (baseURL.endsWith("/")) {
    const response = await fetch(baseURL + `product/${id}`);
    const product = await convertToJson(response);
    return product.Result;
  }
  const response = await fetch(baseURL + "/" + `product/${id}`);
  const product = await convertToJson(response);
  return product.Result;
}
