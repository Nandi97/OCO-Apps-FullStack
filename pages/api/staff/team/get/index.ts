import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);
	if (!session) {
		return res.status(401).json({ message: 'Please sign in to view teams' });
	}
	if (req.method === 'GET') {
		try {
			const data = await prisma.team.findMany({
				orderBy: {
					id: 'asc',
				},
				select: {
					id: true,
					name: true,
				},
			});

			return res.status(200).json(data);
		} catch (err) {
			res.status(403).json({ err: 'Error has occurred while fetching staff teams' });
		}
	}
}
