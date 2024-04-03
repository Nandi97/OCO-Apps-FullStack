'use client';
import SearchInput from '@/components/my-ui/SearchInput';
import { Icon } from '@iconify/react/dist/iconify.js';
import Link from 'next/link';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { CauseList } from '@/lib/types/master';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

const fetchAllCauseList = async (searchParam: string | null) => {
	const response = await axios.get('/api/cause-list/get', {
		params: { searchParam },
	});
	return response.data;
};

const Dashboard = () => {
	const pathname = usePathname();
	const [searchParam, setSearchParam] = useState<string | null>(null);

	const { data } = useQuery({
		queryFn: () => fetchAllCauseList(searchParam),
		queryKey: ['causeList', searchParam],
	});

	const columns = [
		{ label: 'Created On', align: 'start', textClass: 'text-secondary-900' },
		{ label: 'Team', align: 'start', textClass: 'text-primary-500' },
		{ label: 'Title', align: 'start', textClass: 'text-secondary-500' },
		{ label: 'Prepared By', align: 'start', textClass: 'text-secondary-500' },
	];

	const causeData: CauseList[] = data?.data;
	console.log('Cause List Data', data);

	const handleSearch = (searchInput: any) => {
		setSearchParam(searchInput);
	};
	return (
		<div className="w-full space-y-3 bg-primary-50">
			<div className="sticky top-2 z-20 hidden items-center justify-end gap-2 bg-white md:flex">
				<div className="inline-flex items-center space-x-2 px-2">
					<SearchInput onSearch={handleSearch} />
					<Link
						href={`${pathname}/create`}
						className="rounded-md border bg-secondary-300  p-2"
					>
						<Icon icon="heroicons:plus" />
					</Link>
				</div>
			</div>
			<div className="overscroll-none shadow ring-1 ring-black ring-opacity-5 md:rounded-md">
				<div className="hidden flex-col lg:flex">
					<table className="table-auto divide-y divide-primary-100">
						<thead className="sticky top-12 z-10 bg-secondary-600 text-secondary-50">
							<tr>
								{columns?.map((column, index) => (
									<th
										key={index}
										scope="col"
										className={`sticky top-0 py-3.5 ${index === 0 ? 'pl-4' : 'px-3'} ${index === columns.length - 1 ? 'pr-3' : ''} text-start text-sm font-semibold`}
									>
										{column.label}
									</th>
								))}
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200 bg-white">
							{!data ? (
								<tr>
									<td
										colSpan={4}
										className="whitespace-nowrap px-3 py-2 text-start text-base text-secondary-900"
									>
										No data matching Search
									</td>
								</tr>
							) : (
								causeData?.map((item, index) => (
									<tr
										key={item?.id}
										className={`hover:bg-primary-100/95 ${
											index % 2 && index !== 0 ? 'bg-secondary-100/95' : ''
										}`}
									>
										<td className="whitespace-nowrap px-3 py-2 text-start text-base text-secondary-900">
											{format(item?.createdAt, 'MMM do, yyyy')}
										</td>
										<td className="whitespace-nowrap px-3 py-2 text-start text-base text-secondary-900">
											{item?.team?.name}
										</td>
										<td className="whitespace-nowrap px-3 py-2 text-start text-base text-primary-500">
											<Link href={`${pathname}/${item?.id}`}>
												Matters Appearing in the Cause List for{' '}
												{format(item?.date, 'EEEE do MMMM yyyy')}
											</Link>
										</td>
										<td className="whitespace-nowrap px-3 py-2 text-start text-sm text-secondary-500">
											{item?.createdBy?.name}
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
