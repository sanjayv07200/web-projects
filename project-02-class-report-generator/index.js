const fs = require("fs");
const { get } = require("http");
const { totalmem } = require("os");

const data = fs.readFileSync("./classData.json", "utf8");
const studentData = JSON.parse(data);

let studentperformance = "";
let totalPercentage = 0;
let averagePercentage = 0;
let topPerformer = null;
let highPercentage = 0;
const below70 = [];
const below75Attendance = [];

studentData.forEach(function (student) {
  const { id, name, marks, attendance } = student;
  const total = Object.values(student.marks).reduce((acc, ele) => acc + ele, 0);
  const percentage =
    (total / (Object.values(student.marks).length * 100)) * 100;

  if (percentage > 75) grade = "A";
  else if (percentage > 55 && percentage <= 75) grade = "B";
  else if (percentage > 30 && percentage <= 55) grade = "C";
  else if (percentage <= 30) grade = "D";

  totalPercentage += percentage;
  averagePercentage = totalPercentage / studentData.length;

  if (highPercentage < percentage) {
    highPercentage = percentage;
    topPerformer = name;
  }

  if (percentage < 70) {
    below70.push(name);
  }

  if (attendance < 75) {
    below75Attendance.push(name);
  }

  studentperformance += `${id}. ${name} - Total: ${total} | Percentage: ${percentage.toFixed(
    2
  )}% | Grade: ${grade}\n`;
});

const result = `
--------------------------------------------
           CLASS REPORT - AUG 2025
--------------------------------------------

Individual Performance:
${studentperformance}\n
-------------------------------------------
Class Summary:
- Class Average Percentage: ${averagePercentage.toFixed(2)}%
- Top Performer:${topPerformer}(${highPercentage.toFixed(2)}%)
- Students Below 70%: ${below70}
- Students with Low Attendance (<75%): ${below75Attendance}
--------------------------------------------`;
fs.writeFileSync("output.txt", result, "utf-8");
