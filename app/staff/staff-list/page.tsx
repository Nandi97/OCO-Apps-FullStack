// 'use client';
import React from 'react';

import StaffTable from './components/StaffTable';
import StaffCard from './components/StaffCard';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function StaffList() {
	const session = await getServerSession(authOptions);
	if (!session) {
		return redirect('/api/auth/signIn');
	}
	return (
		<div className="space-y-2 bg-white">
			<StaffTable />
			<StaffCard />
		</div>
	);
}
