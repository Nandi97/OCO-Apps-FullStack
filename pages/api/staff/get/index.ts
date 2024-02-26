import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// const session = await getServerSession(req, res, authOptions);
	// if (!session) {
	// 	return res.status(401).json({ message: 'Please sign-in to view staff' });
	// }
	if (req.method === 'GET') {
		try {
			const queryParameters: any = req.query.slug || '';

			console.log(queryParameters);

			const data = await prisma.staff.findMany({
				where: {
					name: { contains: queryParameters, mode: 'insensitive' },
				},
				include: {
					designation: {
						include: {
							staffType: true,
						},
					},
					gender: true,
					team: true,
					leaveBalance: true,
				},
				// skip: 1,
				// take: 1,
				orderBy: {
					staffNo: 'asc',
				},
			});

			return res.status(200).json(data);
		} catch (err) {
			res.status(403).json({ err: 'Error has occurred while fetching staff' });
		}
	}
}
