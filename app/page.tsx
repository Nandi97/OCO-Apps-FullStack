import UserPanel from '@/components/my-ui/pages/dashboard/UserPane';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Staff from './staff/page';
import { useState } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export async function getSessionData() {
	const session: any = await getServerSession(authOptions);
	// console.log(session);
	return session;
}

export default async function Dashboard() {
	const session = await getSessionData();

	return (
		<div
			className="grid grid-cols-12 bg-left-top bg-contain bg-no-repeat w-full mx-auto gap-4"
			style={{
				backgroundImage: `url("https://www.oraro.co.ke/wp-content/uploads/2022/11/Oraro-Classic_Logo_Full-Colour-copy-5.png")`,
			}}
		>
			<div className="col-span-4 flex justify-center items-center">
				<UserPanel sessionData={session} />
			</div>
			<div className="col-span-8">other</div>
		</div>
	);
}
