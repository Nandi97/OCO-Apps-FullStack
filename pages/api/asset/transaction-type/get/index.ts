import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			const data = await prisma.assetTransactionType.findMany({
				orderBy: { id: 'desc' },
				select: {
					id: true,
					name: true,
					description: true,
				},
			});
			return res.status(200).json(data);
		} catch (err) {
			res.status(403).json({ err: 'Error has occurred while fetching Assets' });
		}
	}
}
