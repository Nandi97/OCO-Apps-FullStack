import prisma from '../../../prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { sendMail } from '@/services/mailService';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { purchaseOrderId } = req.body; // You may use a token or a parameter to identify the purchase order

		try {
			// Update the approval status of the purchase order in your database
			// You'll need to implement this logic based on your database structure
			// For example:
			await prisma.purchaseOrder.update({
				where: { id: purchaseOrderId },
				data: { status: true, approvedOn: new Date() },
			});

			res.status(200).json({ message: 'Purchase order approved successfully' });
		} catch (err) {
			console.error('Error when approving Purchase Order:', err.message);
			res.status(403).json({ err: 'Error has occurred while approving the Purchase Order' });
		}
	}
}
