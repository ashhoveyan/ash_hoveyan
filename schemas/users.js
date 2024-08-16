import Joi from 'joi';

export default {
    registration: Joi.object({
        fName: Joi.string().trim().min(1).max(30).required(),
        lName: Joi.string().trim().min(1).max(30).required(),
        email: Joi.string().trim().email({minDomainSegments: 2}).required(),
        password: Joi.string().trim().min(8).max(32).required(),
    }),
    login: Joi.object({
        email: Joi.string().trim().email({minDomainSegments: 2}).required(),
        password: Joi.string().trim().min(8).max(32).required(),

    })
}