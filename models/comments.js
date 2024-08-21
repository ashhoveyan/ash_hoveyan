import db from '../clients/db.mysql.js'
import _ from 'lodash'

export default {
    async getComments() {
        const [rows] = await db.query(
            `
				select * from postComments;
			`
        )
        return _.head(rows)
    },
    async getPostComments(postId) {
        const [rows] = await db.query(
            `
            SELECT postComments.id,
                   postComments.commentContent,
                   postComments.createdAt,
                   users.id AS userId,
                   CONCAT(users.fistName, ' ', users.lastName) AS userName
            FROM postComments
            LEFT JOIN users ON postComments.userId = users.id
            WHERE postComments.postId = ?
            ORDER BY postComments.createdAt DESC;
        `,
            [postId]
        )

        return _.head(rows)
    },

    async createComments(data) {
        const [rows] = await db.query(
            `INSERT INTO postComments (postId,userId,commentContent)
     		 VALUES (?, ?, ?)
				 `,
            [data.postId, data.userId, data.comment]
        )
        return _.head(rows)
    },
}