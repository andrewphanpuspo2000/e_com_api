import nodemailer from "nodemailer";

export const accountVerificationEmail = async (obj) => {
  const { email, fName, link } = obj;
  //1.smtp config
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    secure: false,
    port: +process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
    from: `"BROS MERCHANT" <${process.env.SMTP_USER}> `, // sender address
    to: email, // list of receivers
    subject: "Account activation required", // Subject line
    text: `Hello ${fName}, please activate your account. Link: ${link}`, // plain text body
    html: `
    <b>Hello ${fName},</b>
    <p>${link}</p>
    
    `, // html body
  });

  console.log("Message sent: %s", info.messageId);
};
export const confirmVerificationEmail = async (obj) => {
  const { email, fName } = obj;
  //1.smtp config
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    secure: false,
    port: +process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
    from: `"BROS MERCHANT" <${process.env.SMTP_USER}> `, // sender address
    to: email, // list of receivers
    subject: "Account has been verified", // Subject line
    text: ``, // plain text body
    html: `<p>Congratz ${fName}, your account has been activated</p>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
};
