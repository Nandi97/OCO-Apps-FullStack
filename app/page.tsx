import UserPanel from '@/components/my-ui/pages/dashboard/UserPane';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Staff from './staff/page';
import { useState } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { metadata } from './layout';
import { redirect } from 'next/navigation';

// export async function getSessionData() {
// 	const session: any = await getServerSession(authOptions);
// 	// console.log(session);
// 	return session;
// }

export default async function Dashboard() {
	metadata.title = 'Dashboard';
	// const session = await getSessionData();

	// if (!session) {
	// 	redirect('/auth/signin');
	// }
	const divs: any = [];
	for (let i = 0; i < 4; i++) {
		divs.push(
			<>
				<div className="col-span-4 flex items-center justify-center">
					{/* <UserPanel sessionData={session} /> */}
				</div>
				<div className="col-span-8 flex items-center justify-center">
					{/* <UserPanel sessionData={session} /> */}
				</div>
				<div className="col-span-8 flex items-center justify-center">
					{/* <UserPanel sessionData={session} /> */}
				</div>
				<div className="col-span-4 flex items-center justify-center">
					{/* <UserPanel sessionData={session} /> */}
				</div>
			</>
		);
	}
	return (
		<div className=" mx-auto w-full bg-contain bg-left-top bg-no-repeat px-40">
			<div className="grid grid-cols-12 gap-8">{divs}</div>
		</div>
	);
}
