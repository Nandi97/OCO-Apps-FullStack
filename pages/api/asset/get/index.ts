import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			const searchParam = req.query.searchParam || '';

			console.log(searchParam);

			if (searchParam) {
				const data = await prisma.asset.findMany({
					where: {
						OR: [
							{
								name: { contains: searchParam as string, mode: 'insensitive' },
							},
						],
					},
					orderBy: { id: 'desc' },
					include: {
						condition: true,
						createdBy: true,
						currentlyWith: true,
						type: {
							include: {
								assetCategory: true,
							},
						},
					},
				});
				return res.status(200).json(data);
			} else {
				const data = await prisma.asset.findMany({
					orderBy: { id: 'desc' },
					include: {
						condition: true,
						createdBy: true,
						currentlyWith: true,
						type: {
							include: {
								assetCategory: true,
							},
						},
					},
				});
				return res.status(200).json(data);
			}
		} catch (err) {
			res.status(403).json({ err: 'Error has occurred while fetching Assets' });
		}
	}
}
