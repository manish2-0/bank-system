const mysql = require('mysql')
const connection = mysql.createConnection({
  host: "buyfkco6byofk0ysclrm-mysql.services.clever-cloud.com",
  user: "ujyc264gnp4bukfw",
  password: "O8qkAVDrsedxI6l1WnFb",
  database: "buyfkco6byofk0ysclrm"
})

connection.connect()

exports.connection = connection;