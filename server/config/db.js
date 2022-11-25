/*
The “mysql” package allows JavaScript to interact with outside MySQL servers.
“db” is the database/connection that is created given the options.
These options are based off of XAMPP MySQL configurations. By default,
the user is “root” and the password field is blank. The “db” is then
explicitly exported to be used in other parts of the project.
*/

// 34.170.113.70
// 1234

const mysql = require("mysql");
const db = mysql.createConnection({
  host: "54.227.45.243",
  user: "newadminroot",
  port: 3306,
  password: "",
  database: "csc4402",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL Connected...");
  }
});

module.exports = db;
