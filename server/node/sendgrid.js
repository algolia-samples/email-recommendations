// Send a mail using the Sendgrid API
// https://www.npmjs.com/package/@sendgrid/mail

import sendgrid from "@sendgrid/mail";

const sendMail = async (to, subject, text, html) => {
  const msg = {to, subject, text, html, from: process.env.SENDGRID_FROM_EMAIL,
  };
  await sendgrid.send(msg);
};

export default sendMail;
