const Joi = require('joi')

const Ticket = Joi.object({
    client: Joi.string(),
    company: Joi.string(),
    trouble: Joi.string(),
    status: Joi.string().required().messages({
        'string.empty': 'Status is required',
        'string.base': 'Status must be a string',
        'any.required': 'Status is required',
    }),
    statusLevel: Joi.number().required(),
    userId: Joi.number().integer().required().messages({
        'any.required': 'User ID is required',
        'number.empty': 'User ID can not be empty',
    }),
    createdAt: Joi.date(),
    createdBy: Joi.string(),
    updatedAt: Joi.date(),
    updatedBy: Joi.string(),
    deletedAt: Joi.date(),
    deletedBy: Joi.string(),
});

function ValidateTicket(data) {
    return Ticket.validate(data)
}

module.exports = ValidateTicket