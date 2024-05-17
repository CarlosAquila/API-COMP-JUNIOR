import nodemailer from 'nodemailer';

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
  const transporter = nodemailer.createTransport({
    //host: process.env.SMTP_HOST, // aqui vai o host do seu email ex
    //port: Number(process.env.SMTP_PORT),
    //secure: false,
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.SMTP_USER,
      clientId: process.env.SMTP_CLIENT_ID,
      clientSecret: process.env.SMTP_CLIENT_SECRET,
      refreshToken: process.env.SMTP_REFRESH_TOKEN,
    },
  });


  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject,
    html,
  });
} catch (error) {
  console.error(error);
  throw new Error('Error sending email');
}
};