import { alertMessage, removeAllAlerts } from "./utils.mjs";
import { newAccount } from "./externalServices.mjs";

function formDataToJSON(formElement) {
    const formData = new FormData(formElement),
        convertedJSON = {};
    
    formData.forEach(function (value, key){
        convertedJSON[key] = value;
    });
    return convertedJSON;
}

const accountProcess = {
    
    newAccount: async function (form) {
        const json = formDataToJSON(form);
        
        console.log(json);
        try {
            const res = await newAccount(json);
            console.log(res);
            
        } catch (err) {
            removeAllAlerts();
           for (let message in err.message) {
            alertMessage(err.message[message]);
           }

           console.log(err);
        }
    },

};
export default accountProcess;

