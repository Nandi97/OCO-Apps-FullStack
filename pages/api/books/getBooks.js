import prisma from '../../../prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import paginator from 'paginator';

export default async function handler(req, res) {
	const session = await getServerSession(req, res, authOptions);
	if (!session) {
		return res.status(401).json({ message: 'Please signin to view side menu' });
	}
	if (req.method === 'GET') {
		try {
			const page = parseInt(req.query.page) || 1;
			const perPage = parseInt(req.query.perPage) || 10;
			const searchParam = req.query.searchParam || ''; // Default to empty string if not provided

			const totalItems = await prisma.book.count();
			const paginatorInstance = new paginator(perPage, 4);

			const paginationData = paginatorInstance.build(totalItems, page);

			const data = await prisma.book.findMany({
				include: {
					staff: true,
				},
				skip: (page - 1) * perPage, // Calculate the offset
				take: perPage, // Limit the number of items per page
			});

			const links = [];
			const maxVisibleLinks = 7;

			// Add "Previous" link
			if (paginationData.has_previous_page) {
				links.push({
					url: `http://localhost:3000/api/books/getBooks?page=${paginationData.previous_page}`,
					label: '&laquo; Previous',
					active: false,
				});
			}

			// Generate links with "..." in between
			for (let i = 1; i <= paginationData.total_pages; i++) {
				if (
					(i <= 3 && i !== page) ||
					i >= paginationData.total_pages - 2 ||
					Math.abs(i - page) <= 1
				) {
					links.push({
						url: `http://localhost:3000/api/books/getBooks?page=${i}`,
						label: i.toString(),
						active: i === page,
					});
				} else if (
					(i === 4 && links[links.length - 1]?.label !== '...') ||
					(i === paginationData.total_pages - 3 &&
						links[links.length - 1]?.label !== '...')
				) {
					links.push({
						url: null,
						label: '...',
						active: false,
					});
				}
			}

			// Add "Next" link
			if (paginationData.has_next_page) {
				links.push({
					url: `http://localhost:3000/api/books/getBooks?page=${paginationData.next_page}`,
					label: 'Next &raquo;',
					active: false,
				});
			}

			const responseData = {
				currentPage: paginationData.current_page,
				data,
				firstPageUrl: `http://localhost:3000/api/books/getBooks?page=1`,
				from: paginationData.first_result,
				lastPage: paginationData.total_pages,
				lastPageUrl: `http://localhost:3000/api/books/getBooks?page=${paginationData.total_pages}`,
				links,
				nextPageUrl: `http://localhost:3000/api/books/getBooks?page=${
					paginationData.current_page + 1
				}`,
				path: 'http://localhost:3000/api/books/getBooks',
				perPage,
				searchParam,
				prevPageUrl: `http://localhost:3000/api/books/getBooks?page=${
					paginationData.current_page - 1
				}`,
				to: paginationData.last_result,
				total: totalItems,
			};
			return res.status(200).json(responseData);
		} catch (err) {
			res.status(403).json({
				error: 'Error occurred while fetching books data',
			});
		}
	}
}
