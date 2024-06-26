'use client';

import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import formatISO from 'date-fns/formatISO';
import Pagination from '@/components/my-ui/Pagination';
import StaffForm from '@/components/forms/staff/StaffForm';
import SearchInput from '@/components/my-ui/SearchInput';
import OptDropdown from '@/components/my-ui/OptDropdown';
import { toast } from 'react-hot-toast';
import CreateStaff from '../components/CreateStaff';
import EditStaff from '../components/EditStaff';
import exportFromJSON from 'export-from-json';

export default function StaffTable() {
	const [title, setTitle] = useState('Staff List');
	const [toggleCreateStaff, setToggleCreateStaff] = useState(false);
	const [toggleEditStaff, setToggleEditStaff] = useState(false);
	const [active, setActive] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);

	const [searchParam, setSearchParam] = useState<string | null>(null);

	const { data, isPending } = useQuery({
		queryKey: ['staffList', currentPage, perPage, searchParam],
		queryFn: () =>
			axios
				.get(`/api/staff/getStaff`, {
					params: { page: currentPage, perPage, searchParam },
				})
				.then((response) => response.data),
	});
	// console.log(data);

	const total = data?.total ?? 0;
	const links = data?.links ?? [];
	const firstPageUrl = data?.firstPageUrl;
	const lastPageUrl = data?.lastPageUrl;
	const from = data?.from ?? 0;
	const to = data?.to ?? 0;

	const [submitFormID, setSubmitFormID] = useState<string | null>(null);

	const [editMode, setEditMode] = useState(false);
	const [staffDetails, setStaffDetails] = useState(null);

	const queryClient = useQueryClient();
	let deleteToastID: string;

	const newStaffMember = () => {
		console.log('new Staff Member');
		setToggleCreateStaff(true);
		setEditMode(false);
		setStaffDetails(null);
	};

	const editStaffMember = (staffId: number) => {
		setToggleEditStaff(true);
		setEditMode(true);
		const selectedStaff = data?.data.find((person) => person.id === staffId);
		setStaffDetails(selectedStaff || null);

		console.log('edit Staff Member:', selectedStaff);
	};

	const exportStaffList = () => {
		const apiEndpoint = '/api/staff/getAllUnpaginatedStaff'; // Replace with your API endpoint

		// Make a Fetch API call to the API endpoint
		fetch(apiEndpoint)
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then((staff) => {
				// console.log(data);

				// The 'data' variable now holds the data retrieved from the API
				const fileName = `${formatISO(new Date(), { format: 'basic' })}_staffList`;
				const exportType = exportFromJSON.types.csv;

				const data: {
					staff_no: number;
					name: string;
					email: string;
					mobile: string;
					ext: number;
					designation: string;
					gender: string;
					team: string;
				} = staff.map((item: any) => ({
					staff_no: item?.staffNo,
					name: item?.name,
					email: item?.email,
					mobile: item?.mobile,
					ext: item?.ext,

					designation: item.designation?.name,
					gender: item.gender?.name,
					team: item.team?.name,
				}));

				exportFromJSON({ data, fileName, exportType });
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	// Header Dropdown
	const headerOptBtnTxt = {
		icon: 'heroicons:chevron-down',
		name: 'Options',
		buttonClassName:
			'inline-flex items-center justify-center w-full h-8 px-4 text-xs text-white rounded-sm shadow-sm bg-secondary-600 focus:outline-none focus:ring-2 focus:ring-secondary-600 focus:ring-offset-0 focus:ring-offset-secondary-100',
		iconClassName: '',
	};

	const headerOptionsList = [
		{ name: 'New Staff Member', action: newStaffMember, icon: 'heroicons:user-plus' },
		{
			name: 'Export Staff List',
			action: exportStaffList,
			icon: 'vscode-icons:file-type-excel2',
		},
	];

	// Table Dopdown
	const tableOptBtnTxt = {
		icon: 'heroicons:ellipsis-horizontal',
		buttonClassName:
			'flex items-center justify-center w-full h-8 px-4 text-secondary-900 rounded-sm hover:shadow-sm z-20',
	};

	const tableOptionsList = [];

	// console.log(tableOptionsList);

	useEffect(() => {
		setTitle('Staff List');
	}, []);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handlePerPageChange = (newPerPage: number) => {
		setPerPage(newPerPage);
	};

	const handleSearch = (searchInput: any) => {
		setSearchParam(searchInput);
	};

	const { mutate } = useMutation({
		mutationFn: async (id: string) => {
			if (active === true) {
				await axios.patch('/api/staff/deleteStaff', { data: id });
			} else {
				await axios.patch('/api/staff/activateStaff', { data: id });
			}
		},
		onError: (error, variables, context) => {
			console.log(error);
		},
		onSuccess: (data, variables, context) => {
			queryClient.invalidateQueries({ queryKey: ['staffList'] });

			toast.success('Staff has been activated.', { id: deleteToastID });
		},
	});

	const deactivateStaff = (staffId: any) => {
		setActive(true), mutate(staffId);
	};

	const activateStaff = (staffId: any) => {
		setActive(false), mutate(staffId);
	};
	return (
		<>
			<div className="sticky top-2 z-20 hidden items-center justify-between gap-2 bg-white md:flex">
				<h1 className="text-accent-700 text-lg font-extralight"></h1>
				<div className="inline-flex items-center space-x-2">
					<SearchInput onSearch={handleSearch} />
					<OptDropdown optBtn={headerOptBtnTxt} optionsList={headerOptionsList} />
				</div>
			</div>
			<div className="overscroll-none shadow ring-1 ring-black ring-opacity-5 md:rounded-md">
				<div className="hidden flex-col lg:flex">
					<table className="table-auto divide-y divide-primary-100">
						<thead className="sticky top-12 z-10 bg-secondary-600 text-secondary-50">
							<tr>
								<th
									scope="col"
									className="sticky top-0 py-3.5 pl-4 pr-3 text-center text-sm font-semibold"
								>
									Staff ID #
								</th>
								<th
									scope="col"
									className="sticky top-0 py-3.5 pl-4 pr-3 text-left text-sm font-semibold  sm:pl-6"
								>
									Name
								</th>
								<th
									scope="col"
									className="sticky top-0 px-3 py-3.5 text-left text-sm font-semibold "
								>
									Designation
								</th>
								<th
									scope="col"
									className="sticky top-0 px-3 py-3.5 text-left text-sm font-semibold "
								>
									E-mail Address
								</th>
								<th
									scope="col"
									className="sticky top-0 px-3 py-3.5 text-center text-sm font-semibold "
								>
									Extension
								</th>
								<th
									scope="col"
									className="sticky top-0 px-3 py-3.5 text-left text-sm font-semibold "
								>
									Team
								</th>
								<th
									scope="col"
									className="sticky top-0 px-3 py-3.5 text-left text-sm font-semibold "
								>
									Status
								</th>
								<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
									<span className="sr-only">Edit</span>
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200 bg-white">
							{data?.data?.map((person, index) => {
								if (isPending) {
									return (
										<tr key={index}>
											<td
												colSpan={9}
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
											key={person?.id}
											className={`hover:bg-primary-100/95 ${
												index % 2 && index !== 0
													? 'bg-secondary-100/95'
													: ''
											}`}
										>
											<td className="whitespace-nowrap px-3 py-2 text-center text-sm text-secondary-500">
												{person?.staffNo}
											</td>
											<td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm sm:pl-6">
												<div className="flex items-center gap-2">
													{!person?.avatarUrl ? (
														<span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-secondary-500">
															<span className="font-medium leading-none text-white">
																{person?.name
																	.split(' ')
																	.map((n) => n[0])
																	.join('.')}
															</span>
														</span>
													) : (
														<Image
															height={200}
															width={200}
															className="h-7 w-7 rounded-full"
															src={person?.avatarUrl}
															alt=""
														/>
													)}

													<div className="font-medium text-secondary-900">
														{person?.name}
													</div>
												</div>
											</td>
											<td className="whitespace-nowrap px-3 py-2 text-sm text-secondary-500">
												<div className="text-secondary-900">
													{person?.designation?.name}
												</div>
											</td>
											<td className="whitespace-nowrap px-3 py-2 text-sm text-primary-500">
												{person?.email}
											</td>
											<td className="whitespace-nowrap px-3 py-2 text-center text-sm text-secondary-500">
												{person?.ext}
											</td>
											<td className="whitespace-nowrap px-3 py-2 text-sm text-secondary-500">
												{person?.team?.name}
											</td>
											<td className="whitespace-nowrap px-3 py-2 text-sm text-secondary-500">
												<span
													className={`inline-flex rounded-full  px-2 text-xs font-semibold leading-5 ${
														person?.deletedAt === null
															? 'bg-green-100 text-green-800'
															: 'bg-red-100 text-red-800'
													}`}
												>
													{person?.deletedAt === null
														? 'Active'
														: 'Inactive'}
												</span>
											</td>
											<td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
												<button
													type="button"
													className="flex h-5 w-5 items-center justify-center rounded p-1 hover:bg-primary-700 hover:bg-opacity-20"
												>
													<OptDropdown
														optBtn={tableOptBtnTxt}
														optionsList={[
															{
																action: () =>
																	editStaffMember(person?.id),
																name: 'Edit Staff',
																icon: 'heroicons:pencil-square',
															},
															person.deletedAt === null
																? {
																		action: () =>
																			deactivateStaff(
																				person?.id
																			),
																		name: 'Deactivate Staff',
																		icon: 'heroicons:user-minus',
																	}
																: {
																		action: () =>
																			activateStaff(
																				person?.id
																			),
																		name: 'Activate Staff',
																		icon: 'heroicons:user-plus',
																	},

															// ...tableOptionsList,
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
					<div className="hidden md:flex">
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
			</div>
			{toggleCreateStaff && <CreateStaff setToggle={setToggleCreateStaff} />}
			{toggleEditStaff && (
				<EditStaff staffDetails={staffDetails} setToggle={setToggleEditStaff} />
			)}
		</>
	);
}
