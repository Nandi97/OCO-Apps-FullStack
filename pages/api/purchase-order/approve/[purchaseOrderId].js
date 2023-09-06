import prisma from '../../../../prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(req, res) {
	const session = await getServerSession(req, res, authOptions);
	if (!session) {
		return res.status(401).json({ message: 'Please sign in to get this purchase order`' });
	}
	if (req.method === 'GET') {
		try {
			const purchaseOrderId = parseInt(req.query.purchaseOrderId);
			if (isNaN(purchaseOrderId)) {
				return res.status(400).json({ error: 'Invalid Purchase Order ID' });
			}

			const data = await prisma.purchaseOrder.findUnique({
				where: { poNumber: purchaseOrderId.toString() },

				include: {
					purchaseItems: true,
					approver: true,
					creator: true,
					currency: true,
					town: true,
				},
			});

			if (!data) {
				return res.status(404).json({ error: 'PO not found' });
			}

			return res.status(200).json(data);
		} catch (err) {
			console.error('Error fetching purchase order:', err); // Log the error for debugging
			res.status(500).json({ error: 'An error occurred while fetching the purchase order' });
		}
	}
}
