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
	if (req.method === 'PATCH' || req.method === 'PATCH') {
		const session = await getServerSession(req, res, authOptions);

		if (!session) {
			return res.status(401).json({ message: 'Please sign-in to edit staff.' });
		}

		try {
			const formData = req.body;

			// console.log('Form Data;', formData);

			const result = await prisma.staff.update({
				where: {
					id: formData.id,
				},
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
				},
			});
			res.status(200).json(result);
		} catch (err) {
			console.log('Error when editing staff:', err.message);
			res.status(403).json({
				err: `Error has occurred while editing staff: ${req.body.name}`,
			});
		}
	}
}
