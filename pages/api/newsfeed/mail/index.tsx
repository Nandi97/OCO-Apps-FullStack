import { NewsFeedEmail } from '@/components/email-templates/news-feed/NewsFeedEmailTemplate';
import { sendMail } from '@/services/mailService';
import { render } from '@react-email/render';
import { format } from 'date-fns/format';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		try {
			const mailData = req.body;

			// Check if formData is available
			if (!mailData) {
				return res.status(400).json({ error: 'Missing Mail Data in the request.' });
			}

			// const subject = `Newsfeed | ${format(mailData?.date, 'dd.MM.yyyy')}`;
			const subject = `Newsfeed | `;
			const toEmail = 'alvin_kigen@yahoo.com';
			const htmlContent = render(<NewsFeedEmail data={mailData} />);
			// const htmlContent = render(<Email data={mailData?.articles} />);
			const optText = ``;

			await sendMail({ toEmail, subject, htmlContent, optText });

			res.status(200).json(mailData);
		} catch (err: any) {
			console.log('Error when Sending News Feed', err.message);
			res.status(403).json({ err: 'Error has occurred while sending news feed' });
		}
	}
}
