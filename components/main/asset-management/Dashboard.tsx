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
import Create from './transaction/Create';
import CreateMaintenance from './maintenance/Create';

interface FetchAssetProps {
	searchParam: string | null;
}

const getAssets = async ({ searchParam }: FetchAssetProps) => {
	const response = await axios.get('/api/asset/get', { params: { searchParam } });
	return response.data;
};
const Dashboard = () => {
	const pathname = usePathname();
	const [searchParam, setSearchParam] = useState<string | null>(null);
	const [toggle, setToggle] = useState(false);
	const [maintenanceToggle, setMaintenanceToggle] = useState(false);
	const [assetId, setAssetId] = useState<string>('');

	const { data, isError, isPending } = useQuery<Asset[]>({
		queryKey: ['assets', searchParam],
		queryFn: () => getAssets({ searchParam }),
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

	const handleTransaction = (id: string) => {
		if (id) {
			console.log('Transaction Asset Model', id);
			setAssetId(id);
			setToggle(true);
		}
	};

	const handleMaintenance = (id: string) => {
		if (id) {
			console.log('Maintain Asset Model', id);
			setAssetId(id);
			setMaintenanceToggle(true);
		}
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
		<div className="w-full space-y-3 bg-primary-50">
			<div className="sticky top-2 z-20 hidden items-center justify-between gap-2 bg-white md:flex">
				<div className="inline-flex items-center space-x-2 px-2">
					<SearchInput onSearch={handleSearch} />
				</div>
				<div className="inline-flex items-center space-x-2 px-2">
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
							{!data || isError || isPending ? (
								<tr>
									<td
										colSpan={4}
										className="whitespace-nowrap px-3 py-2 text-start text-base text-secondary-900"
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
										<td className="whitespace-nowrap px-3 py-2 text-start text-base text-secondary-900">
											{i + 1}
										</td>
										<td className="whitespace-nowrap px-3 py-2 text-start text-base text-secondary-900">
											{item?.name}
										</td>
										<td className="whitespace-nowrap px-3 py-2 text-start text-base text-secondary-900">
											{item?.serialNumber}
										</td>
										<td className="whitespace-nowrap px-3 py-2 text-start text-base text-secondary-900">
											{item?.ocoTagNumber}
										</td>
										<td className="whitespace-nowrap px-3 py-2 text-start text-base text-secondary-900">
											{item?.location}
										</td>
										<td className="whitespace-nowrap px-3 py-2 text-start text-base text-secondary-900">
											{item?.type?.name}
										</td>
										<td className="whitespace-nowrap px-3 py-2 text-start text-base text-secondary-900">
											{item?.currentlyWith?.name}
										</td>
										<td className="whitespace-nowrap px-3 py-2 text-start text-base text-secondary-900">
											{item?.condition?.name}
										</td>
										<td className="whitespace-nowrap px-3 py-2 text-start text-base text-secondary-900">
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

													{
														name: 'Transfer Asset',
														icon: 'heroicons:arrow-path',
														action: () => handleTransaction(item?.id),
													},
													{
														name: 'Maintain Asset',
														icon: 'heroicons:adjustments-vertical',
														action: () => handleMaintenance(item?.id),
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
			{toggle && <Create setToggle={setToggle} assetId={assetId} />}
			{maintenanceToggle && (
				<CreateMaintenance setToggle={setMaintenanceToggle} assetId={assetId} />
			)}
		</div>
	);
};

export default Dashboard;
