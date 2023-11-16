import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			// console.log(req.query.slug);
			const leaveId = req.query.slug?.toString();
			const data = await prisma.leaveApplication.findUnique({
				where: { id: leaveId },
				include: {
					employee: {
						include: {
							designation: true,

							team: true,

							leaveDays: true,
						},
					},
					supervisor: {
						include: {
							designation: true,
						},
					},
					humanResource: {
						include: {
							designation: true,
						},
					},
					partner: {
						include: {
							designation: true,
						},
					},
					type: true,
					supervisorApproval: true,
					partnerApproval: true,
					hRMApproval: true,
				},
			});
			return res.status(200).json(data);
		} catch (err) {
			res.status(403).json({ err: 'Error has occurred while fetching Leave Application' });
		}
	}
}
