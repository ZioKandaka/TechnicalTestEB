const createConfig = require("../helper/transporter");

async function sendEmail(mail) {
    const config = await createConfig()

    return await config.sendMail(mail);
};

module.exports = sendEmail