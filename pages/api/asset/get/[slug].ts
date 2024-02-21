import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);
	if (!session) {
		return res.status(401).json({ message: 'Please signIn to fetch Asset' });
	}
	if (req.method === 'GET') {
		try {
			const assetId = req.query.slug;
			const data = await prisma.asset.findUnique({
				where: { id: assetId as string },
				include: {
					condition: true,
					currency: true,
					createdBy: true,
					currentlyWith: true,
					type: {
						include: {
							assetCategory: true,
						},
					},
				},
			});

			if (!data) {
				return res.status(404).json({ error: 'Asset not found' });
			}

			return res.status(200).json(data);
		} catch (err) {
			console.error('Error fetching asset:', err); // Log the error for debugging
			res.status(500).json({ error: 'An error occurred while fetching the asset' });
		}
	}
}
