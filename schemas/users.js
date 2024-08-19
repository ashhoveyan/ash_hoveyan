import Joi from 'joi';

export default {
    registration: Joi.object({
        firstName: Joi.string().min(2).max(50).required(),
        lastName: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
    }),
    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
    })
}