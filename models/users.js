import connection from '../clients/db.mysql.js'

export default {
    login: async email => {
        const [rows] = await connection.query(
            `SELECT * FROM users WHERE email = ?`,
            [email]
        )
        return rows.length > 0 ? rows[0] : null
    },

    registration: async data => {
        const [rows] = await connection.query(
            `INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`,
            [data.firstName, data.lastName, data.email, data.password, new Date()]
        )
        return rows || null
    },

    getUsersList: async () => {
        const [rows] = await connection.query(`SELECT * FROM users`)
        return rows
    },
    updateUser: async data => {
        const [rows] = await connection.query(
            `UPDATE users SET first_name = ?, last_name = ?, email = ?, md_password = ? WHERE id = ?`,
            [data.firstName, data.lastName, data.email, data.password, data.id]
        )
        return rows
    },
    deleteUser: async id => {
        const [rows] = await connection.query(`DELETE FROM users WHERE id = ?`, [
            id,
        ])
        return rows
    }
}