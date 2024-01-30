import Dashboard from '@/components/main/newsfeed/Dashboard';
import { metadata } from '../layout';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

// export async function getSessionData() {
// 	const session: any = await getServerSession(authOptions);

// 	// console.log('USER:', session);
// 	return session;
// }

export default function NewsFeed() {
	metadata.title = 'NewsFeed';
	return (
		<div>
			<Dashboard />
		</div>
	);
}
