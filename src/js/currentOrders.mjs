import { getOrders } from "./externalServices.mjs";

function orderTemplate(order) {
  return `<tr><td>${order.id}</td>
  <td>${new Date(order.orderDate).toLocaleDateString("en-US")}</td>
  
  <td>${order.street}</td>
  <td>${order.state}</td>
  <td>${order.zip}</td>
  <td>${JSON.stringify(order.items, ["id", "quantity"], null)}</td>
 <td>${order.items.length}</td> 
  <td>${order.orderTotal}</td></tr>`;
}

export default async function currentOrders(select, token) {
  try {
    const orders = await getOrders(token);

    const parent = document.querySelector(`${select} tbody`);
    parent.innerHTML = orders.map(orderTemplate).join("");
  } catch (err) {
    console.log(err);
  }
}
