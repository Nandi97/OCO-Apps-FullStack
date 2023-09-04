import prisma from '../../../prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
export const config = {
	api: {
		bodyParser: {
			sizeLimit: '10mb',
		},
	},
};
export default async function handler(req, res) {
	if (req.method === 'POST') {
		const session = await getServerSession(req, res, authOptions);

		if (!session) {
			return res.status(401).json({ message: 'Please sign-in to create staff.' });
		}

		//Get User
		const prismaUser = await prisma.user.findUnique({
			where: { email: session.user.email },
		});

		try {
			const formData = req.body;

			// console.log('Form Data;', formData);

			const result = await prisma.staff.create({
				data: {
					avatarUrl: formData.avatarUrl,
					name: formData.name,
					designationId: formData.designationId,
					teamId: formData.teamId,
					email: formData.email,
					mobile: formData.mobile,
					staffNo: formData.staffNo,
					ext: formData.ext,
					genderId: formData.genderId,
					createdById: prismaUser?.id,
				},
			});
			res.status(200).json(result);
		} catch (err) {
			console.log('Error when creating staff:', err.message);
			res.status(403).json({ err: 'Error has occurred while creating staff' });
		}
	}
}
