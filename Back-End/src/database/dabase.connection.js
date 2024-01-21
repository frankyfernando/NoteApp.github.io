const mysql = require('mysql2')

const db = mysql.createConnection({
    user: "root",
    password: "",
    host: "localhost",
    database: "note_db",
});

module.exports = db.promise();