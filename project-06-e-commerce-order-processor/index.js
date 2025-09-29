const fs = require("fs");

const data = fs.readFileSync("data.json", "utf-8");
const fData = JSON.parse(data);

function appendText(text) {
  fs.appendFileSync("output.txt", text, "utf-8");
}
function getrevenueByObj(obj, key, value) {
  if (obj[key] == undefined) {
    obj[key] = 0;
  }
  obj[key] += value;
}

function appendObj(object, formatStr) {
  for (let key in object) {
    const value = object[key];
    let str = formatStr;
    str = str.replaceAll("#key", key);
    str = str.replaceAll("#value", value.toLocaleString());
    appendText(str);
  }
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
Total Revenue: ₹${totalRevenue.toLocaleString()}
Total Orders: ${fData.length}
Unique Customers: ${Object.keys(revenueByCustomer).length}
`);

appendText(`\nRevenue by Customer:\n`);
appendObj(revenueByCustomer, `- #key: ₹#value\n`);
appendText(`\nRevenue by Category:\n`);
appendObj(revenueByCategory, `- #key: ₹#value\n`);
appendText(`\nOrders by Status:\n`);
appendObj(countOrderByStatus, `- #key: #value\n`);
