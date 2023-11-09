import { loadHeaderFooter } from "./utils.mjs";
import { checkLogin } from "./auth.mjs";
import currentOrders from "./currentOrders.mjs";

const headerFooter = async () => {
  await loadHeaderFooter();
};

headerFooter();
// currentOrders will need to send the token to the server with the request or
// it will be denied.if checkLogin will return the token upon success
const token = checkLogin();
currentOrders("#orders", token);
