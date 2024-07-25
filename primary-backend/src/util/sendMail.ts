// @ts-ignore
import nodemailer, { Transporter } from "nodemailer";
import {
  SMTP_HOST,
  SMTP_MAIL,
  SMTP_PASSWORD,
  SMTP_PORT,
  SMTP_SERVICE,
} from "../config";
interface EmailOptions {
  email: string;
  subject: string;
  message: string;
}

const sendMail = async (options: EmailOptions): Promise<void> => {
  const transporter: Transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    service: SMTP_SERVICE,
    auth: {
      user: SMTP_MAIL,
      pass: SMTP_PASSWORD,
    },
  });

  const { email, subject, message } = options;

  const mailOptions = {
    from: SMTP_MAIL,
    to: email,
    subject,
    html: message,
  };

  await transporter.sendMail(mailOptions);
};

export default sendMail;
