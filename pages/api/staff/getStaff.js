//

import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { handlePaginationAndSearch } from './paginationUtils';
import prisma from '../../../prisma/client';

export default async function handler(req, res) {
	const session = await getServerSession(req, res, authOptions);
	if (!session) {
		return res.status(401).json({ message: 'Please sign in to view the side menu' });
	}

	if (req.method === 'GET') {
		await handlePaginationAndSearch(req, res, prisma.staff);
	}
}
