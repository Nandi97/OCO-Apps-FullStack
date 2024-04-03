'use client';

import Link from 'next/link';
import SearchInput from '@/components/my-ui/SearchInput';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import OptDropdown from '@/components/my-ui/OptDropdown';
import Pagination from '@/components/my-ui/Pagination';
import { formatDate, formatTime } from '@/utils/formatDate';

export default function PurchaseOrder() {
	const [title, setTitle] = useState('');
	const [searchParam, setSearchParam] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);

	const pathname = usePathname();
	// Update the title and breadcrumbs

	const { data, isPending } = useQuery({
		queryKey: ['purchaseOrderList', currentPage, perPage, searchParam],
		queryFn: () =>
			axios
				.get(`/api/purchase-order/getPurchaseOrders`, {
					params: { page: currentPage, perPage, searchParam },
				})
				.then((response) => response.data),
	});
	// console.log('Book Data', data);

	const total = data?.total ?? 0;
	const links = data?.links ?? [];
	const firstPageUrl = data?.firstPageUrl;
	const lastPageUrl = data?.lastPageUrl;
	const from = data?.from ?? 0;
	const to = data?.to ?? 0;

	useEffect(() => {
		setTitle('Purchase Orders');
	}, []);

	const handleDelete = () => {
		console.log('Deleting Purchase Order');
	};

	// Table Dopdown
	const tableOptBtnTxt = {
		icon: 'heroicons:ellipsis-horizontal',
		buttonClassName:
			'flex items-center justify-center w-full h-8 px-4 text-secondary-900 rounded-sm hover:shadow-sm z-20',
	};
	const tableOptionsList = [
		{ name: 'Delete Purchase Order', icon: 'heroicons:trash', action: handleDelete },
	];

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handleSearch = (searchInput: any) => {
		setSearchParam(searchInput);
	};

	const handlePerPageChange = (newPerPage: number) => {
		setPerPage(newPerPage);
		// You may also want to update the displayed data based on the newPerPage value
	};
	return (
		<div className="space-y-2 bg-white">
			<div className="sticky top-2 z-20 flex items-center justify-between gap-2 bg-white">
				<h1 className="text-accent-700 text-lg font-extralight">{title}</h1>
				<div className="inline-flex items-center space-x-2">
					<SearchInput onSearch={handleSearch} />
					<Link
						href={`${pathname}/create`}
						className="inline-flex h-8 w-8 items-center justify-center rounded-sm bg-secondary-100 p-2 text-xs text-secondary-600 shadow-sm focus:ring-offset-secondary-100"
					>
						<Icon icon={'heroicons:document-plus'} />
					</Link>
				</div>
			</div>
			<div className="overscroll-none shadow ring-1 ring-black ring-opacity-5 md:rounded-md">
				<div className="hidden flex-col lg:flex">
					<table className="min-w-full divide-y divide-primary-100">
						<thead className="sticky top-12 z-10 bg-secondary-600 text-secondary-50">
							<tr>
								<th
									scope="col"
									className="sticky top-0 p-2 text-center text-sm font-semibold"
								>
									{''}
								</th>
								<th
									scope="col"
									className="sticky top-0 p-2 pr-3 text-left text-sm font-semibold sm:pl-6"
								>
									PO#
								</th>
								<th
									scope="col"
									className="sticky top-0 p-2 pr-3 text-left text-sm font-semibold sm:pl-6"
								>
									Name
								</th>
								<th
									scope="col"
									className="sticky top-0 p-2 text-left text-sm font-semibold "
								>
									Email
								</th>
								<th
									scope="col"
									className="sticky top-0 p-2 text-left text-sm font-semibold "
								>
									Phone Number
								</th>
								<th
									scope="col"
									className="sticky top-0 p-2 text-center text-sm font-semibold "
								>
									Address
								</th>
								<th
									scope="col"
									className="sticky top-0 p-2 text-left text-sm font-semibold "
								>
									Created On
								</th>
								<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
									<span className="sr-only">Edit</span>
								</th>
							</tr>
						</thead>
						<tbody className="z-0 divide-y divide-gray-200 bg-white">
							{data?.data?.map((item, index) => {
								if (isPending) {
									return (
										<tr key={index}>
											<td
												colSpan={7}
												className="flex w-full items-center justify-center whitespace-nowrap px-3 py-2 text-center text-sm text-secondary-500"
											>
												<svg
													aria-hidden="true"
													className="mr-2 h-8 w-8 animate-spin fill-primary-600 text-secondary-200"
													viewBox="0 0 100 101"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
														fill="currentColor"
													/>
													<path
														d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
														fill="currentFill"
													/>
												</svg>
												<span className="sr-only">Loading...</span>
											</td>
										</tr>
									);
								} else {
									return (
										<tr
											key={item?.id}
											className={`hover:bg-primary-100/95 ${
												index % 2 && index !== 0
													? 'bg-secondary-100/95'
													: ''
											}`}
										>
											<td className="p-2 text-center text-sm">
												{(index = 1)}
											</td>
											<td className="p-2 text-center text-sm">
												<Link
													className="font-medium text-primary-600 hover:text-primary-600/90"
													href={`${pathname}/${item?.id}`}
												>
													{item?.poNumber}
												</Link>
											</td>
											<td className="py-2 text-left  text-sm text-secondary-900 sm:pl-6">
												{item?.name}
											</td>
											<td className="py-2 text-left  text-sm text-secondary-900 sm:pl-6">
												{item?.email}
											</td>
											<td className="whitespace-nowrap px-3 py-2 text-sm text-secondary-500">
												{item?.phoneNumber}
											</td>
											<td className="whitespace-nowrap px-3 py-2 text-center text-sm text-secondary-500">
												{item?.physicalAddress}
											</td>
											<td className="whitespace-nowrap px-3 py-2 text-sm text-secondary-500">
												{`${formatDate(
													item?.createdAt,
													'dd MMM yyyy'
												)} ${''} ${formatTime(item?.createdAt, 'hh:mm a')}`}
											</td>
											<td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
												<button
													type="button"
													className="flex h-5 w-5 items-center justify-center rounded p-1 hover:bg-primary-700 hover:bg-opacity-20"
												>
													<OptDropdown
														optBtn={tableOptBtnTxt}
														optionsList={[
															...tableOptionsList,
															{
																name: 'Edit Purchase Order',
																icon: 'heroicons:pencil-square',
																link: `${pathname}/${item?.id}/edit`,
															},
														]}
													/>
												</button>
											</td>
										</tr>
									);
								}
							})}
						</tbody>
					</table>
				</div>
				<Pagination
					from={from}
					to={to}
					currentPage={currentPage}
					lastPage={Math.ceil(total / perPage)}
					perPage={perPage}
					total={total}
					links={links}
					firstPageUrl={firstPageUrl}
					lastPageUrl={lastPageUrl}
					onPageChange={handlePageChange}
					onPerPageChange={handlePerPageChange}
				/>
			</div>
		</div>
	);
}
