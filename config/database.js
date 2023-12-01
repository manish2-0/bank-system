const mysql = require('mysql')
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bank"
})

connection.connect()

exports.connection = connection;