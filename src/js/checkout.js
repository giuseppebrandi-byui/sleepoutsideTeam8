import { loadHeaderFooter } from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

const headerFooter = async () => {
  await loadHeaderFooter();
};
headerFooter();
checkoutProcess();

