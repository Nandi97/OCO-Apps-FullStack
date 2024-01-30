import { metadata } from '@/app/layout';
import CreateLeave from '@/components/main/staff/leave-applicaton/CreateLeave';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

// export async function getSessionData() {
// 	const session = await getServerSession(authOptions);
// 	// console.log(session)
// 	return session;
// }

export default async function CreateLeavePage() {
	metadata.title = 'Leave Application';
	// const session = await getSessionData();

	// console.log('Session', session);
	return <CreateLeave />;
}
