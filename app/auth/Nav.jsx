import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { signIn } from 'next-auth/react';
import Login from './Login';
import Logged from './Logged';

export async function getSessionData() {
	const session = await getServerSession(authOptions);
	// console.log(session)
	return session;
}

export default async function Nav() {
	const session = await getSessionData();

	return (
		<>
			{!session?.user && <Login />}
			{session?.user && (
				<Logged
					image={session?.user?.image || ''}
					name={session?.user?.name}
					designation=""
				/>
			)}
		</>
	);
}
