import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function handler(req, res) {
	const session = await getServerSession(req, res, authOptions);
	if (!session) {
		return res.status(401).json({ message: 'Please sign in to get this staff' });
	}
	if (req.method === 'GET') {
		try {
			const staffId = req.query.staffId;

			const data = await prisma.staff.findUnique({
				where: { id: staffId },
				select: {
					id: true,
					name: true,
					email: true,
					mobile: true,
					ext: true,
					staffNo: true,
					avatarUrl: true,
					teamId: true,
					designationId: true,
					genderId: true,
					deletedAt: true,
					designation: {
						select: {
							id: true,
							name: true,
						},
					},
					gender: {
						select: {
							id: true,
							name: true,
						},
					},
					team: {
						select: {
							id: true,
							name: true,
						},
					},
				},
			});

			if (!data) {
				return res.status(404).json({ error: 'User not found' });
			}

			return res.status(200).json(data);
		} catch (err) {
			console.error('Error fetching purchase order:', err); // Log the error for debugging
			res.status(500).json({ error: 'An error occurred while fetching the user' });
		}
	}
}
