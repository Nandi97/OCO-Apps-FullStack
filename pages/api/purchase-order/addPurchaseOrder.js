import prisma from '../../../prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const session = await getServerSession(req, res, authOptions);

		if (!session) {
			return res.status(401).json({ message: 'Please sign-in to create a book.' });
		}

		//Get User
		const prismaUser = await prisma.user.findUnique({
			where: { email: session.user.email },
		});

		try {
			const formData = req.body;

			console.log('Form Data;', formData);

			const result = await prisma.purchaseOrder.create({
				data: {
					vendorType: formData.vendorType,
					vatable: formData.vatable,
					currencyId: parseInt(formData.currencyId),
					vendorName: formData.name,
					vendorEmail: formData.email,
					vendorPhoneNumber: formData.phoneNumber,
					vendorAddress: parseInt(formData.address),
					approverId: formData.approverId,
					createdById: prismaUser?.id,
					purchaseItems: {
						create: formData.purchaseItems.map((item) => ({
							description: item.description,
							quantity: item.quantity,
							cost: item.cost,
						})),
					},
				},
			});
			res.status(200).json(result);
		} catch (err) {
			console.log('Error when creating Purchase Order:', err.message);
			res.status(403).json({ err: 'Error has occurred while creating a Purchase Order' });
		}
	}
}
