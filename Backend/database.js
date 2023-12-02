const mysql =  require('mysql2')

module.exports = mysql.createConnection({
    host: "localhost",
    user: "fohsenuser",
    password: "Dhilruba123",
    database: "sampleapp"
})

