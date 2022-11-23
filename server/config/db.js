/*
The “mysql” package allows JavaScript to interact with outside MySQL servers.
“db” is the database/connection that is created given the options.
These options are based off of XAMPP MySQL configurations. By default,
the user is “root” and the password field is blank. The “db” is then
explicitly exported to be used in other parts of the project.
*/

const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "",
  database: "csc4402",
});

module.exports = db;
