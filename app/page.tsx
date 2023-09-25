import Image from 'next/image';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import UserPanel from '@/components/my-ui/pages/dashboard/UserPane';
import avatar from '@/public/assets/images/avatar_placeholder.png';

export async function getSessionData() {
	const session = await getServerSession(authOptions);
	// console.log(session)
	return session;
}

export default async function Home() {
	const session = await getSessionData();
	// if (session === null || session === undefined) {
	// 	return redirect('/api/auth/signIn');
	// }
	// console.log('Session', session);

	return (
		<div
			className="grid grid-cols-12 bg-left-top bg-contain bg-no-repeat w-full mx-auto gap-4"
			style={{
				backgroundImage: `url("https://www.oraro.co.ke/wp-content/uploads/2022/11/Oraro-Classic_Logo_Full-Colour-copy-5.png")`,
			}}
		>
			<div className="col-span-4 flex justify-center items-center">
				<UserPanel
					userImage={session?.user?.image || avatar}
					userEmail={session?.user?.email}
					userName={session?.user?.name}
				/>
			</div>
			<div className="col-span-8">other</div>
		</div>
	);
}
