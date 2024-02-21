import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);
	if (!session) {
		return res.status(401).json({ message: 'Please signIn to create maintenance record' });
	}
	if (req.method === 'POST') {
		try {
			const formData = req.body;

			const result = await prisma.assetMaintenanceLog.create({
				data: formData,
			});

			res.status(200).json(result);
		} catch (err: any) {
			console.log('Error when creating maintenance record', err.message);
			res.status(403).json({ err: 'Error has occurred while creating maintenance record' });
		}
	}
}
