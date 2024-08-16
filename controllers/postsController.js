import db from '../models/posts.js'

export default {
    async createPost(req, res) {
        try {
            const { id } = req.user
            const { title, description, taskDate } = req.body

            const newData = {
                userId: id,
                title,
                description,
                taskDate,
            }

            const data = await db.createTasks(newData)

            if (!data || data.length === 0) {
                return res.status(404).json({ message: 'Task not created.' })
            }
            res.status(200).json({ task: data[0] })
        } catch (e) {
            console.error('Error creating task:', e)
            res.status(500).json({ message: e.message, status: 500 })
        }
    },
    async getPosts(req, res) {
        try {
            const data = await db.getTasks()
            if (!data) {
                return res.status(404).json({ message: 'Tasks not found' })
            }

            res.status(200).json({
                status: 'success',
                posts: data,
            })
        } catch (error) {
            console.error('Error fetching tasks from the database:', error)

            res.status(500).json({
                status: 'error',
                message: 'Internal server error',
            })
        }
    },
    async getSinglePost(req, res) {
        try {
            const { id } = req.user

            const data = await db.getSingleTask(id)
            console.log(data)

            if (!data) {
                return res
                    .status(404)
                    .json({ status: 'error', message: 'Post not found' })
            }
            return res.status(200).json({ status: 'success', posts: data })
        } catch (e) {
            console.error('Error fetching post:', e)
            res.status(500).json({ message: e.message, status: 'error' })
        }
    },
    async updatePost(req, res) {
        try {
            const { id } = req.user
            const { postId, title, description, taskDate } = req.body

            if (!postId) {
                return res.status(400).json({ message: 'Post ID is required' })
            }

            const newData = {
                userId: id,
                title,
                description,
                taskDate,
                id: postId,
            }

            const result = await db.updatePost(newData)

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Post not found' })
            }

            return res.status(200).json({ status: 'success', data: newData })
        } catch (error) {
            console.error('Update post error:', error)
            return res.status(500).json({ message: error.message, status: 500 })
        }
    },
    async deletePost(req, res) {
        try {
            const { id } = req.params
            if (!id) {
                return res.status(403).json({ message: 'Post ID is required' })
            }

            const result = await db.deletePost(id)
            console.log(result)

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Post not found' })
            }

            return res.status(200).json({ message: 'Post deleted successfully' })
        } catch (error) {
            return res.status(500).json({ message: error.message, status: 500 })
        }
    },

}