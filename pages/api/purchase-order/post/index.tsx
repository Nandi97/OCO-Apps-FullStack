import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import { render } from '@react-email/render';
import { formatISO } from 'date-fns';
import { sendMail } from '@/services/mailService';
import { POEmailTemplate } from '@/components/email-templates/purchase-order/POApprovalEmailTemplates';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);

	if (!session) {
		return res.status(401).json({ message: 'Please sign-in to create a purchase order.' });
	}
	if (req.method === 'POST') {
		//Get User
		const prismaUser = await prisma.user.findUnique({
			where: { email: session?.user?.email as string },
		});

		try {
			const formData = req.body;

			console.log('Form Data;', formData);

			const result = await prisma.purchaseOrder.create({
				data: {
					poNumber: formData.poNumber.toString(),
					type: formData.type,
					taxId: formData.taxId,
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
					createdById: prismaUser?.id as string,
					purchaseItems: {
						create: formData.purchaseItems.map((item: any) => ({
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
			const optText = `Please approve ${prismaUser?.name}'s Purchase Order PO Number: ${formData.poNumber}`;

			const htmlContent = render(
				<POEmailTemplate
					userName={prismaUser?.name as string}
					poNumber={formData?.poNumber}
					approvalUrl={approvalUrl}
				/>
			);
			await sendMail({ toEmail, subject, htmlContent, optText });

			res.status(200).json(result);
		} catch (err: any) {
			console.log('Error when creating Purchase Order:', err.message);
			res.status(403).json({ err: 'Error has occurred while creating a Purchase Order' });
		}
	}
}
