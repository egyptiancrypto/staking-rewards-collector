import { addPriceData } from "./api.js";
import { makeDaysArray, initializeObject } from "./utils.js";
import { addStakingData } from './curl.js';

export async function gatherData(userInput){
    let start = userInput.start;
    let end = userInput.end;
    let network = userInput.network;
    let address = userInput.address;
    let currency = userInput.currency;
    let incomeTax = userInput.incomeTax;

    let obj = {};
    let daysArray = [];

    daysArray = makeDaysArray(new Date(start), new Date(end));
    obj = initializeObject(daysArray, network, address, currency, incomeTax);
    obj = await addPriceData(obj);
    obj = await addStakingData(obj);

    return obj;
}
