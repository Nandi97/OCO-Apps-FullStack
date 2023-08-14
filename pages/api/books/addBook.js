import prisma from '../../../prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const session = await getServerSession(req, res, authOptions);

		if (!session) {
			return res.status(401).json({ message: 'Please sign-in to create a book.' });
		}

		try {
			const formData = req.body.body;

			console.log('Form Data;', formData);

			const result = await prisma.book.create({
				data: {
					// coverUrl: formData.coverUrl,
					author: formData.author,
					copies: formData.copies,
					edition: formData.edition,
					isbnIssn: formData.isbnIssn,
					mediaType: formData.mediaType,
					publicationYear: formData.publicationYear,
					publisher: formData.publisher,
					staffId: formData.staffId,
					subject: formData.subject,
					title: formData.title,
				},
			});
			res.status(200).json(result);
		} catch (err) {
			res.status(403).json({ err: 'Error has occurred while creating a book' });
		}
	}
}
