import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		try {
			const formData = req.body;
			const result = await prisma.leaveApplication.create({
				data: {
					...formData,
					leaveSupervisorApproval: {
						create: {
							comments: 'Pending Supervisor Approval',
						},
					},
					leaveFinalApproval: {
						create: {
							comments: 'Pending Final Approval',
						},
					},
					leaveHRMApproval: {
						create: {
							comments: 'Pending Human Resource Approval',
						},
					},
				},
			});
			res.status(200).json(result);
			// console.log(result);
		} catch (err: any) {
			console.log('Error when creating Leave Application', err.message);
			res.status(403).json({ err: 'Error has occurred while creating leave Application' });
		}
	}
}
