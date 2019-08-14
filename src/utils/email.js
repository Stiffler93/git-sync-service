const nodemailer = require("nodemailer");

const pw = process.argv[2];
console.log(pw);

const transporter = nodemailer.createTransport({
    host: "gmail",
    port: 587,
    secure: true,
    auth: {
        user: 'sonntag19@gmail.com', //process.env.USER,
        pass: pw
    },
    tls: {
        rejectUnauthorized: true
    }
});

// send mail with defined transport object
let info = transporter.sendMail({
    from: '"Fred Foo" <foo@example.com>', // sender address
    to: "stefan.leopold@hotmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
});

console.log("Message sent: %s", info.messageId);
console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));