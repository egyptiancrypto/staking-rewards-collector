import fs from 'fs';

export function exportVariable(data, name){
    try {
        fs.writeFileSync(name, data);
        } catch (err) {
        console.error(err);
        }
}

export function readJSON(filePath) {
    const rawContent = fs.readFileSync(filePath);

    return JSON.parse(rawContent);
  }

  export function writeCSV(obj, name){
    const filename = name;

     try {
         fs.writeFileSync(filename, extractAsCSV(obj));
        } catch (err){
        console.error(err);
        }
    }

  function extractAsCSV(obj){
    const header = [
        "Day, Price in " + obj.currency +
        `, Daily ${((obj.network == 'polkadot') ? 'DOT' : 'KSM')} Volume` +  
        ", Staking Rewards in" + ((obj.network == 'polkadot') ? ' DOT' : ' KSM') + 
        ", Number of Payouts" +
        ", Value in Fiat" +
        ", Income tax (" + (obj.incomeTax*100).toFixed(2) + "%)"
    ]; 
    
    const rows = obj.data.list
        .filter(entry => entry.numberPayouts > 0)
        .map(entry => `${entry.day}, ${entry.price}, ${entry.volume}, ${entry.amountHumanReadable}, ${entry.numberPayouts}, ${entry.valueFiat}, ${entry.valueTaxable}`);

      return header.concat(rows).join("\n");
  }