const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

const mailoptions = (email, subject, html) => {
  return {
    from: process.env.EMAIL,
    to: email,
    subject,
    html,
  };
};

const sendWelcomingEmail = (email, name) => {
  const options = mailoptions(
    email,
    "welcome",
    `Hi ${name}, Welcome to our website`,
  );

  transporter.sendMail(options, (error, info) => {
    if (error) return console.log(error);
    console.log("Message sent: %s", info.messageId);
  });
};


const sendVerifyEmail = (email, url) => {
  const options = mailoptions(
    email,
    "Verify Email",
    `<p>please verify your mail <a href="${url}">verify email </a> </p>`,
  );
  transporter.sendMail(options, (error, info) => {
    if (error) return console.log(error);
    console.log("Message sent: %s", info.messageId);
  });
};

module.exports = { transporter, sendWelcomingEmail, sendVerifyEmail };
