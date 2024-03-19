const nodeMailer = require ("nodemailer");
// const { google } = require('googleapis');

// const OAuth2 = google.auth.OAuth2;
// const oauth2Client = new OAuth2(
//     '1061232843164-7ndbmiush7j5g6m434pghrl212k8bp3h.apps.googleusercontent.com',
//     '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'
//   );

const SendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = SendEmail;