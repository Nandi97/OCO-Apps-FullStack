import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { connect } from 'http2';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);
	if (!session) {
		return res.status(401).json({ message: 'Please sign-in to create book.' });
	}
	//Get User
	const prismaUser = await prisma.user.findUnique({
		where: { email: session?.user?.email as string },
	});
	if (!prismaUser) {
		return res.status(404).json({ message: 'User not found.' });
	}
	if (req.method === 'POST') {
		try {
			const formData = req.body;

			const result = await prisma.book.create({
				data: {
					...formData,
					userId: prismaUser?.id,
				},
			});
			res.status(200).json(result);
		} catch (err: any) {
			console.log('Error when creating Book', err.message);
			res.status(403).json({ err: 'Error has occurred while creating Book' });
		}
	}
}
