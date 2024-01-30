'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { DataTable } from './table/data-table';
import { columns } from './table/columns';

export default function Dashboard() {
	const { data, isPending } = useQuery({
		queryKey: ['staffList'],
		queryFn: () => axios.get('/api/staff/get').then((response) => response.data),
	});

	console.log(data);

	return (
		<div className="shadow overscroll-none ring-1 ring-black ring-opacity-5 md:rounded-md">
			{data && <DataTable columns={columns} data={data} />}
		</div>
	);
}
