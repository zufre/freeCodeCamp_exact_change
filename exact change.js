var denominations = [
  {name: 'ONE HUNDRED',  value: 100.00},
  {name: 'TWENTY',       value: 20.00},
  {name: 'TEN',          value: 10.00},
  {name: 'FIVE',         value: 5.00},
  {name: 'ONE',          value: 1.00},
  {name: 'QUARTER',      value: 0.25},
  {name: 'DIME',         value: 0.10},
  {name: 'NICKEL',       value: 0.05},
  {name: 'PENNY',        value: 0.01}
];

function checkCashRegister(price, cash, cid) {
  var change = cash - price;
  var totalCid = cid.reduce(function(acc, next) {
    return acc + next[1];
  }, 0.0)

  if (totalCid < change) {
    return {status: "INSUFFICIENT_FUNDS", change: []}
  }else if ( totalCid === change ) {
    return {status: "CLOSED", change: cid}
  }   
  cid = cid.reverse;

  var result = denominations.reduce(function(acc, next, index) {
     if(change >= next.value) {
       var currentvalue = 0.0;
       while (change >=  next.value && cid[index][1] >= next.value) {
          currentvalue += next.value;
          change -= next.value;
          change = Math.round(change * 100) / 100;
          cid[index][1] -= next.value;
       }
       acc.push([next.name, currentValue]);
       return {status: "OPEN", change: acc};
     }else{
       return {status: "OPEN", change: acc};
     }
  }, [])


  return result;
}



checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);