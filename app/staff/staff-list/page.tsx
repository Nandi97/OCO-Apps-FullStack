// 'use client';
import React from 'react';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { metadata } from '@/app/layout';
import Dashboard from '@/components/main/staff/staff-list/Dashboard';

export default async function StaffList() {
	metadata.title = 'Staff List';
	const session = await getServerSession(authOptions);
	if (!session) {
		return redirect('/api/auth/signIn');
	}
	return (
		<div className="space-y-2 bg-white">
			<Dashboard />
		</div>
	);
}
