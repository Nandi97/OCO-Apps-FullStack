import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);
	if (!session) {
		return res.status(401).json({ message: 'Please sign in to view project types' });
	}
	if (req.method === 'GET') {
		try {
			const data = await prisma.projectTag.findMany({
				orderBy: {
					id: 'asc',
				},
			});

			return res.status(200).json(data);
		} catch (err) {
			res.status(403).json({ err: 'Error has occurred while fetching project types' });
		}
	}
}
