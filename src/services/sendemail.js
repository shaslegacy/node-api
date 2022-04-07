const mailconn = require('../configs/mailConfig')

module.exports = {
    sendMailToUser: (email) => {
          const mailOptions = {
            from: 'er.shashikantojha@gmail.com',
            to: email,
            subject: 'New User Registered',
            text: 'Hi User, your account has been created successfully'
          };
          
          mailconn.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
}