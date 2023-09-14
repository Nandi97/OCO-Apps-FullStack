import MeetingTable from './components/MeetingTable';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function Home() {
	const session = await getServerSession(authOptions);
	if (!session) {
		return redirect('/api/auth/signIn');
	}
	return (
		<div className="space-y-2">
			<MeetingTable />
		</div>
	);
}
