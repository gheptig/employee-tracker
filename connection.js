const mysql = require("mysql");
const inquirer = require("inquirer");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log(`connected as id ${connection.threadId}`);
  selectMenu();
});

// Need Select menu prompt to trigger what task a user is trying to do

const selectMenu = () => {
  inquirer
    .prompt({
      type: "list",
      name: "selection",
      message: "Select an option",
      choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "View Departments",
        "View Roles",
        "View Employees",
        "Quit",
      ],
    })
    .then((input) => {
      if (input.selection === "Add Department") {
        addDepartment();
      } else if (input.selection === "View Departments") {
        viewDepartments();
      } else if (input.selection === "View Roles") {
        viewRoles();
      } else if (input.selection === "View Employees") {
        viewEmployees();
      } else {
        quit();
      }
    });
};

const addDepartment = () => {
  inquirer
    .prompt({
      type: "input",
      name: "departmentName",
      message: "Enter a new department name",
    })
    .then((input) => {
      connection.query(
        "INSERT INTO department SET?",
        {
          name: input.departmentName,
        },
        (err) => {
          if (err) {
            throw err;
          }
          console.log("Department Added");
          selectMenu();
        }
      );
    });
};

const viewDepartments = () => {
  connection.query("SELECT * FROM employee_tracker.department", (err, res) => {
    console.table(res);
    selectMenu();
  });
};

const viewRoles = () => {
  connection.query("SELECT * FROM employee_tracker.role", (err, res) => {
    console.table(res);
    selectMenu();
  });
};

const viewEmployees = () => {
  connection.query("SELECT * FROM employee_tracker.employee", (err, res) => {
    console.table(res);
    selectMenu();
  });
};

const quit = () => {
  connection.end();
};

// MINIMUM REQUIREMENTS
//  * Add departments, roles, employees
//  * View departments, roles, employees
//  * Update employee roles

// BONUS FEATURES
// * Update employee managers
// * View employees by manager
// * Delete departments, roles, and employees
// * View the total utilized budget of a department -- ie the combined salaries of all employees in that department

// NPM PACKAGES
// * inquirer (installed)
// * mysql (installed)
// * dotenv (installed)
// * console.table (installed)

// SCHEMA
// * DEPARTMENT TABLE (DONE)
// * ROLE (DONE)
// * EMPLOYEE (DONE)

//  SEEDS
//  PRE-POPULATE DB (Done)

//  OTHER THINGS TO CONSIDER
// CLASS FOR SQL QUERIES
// USE SQL JOIN
// CLASS FOR INQUIRER QUESTIONS(?)