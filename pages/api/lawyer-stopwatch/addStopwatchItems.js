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
		const session = await getServerSession(req, res, authOptions);

		if (!session) {
			return res.status(401).json({ message: 'Please sign-in to create a stop watch item.' });
		}
		//Get User
		const prismaUser = await prisma.user.findUnique({
			where: { email: session.user.email },
		});

		try {
			// console.log('Body Data:', req.body);
			const formData = req.body;

			if (!Array.isArray(formData)) {
				return res
					.status(400)
					.json({ error: 'Invalid input data format. Expected an array.' });
			}

			// Create an array of objects to insert
			const dataToInsert = formData.map((item) => {
				const data = {
					narration: item.narration,
					createdById: prismaUser.id,
					stopWatchItemTaskId: item.taskId,
					matterId: item.matterId,
				};

				if (item.itemDate) {
					data.itemDate = item.itemDate;
				} else {
					data.itemDate = new Date();
				}

				if (item.startedAt) {
					data.startedAt = item.startedAt;
				} else {
					data.startedAt = new Date();
				}

				if (item.endedAt) {
					data.endedAt = item.endedAt;
				} else {
					data.endedAt = new Date();
				}

				return data;
			});

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
