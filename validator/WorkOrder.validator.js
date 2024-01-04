const Joi = require('joi')

const WorkOrder = Joi.object({
    status: Joi.string().required().messages({
        'string.empty': 'Status is required',
        'string.base': 'Status must be a string',
        'any.required': 'Status is required',
    }),
    statusLevel: Joi.number().required(),
    ticketId: Joi.number().integer().required().messages({
        'any.required': 'Ticket ID is required',
        'number.empty': 'Ticket ID can not be empty',
    }),
    isAccepted: Joi.boolean(),
    createdAt: Joi.date(),
    createdBy: Joi.string(),
    updatedAt: Joi.date(),
    updatedBy: Joi.string(),
    deletedAt: Joi.date(),
    deletedBy: Joi.string(),
});

function ValidateWorkOrder(data) {
    return WorkOrder.validate(data)
}

module.exports = ValidateWorkOrder