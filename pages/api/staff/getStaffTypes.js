import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function handler(req, res) {
	const session = await getServerSession(req, res, authOptions);
	if (!session) {
		return res.status(401).json({ message: 'Please sign in to view staff types' });
	}
	if (req.method === 'GET') {
		try {
			const data = await prisma.staffType.findMany({
				orderBy: {
					id: 'asc',
				},
				select: {
					id: true,
					name: true,
					designations: {
						select: {
							id: true,
							name: true,
						},
					},
				},
			});

			return res.status(200).json(data);
		} catch (err) {
			res.status(403).json({ err: 'Error has occurred while fetching staff types' });
		}
	}
}
