import Joi from 'joi'

export default {
    createPost: Joi.object({
        title: Joi.string().trim().min(3).max(100).required(),
        description: Joi.string().trim().min(3).max(5000).required(),
    }),

    getSinglePost: Joi.object({
        userId: Joi.number().integer().positive().required()
    }),
    updatePost: Joi.object({
        postId: Joi.number().integer().positive().required(),
        title: Joi.string().trim().min(3).max(100).required(),
        description: Joi.string().trim().min(3).max(5000).required(),
    }),
    deletePost: Joi.object({
        id: Joi.number().integer().positive().required(),
    })
}