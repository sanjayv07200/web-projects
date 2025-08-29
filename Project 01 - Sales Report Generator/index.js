const fs = require("fs");

const data = fs.readFileSync("./salesData.json", "utf8");
const products = JSON.parse(data);

let totalRevenue = 0;
let totalUnitsSold = 0;
let maxSoldProduct = 0;
let maxSoldProductName = null;
let highestRevenue = 0;
let highestRevenueProductName = null;
let categoryWiseRev = {};

function objToStr(obj) {
  let str = "";
  for (let key in obj) {
    const value = obj[key];
    str += `- ${key}:₹${value}\n`;
  }
  return str;
}

function getTop(products, count) {
  const start = 0;
  const end = count - 1;

  let str = "";
  for (let i = start; i <= end; i++) {
    const { product, revenue } = products.at(i);
    str += `${i + 1}. ${product} - ₹${revenue}\n`;
  }
  return str;
}

products.forEach(function (product) {
  const { id, product: name, category, price, quantitySold, date } = product;
  const revenue = price * quantitySold;
  product.revenue = revenue;

  totalRevenue += revenue;
  totalUnitsSold += quantitySold;

  if (maxSoldProduct < quantitySold) {
    maxSoldProduct = quantitySold;
    maxSoldProductName = name;
  }

  if (highestRevenue < revenue) {
    highestRevenue = revenue;
    highestRevenueProductName = name;
  }

  if (categoryWiseRev[category] === undefined) {
    categoryWiseRev[category] = 0;
  }
  categoryWiseRev[category] += revenue;
});

products.sort(function (a, b) {
  const revA = a.revenue;
  const revB = b.revenue;
  //what you want
  if (revA > revB) return -1;
  //what you don't want
  if (revA < revB) return 1;
  //you don't care
  if (revA === revB) return 0;
});

const result = `
----------------------------------------
         SALES REPORT - AUG 2025
----------------------------------------
Total Revenue: ₹${totalRevenue}
Total Units Sold: ${totalUnitsSold}

Best-Selling Product: ${maxSoldProductName} (${maxSoldProduct} units)
Highest Revenue Product: ${highestRevenueProductName} (₹${highestRevenue})

Category-Wise Revenue:
${objToStr(categoryWiseRev)}

Top 5 Products by Revenue:
${getTop(products, 5)}
----------------------------------------`;

fs.writeFileSync("output.txt", result, "utf-8");
console.log("output.txt created.");
