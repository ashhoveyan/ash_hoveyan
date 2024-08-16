import mysql from "mysql2"

const {
    DB_HOST,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
}= process.env

const dbConfig = {
    host:DB_HOST,
    database:DB_NAME,
    user:DB_USER,
    password:DB_PASSWORD,
}

const connection = mysql.createConnection(dbConfig);

export default connection.promise()