import prisma from '../../../prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { sendMail } from '@/services/mailService';
import { renderToStaticMarkup } from 'react-dom/server';
import POEmailTemplate from '../../../components/email-templates/purchase-order/POApprovalEmailTemplate';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const session = await getServerSession(req, res, authOptions);

		if (!session) {
			return res.status(401).json({ message: 'Please sign-in to create a purchase order.' });
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
					approverId: formData.approver.id,
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

			const approvalUrl = `http://localhost:3000/finance/purchase-orders/${formData.poNumber}/approve`;

			const subject = 'Approval Required for Purchase Order';
			const toEmail = 'alvinkigen997@gmail.com'; // Replace with the actual approver's email
			const textContent = `Please approve ${prismaUser.name}'s Purchase Order PO Number: ${formData.poNumber}`;

			const emailContent = renderToStaticMarkup(
				<POEmailTemplate
					userName={prismaUser.name}
					poNumber={formData.poNumber}
					approvalUrl={approvalUrl}
				/>
			);
			const htmlContent = `<!DOCTYPE html>${emailContent}`;

			await sendMail(subject, toEmail, textContent, htmlContent);

			res.status(200).json(result);
		} catch (err) {
			console.log('Error when creating Purchase Order:', err.message);
			res.status(403).json({ err: 'Error has occurred while creating a Purchase Order' });
		}
	}
}
