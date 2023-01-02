const mysql = require("mysql2");
const path = require("path");
// const dotenv = require("dotenv");
// dotenv.config({ path: "./.env" });

const con = mysql.createConnection({
    port:process.env.DATABASE_PORT,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: process.env.DATABASE_MULTIPLESTATEMENTS,
//   host: "localhost",
//   user: "root",
//   password: "Mohd@8279",
//   database: "signinandsignupdb",
//   multipleStatements: true,
});

con.connect((err) => {
    if (err) {
      console.warn("error");
    } else {
      console.warn("connected");
    }
  });
  module.exports = con;