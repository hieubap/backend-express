const nodeMailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const adminEmail = process.env.SYSTEM_EMAIL;
const adminPassword = process.env.SYSTEM_EMAIL_PW;
const mailHost = 'smtp.gmail.com';

const ResetPassHtmlPath = path.join(__dirname, 'app/assets/emailResetPwTemplate.html');

const source = (path) => fs.readFileSync(path, 'utf-8').toString();
const resetPassTemplate = (redirectLink, newPass) =>
	handlebars.compile(source(ResetPassHtmlPath))(redirectLink, newPass);

const mailPort = 587;
const sendMail = (to, subject, htmlTemplate) => {
	const transporter = nodeMailer.createTransport({
		host: mailHost,
		port: mailPort,
		secure: false,
		auth: {
			user: adminEmail,
			pass: adminPassword,
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
