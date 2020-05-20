const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "5835718Kk",
  database: "nodemysql",
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (!err) {
    console.log("Connected");
  } else {
    throw err;
  }
});

module.exports = mysqlConnection;
