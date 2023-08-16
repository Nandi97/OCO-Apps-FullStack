import prisma from '../../../prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '10mb',
		},
	},
};

export default async function handler(req, res) {
	if (req.method === 'POST') {
		// const session = await getServerSession(req, res, authOptions);

		// if (!session) {
		// 	return res.status(401).json({ message: 'Please sign-in to create a stop watch item.' });
		// }
		// //Get User
		// const prismaUser = await prisma.user.findUnique({
		// 	where: { email: session.user.email },
		// });

		try {
			const formData = req.body;

			// Check if formData is an array
			if (!Array.isArray(formData)) {
				return res
					.status(400)
					.json({ error: 'Invalid input data format. Expected an array.' });
			}

			// Create an array of objects to insert
			const dataToInsert = formData.map((item) => ({
				narration: item.narration,
				itemDate: item.itemDate,
				startedAt: item.startedAt,
				endedAt: item.endedAt,
				createdById: item.createdById,
				stopWatchItemTaskId: item.stopWatchItemTaskId,
				matterId: item.matterId,
			}));

			const result = await prisma.stopWatchItem.createMany({
				data: dataToInsert,
			});

			res.status(200).json(result);
		} catch (err) {
			console.log('Error when creating stop watch items:', err.message);
			res.status(500).json({ error: 'An error occurred while creating stop watch items.' });
		}
	}
}
