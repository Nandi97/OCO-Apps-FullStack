'use client';
import OptDropdown from '@/components/my-ui/OptDropdown';
import SearchInput from '@/components/my-ui/SearchInput';
import { Asset } from '@/lib/types/master';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const getAssets = async () => {
	const response = await axios.get('/api/asset/get');
	return response.data;
};
const Dashboard = () => {
	const pathname = usePathname();
	const [searchParam, setSearchParam] = useState<string | null>(null);

	const { data } = useQuery<Asset[]>({
		queryFn: getAssets,
		queryKey: ['assets'],
	});

	const columns = [
		{ label: '#', align: 'start', textClass: 'text-secondary-900' },
		{ label: 'Asset Name', align: 'start', textClass: 'text-primary-500' },
		{ label: 'Serial Number', align: 'start', textClass: 'text-secondary-500' },
		{ label: 'OCO Tag Number', align: 'start', textClass: 'text-secondary-500' },
		{ label: 'Location', align: 'start', textClass: 'text-secondary-500' },
		{ label: 'Type', align: 'start', textClass: 'text-secondary-500' },
		{ label: 'Currently With?', align: 'start', textClass: 'text-secondary-500' },
		{ label: 'Condition', align: 'start', textClass: 'text-secondary-500' },
		{ label: '', align: 'start', textClass: 'text-secondary-500' },
	];
	const handleDelete = (id: string) => {
		console.log('Deleting Asset Order');
	};

	const tableOptBtnTxt = {
		icon: 'heroicons:ellipsis-horizontal',
		buttonClassName:
			'flex items-center justify-center w-full h-8 px-4 text-secondary-900 rounded-sm hover:shadow-sm z-20',
	};

	const handleSearch = (searchInput: any) => {
		setSearchParam(searchInput);
	};
	return (
		<div className="w-full bg-primary-50 space-y-3">
			<div className="sticky z-20 md:flex items-center justify-between gap-2 bg-white top-2 hidden">
				<div className="inline-flex items-center space-x-2 px-2">
					<SearchInput onSearch={handleSearch} />
				</div>
				<div className="inline-flex items-center space-x-2 px-2">
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
					<table className="table-auto divide-y divide-primary-100">
						<thead className="sticky z-10 top-12 bg-secondary-600 text-secondary-50">
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
						<tbody className="bg-white divide-y divide-gray-200">
							{!data ? (
								<tr>
									<td
										colSpan={4}
										className="px-3 py-2 text-base text-start whitespace-nowrap text-secondary-900"
									>
										No data
									</td>
								</tr>
							) : (
								data?.map((item, i) => (
									<tr
										key={item?.id}
										className={`hover:bg-primary-100/95 ${
											i % 2 && i !== 0 ? 'bg-secondary-100/95' : ''
										}`}
									>
										<td className="px-3 py-2 text-base text-start whitespace-nowrap text-secondary-900">
											{i + 1}
										</td>
										<td className="px-3 py-2 text-base text-start whitespace-nowrap text-secondary-900">
											{item?.name}
										</td>
										<td className="px-3 py-2 text-base text-start whitespace-nowrap text-secondary-900">
											{item?.serialNumber}
										</td>
										<td className="px-3 py-2 text-base text-start whitespace-nowrap text-secondary-900">
											{item?.ocoTagNumber}
										</td>
										<td className="px-3 py-2 text-base text-start whitespace-nowrap text-secondary-900">
											{item?.location}
										</td>
										<td className="px-3 py-2 text-base text-start whitespace-nowrap text-secondary-900">
											{item?.type?.name}
										</td>
										<td className="px-3 py-2 text-base text-start whitespace-nowrap text-secondary-900">
											{item?.currentlyWith?.name}
										</td>
										<td className="px-3 py-2 text-base text-start whitespace-nowrap text-secondary-900">
											{item?.condition?.name}
										</td>
										<td className="px-3 py-2 text-base text-start whitespace-nowrap text-secondary-900">
											<OptDropdown
												optBtn={tableOptBtnTxt}
												optionsList={[
													{
														name: 'Delete Asset',
														icon: 'heroicons:trash',
														action: () => handleDelete(item?.id),
													},
													{
														name: 'Edit Asset',
														icon: 'heroicons:pencil-square',
														link: `${pathname}/${item?.id}/edit`,
													},
												]}
											/>
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
