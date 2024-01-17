import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);

	if (!session) {
		return res.status(401).json({ message: 'Please signin to view side menu' });
	}
	if (req.method === 'GET') {
		try {
			const data = await prisma.menu.findMany({
				// where: {
				// 	email: session.user.email,
				// },

				orderBy: {
					listOrder: 'asc',
				},
			});

			return res.status(200).json(data);
		} catch (err) {
			res.status(403).json({ err: 'Error has occured while fetching menus' });
		}
	}
}
