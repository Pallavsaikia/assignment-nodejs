const nodemailer = require('nodemailer');
const sendGridTransport=require('nodemailer-sendgrid-transport')
const transporter = nodemailer.createTransport(sendGridTransport({
    auth: {
        //add api key to env file
        api_key: process.env.SEND_GRID_API,
    }
}));


function mailOptions(to, subject, text) {
    return {
        //fill from email in send grid sender  profile 
        from: '',
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