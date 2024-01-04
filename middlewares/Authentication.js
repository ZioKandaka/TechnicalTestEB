const express = require("express")
const app = express()
const { User } = require("../models/index")
const {createToken, decodeToken} = require('../middlewares/jwt')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


async function authentication(req, res, next) {
    try {
        let authorization = req.headers['authorization']
        if (!authorization) {
          throw { name: "Unauthorized" }
        }
        let token = authorization.split(" ")[1]
        let decoded = decodeToken(token)
        // console.log(decoded, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<');

        const user = await User.findByPk(decoded.userId)
        if (!user) {
          throw { name: "InvalidCredential" }
        }
        req.user = {
          userId: user.userId,
          user: user.user
        }
        next()
      } catch (err) {
        console.info(`Error authentication`)
        next(err)
      }
}


module.exports = authentication