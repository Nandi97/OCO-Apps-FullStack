import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			const id = req.query.slug?.toString();
			const data = await prisma.causeList.findUnique({
				where: { id: id },
				include: {
					createdBy: true,
					team: true,
					cases: {
						include: {
							advocates: true,
						},
					},
				},
			});
			return res.status(200).json(data);
		} catch (err) {
			res.status(403).json({ err: 'Error has occurred while fetching News Feed' });
		}
	}
}
