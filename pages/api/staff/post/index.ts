import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);

	if (!session) {
		return res.status(401).json({ message: 'Please sign-in to create staff.' });
	}

	//Get User
	const prismaUser = await prisma.user.findUnique({
		where: { email: session?.user?.email as string },
	});

	if (req.method === 'POST') {
		const formData = req.body;

		const result = await prisma.staff.create({
			data: {
				...formData,
				createdById: prismaUser?.id,
			},
		});
		res.status(200).json(result);
		try {
		} catch (err: any) {
			console.log('Error when creating Staff', err.message);
			res.status(403).json({ err: 'Error has occurred while creating Staff Member' });
		}
	}
}
