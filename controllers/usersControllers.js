import createToken from '../middlewares/createToken.js'
import db from '../models/users.js'
import md5 from 'md5'

export default {
    async registration(req, res, next) {
        try {
            const { firstName, lastName, email, password } = req.body
            const emailExists = await db.login(email)
            if (emailExists) {
                return res.status(409).json({ message: 'Email already exists' })
            }

            const newData = {
                firstName,
                lastName,
                email,
                password: md5(md5(password) + process.env.SECRET_FOR_PASSWORD),
            }

            await db.registration(newData)
            return res.status(201).json({ message: 'User created successfully' })

        }catch(err) {
            return res.status(500).json({ message: err.message })
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body

            const user = await db.login(email,password)

            if (!user || md5(md5(password) + process.env.SECRET_FOR_PASSWORD) !== user.password) {
                return res.status(401).json({ message: 'Invalid email or password' })
            }

            const token = createToken(user.email, user.id)
            return res.status(200).json({ message: 'Login successful', token })

        } catch (error) {
            console.error('Error executing query:', error)
            return res.status(500).json({ message: 'Internal server error', error: error.message })
        }
    },
    async getUsersList(req, res) {
        try {
            const data = await db.getUsersList()

            if (data){
                res.status(200).json({usersList: data,})
            }
            return res.status(404).json({ message: 'Users not found' })

        } catch (error) {
            console.error('Error executing query', error)
            res.status(500).json({ message: 'Internal server error' })
        }
    },

    async getUserProfile(req, res) {
        try {
            const { email } = req.user

            if (!email) {
                return res.status(400).json({ message: 'Email not found in token' })
            }

            const user = await db.login(email)

            if (user) {
                return res.status(200).json({ user })
            }

            res.status(404).json({ message: 'User not found' })
        } catch (e) {
            console.error('Error fetching user profile:', e)
            res.status(500).json({ message: e.message, status: 500 })
        }
    },
    async updateUserProfile(req, res) {
        try {
            const { id } = req.user
            const { firstName, lastName, email, password } = req.body
            if (email !== req.user.email) {
                return res.status(400).json({ message: 'You cannot update your email' })
            }
            const newData = {
                id,
                firstName,
                lastName,
                email,
                password: md5(md5(password) + process.env.HESS_KEY),
            }

            const data = await db.updateUser(newData)
            if (data.length === 0) {
                return res.status(404).json({ message: 'User not found' })
            }
            return res.status(200).json({ status: 'success', data: newData })


        } catch (error) {
            console.error('Error updating user profile:', error.message)
            res.status(500).json({ message: 'Internal server error', status: 500 })
        }
    },

    async deleteUser(req, res) {
        try {
            const { id } = req.params

            if (!id) {
                return res.status(400).json({ message: 'User ID is required' })
            }

            const result = await db.deleteUser(id)

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'User not found' })
            }

            return res.status(200).json({ message: 'User deleted successfully' })
        } catch (error) {
            res.status(500).json({ message: error.message, status: 500 })

        }
    },
}