var user = require('./../models/user');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ExterminatorsApp@gmail.com',
    pass: 'Exterminators12'
  }
});

exports.sendEmail = function email(user) {
  console.log(user.email);
  var mailOptions = {
    from: 'exterminatorsApp@gmail.com',
    to: user.email,
    subject: 'Welcome to Exterminators',
    html: 'Hello ' + user.firstName + ','+ '\n<h1>Welcome to Exterminators!!!</h1>' +
      '<p>One stop solution to online banking. </p> <p>Your Account Number is : ' + user.account.AccountNumber + 
      '\n<p>Please <a href="http://localhost:4200/">login</a> here.</p>'
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}




