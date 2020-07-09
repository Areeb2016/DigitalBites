
/*!
 * Module dependencies.
 */
const nodemailer = require('nodemailer');

const Nexmo = require('nexmo');

   
module.exports.sms=function (req, res)  {
              console.log(req.body)

  const nexmo = new Nexmo({
    apiKey: 'bbc69f5d',
    apiSecret: 'xub7gDQDduWJnKRV',
  });
  const number = '923311207266';
  console.log(number)
  const text = req.body.notes;
  console.log(text)
  const from = 'Nexmo';
  
  
 nexmo.message.sendSms(from, number, text)
 res.end();

}


module.exports.index = function (req, res) {
  console.log(req.user);
  res.send('SUCCESS')
};


module.exports.Mail=function (req, res)  {
      console.log(req.body)      
  const output = `
  <p>You have a new contact request</p>
  <h3>Contact Details</h3>
  <ul>  
    <li>Name: ${req.body.name}</li>
    <li>Company: ${req.body.restaurant}</li>
    <li>Email: ${req.body.email}</li>
    <li>Phone: ${req.body.phoneNumber}</li>
  </ul>
  <h3>Message</h3>
  <p>${req.body.notes}</p>
`;

   
  
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'giovani.klocko53@ethereal.email',
      pass: 'STAFU39xGYc75fSBAg' 
    },
    tls:{
      rejectUnauthorized:false
    }
});


let mailOptions = {
  from: '"Taha Jamil" <giovani.klocko53@ethereal.email>', // sender address
  to: 'tahamian37@gmail.com',// list of receivers
  subject: 'Hello ✔', // Subject line
  text: 'Hello world', // plain text body
  html: output // html body
};


// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
      return console.log(error);
  }
  console.log('Message sent: %s', info.messageId);   
 


});
}