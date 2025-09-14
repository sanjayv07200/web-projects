const fs = require("fs");

const data = fs.readFileSync("data.json", "utf-8");
const fData = JSON.parse(data);

function appendText(text) {
  fs.writeFileSync("output.txt", text, "utf-8");
}
function getrevenueByObj(obj, key, value) {
  if (obj[key] == undefined) {
    obj[key] = 0;
  }
  obj[key] += value;
}

const revenueByCustomer = {};
const revenueByCategory = {};
const countOrderByStatus = {};
let totalRevenue = 0;
let orderRevenue = 0;
fData.forEach(function (order) {
  const { customer, items, status } = order;
  items.forEach(function (itemDetails) {
    const { price, quantity, category } = itemDetails;
    const itemRevenue = price * quantity;
    totalRevenue += itemRevenue;

    getrevenueByObj(revenueByCustomer, customer, itemRevenue);
    getrevenueByObj(revenueByCategory, category, itemRevenue);
    getrevenueByObj(countOrderByStatus, status, 1);
  });
});

appendText(`
-----------------------------------------
         E-COMMERCE ORDER REPORT
-----------------------------------------
Total Revenue: ₹${totalRevenue}
Total Orders: ${fData.length}
Unique Customers: ${Object.keys(revenueByCustomer).length}
`);
