import connection from '../clients/db.mysql.js'
import _ from 'lodash'

export default {
    login: async email => {
        const [rows] = await connection.query(
            `SELECT * FROM users WHERE email = ? LIMIT 1`,
            [email]
        )
        return rows.length > 0 ? _.head(rows) : null
    },

    registration: async data => {
        const [rows] = await connection.query(
            `INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`,
            [data.firstName, data.lastName, data.email, data.password, new Date()]
        )
        return _.head(rows) || null
    },

    getUsersList: async () => {
        const [rows] = await connection.query(`SELECT * FROM users`)
        return rows
    },
    updateUser: async data => {
        const [rows] = await connection.query(
            `UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ? WHERE id = ?`,
            [data.firstName, data.lastName, data.email, data.password, data.id]
        )
        return _.head(rows)
    },
    deleteUser: async id => {
        const [rows] = await connection.query(`DELETE FROM users WHERE id = ?`, [
            id,
        ])
        return _.head(rows)
    }
}