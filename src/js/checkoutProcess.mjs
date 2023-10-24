import { getLocalStorage, cartCounter, cartTotal } from "./utils.mjs";

const checkoutProcess = {
    key: "",
    outputSelector: "",
    list: [],
    itemTotal: 0,
    shipping: 0,
    tax: 0,
    orderTotal: 0,
    init: function (key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = getLocalStorage(key);
        this.calculateItemSummary();
    },
    calculateItemSummary: function () {
        let quantity = cartCounter();
        document.querySelector(".subtotal").innerHTML = quantity;
        let subtotal = cartTotal();
        document.querySelector("#price").innerHTML = subtotal;
    },
    calculateOrdertotal: function () {
        let subtotal = cartTotal();
        let quantity = cartCounter();
        let zipCode = document.querySelector("#zip");
        if (zipCode) {
            let tax = (subtotal * .06);
            let shipping = (10 + ((quantity - 1) * 2));
        }
        let orderTotal = subtotal + tax + shipping;
        this.displayOrderTotals();
    },
    displayOrderTotals: function () {
        document.querySelector("#taxAmount").innerHTML = tax;
        document.querySelector("#shippingTotal").innerHTML = shipping;
        document.querySelector("#finalTotal").innerHTML = orderTotal;
    }
}

export default checkoutProcess;