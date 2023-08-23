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
					poNumber: formData.poNumber.toString(),
					type: formData.type,
					vatable: formData.vatable,
					currencyId: parseInt(formData.currencyId),
					name: formData.name,
					email: formData.email,
					phoneNumber: formData.phoneNumber,
					physicalAddress: formData.physicalAddress,
					townId: formData.townId,
					address: formData.address,
					postalCode: formData.postalCode,
					city: formData.city,
					country: formData.country,
					totalAmount: formData.totalAmount,
					approverId: formData.approverId,
					createdById: prismaUser?.id,
					purchaseItems: {
						create: formData.purchaseItems.map((item) => ({
							description: item.description,
							quantity: parseInt(item.quantity),
							cost: parseInt(item.cost),
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
