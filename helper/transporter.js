const nodemailer = require('nodemailer');

async function createConfig () {
    const config = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    return config
}

module.exports = createConfig