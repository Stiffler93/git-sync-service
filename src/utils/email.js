const nodemailer = require("nodemailer");
const log = require('./logger').log;
const base64 = require('./base64');

function sendMail(configs, subject, text) {
    const transporter = nodemailer.createTransport({
        service: configs.Email.service,
        auth: {
            user: configs.Email.from,
            pass: base64.decode(process.env.WEBSERVICE1993_PW)
        }
    });

    const mailOptions = {
        from: configs.Email.from,
        to: configs.Email.to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            log(error);

        } else {
            log('Email sent: ' + info.response);
        }
    });
}

module.exports.sendMail = sendMail;