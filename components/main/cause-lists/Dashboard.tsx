'use client';
import SearchInput from '@/components/my-ui/SearchInput';
import { Icon } from '@iconify/react/dist/iconify.js';
import Link from 'next/link';
import axios from 'axios';
import CustomTable from '@/components/my-ui/CustomTable';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { CauseList } from '@/lib/types/master';
import { useQuery } from '@tanstack/react-query';

const fetchAllCauseList = async () => {
	const response = await axios.get('/api/cause-list/get');
	return response.data;
};

const Dashboard = () => {
	const pathname = usePathname();
	const [searchParam, setSearchParam] = useState<string | null>(null);

	const { data } = useQuery<CauseList[]>({
		queryFn: fetchAllCauseList,
		queryKey: ['causeList'],
	});

	const columns = [
		{ key: 'id', label: ' ', align: 'start', textClass: 'text-secondary-900' },
		{ key: 'date', label: 'Date', align: 'start', textClass: 'text-primary-500' },
		{ key: 'team.name', label: 'Team', align: 'start', textClass: 'text-secondary-500' },
	];

	const handleSearch = (searchInput: any) => {
		setSearchParam(searchInput);
	};
	return (
		<div className="w-full bg-primary-50 space-y-3">
			<div className="sticky z-20 md:flex items-center justify-end gap-2 bg-white top-2 hidden">
				<div className="inline-flex items-center space-x-2 px-2">
					<SearchInput onSearch={handleSearch} />
					<Link
						href={`${pathname}/create`}
						className="p-2 border bg-secondary-300  rounded-md"
					>
						<Icon icon="heroicons:plus" />
					</Link>
				</div>
			</div>
			<div className="shadow overscroll-none ring-1 ring-black ring-opacity-5 md:rounded-md">
				<div className="flex-col hidden lg:flex">
					<CustomTable data={data} columns={columns} />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
