import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);
	if (!session) {
		return res.status(401).json({ message: 'Please signIn to Transact Asset' });
	}
	if (req.method === 'POST') {
		const prismaUser = await prisma.staff.findUnique({
			where: { email: session?.user?.email as string },
		});
		try {
			const formData = req.body;

			const result = await prisma.assetTransaction.create({
				data: {
					assetId: formData.assetId,
					assetTransactionTypeId: formData.assetTransactionTypeId,
					transactionDate: formData.transactionDate,
					fromUserId: formData.fromUserId,
					toUserId: formData.toUserId,

					createdById: prismaUser?.id,
				},
			});
			await prisma.asset.update({
				where: {
					id: formData.assetId,
				},
				data: {
					conditionId: formData.conditionId,
					currentlyWithId: formData.asset.currentlyWithId,
				},
			});
			res.status(200).json(result);
		} catch (err: any) {
			console.log('Error when creating Asset', err.message);
			res.status(403).json({ err: 'Error has occurred while creating Asset' });
		}
	}
}
