import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import { formatISO } from 'date-fns';
import { Staff } from '@/lib/types/staff';

interface CauseListCase {
	coram: string;
	virtual: boolean;
	case: string;
	advocates: Staff[];
}
interface CauseList {
	date: string;
	articles: CauseListCase[];
	teamId: number;
}

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
			const formData: NewsFeed = req.body;

			const result = await prisma.newsFeed.create({
				data: {
					date: formatISO(formData.date),
					userId: prismaUser?.id,
					articles: {
						create: formData.articles.map((article) => ({
							title: article.title,
							content: article.content,
							url: article.url,
							tags: article.tags,
						})),
					},
				},
			});

			res.status(200).json(result);
		} catch (err: any) {
			console.log('Error when creating News Feed', err.message);
			res.status(403).json({ err: 'Error has occurred while creating News Feed' });
		}
	}
}
