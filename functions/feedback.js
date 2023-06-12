require('mysql2')
const nodemailer = require("nodemailer");

exports.handler = async (event) => {
    const { text } = JSON.parse(event.body);
    const currentTime = new Date().toLocaleDateString()

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, 
        auth: {
          user: "hearth.feedback@gmail.com", 
          pass: "ernhhexgexhsjlfb"
        },
      });

      const mailOptions = {
        from: 'hearth.feedback@gmail.com',
        to: 'hearth.feedback@gmail.com',
        subject: 'App Feedback ' + currentTime,
        text: 'Feedback message: ' + text 
    };

    try {
        await transporter.sendMail(mailOptions);
    
        return {
          statusCode: 200,
          body: JSON.stringify({ message: "Feedback submitted successfully" }),
        };
      } catch (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({ message: "Failed to submit feedback" }),
        };
      }
      

}