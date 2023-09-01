const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'swiftlearnweb@gmail.com', // Your email address
        pass: process.env.PASS_WORD // Your email password
      }
    // host: 'smtp.ethereal.email',
    // port: 587,
    // auth: {
    //     user: 'caroline.sawayn6@ethereal.email',
    //     pass: 'gwzV3r8MTWsXnxHxds'
    // }
});
  


module.exports.create = async (req, res) => {
    const { email, message } = req.body;
    console.log(req.body,"her------------------------------------------------")
    const mailOptions = {
        from: 'swiftlearnweb@gmail.com',
        to: email,
        subject: 'invite from swiftLearn',
        text:`we are happy to tell you that you re invited to our platform under the user id ${message} use this ID to sign up in our application  ` 
        
      };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent: ' + info.response);
        res.send('Email sent successfully');
      }
    });
  }

