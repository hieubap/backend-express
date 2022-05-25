const nodeMailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const adminEmail = process.env.SYSTEM_EMAIL;
const adminPassword = process.env.SYSTEM_EMAIL_PW;
const mailHost = 'smtp.gmail.com';

const ResetPassHtmlPath = path.join(__dirname, 'app/assets/resetPass.html');

const source = (path) => fs.readFileSync(path, 'utf-8').toString();
const resetPassTemplate = (redirectLink, newPass) =>
	handlebars.compile(source(ResetPassHtmlPath))(redirectLink, newPass);

const mailPort = 465;
const sendMail = (to, subject, htmlTemplate) => {
	const transporter = nodeMailer.createTransport({
		host: mailHost,
		port: mailPort,
		secure: false,
		auth: {
			type: 'OAuth2',
			user: adminEmail,
			clientId: 'CLIENT_ID_HERE',
			clientSecret: 'CLIENT_SECRET_HERE',
			refreshToken: '1/XXxXxsss-xxxXXXXXxXxx0XXXxxXXx0x00xxx',
			accessToken: 'REFRESH_TOKEN_HERE',
		},
	});
	const options = {
		from: adminEmail,
		to,
		subject,
		html: htmlTemplate,
	};
	return transporter.sendMail(options);
};
module.exports = {
	sendMail,
	resetPassTemplate,
};
