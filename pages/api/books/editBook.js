import prisma from '../../../prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '10mb',
		},
	},
};

export default async function handler(req, res) {
	if (req.method === 'PATCH' || req.method === 'PATCH') {
		const session = await getServerSession(req, res, authOptions);

		if (!session) {
			return res.status(401).json({ message: 'Please sign-in to edit a book.' });
		}

		console.log('Session', session.user);

		try {
			const formData = req.body;

			// console.log('Form Data:', formData);

			const result = await prisma.book.update({
				where: {
					id: formData.id,
				},
				data: {
					coverUrl: formData.coverUrl,
					author: formData.author,
					copies: parseInt(formData.copies),
					edition: formData.edition,
					isbnIssn: formData.isbnIssn,
					mediaType: formData.mediaType,
					publicationYear: parseInt(formData.publicationYear),
					publisher: formData.publisher,
					staffId: parseInt(formData.staffId),
					// staffId: session?.user?.id,
					subject: formData.subject,
					title: formData.title,
				},
			});
			res.status(200).json(result);
		} catch (err) {
			console.log('Error when updating book:', err.message);
			res.status(403).json({
				err: `Error has occurred while editing the book: ${req.body.author}`,
			});
		}
	}
}
