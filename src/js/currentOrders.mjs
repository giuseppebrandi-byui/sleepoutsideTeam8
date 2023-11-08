import { getOrders } from "./externalServices.mjs";
import { renderListWithTemplate } from "./utils.mjs";
var orders = null;
function orderCardTemplate(orders) {
  return `<li class="product-card-header">
              <p>Name: ${orders.fname}</p>
              <p>Surname: ${orders.lname}</p>
              <p style="display:none">${orders.state}</p>
              <p>Address: ${orders.street}</p>
              <p>City: ${orders.city}</p>
              <p>Zip: ${orders.zip}</p>
          </li>`;
}

export default async function currentOrders(select, token) {
  orders = await getOrders(token);
  console.log(orders);
  const el = document.querySelector(".orders-list");
  renderListWithTemplate(orderCardTemplate, el, orders.slice(1, 100));
}
