const fs = require("fs");

const dataStr = fs.readFileSync("data.json", "utf-8");
const fData = JSON.parse(dataStr);

const appendText = function (text) {
  fs.appendFileSync("output.txt", text, "utf-8");
};

const EmployeeCount = fData.length;
let totalsalary = 0;
const highestsalary = { name: null, salary: 0 };
const deparmentwiseInfo = {};

fData.forEach(function (emp) {
  const { name, salary, experience, department } = emp;
  totalsalary += salary;

  if (highestsalary.salary < salary) {
    highestsalary.salary = salary;
    highestsalary.name = name;
  }

  if (deparmentwiseInfo[department] === undefined) {
    deparmentwiseInfo[department] = { count: 0, totalsalary: 0 };
  }
  deparmentwiseInfo[department].count += 1;
  deparmentwiseInfo[department].totalsalary += salary;
});
const averageSalary = totalsalary / EmployeeCount;

const appendDepartSummary = function (deparmentwiseInfo) {
  for (let department in deparmentwiseInfo) {
    const info = deparmentwiseInfo[department];
    const { count, totalsalary } = info;
    const avgSalary = totalsalary / count;

    appendText(
      `- ${department}: ${count} employees, Avg Salary ₹${avgSalary.toLocaleString()}\n`
    );
  }
};

const appendEmployeeByExp = function (fData) {
  const sortedData = fData.toSorted(function (a, b) {
    return b.experience - a.experience;
  });
  appendText(`\nSorted by Experience (High to Low):\n`);
  sortedData.forEach(function (emp, i) {
    const { name, experience } = emp;
    appendText(`${i + 1}. ${name} (${experience} years)\n`);
  });
};

appendText(`
-----------------------------------------
       EMPLOYEE ANALYTICS DASHBOARD
-----------------------------------------
Total Employees: ${EmployeeCount}
Average Salary: ₹${averageSalary.toLocaleString()}
Highest Paid Employee: ${
  highestsalary.name
} (₹${highestsalary.salary.toLocaleString()})

Department Summary:\n`);
appendDepartSummary(deparmentwiseInfo);
appendEmployeeByExp(fData);
