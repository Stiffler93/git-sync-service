const base64 = require('./base64');
const Mailgun = require('mailgun-js');

function sendMail(configs, subject, text) {
    const info = require('./logger').info;

    info('send mail');
    const apiKey = base64.decode(process.env.MAILGUN_API_KEY).trim();
    const mailgun = new Mailgun({apiKey: apiKey, domain: configs.Email.domain});

    const data = {
        from: configs.Email.from,
        to: configs.Email.to,
        subject: subject,
        text: text
    };
    info({'data': data});

    mailgun.messages().send(data, function (error, body) {
        if (error) {
            info('Email client has an issue. Cannot send mails!');
            info(error);
        } else {
            info('Email sent');
            info(body);
        }
    });
}


module.exports.sendMail = sendMail;