import { render } from '@react-email/render';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.NODEMAILER_EMAIL,
		pass: process.env.NODEMAILER_PW,
	},
});

const emailHtml = render(<div>True</div>);

const options = {
	from: process.env.NODEMAILER_EMAIL,
	to: 'alvin_kigen@yahoo.com',
	subject: 'hello world',
	html: emailHtml,
};

await transporter.sendMail(options);
