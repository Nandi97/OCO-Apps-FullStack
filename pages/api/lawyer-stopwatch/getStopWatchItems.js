import prisma from '../../../prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
	// const session = await getServerSession(req, res, authOptions);
	// if (!session) {
	// 	return res.status(401).json({ message: 'Please signin to view side menu' });
	// }
	if (req.method === 'GET') {
		try {
			const page = parseInt(req.query.page) || 1;
			const perPage = parseInt(req.query.perPage) || 10;
			const searchParam = req.query.searchParam || '';

			const skip = (page - 1) * perPage;

			const totalItems = await prisma.stopWatchItem.count();
			const totalPages = Math.ceil(totalItems / perPage);

			const data = await prisma.stopWatchItem.findMany({
				where: {
					OR: [
						{
							matter: {
								code: { contains: searchParam, mode: 'insensitive' },
							},
						},
						{
							stopWatchItemTask: {
								name: { contains: searchParam, mode: 'insensitive' },
							},
						},
						{ narration: { contains: searchParam, mode: 'insensitive' } },
					],
				},
				include: {
					matter: true,
					stopWatchItemTask: true,
				},

				orderBy: {
					id: 'desc',
				},
				skip,
				take: perPage,
			});

			const links = [];

			if (page > 1) {
				links.push({
					url: `/api/lawyer-stopwatch/getStopWatchItems?page=${page - 1}`,
					label: '&laquo; Previous',
					active: false,
				});
			}

			// Add links for individual pages
			for (let i = 1; i <= totalPages; i++) {
				links.push({
					url: `/api/lawyer-stopwatch/getStopWatchItems?page=${i}`,
					label: i.toString(),
					active: i === page,
				});
			}

			if (page < totalPages) {
				links.push({
					url: `/api/lawyer-stopwatch/getStopWatchItems?page=${page + 1}`,
					label: 'Next &raquo;',
					active: false,
				});
			}
			const from = (page - 1) * perPage + 1;
			const to = Math.min(page * perPage, totalItems);

			const responseData = {
				currentPage: page,
				data,
				firstPageUrl: `/api/lawyer-stopwatch/getStopWatchItems?page=1`,
				lastPage: totalPages,
				lastPageUrl: `/api/lawyer-stopwatch/getStopWatchItems?page=${totalPages}`,
				links,
				nextPageUrl: `/api/lawyer-stopwatch/getStopWatchItems?page=${page + 1}`,
				path: '/api/lawyer-stopwatch/getStopWatchItems',
				perPage,
				searchParam,
				prevPageUrl: `/api/lawyer-stopwatch/getStopWatchItems?page=${page - 1}`,
				total: totalItems,
				from,
				to,
			};

			return res.status(200).json(responseData);
		} catch (err) {
			res.status(403).json({ err: 'Error has occured while fetching menus' });
		}
	}
}
