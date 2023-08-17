'use client';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';

import Pagination from '@/components/my-ui/Pagination';
import StaffForm from '@/components/forms/StaffForm';
import SearchInput from '@/components/my-ui/SearchInput';
import OptDropdown from '@/components/my-ui/OptDropdown';
import { toast } from 'react-hot-toast';
import CreateLawyerStopwatch from './components/CreateLawyerStopwatch';
import { formatDate, formatTime } from '@/utils/formatDate';
// import EditStaff from './components/EditStaff';

export default function StaffList() {
	const [title, setTitle] = useState('Staff List');
	const [toggleCreateLawyerStopwatch, setToggleCreateLawyerStopwatch] = useState(false);
	const [toggleEditLawyerStopwatch, setToggleEditLawyerStopwatch] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);

	const [searchParam, setSearchParam] = useState<string | null>(null);

	const { data, isLoading } = useQuery(
		['stopwatchItems', currentPage, perPage, searchParam],
		() =>
			axios
				.get(`/api/lawyer-stopwatch/getStopWatchItems`, {
					params: { page: currentPage, perPage, searchParam },
				})
				.then((response) => response.data)
	);

	// console.log(data);

	const total = data?.total ?? 0;
	const links = data?.links ?? [];
	const firstPageUrl = data?.firstPageUrl;
	const lastPageUrl = data?.lastPageUrl;
	const from = data?.from ?? 0;
	const to = data?.to ?? 0;

	const [submitFormID, setSubmitFormID] = useState<string | null>(null);

	const newStopwatchItem = () => {
		// console.log('new Staff Member');
		setToggleCreateLawyerStopwatch(true);
	};

	const editStopwatchItem = (staffId: number) => {
		setToggleEditLawyerStopwatch(true);
	};

	const exportLawyerStopWatch = () => {
		console.log('export stopwatch list');
	};

	// Header Dropdown
	const headerOptBtnTxt = {
		icon: 'heroicons:chevron-down',
		name: 'Options',
		buttonClassName:
			'inline-flex items-center justify-center w-full h-8 px-4 text-xs text-white rounded-sm shadow-sm bg-ocoblue-600 focus:outline-none focus:ring-2 focus:ring-ocoblue-600 focus:ring-offset-0 focus:ring-offset-ocoblue-100',
		iconClassName: '',
	};

	const headerOptionsList = [
		{ name: 'New Stopwatch Item', action: newStopwatchItem, icon: 'heroicons:user-plus' },
		{
			name: 'Export Stopwatch List',
			action: exportLawyerStopWatch,
			icon: 'vscode-icons:file-type-excel2',
		},
	];

	// Table Dopdown
	const tableOptBtnTxt = {
		icon: 'heroicons:ellipsis-horizontal',
		buttonClassName:
			'flex items-center justify-center w-full h-8 px-4 text-ocoblue-900 rounded-sm hover:shadow-sm z-20',
	};

	const tableOptionsList = [{ name: 'Delete Stopwatch Item', icon: 'heroicons:trash' }];

	useEffect(() => {
		setTitle('Lawyer Stopwatch');
	}, []);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handlePerPageChange = (newPerPage: number) => {
		setPerPage(newPerPage);
	};

	const submitForm = () => {
		const toastID = toast.loading('Submitting Your Form', {
			id: submitFormID,
		});
		setSubmitFormID(toastID);
		console.log('Form Submitted');
	};

	const handleSearch = (searchInput: any) => {
		setSearchParam(searchInput);
	};

	return (
		<div className="space-y-2 bg-white">
			<div className="sticky z-20 flex items-center justify-between gap-2 bg-white top-2">
				<h1 className="text-lg font-extralight text-accent-700">{title}</h1>
				<div className="inline-flex items-center space-x-2">
					<SearchInput onSearch={handleSearch} />
					<OptDropdown optBtn={headerOptBtnTxt} optionsList={headerOptionsList} />
				</div>
			</div>
			<div className="shadow overscroll-none ring-1 ring-black ring-opacity-5 md:rounded-md">
				<div className="flex-col hidden lg:flex">
					<table className="min-w-full divide-y divide-ocobrown-100">
						<thead className="sticky z-10 top-12 bg-ocoblue-600 text-ocoblue-50">
							<tr>
								<th
									scope="col"
									className="sticky top-0 p-2 text-sm font-semibold text-center"
								>
									{''}
								</th>
								<th
									scope="col"
									className="sticky top-0 p-2 text-sm font-semibold text-center"
								>
									Matter Code
								</th>
								<th
									scope="col"
									className="sticky top-0 p-2 pr-3 text-sm font-semibold text-left sm:pl-6"
								>
									Task
								</th>
								<th
									scope="col"
									className="sticky top-0 p-2 text-sm font-semibold text-left "
								>
									Narration
								</th>
								<th
									scope="col"
									className="sticky top-0 p-2 text-sm font-semibold text-left "
								>
									Date
								</th>
								<th
									scope="col"
									className="sticky top-0 p-2 text-sm font-semibold text-center "
								>
									Started At
								</th>
								<th
									scope="col"
									className="sticky top-0 p-2 text-sm font-semibold text-left "
								>
									Ended At
								</th>
								<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
									<span className="sr-only">Edit</span>
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{data?.data?.map((item, index) => {
								if (isLoading) {
									return (
										<tr key={index}>
											<td
												colSpan={9}
												className="flex items-center justify-center w-full px-3 py-2 text-sm text-center whitespace-nowrap text-ocoblue-500"
											>
												<svg
													aria-hidden="true"
													className="w-8 h-8 mr-2 text-ocoblue-200 animate-spin fill-ocobrown-600"
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
											className={`hover:bg-ocobrown-100/95 ${
												index % 2 && index !== 0 ? 'bg-ocoblue-100/95' : ''
											}`}
										>
											<td className="px-3 py-2 text-sm text-center whitespace-nowrap text-ocoblue-500">
												{index + 1}
											</td>
											<td className="px-3 py-2 text-sm text-left whitespace-nowrap font-semibold  text-ocobrown-500">
												{item?.matter?.code}
											</td>
											<td className="py-2 pl-4 pr-3  whitespace-nowrap sm:pl-6 text-sm text-ocoblue-900">
												{item?.stopWatchItemTask?.name}
											</td>
											<td className="py-2 text-left  sm:pl-6 text-sm text-ocoblue-900">
												<p className="truncate hover:whitespace-normal hover:overflow-visible w-72">
													{item?.narration}
												</p>
											</td>
											<td className="px-3 py-2 text-sm whitespace-nowrap text-ocoblue-500">
												{item?.itemDate
													? formatDate(item.itemDate, 'dd MMM yyyy')
													: formatDate(item.createdAt, 'dd MMM yyyy')}
											</td>
											<td className="px-3 py-2 text-sm text-center whitespace-nowrap text-ocoblue-500">
												{item?.startedAt
													? formatTime(item?.startedAt, 'hh:mm a')
													: formatTime(item?.createdAt, 'hh:mm a')}
											</td>
											<td className="px-3 py-2 text-sm whitespace-nowrap text-ocoblue-500">
												{item?.endedAt
													? formatTime(item?.endedAt, 'hh:mm a')
													: formatTime(item?.createdAt, 'hh:mm a')}
											</td>

											<td className="relative py-2 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6">
												<button
													type="button"
													className="flex items-center justify-center w-5 h-5 p-1 rounded hover:bg-ocobrown-700 hover:bg-opacity-20"
												>
													<OptDropdown
														optBtn={tableOptBtnTxt}
														optionsList={[
															{
																action: () =>
																	editStopwatchItem(item?.id),
																name: 'Edit Stopwatch Item',
																icon: 'heroicons:pencil-square',
															},
															...tableOptionsList,
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
				<div className="flex flex-wrap gap-2 sm:flex-col md:flex-row">
					{data?.data?.map((item, index) => (
						<div
							key={item?.id}
							className="grid min-w-full grid-cols-12 p-3 bg-white border-t border-gray-200 rounded-md shadow-sm sm:px-6 sm:flex lg:hidden shadow-ocoblue-400"
						>
							<div className="col-span-12">{index + 1}</div>
							<div className="col-span-4 text-sm font-semibold text-left text-ocoblue-600">
								Matter :
							</div>
							<div className="col-span-8">{item?.matter?.code}</div>
							<div className="col-span-4 text-sm font-semibold text-left text-ocoblue-600">
								Task :
							</div>
							<div className="col-span-8">{item?.stopWatchItemTask?.name}</div>
							<div className="col-span-4 text-sm font-semibold text-left text-ocoblue-600">
								Narration :
							</div>
							<div className="col-span-8 text-ocobrown-500">{item?.narration}</div>
							<div className="col-span-4 text-sm font-semibold text-left text-ocoblue-600">
								Created At :
							</div>
							<div className="col-span-8">
								{item?.itemDate
									? formatDate(item.itemDate, 'dd MMM yyyy')
									: formatDate(item.createdAt, 'dd MMM yyyy')}
							</div>
							<div className="col-span-4 text-sm font-semibold text-left text-ocoblue-600">
								Start Time :
							</div>
							<div className="col-span-8">
								{item?.startedAt
									? formatTime(item?.startedAt, 'hh:mm a')
									: formatTime(item?.createdAt, 'hh:mm a')}
							</div>
							<div className="col-span-4 text-sm font-semibold text-left text-ocoblue-600">
								End Time :
							</div>

							<div className="col-span-8">
								{item?.endedAt
									? formatTime(item?.endedAt, 'hh:mm a')
									: formatTime(item?.createdAt, 'hh:mm a')}
							</div>
						</div>
					))}
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
			{toggleCreateLawyerStopwatch && (
				<CreateLawyerStopwatch setToggle={setToggleCreateLawyerStopwatch} />
			)}
		</div>
	);
}
