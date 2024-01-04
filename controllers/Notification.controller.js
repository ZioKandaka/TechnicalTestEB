const emailTemplate = require('../helper/emailTemplate.js');
const response = require('../helper/response.js');
const { User, Ticket, Notification, WorkOrder, sequelize } = require('../models/index.js');
const sendEmail = require('../services/Email.service.js');
const ValidateWorkOrder = require('../validator/WorkOrder.validator.js');

class NotificationController {
    static async sendEmailNotif(req, res, next) {
        console.info(`NotificationController: sendEmailNotif`)
        try {
            let { workOrderId, receiver } = req.body
            if(!workOrderId) {
                throw {name: 'customError', code: 400, message: 'Work order ID is required'}
            }
            if(!receiver || Array.isArray(receiver) == false) {
                throw {name: 'customError', code: 400, message: 'List (array) of email receiver is required'}
            }

            let wo = await WorkOrder.findOne({
                where: {
                    workOrderId: workOrderId,
                    deletedAt: null
                },
                include: [Ticket]
            })
            
            if(!wo) {
                throw {name: 'notFound'}
            }

            const bodyEmail = emailTemplate(
                wo.Ticket.status,
                wo.status,
                wo.Ticket.company,
                wo.Ticket.trouble,
                wo.Ticket.client,
                wo.createdBy
            );

            const mailOptions = {
                from: process.env.EMAIL,
                to: receiver.join(", "),
                subject: `Work Order Notification`,
                html: bodyEmail,
            };

            let emsend = await sendEmail(mailOptions);

            let message
            let code
            let scc
            if(emsend.messageId) {
                message = 'Email notifictaion created'
                code = 201
                scc = true
                receiver.map(async el => {
                    return await Notification.create({
                        type: 'email',
                        receiver: el,
                        createdBy: req.user.user,
                        updatedBy: req.user.user
                    })
                })
            } else {
                message = 'Failed to create email notification, please try again'
                code = 500
                scc = false
            }

            response(res, code, scc, message, null)
        } catch (err) {
            console.info(`Error NotificationController: sendEmailNotif`)
            next(err)
        }
    }
}

module.exports = NotificationController