const nodemailer = require("nodemailer");

const emailConfig = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vipoo.info@gmail.com",
    pass: "klop uvpw dbbi eipu",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: "vipoo.info@gmail.com",
      to: to,
      subject: subject,
      html: html,
    };
    await emailConfig.sendMail(mailOptions)
  } catch (error) {
    console.log("Ha fallado el envío", error.message);
  }
};

module.exports = {sendEmail}