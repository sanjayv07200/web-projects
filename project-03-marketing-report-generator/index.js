const fs = require("fs");
const { appendFile } = require("fs/promises");

const data = fs.readFileSync("./marketingData.json", "utf-8");
const finalData = JSON.parse(data);

// fs.appendFileSync("output.txt", , "utf-8");
const appentext = function (text) {
  fs.appendFileSync("output.txt", text, "utf-8");
};

appentext(`
---------------------------------------------------
          MARKETING REPORT - AUGUST 2025
---------------------------------------------------

Campaign Performance:`);
let totalSpend = 0;
let totalRevenue = 0;
let totalROI = 0;
const maxROI = { name: null, roi: Number.MIN_VALUE };
const minROI = { name: null, roi: Number.MAX_VALUE };
finalData.forEach(function (campaign) {
  const { id, cost, impressions, clicks, conversions, revenue, campaignName } =
    campaign;
  const CTR = (clicks / impressions) * 100;
  const CR = (conversions / clicks) * 100;
  const ROI = ((revenue - cost) / cost) * 100;

  totalSpend += cost;
  totalRevenue += revenue;
  totalROI += ROI;

  if (maxROI.roi < ROI) {
    maxROI.roi = ROI;
    maxROI.name = campaignName;
  }

  if (minROI.roi > ROI) {
    minROI.roi = ROI;
    minROI.name = campaignName;
  }

  appentext(`
  ${id}. ${campaignName}
      - CTR: ${CTR.toFixed(2)}%
      - Conversion Rate: ${CR.toFixed(2)}%
      - ROI: ${ROI.toFixed(2)}%
      - Revenue: ₹${revenue.toLocaleString()} | Cost: ₹${cost.toLocaleString()}`);
});

appentext(`
---------------------------------------------------
Overall Summary:
    - Total Spend: ₹${totalSpend.toLocaleString()}
    - Total Revenue: ₹${totalRevenue.toLocaleString()}
    - Overall ROI: ${totalROI.toFixed(2)}%
    - Best Performing Campaign: ${maxROI.name}
    - Campaign Needing Optimization: ${minROI.name}
---------------------------------------------------`);
