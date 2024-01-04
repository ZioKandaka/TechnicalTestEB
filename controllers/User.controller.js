
const response = require('../helper/response.js');
const { createToken } = require('../middlewares/jwt.js');
const { User, Ticket, Notification, WorkOrder } = require('../models/index.js');
const bcrypt = require("bcrypt");

class UserController {
    static async Login(req, res, next) {
        console.info(`UserController: Login`)
        try {
            let { user, password } = req.body
            if (!user || !password) {
                throw { name: 'passwordRequired' }
            }

            const exist = await User.findOne({ where: { user: user } });
            if (!exist) {
                // console.log('error di email')
                throw { name: "InvalidCredential" };
            }

            if (await bcrypt.compare(password, exist.password)) {
                const authorization = createToken({ userId: exist.userId, user: exist.user });
                // console.log('masuk', '<<<<<<<<<<<<')
                let resp = {
                    authorization: authorization,
                    userId: exist.userId,
                    user: exist.user,
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
            let { user, password, email } = req.body
            let hashed_pw = bcrypt.hashSync(password, 12)

            let new_user = await User.create({
                user: user,
                password: hashed_pw,
                email: email
            })

            delete new_user.password

            response(res, 201, true, 'Register success', new_user)
        } catch (err) {
            console.info(`Error UserController: Register`)
            next(err)
        }
    }
}

module.exports = UserController