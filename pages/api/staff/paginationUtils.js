import prisma from '../../../prisma/client';

export async function handlePaginationAndSearch(req, res, model) {
	try {
		const page = parseInt(req.query.page) || 1;
		const perPage = parseInt(req.query.perPage) || 10;
		const searchParam = req.query.searchParam || '';

		const skip = (page - 1) * perPage;

		const totalItems = await model.count({
			where: {
				OR: [
					{ name: { contains: searchParam, mode: 'insensitive' } },
					{ email: { contains: searchParam, mode: 'insensitive' } },
					// { ext: { contains: parseInt(searchParam) } },
					{
						designation: {
							name: { contains: searchParam, mode: 'insensitive' },
						},
					},
					{
						team: {
							name: { contains: searchParam, mode: 'insensitive' },
						},
					},
				],
			},
		});
		const totalPages = Math.ceil(totalItems / perPage);

		const data = await model.findMany({
			where: {
				OR: [
					{ name: { contains: searchParam, mode: 'insensitive' } },
					{ email: { contains: searchParam, mode: 'insensitive' } },
					// { ext: { contains: parseInt(searchParam) } },
					{
						designation: {
							name: { contains: searchParam, mode: 'insensitive' },
						},
					},
					{
						team: {
							name: { contains: searchParam, mode: 'insensitive' },
						},
					},
				],
			},
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

		// ... rest of the code for generating links and responseData ...

		const responseData = {
			// ... existing responseData properties ...
			currentPage: page,
			data,
			// ... existing responseData properties ...
		};

		return res.status(200).json(responseData);
	} catch (err) {
		res.status(403).json({
			error: 'Error occurred while fetching data',
		});
	}
}
