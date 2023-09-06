import prisma from '../../../prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { sendMail } from '@/services/mailService';
import { renderToStaticMarkup } from 'react-dom/server';
import POApprovedEmailTemplate from '../../../components/email-templates/purchase-order/POApprovedEmailTemplate';

export default async function handler(req, res) {
	if (req.method === 'PATCH' || req.method === 'PATCH') {
		const session = await getServerSession(req, res, authOptions);

		if (!session) {
			return res.status(401).json({ message: 'Please sign-in to create a purchase order.' });
		}
		const formData = req.body;

		// console.log('PO Approval Form Data', formData);

		try {
			await prisma.purchaseOrder.update({
				where: { poNumber: formData.poNumber },
				data: { status: true, approvedOn: new Date() },
			});

			const approvalUrl = `http://localhost:3000/finance/purchase-orders/${formData.id}`;

			const subject = 'Your Purchase Order has been approved';
			const toEmail = `${formData.creator.email}`; // Replace with the actual approver's email
			const textContent = `Your Purchase Order PO Number: ${formData.poNumber} has been approved`;

			const emailContent = renderToStaticMarkup(
				<POApprovedEmailTemplate poNumber={formData.poNumber} approvalUrl={approvalUrl} />
			);
			const htmlContent = `<!DOCTYPE html>${emailContent}`;

			await sendMail(subject, toEmail, textContent, htmlContent);

			res.status(200).json({ message: 'Purchase order approved successfully' });
		} catch (err) {
			console.error('Error when approving Purchase Order:', err.message);
			res.status(403).json({ err: 'Error has occurred while approving the Purchase Order' });
		}
	}
}
