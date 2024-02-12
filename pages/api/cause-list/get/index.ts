import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

interface QueryParams {
	searchParam?: string;
	page?: number;
	perPage?: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			const { searchParam, page = 1, perPage = 10 } = req.query as QueryParams;
			const skip = (page - 1) * perPage;

			const totalItems = await prisma.causeList.count();
			const totalPages = Math.ceil(totalItems / perPage);

			let data;
			if (searchParam) {
				const data = await prisma.causeList.findMany({
					where: {
						OR: [
							{
								team: {
									name: { contains: searchParam as string, mode: 'insensitive' },
								},
							},
							{
								createdBy: {
									name: { contains: searchParam as string, mode: 'insensitive' },
								},
							},
						],
					},
					include: {
						team: true,
						createdBy: true,
						cases: {
							include: {
								advocates: true,
							},
						},
					},
					skip,
					take: perPage,
				});
			} else {
				data = await prisma.causeList.findMany({
					include: {
						team: true,
						createdBy: true,
						cases: {
							include: {
								advocates: true,
							},
						},
					},
					skip,
					take: perPage,
				});
			}
			const links = [];

			if (page > 1) {
				links.push({
					url: `/api/cause-list/get?page=${page - 1}`,
					label: '&laquo; Previous',
					active: false,
				});
			}

			// Add links for individual pages
			for (let i = 1; i <= totalPages; i++) {
				links.push({
					url: `/api/cause-list/get?page=${i}`,
					label: i.toString(),
					active: i === page,
				});
			}

			if (page < totalPages) {
				links.push({
					url: `/api/cause-list/get?page=${page + 1}`,
					label: 'Next &raquo;',
					active: false,
				});
			}
			const from = (page - 1) * perPage + 1;
			const to = Math.min(page * perPage, totalItems);

			const responseData = {
				currentPage: page,
				data,
				firstPageUrl: `/api/cause-list/get?page=1`,
				lastPage: totalPages,
				lastPageUrl: `/api/cause-list/get?page=${totalPages}`,
				links,
				nextPageUrl: `/api/cause-list/get?page=${page + 1}`,
				path: '/api/cause-list/get',
				perPage,
				searchParam,
				prevPageUrl: `/api/cause-list/get?page=${page - 1}`,
				total: totalItems,
				from,
				to,
			};

			return res.status(200).json(responseData);
		} catch (err) {
			res.status(403).json({ err: 'Error has occurred while fetching News Feed' });
		}
	}
}
