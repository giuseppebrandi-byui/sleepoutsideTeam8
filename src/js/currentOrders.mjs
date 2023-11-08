import { getOrders } from "./externalServices.mjs";
import { renderListWithTemplate } from "./utils.mjs";
var images = null;
var orders = null;
function orderCardTemplate(orders) {
  console.log("images");
  return `<li class="product-card-header">
              <img
                src="${
                  images.hits
                    ? images.hits[orders.id].previewURL
                    : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ02JM-sUMhWMdG04WbZ5sM9LuRoVbID-yUfR2QF957pfvbyN6WRFvfmXueJhU3eI-iGcA&usqp=CAU`
                }";
                alt=""
              />
              <h3 class="card__brand">${orders.fname}</h3>
              <h2 class="card__name">${orders.lname}</h2>
              <p class="card__description" style="display:none">${
                orders.state
              }</p>
              <p class="card__street">${orders.street}</p>
    </li>`;
}

export default async function currentOrders(select, token) {
  orders = await getOrders(token);
  var minOrder = 0;
  var maxOrder = 16;
  // event listener (when someone clicks we will repopulate orders copying line 26. minOrder = maxOrder + 1 while maxOrder = maxOrder + 4);
  // To go back just take -5 to minOrder and from maxOrder take -4;
  images = await (
    await fetch(
      `https://pixabay.com/api/?key=40560343-849e93496335afbe6f6ce00d7&q=profile&image_type=photo`
    )
  ).json();
  console.log(images);
  const el = document.querySelector(".orders-list");
  renderListWithTemplate(
    orderCardTemplate,
    el,
    orders.slice(minOrder, maxOrder)
  );
}
