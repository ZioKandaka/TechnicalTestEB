const response = require('../helper/response.js');
const { User, Ticket, Notification, WorkOrder, sequelize } = require('../models/index.js');
const ValidateWorkOrder = require('../validator/WorkOrder.validator.js');

class WoController {
    static async getWo(req, res, next) {
        console.info(`WoController: getWo`)
        try {
            let { ticketId, size, page, status } = req.query
            let where_opt = {
                deletedAt: null
            }
            if (ticketId) {
                where_opt.ticketId = ticketId
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

            let { count, rows } = await WorkOrder.findAndCountAll({
                where: where_opt
            })

            response(res, 200, true, 'Data fetched', rows, count, page, size)
        } catch (err) {
            console.info(`Error WoController: getWo`)
            next(err)
        }
    }

    static async getWoById(req, res, next) {
        console.info(`WoController: getWoById`)
        try {
            let { workOrderId } = req.params

            let wo = await WorkOrder.findByPk(workOrderId)
            if (!wo) {
                throw { name: 'notFound' }
            }

            response(res, 200, true, 'Data fetched', wo)
        } catch (err) {
            console.info(`Error WoController: getWoById`)
            next(err)
        }
    }

    static async deleteWoById(req, res, next) {
        console.info(`TicketController: deleteWoById`)
        try {
            let { workOrderId } = req.params

            let wo = await WorkOrder.findByPk(workOrderId)
            if (!wo) {
                throw { name: 'notFound' }
            }

            wo.update({
                deletedAt: new Date(),
                deletedBy: req.user.user
            })

            response(res, 200, true, 'Data deleted', wo)
        } catch (err) {
            console.info(`Error TicketController: deleteWoById`)
            next(err)
        }
    }


    static async postWo(req, res, next) {
        console.info(`WoController: postWo`);
        let transaction;
        try {
            transaction = await sequelize.transaction();

            let reqBody = req.body;
            reqBody.status = 'OPEN';
            reqBody.statusLevel = 10;
            reqBody.isAccepted = false;
            reqBody.createdBy = req.user.user;
            reqBody.updatedBy = req.user.user;

            let { error, value } = ValidateWorkOrder(reqBody);
            if (error) {
                throw { name: 'JoiError', code: 400, message: error.message };
            }

            let ticket = await Ticket.findOne({
                where: {
                    ticketId: reqBody.ticketId,
                    deletedAt: null,
                },
                transaction: transaction,
            });

            if (!ticket) {
                throw { name: 'notFound' };
            }

            if (ticket.statusLevel < 20) {
                ticket.update(
                    {
                        status: 'SUBMITTED',
                        statusLevel: 20,
                        updatedBy: req.user.user
                    },
                    { transaction: transaction }
                )
            }

            let Wo = await WorkOrder.create(reqBody, { transaction: transaction });
            let newTicket = await Ticket.findByPk(ticket.ticketId, { transaction: transaction })
            Wo.dataValues.ticket = newTicket

            response(res, 201, true, 'Data created successfully', Wo);
            await transaction.commit();
        } catch (err) {
            console.error(`Error WoController: postWo`, err);
            await transaction.rollback();
            next(err);
        }
    }

    static async acceptWo(req, res, next) {
        console.info(`WoController: acceptWo`);
        let transaction;
        try {
            transaction = await sequelize.transaction();

            let reqBody = {}
            const { workOrderId } = req.params
            reqBody.status = 'ON PROGRESS';
            reqBody.statusLevel = 30;
            reqBody.isAccepted = true;
            reqBody.createdBy = req.user.user;
            reqBody.updatedBy = req.user.user;

            let woExist = await WorkOrder.findOne({
                where: {
                    workOrderId: workOrderId,
                    deletedAt: null
                },
                include: [Ticket],
                transaction: transaction
            })

            if (!woExist) {
                throw { name: 'notFound' };
            }

            if (woExist.statusLevel >= 30) {
                throw { name: 'customError', code: 400, message: 'Can not accept work order that is already on progress or done' }
            }

            if (woExist.Ticket.statusLevel < 30) {
                await Ticket.update(
                    {
                        status: 'ON PROGRESS',
                        statusLevel: 30,
                        updatedBy: req.user.user

                    },
                    {
                        where: {
                            ticketId: woExist.Ticket.ticketId
                        },
                        transaction: transaction
                    }
                )
            }

            let Wo = await WorkOrder.update(reqBody,
                {
                    where: {
                        workOrderId: woExist.workOrderId
                    },
                    transaction: transaction
                }
            );
            let newWo = await WorkOrder.findByPk(woExist.workOrderId, {
                include: [Ticket],
                transaction: transaction
            })

            response(res, 201, true, 'Data updated successfully', newWo);
            await transaction.commit();
        } catch (err) {
            console.error(`Error WoController: acceptWo`, err);
            await transaction.rollback();
            next(err);
        }
    }

    static async doneWo(req, res, next) {
        console.info(`WoController: doneWo`);
        let transaction;
        try {
            transaction = await sequelize.transaction();

            let reqBody = {}
            const { workOrderId } = req.params
            reqBody.status = 'DONE';
            reqBody.statusLevel = 40;
            reqBody.isAccepted = true;
            reqBody.createdBy = req.user.user;
            reqBody.updatedBy = req.user.user;

            let woExist = await WorkOrder.findOne({
                where: {
                    workOrderId: workOrderId,
                    deletedAt: null
                },
                include: [Ticket],
                transaction: transaction
            })

            if (!woExist) {
                throw { name: 'notFound' };
            }

            if (woExist.statusLevel >= 40) {
                throw { name: 'customError', code: 400, message: 'Work order status already done' }
            }

            let Wo = await WorkOrder.update(reqBody,
                {
                    where: {
                        workOrderId: woExist.workOrderId
                    },
                    transaction: transaction
                }
            );
            let newWo = await WorkOrder.findByPk(woExist.workOrderId, {
                include: [Ticket],
                transaction: transaction
            })

            response(res, 201, true, 'Data updated successfully', newWo);
            await transaction.commit();
        } catch (err) {
            console.error(`Error WoController: doneWo`, err);
            await transaction.rollback();
            next(err);
        }
    }
}

module.exports = WoController