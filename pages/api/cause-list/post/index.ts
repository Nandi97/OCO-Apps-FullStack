import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import { formatISO } from 'date-fns';
import { CauseList } from '@/lib/types/master';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);
	if (!session) {
		return res.status(401).json({ message: 'Please signIn to create Cause List' });
	}
	if (req.method === 'POST') {
		//Get User
		const prismaUser = await prisma.staff.findUnique({
			where: { email: session?.user?.email as string },
		});
		try {
			const formData: CauseList = req.body;

			const result = await prisma.causeList.create({
				data: {
					date: formatISO(formData.date),
					teamId: formData.team.id,
					creatorId: prismaUser?.id,
					cases: {
						create: formData.cases.map((item) => ({
							coram: item.coram,
							virtual: item.virtual,
							url: item.url,
							case: item.case,
							advocates: {
								connect: item.advocates.map((a: any) => ({ id: a.id })),
							},
						})),
					},
				},
			});

			res.status(200).json(result);
		} catch (err: any) {
			console.log('Error when creating Cause List', err.message);
			res.status(403).json({ err: 'Error has occurred while creating Cause List' });
		}
	}
}
