import { getLocalStorage} from "./utils.mjs";
import { checkout } from "./externalServices.mjs";

function formDataToJSON(formElement) {
    const formData = new FormData(formElement),
        convertedJSON = {};
    
    FormData.forEach(function (value, key){
        convertedJSON[key] = value;
    });
    return convertedJSON;
}

function packageItems(items) {
    const cartItems = items.map((item) => {
        console.log(item);
        return {
            id: item.Id,
            price: item.FinalPrice,
            name: item.Name,
            quantity: 1,
        };
    });
    return cartItems;
}

const checkoutProcess = {
    key: "",
    outputSelector: "",
    list: [],
    itemTotal: 0,
    Quantity: 0,
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
        const subtotal = document.querySelector("#price");
        const quantity = document.querySelector("#items");
        const totalQuantity = this.list.map((item) => item.Quantity);
        this.Quantity = totalQuantity.reduce((sum, item) => sum + item);
        console.log(this.list);
        quantity.innerText = this.Quantity;
        const cost = this.list.map((item) => item.FinalPrice * item.Quantity);
        this.itemTotal = cost.reduce((sum, item) => sum + item).toFixed(2);
        subtotal.innerText = "$" + this.itemTotal;
        
    },
    calculateOrderTotal: function () {
        this.tax = (this.itemTotal * 0.06).toFixed(2);
        this.shipping = 10 + (this.list.length - 1) * 2;
        this.orderTotal = (parseFloat(this.itemTotal)
            + parseFloat(this.shipping) + parseFloat(this.tax)).toFixed(2);
        this.displayOrderTotals();
    },
    displayOrderTotals: function () {
        const tax = document.querySelector("#tax");
        const shipping = document.querySelector("#shipping");
        const orderTotal = document.querySelector("#orderTotal");
        shipping.innerText = "$" + this.shipping;
        tax.innerText = "$" + this.tax;
        orderTotal.innerText = "$" + this.orderTotal;
    },

    checkout: async function (form) {
        const json = formDataToJSON(form);
        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageitems(this.list);
        console.log(json);
        try {
            const res = await checkout(json);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    },

};
export default checkoutProcess;

