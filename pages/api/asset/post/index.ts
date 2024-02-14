import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import { Asset } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);
	if (!session) {
		return res.status(401).json({ message: 'Please signIn to create Asset' });
	}
	if (req.method === 'POST') {
		const prismaUser = await prisma.staff.findUnique({
			where: { email: session?.user?.email as string },
		});
		try {
			const formData = req.body;

			const result = await prisma.asset.create({
				data: {
					...formData,
					createdById: prismaUser?.id,
				},
			});
			res.status(200).json(result);
		} catch (err: any) {
			console.log('Error when creating Asset', err.message);
			res.status(403).json({ err: 'Error has occurred while creating Asset' });
		}
	}
}
