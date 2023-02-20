const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'testmailassign@gmail.com',
        pass: 'owfobynaxisjrbbx',
    }
});


function mailOptions(to, subject, text) {
    return {
        from: 'testmailassign@gmail.com',
        to: to,
        subject: subject,
        text: text
    }
};
function sendMail(mailOptions) {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);


        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}



module.exports = { sendMail, mailOptions }