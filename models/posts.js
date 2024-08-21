import db from '../clients/db.mysql.js'
import _ from "lodash";

export default {
    createPosts: async data => {
        try {
            const [rows] = await db.query(`
			INSERT INTO posts (user_id, title, description) 
            VALUES (?, ?, ?)`, [data.userId, data.title, data.description])

            const postId = rows.insertId

            const [newPost] = await db.query(
                'SELECT * FROM posts WHERE id = ?',
                [postId]
            )

            return newPost
        } catch (error) {
            console.error('Database error:', error)
            throw new Error('Could not create post')
        }
    },

    getPosts: async () => {
        const [rows] = await db.query(`SELECT * FROM posts`)
        return _.head(rows)
    },
    getSinglePost: async id => {
        const [rows] = await db.query(
            `SELECT * FROM posts WHERE user_id = ?`,
            [id]
        )
        return rows
    },

    updatePost: async data => {
        try {

            const [rows] = await db.query(`
            UPDATE posts SET  user_id= ? , title = ?, description =? WHERE id = ?`
                , [data.userId, data.title, data.description, data.id,
                ]);
            return _.head(rows)

        } catch (error) {
            console.error('Database error:', error)
            throw new Error('Could not update post')
        }
    },
    deletePost: async id => {
        const [rows] = await db.query(`DELETE FROM posts WHERE id = ?`, [
            id,
        ])
        return _.head(rows)
    },
}