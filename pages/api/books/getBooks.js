import prisma from '../../../prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
	// const session = await getServerSession(req, res, authOptions);
	// if (!session) {
	// 	return res.status(401).json({ message: 'Please sign in to view the side menu' });
	// }

	if (req.method === 'GET') {
		try {
			const page = parseInt(req.query.page) || 1;
			const perPage = parseInt(req.query.perPage) || 10;
			const searchParam = req.query.searchParam || '';

			const skip = (page - 1) * perPage;

			const totalItems = await prisma.book.count();
			const totalPages = Math.ceil(totalItems / perPage);

			const data = await prisma.book.findMany({
				where: {
					OR: [
						{ author: { contains: searchParam, mode: 'insensitive' } },
						{ title: { contains: searchParam, mode: 'insensitive' } },
						{ mediaType: { contains: searchParam, mode: 'insensitive' } },
						{ publisher: { contains: searchParam, mode: 'insensitive' } },
						{ subject: { contains: searchParam, mode: 'insensitive' } },
						// { ext: { contains: parseInt(searchParam) } },
					],
				},
				include: {
					staff: true,
				},
				skip,
				take: perPage,
			});

			const links = [];

			if (page > 1) {
				links.push({
					url: `/api/books/getBooks?page=${page - 1}`,
					label: '&laquo; Previous',
					active: false,
				});
			}

			// Add links for individual pages
			for (let i = 1; i <= totalPages; i++) {
				links.push({
					url: `/api/books/getBooks?page=${i}`,
					label: i.toString(),
					active: i === page,
				});
			}

			if (page < totalPages) {
				links.push({
					url: `/api/books/getBooks?page=${page + 1}`,
					label: 'Next &raquo;',
					active: false,
				});
			}
			const from = (page - 1) * perPage + 1;
			const to = Math.min(page * perPage, totalItems);

			const responseData = {
				currentPage: page,
				data,
				firstPageUrl: `/api/books/getBooks?page=1`,
				lastPage: totalPages,
				lastPageUrl: `/api/books/getBooks?page=${totalPages}`,
				links,
				nextPageUrl: `/api/books/getBooks?page=${page + 1}`,
				path: '/api/books/getBooks',
				perPage,
				searchParam,
				prevPageUrl: `/api/books/getBooks?page=${page - 1}`,
				total: totalItems,
				from,
				to,
			};

			return res.status(200).json(responseData);
		} catch (err) {
			res.status(403).json({
				error: 'Error occurred while fetching books data',
			});
		}
	}
}
