const fs = require("fs");

const data = fs.readFileSync("data.json", "utf-8");
const fdata = JSON.parse(data);

function appendText(text) {
  fs.appendFileSync("output.txt", text, "utf-8");
}

function countByObj(obj, key, value) {
  if (obj[key] === undefined) {
    obj[key] = 0;
  }
  obj[key] += value;
}

const statusBreakdown = {};
const priorityBreakdown = {};
let totalTime = 0;
const totalTask = fdata.length;
const mostTimespent = { task: "", time: 0 };

fdata.forEach(function ({ status, priority, timeSpentHours, title }) {
  totalTime += timeSpentHours;
  if (mostTimespent.time < timeSpentHours) {
    mostTimespent.time = timeSpentHours;
    mostTimespent.task = title;
  }
  countByObj(statusBreakdown, status, 1);
  countByObj(priorityBreakdown, priority, 1);
});
const averageTime = totalTime / totalTask;
const efficiency = (statusBreakdown.Completed / totalTask) * 100;
