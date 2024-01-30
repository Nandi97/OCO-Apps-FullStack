import UserPanel from '@/components/my-ui/pages/dashboard/UserPane';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Staff from './staff/page';
import { useState } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import type { Metadata } from 'next';
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
	// console.log(session);
	const divs = [];
	for (let i = 0; i < 4; i++) {
		divs.push(
			<>
				<div className="col-span-4 flex justify-center items-center">
					<UserPanel sessionData={session} />
				</div>
				<div className="col-span-8 flex justify-center items-center">
					<UserPanel sessionData={session} />
				</div>
				<div className="col-span-8 flex justify-center items-center">
					<UserPanel sessionData={session} />
				</div>
				<div className="col-span-4 flex justify-center items-center">
					<UserPanel sessionData={session} />
				</div>
			</>
		);
	}
	return (
		<div
			className=" bg-left-top bg-contain bg-no-repeat w-full px-40 mx-auto"
			// style={{
			// 	backgroundImage: `url("https://www.oraro.co.ke/wp-content/uploads/2022/11/Oraro-Classic_Logo_Full-Colour-copy-5.png")`,
			// }}
		>
			<div className="grid grid-cols-12 gap-8">
				{/* <div className="col-span-4 flex justify-center items-center">
				<UserPanel sessionData={session} />
			</div> */}
				{divs}
			</div>
		</div>
	);
}
