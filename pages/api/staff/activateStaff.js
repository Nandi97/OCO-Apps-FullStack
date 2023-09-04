import prisma from '../../../prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
	const session = await getServerSession(req, res, authOptions);
	if (!session) {
		return res.status(401).json({ message: 'Please sign in to activate staff.' });
	}
	if (req.method === 'PATCH' || req.method === 'PATCH') {
		console.log('Body Data:', req.body.data);
		const staffId = req.body.data;
		try {
			const result = await prisma.staff.update({
				where: {
					id: staffId,
				},
				data: {
					deletedAt: null,
				},
			});

			res.status(200).json(result);
		} catch (err) {
			res.status(403).json({ err: 'Error has occurred while activating staff' });
		}
	}
}
