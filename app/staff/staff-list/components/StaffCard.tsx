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

export default function StaffCard() {
	const [title, setTitle] = useState('Staff List');
	const [toggleCreateStaff, setToggleCreateStaff] = useState(false);
	const [toggleEditStaff, setToggleEditStaff] = useState(false);
	const [active, setActive] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);

	const [searchParam, setSearchParam] = useState<string | null>(null);

	const { data } = useQuery({
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
			<div className="sticky top-2 z-20 flex items-center justify-between gap-2 bg-white md:hidden">
				<h1 className="text-accent-700 text-lg font-extralight"></h1>
				<div className="inline-flex items-center space-x-2">
					<SearchInput onSearch={handleSearch} />
					<OptDropdown optBtn={headerOptBtnTxt} optionsList={headerOptionsList} />
				</div>
			</div>
			<div className="overscroll-none shadow ring-1 ring-black ring-opacity-5 md:rounded-md">
				<div className="flex flex-wrap gap-2 sm:flex-col md:flex-row">
					{data?.data?.map((person, index) => (
						<div
							key={person?.id}
							className="grid min-w-full grid-cols-12 rounded-md border-t border-gray-200 bg-white p-3 shadow-sm shadow-secondary-400 sm:flex sm:px-6 lg:hidden"
						>
							<div className="col-span-4">
								<div className="flex items-center gap-2">
									{!person?.avatarUrl ? (
										<span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-secondary-500">
											<span className="font-medium leading-none text-white">
												{person?.name
													.split(' ')
													.slice(0, 2)
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
											alt="user avatar"
										/>
									)}
								</div>
							</div>
							<div className="col-span-8">{person?.staffNo}</div>
							<div className="col-span-4 text-left text-sm font-semibold text-secondary-600">
								Name :
							</div>
							<div className="col-span-8">{person?.name}</div>
							<div className="col-span-4 text-left text-sm font-semibold text-secondary-600">
								Designation :
							</div>
							<div className="col-span-8">{person?.designation?.name}</div>
							<div className="col-span-4 text-left text-sm font-semibold text-secondary-600">
								E-mail Address :
							</div>
							<div className="col-span-8 text-primary-500">{person?.email}</div>
							<div className="col-span-4 text-left text-sm font-semibold text-secondary-600">
								Extension :
							</div>
							<div className="col-span-8">{person?.ext}</div>
							<div className="col-span-4 text-left text-sm font-semibold text-secondary-600">
								Team :
							</div>
							<div className="col-span-8">{person?.team?.name}</div>
							<div className="col-span-4 text-left text-sm font-semibold text-secondary-600">
								Status :
							</div>
							<div className="col-span-8">
								<span
									className={`inline-flex rounded-full  px-2 text-xs font-semibold leading-5 ${
										person?.deletedAt === null
											? 'bg-green-100 text-green-800'
											: 'bg-red-100 text-red-800'
									}`}
								>
									{person?.deletedAt === null ? 'Active' : 'Inactive'}
								</span>
							</div>
						</div>
					))}
					<div className="flex w-full md:hidden">
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
