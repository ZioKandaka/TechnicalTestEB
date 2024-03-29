if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')
const TicketController = require('./controllers/Ticket.controller')
const ErrorHandler = require('./middlewares/ErrorHandler')
const UserController = require('./controllers/User.controller')
const authentication = require('./middlewares/Authentication')
const WoController = require('./controllers/WorkOrder.controller')
const NotificationController = require('./controllers/Notification.controller')
const GroupQuestionController = require('./controllers/GroupQuestion.controller')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('This is API for EBconnection Indonesia Developer Test. Good luck on your test!')
})

app.get('/get-group-question', GroupQuestionController.getColoQuestion)

app.post('/login', UserController.Login)
app.post('/register', UserController.Register)

app.use(authentication)

app.get('/tickets', TicketController.getTickets)
app.get('/workOrder', WoController.getWo)
app.get('/tickets/:ticketId/ticketId', TicketController.getTicketById)


app.post('/tickets', TicketController.postTicket)
app.post('/tickets/done/:ticketId/ticketId', TicketController.doneTicket)

app.post('/workOrder', WoController.postWo)
app.post('/workOrder/accept/:workOrderId/workOrderId', WoController.acceptWo)
app.post('/workOrder/done/:workOrderId/workOrderId', WoController.doneWo)

app.post('/notification', NotificationController.sendEmailNotif)

app.use(ErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})