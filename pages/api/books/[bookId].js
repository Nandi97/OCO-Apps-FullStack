import prisma from '../../../prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
	const session = await getServerSession(req, res, authOptions);
	if (!session) {
		return res.status(401).json({ message: 'Please sign in to get this book' });
	}
	if (req.method === 'GET') {
		try {
			const bookId = parseInt(req.query.bookId);
			if (isNaN(bookId)) {
				return res.status(400).json({ error: 'Invalid book ID' });
			}

			const data = await prisma.book.findUnique({
				where: { id: bookId },
			});

			if (!data) {
				return res.status(404).json({ error: 'Book not found' });
			}

			return res.status(200).json(data);
		} catch (err) {
			console.error('Error fetching book:', err); // Log the error for debugging
			res.status(500).json({ error: 'An error occurred while fetching the book' });
		}
	}
}
