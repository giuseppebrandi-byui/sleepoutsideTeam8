const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw { name: "servicesError", message: data };
  }
}

export async function getProductsByCategory(category) {
  if (baseURL.endsWith("/")){
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  } 
  const response = await fetch(baseURL + "/" + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}


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
export async function checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    };

     let callUrl = baseURL;
     if (!baseURL.endsWith("/"))
     callUrl += "/";
    return await fetch(callUrl + "checkout", options).then(convertToJson);
    
}