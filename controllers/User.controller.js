
const response = require('../helper/response.js');
const { createToken } = require('../middlewares/jwt.js');
const { User, Ticket, Notification, WorkOrder } = require('../models/index.js');
const bcrypt = require("bcrypt");

class UserController {
    static async Login(req, res, next) {
        console.info(`UserController: Login`)
        try {
            let { username, password } = req.body
            if (!username || !password) {
                throw { name: 'passwordRequired' }
            }

            const exist = await User.findOne({ where: { user: username } });
            if (!exist) {
                // console.log('error di email')
                throw { name: "InvalidCredential" };
            }

            if (await bcrypt.compare(password, exist.password)) {
                const authorization = createToken({ userId: exist.userId, username: exist.user });
                // console.log('masuk', '<<<<<<<<<<<<')
                let resp = {
                    authorization: authorization,
                    userId: exist.userId,
                    username: exist.user,
                    email: exist.email
                }
                response(res, 200, true, 'Login success', resp)
            } else {
                throw { name: "InvalidCredential" }
            }
        } catch (error) {
            next(error)
        }
    }

    static async Register(req, res, next) {
        console.info(`UserController: Register`)
        try {
            let { username, password, email } = req.body
            let hashed_pw = bcrypt.hashSync(password, 12)

            let new_user = await User.create({
                user: username,
                password: hashed_pw,
                email: email
            })

            let resp = {
                userId: new_user.userId,
                username: new_user.user,
                email: new_user.email
            }

            delete new_user.dataValues.password

            response(res, 201, true, 'Register success', resp)
        } catch (err) {
            console.info(`Error UserController: Register`)
            next(err)
        }
    }
}

module.exports = UserController