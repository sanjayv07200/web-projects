const fs = require("fs");

const data = fs.readFileSync("./classData.json", "utf8");
const studentData = JSON.parse(data);

// console.log(studentData);
let Total = 0;
let Percentage = 0;
let Grade = null;

studentData.forEach(function (stu_info, i) {
  console.log(stu_info.marks);
});

/*Individual Performance:
1. Aarav Sharma - Total: 261 | Percentage: 87% | Grade: A
2. Priya Das - Total: 239 | Percentage: 79% | Grade: B
3. Rohan Mehta - Total: 206 | Percentage: 68% | Grade: C
4. Sneha Patel - Total: 275 | Percentage: 91% | Grade: A
5. Kabir Khan - Total: 173 | Percentage: 58% | Grade: D */
