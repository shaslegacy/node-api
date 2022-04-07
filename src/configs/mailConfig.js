const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: process.env.MAIL_MAILER,
    auth: {
      user:  process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD
    }
});

module.exports = transporter;