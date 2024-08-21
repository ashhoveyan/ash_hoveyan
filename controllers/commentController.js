import db from '../models/comments.js';

export default {
    async getComments(req, res) {
        try {
            const data = await db.getComments()
            if (!data) {
                return res.status(404).json({ message: 'Comments not found' })
            }

            res.status(200).json({ comments: data })
        } catch (error) {
            console.error('Error fetching comments:', error)
            res.status(500).json({ message: 'Internal server error' })
        }
    },

    async getCommentsByPostId(req, res) {
        try {
            const { postId } = req.params
            const data = await db.getPostComments(postId)
            if (!data || data.length === 0) {
                return res.status(404).json({ message: 'Comments not found' })
            }

            res.status(200).json({ comments: data })
        } catch (error) {
            console.error('Error fetching comments:', error.message)
            res.status(500).json({ message: 'Internal server error' })
        }
    },
    async createComment(req, res) {
        try {
            const { id } = req.user
            const { postId, comment } = req.body

            const newData = {
                userId: id,
                comment,
                postId,
            }
            console.log(newData)

            const data = await db.createComments(newData)

            if (!data || data.length === 0) {
                return res
                    .status(404)
                    .json({ status: '404', message: 'Comment not created.' })
            }
            res.status(200).json({ comment: data[0] })
        } catch (e) {
            console.error('Error creating comment:', e)
            res.status(500).json({ message: e.message, status: 500 })
        }
    },
}