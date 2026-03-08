const nodemailer = require("nodemailer");

const sendEmail = async (option) => {
  //CREATE A TRANSPORTER
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  //DEFINE MAIL OPTIONS
  const mailOptions = {
    from: "Cineflix <support@cineflix.com>",
    to: option.email,
    subject: option.subject,
    text: option.message,
  };

  await transporter.senMail(mailOptions);
};

module.exports = sendEmail;
