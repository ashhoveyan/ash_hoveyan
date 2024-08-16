import Joi from 'joi'

export default {
    updateTask: Joi.object({
        title: Joi.string().min(3).max(100).required(),
        description: Joi.string().min(3).max(100).required(),
        taskDate: Joi.date().iso().greater('now').required(),
        id: Joi.string().required(),
    }),
    create: Joi.object({
        title: Joi.string().min(3).max(100).required().messages(),
        description: Joi.string().min(3).max(5000).required().messages(),
        taskDate: Joi.date().iso().greater('now').required(),
    }),
}