import nodemailer from 'nodemailer';

interface MailerServiceProps {
	toEmail: string;
	subject: string;
	htmlContent: string;
	optText: any;
}
//-----------------------------------------------------------------------------
export const sendMail = async ({ toEmail, subject, htmlContent, optText }: MailerServiceProps) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.NODEMAILER_EMAIL,
			pass: process.env.NODEMAILER_PW,
		},
	});

	var options = {
		from: process.env.NODEMAILER_EMAIL,
		to: toEmail,
		subject: subject,
		text: optText,
		attachments: [
			{
				filename: 'oco_ab_and_david.png',
				path: './public/assets/images/oco_ab_and_david.png',
				cid: 'logo',
			},
		],
		html: htmlContent,
	};

	try {
		const info = await transporter.sendMail(options);
		return true;
	} catch (error: any) {
		console.error('Email Error:', error);
		throw new Error(error.message || 'Failed to send email');
	}
};

