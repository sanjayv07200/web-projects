const fs = require("fs");
const { get } = require("http");
const { totalmem } = require("os");

const data = fs.readFileSync("./classData.json", "utf8");
const studentData = JSON.parse(data);

// console.log(studentData);
let total = 0;
let percentage = 0;
let grade = null;
let name = null;
let info = "";
let totalMarks = 0;
let avegragePercentage = 0;

studentData.forEach(function (stu_info, i) {
  name = stu_info.name;
  id = stu_info.id;
  total = Object.values(stu_info.marks).reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  totalMarks += total;
  percentage = (total * 100) / 300;
  studentData.percentage = per;
  if (percentage > 75) {
    grade = "A";
  } else if (percentage > 55 && percentage <= 75) {
    grade = "B";
  } else if (percentage > 30 && percentage <= 55) {
    grade = "C";
  } else if (percentage <= 30) {
    grade = "D";
  }

  avegragePercentage = (totalMarks * 100) / 1500;

  info += `${i + 1}. ${name} - total:${total} | percentage: ${Math.floor(
    percentage
  )}% | grade:${grade}\n`;
});

console.log(
  `
--------------------------------------------
           CLASS REPORT - AUG 2025
--------------------------------------------
Individual Performance:\n`,
  info
);

/*Class Summary:
- Class Average percentage: 76.6%
- Top Performer: Sneha Patel (91%)
- Students Below 70%: Rohan Mehta, Kabir Khan
- Students with Low Attendance (<75%): Kabir Khan */
