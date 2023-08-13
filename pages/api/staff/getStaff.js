import prisma from '../../../prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
	const session = await getServerSession(req, res, authOptions);
	if (!session) {
		return res.status(401).json({ message: 'Please sign in to view the side menu' });
	}

	if (req.method === 'GET') {
		try {
			const page = parseInt(req.query.page) || 1;
			const perPage = parseInt(req.query.perPage) || 10;
			const searchParam = req.query.searchParam || ''; // Default to empty string if not provided

			const skip = (page - 1) * perPage;

			const totalItems = await prisma.staff.count();
			const totalPages = Math.ceil(totalItems / perPage);

			const data = await prisma.staff.findMany({
				include: {
					designation: {
						include: {
							staffType: true,
						},
					},
					gender: true,
					team: true,
				},
				orderBy: {
					staffNo: 'asc',
				},
				skip,
				take: perPage,
			});

			const links = [];

			// Add "Previous" link
			if (page > 1) {
				links.push({
					url: `/api/staff/getStaff?page=${page - 1}`,
					label: '&laquo; Previous',
					active: false,
				});
			}

			// Add links for individual pages
			for (let i = 1; i <= totalPages; i++) {
				links.push({
					url: `/api/staff/getStaff?page=${i}`,
					label: i.toString(),
					active: i === page,
				});
			}

			// Add "Next" link
			if (page < totalPages) {
				links.push({
					url: `/api/staff/getStaff?page=${page + 1}`,
					label: 'Next &raquo;',
					active: false,
				});
			}
			const from = (page - 1) * perPage + 1;
			const to = Math.min(page * perPage, totalItems);

			const responseData = {
				currentPage: page,
				data,
				firstPageUrl: `/api/staff/getStaff?page=1`,
				lastPage: totalPages,
				lastPageUrl: `/api/staff/getStaff?page=${totalPages}`,
				links,
				nextPageUrl: `/api/staff/getStaff?page=${page + 1}`,
				path: '/api/staff/getStaff',
				perPage,
				searchParam,
				prevPageUrl: `/api/staff/getStaff?page=${page - 1}`,
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
