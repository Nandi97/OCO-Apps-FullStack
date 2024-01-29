'use client';

import { ColumnDef } from '@tanstack/react-table';

export type Staff = {
	id: string;
	name: string;
	designation: 'pending' | 'processing' | 'success' | 'failed';
	email: string;
};

export const columns: ColumnDef<Staff>[] = [
	{
		accessorKey: 'status',
		header: 'Status',
	},
	{
		accessorKey: 'email',
		header: 'Email',
	},
	{
		accessorKey: 'amount',
		header: 'Amount',
	},
];
