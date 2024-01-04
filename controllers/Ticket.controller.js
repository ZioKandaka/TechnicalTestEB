const response = require('../helper/response.js');
const { User, Ticket, Notification, WorkOrder } = require('../models/index.js');
const ValidateTicket = require('../validator/Ticket.validator.js');

class TicketController {
    static async getTickets(req, res, next) {
        console.info(`TicketController: getTickets`)
        try {
            let { userId, size, page, status } = req.query
            let where_opt = {
                deletedAt: null
            }
            if (userId) {
                where_opt.userId = userId
            }
            if (size) {
                where_opt.limit = size
                if (page) {
                    where_opt.offset = page * size
                }
            }
            if (status) {
                where_opt.status = status
            }

            let { count, rows } = await Ticket.findAndCountAll({
                where: where_opt
            })

            response(res, 200, true, 'Data fetched', rows, count, page, size)
        } catch (err) {
            console.info(`Error TicketController: getTickets`)
            next(err)
        }
    }

    static async getTicketById(req, res, next) {
        console.info(`TicketController: getTicketById`)
        try {
            let { ticketId } = req.params

            let ticket = await Ticket.findByPk(ticketId)
            if (!ticket) {
                throw { name: 'notFound' }
            }

            response(res, 200, true, 'Data fetched', ticket)
        } catch (err) {
            console.info(`Error TicketController: getTicketById`)
            next(err)
        }
    }

    static async deleteTicketById(req, res, next) {
        console.info(`TicketController: deleteTicketById`)
        try {
            let { ticketId } = req.params

            let ticket = await Ticket.findByPk(ticketId)
            if (!ticket) {
                throw { name: 'notFound' }
            }

            ticket.update({
                deletedAt: new Date(),
                deletedBy: req.user.user
            })

            response(res, 200, true, 'Data deleted', ticket)
        } catch (err) {
            console.info(`Error TicketController: deleteTicketById`)
            next(err)
        }
    }

    static async postTicket(req, res, next) {
        console.info(`TicketController: postTicket`)
        try {
            let reqBody = req.body
            reqBody.status = 'OPEN'
            reqBody.statusLevel = 10
            reqBody.createdBy = req.user.user
            reqBody.updatedBy = req.user.user

            let { error, value } = ValidateTicket(reqBody)

            if (error) {
                throw { name: 'JoiError', code: 400, message: error.message }
            }

            let ticket = await Ticket.create(reqBody)

            response(res, 201, true, 'Data created', ticket)
        } catch (err) {
            console.info(`Error TicketController: postTicket`)
            next(err)
        }
    }

    static async doneTicket(req, res, next) {
        console.info(`TicketController: doneTicket`)
        try {
            let { ticketId } = req.params

            let exist = await Ticket.findByPk(ticketId)
            if (!exist) {
                throw { name: 'notFound' }
            }
            
            if (exist.statusLevel >= 40) {
                throw { name: 'customError', code: 400, message: 'Ticket status already done' }
            }

            let ticket = await Ticket.update(
                {
                    status: 'DONE',
                    statusLevel: 40,
                    updatedBy: req.user.user
                },
                {
                    where: {
                        ticketId: ticketId
                    }
                },
            )

            if (ticket[0] != 1) {
                throw { code: 500, message: 'Failed to update ticket, please contact admin' }
            }

            let updated = await Ticket.findByPk(ticketId)

            response(res, 201, true, 'Ticket status changed', updated)
        } catch (err) {
            console.info(`Error TicketController: doneTicket`)
            next(err)
        }
    }
}

module.exports = TicketController