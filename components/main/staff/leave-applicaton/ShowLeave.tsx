'use client';
import logo from '@/public/assets/images/oco_ab_and_david.png';
import axios from 'axios';
import React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { LeaveApplication } from '@/lib/types/master';
import Image from 'next/image';
import { format } from 'date-fns/format';
import { useSession } from 'next-auth/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import Link from 'next/link';

//Fetch A booking
const fetchDetails = async (slug: string) => {
	const response = await axios.get(`/api/leave/get/${slug}`);
	return response.data;
};

const ShowLeave = () => {
	const { data: session } = useSession();
	const params = useParams();
	const leaveId = params?.slug;

	const { data, isPending } = useQuery<LeaveApplication>({
		queryKey: ['detail-leave'],
		queryFn: () => {
			if (leaveId) {
				return fetchDetails(leaveId as string);
			} else {
				return Promise.reject(new Error('Leave Id not provided'));
			}
		},
	});

	console.log('Data:', data);
	return (
		<div className="grid grid-cols-12 w-11/12 gap-5">
			<div className="col-span-9 rounded-md p-4 bg-white space-y-3">
				<div className="relative w-full flex items-center justify-center">
					<Image
						src={logo}
						placeholder="blur"
						width={300}
						height={200}
						alt="OCO ab David Logo"
						className="w-36"
					/>
					<Link
						href={`/staff/leave-applications/`}
						type="button"
						className="flex items-center space-x-2 absolute top-0 left-0 p-1 text-primary-50 bg-primary-600 hover:bg-primary-600/80 rounded text-xs"
					>
						<Icon icon="heroicons:chevron-left" />
						<span>Back</span>
					</Link>
				</div>
				<div className="w-full flex items-center justify-center bg-primary-600">
					<p className="font-bold uppercase text-2xl text-white">Leave Application</p>
				</div>
				<div className="w-full flex items-center justify-center">
					<table className="table-fixed w-full">
						<thead className="text-xs text-secondary-700 uppercase bg-secondary-200">
							<tr>
								<th scope="col" colSpan={2} className="px-6 py-3">
									Section 1: Employee Details
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="px-2 border">
									<div className="flex flex-col">
										<span className="text-xs">Name:</span>
										<span className="text-primary-600">
											{data?.employee?.name}
										</span>
									</div>
								</td>
								<td className="px-2 border">
									<div className="flex flex-col">
										<span className="text-xs">Payroll Number:</span>
										<span className="text-primary-600">
											{data?.employee?.staffNo}
										</span>
									</div>
								</td>
							</tr>
							<tr>
								<td className="px-2 border">
									<div className="flex flex-col">
										<span className="text-xs">Title:</span>
										<span className="text-primary-600">
											{data?.employee?.designation?.name}
										</span>
									</div>
								</td>
								<td className="px-2 border">
									<div className="flex flex-col">
										<span className="text-xs">Team:</span>
										<span className="text-primary-600">
											{data?.employee?.team?.name}
										</span>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="w-full flex items-center justify-center">
					<table className="table-fixed w-full">
						<thead className="text-xs text-secondary-700 uppercase bg-secondary-200">
							<tr>
								<th scope="col" colSpan={2} className="px-6 py-3">
									Section 2: Leave Details
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="px-2 border">
									<div className="flex flex-col">
										<span className="text-xs">Leave Type:</span>
										<span className="text-primary-600">{data?.type?.name}</span>
									</div>
								</td>
								<td className="px-2 border">
									<div className="flex flex-col">
										<span className="text-xs">Number of Leave Days:</span>
										<span className="text-primary-600">{data?.duration}</span>
									</div>
								</td>
							</tr>
							<tr>
								<td className="px-2 border">
									<div className="flex flex-col">
										<span className="text-xs">Start Leave On:</span>
										<span className="text-primary-600">
											{!data?.startDate
												? ''
												: format(new Date(data?.startDate), 'MMMM d, yyyy')}
										</span>
									</div>
								</td>
								<td className="px-2 border">
									<div className="flex flex-col">
										<span className="text-xs">End Leave On:</span>
										<span className="text-primary-600">
											{!data?.endDate
												? ''
												: format(new Date(data?.endDate), 'MMMM d, yyyy')}
										</span>
									</div>
								</td>
							</tr>
							<tr>
								<td className="px-2 border">
									<div className="flex flex-col">
										<span className="text-xs">Reporting Back On:</span>
										<span className="text-primary-600">
											{!data?.reportDate
												? ''
												: format(
														new Date(data?.reportDate),
														'MMMM d, yyyy'
													)}
										</span>
									</div>
								</td>
								<td className="px-2 border">
									<div className="flex flex-col">
										<span className="text-xs">Applied on:</span>
										<span className="text-primary-600">
											{format(new Date(), 'MMMM d, yyyy')}
										</span>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="w-full flex items-center justify-center">
					<table className="table-fixed w-full">
						<thead className="text-xs text-secondary-700 uppercase bg-secondary-200">
							<tr>
								<th scope="col" colSpan={2} className="px-6 py-3">
									Section 3: Approvals
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className=" border">
									<div className="flex flex-col">
										<span>Supervisor:</span>
										<span className="text-primary-600">
											{data?.supervisor?.name}
										</span>
									</div>
								</td>
								<td className=" border">
									<div className="flex flex-col">
										<span>Approved On:</span>
										<span className="text-primary-600">
											{data?.leaveSupervisorApproval?.status === 0
												? data?.leaveSupervisorApproval?.comments
												: data?.leaveSupervisorApproval?.status === 1
													? `${data?.leaveSupervisorApproval?.comments} on ${data?.leaveSupervisorApproval?.updatedAt}`
													: `Disapproved because ${data?.leaveSupervisorApproval?.comments}`}
										</span>
									</div>
								</td>
							</tr>
							<tr>
								<td className=" border">
									<div className="flex flex-col">
										<span>HR Manager:</span>
										<span className="text-primary-600">
											{data?.humanResource?.name}
										</span>
									</div>
								</td>
								<td className=" border">
									<div className="flex flex-col">
										<span>Approved On:</span>
										<span className="text-primary-600">
											{data?.leaveHRMApproval?.status === 0
												? data?.leaveHRMApproval?.comments
												: data?.leaveHRMApproval?.status === 1
													? `${data?.leaveHRMApproval?.comments} on ${data?.leaveHRMApproval?.updatedAt}`
													: `Disapproved because ${data?.leaveHRMApproval?.comments}`}
										</span>
									</div>
								</td>
							</tr>
							<tr>
								<td className=" border">
									<div className="flex flex-col">
										<span>Deputy/ Managing Partner:</span>
										<span className="text-primary-600">
											{data?.finalApprover?.name}
										</span>
									</div>
								</td>
								<td className=" border">
									<div className="flex flex-col">
										<span>Approved On:</span>
										<span className="text-primary-600">
											{data?.leaveFinalApproval?.status === 0
												? data?.leaveFinalApproval?.comments
												: data?.leaveFinalApproval?.status === 1
													? `${data?.leaveFinalApproval?.comments} on ${data?.leaveFinalApproval?.updatedAt}`
													: `Disapproved because ${data?.leaveFinalApproval?.comments}`}
										</span>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				{data?.type?.name === 'Annual' ? (
					<div className="w-full flex items-center justify-center flex-col space-y-2">
						<h1 className="text-primary-600">For Official Use Only - HR Department</h1>
						<table className="table-auto w-2/3">
							<tbody>
								<tr>
									<td className="px-2 border">
										<span className="text-lg">No. of leave days available</span>
									</td>
									<td className="p-2 border">
										<span>
											{data?.employee?.leaveBalance?.balanceCarryForward}
										</span>
									</td>
								</tr>
								<tr>
									<td className="px-2 border">
										<span className="text-lg">No. of leave taken now</span>
									</td>
									<td className="p-2 border">
										<span>{data?.duration}</span>
									</td>
								</tr>
								<tr>
									<td className="px-2 border">
										<span className="text-lg">Balance of leave days</span>
									</td>
									<td className="p-2 border">
										<span>
											{data?.employee?.leaveBalance?.balanceCarryForward -
												data?.duration}
										</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				) : (
					<div className="w-full flex items-center justify-center flex-col space-y-2">
						<h1 className="text-primary-600">For Official Use Only - HR Department</h1>
						<table className="table-auto w-2/3">
							<tbody>
								<tr>
									<td className="px-2 border">
										<span className="text-lg">No. of leave taken now</span>
									</td>
									<td className="p-2 border">
										<span>{data?.duration}</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				)}
			</div>
			<div className="col-span-3 rounded-md space-y-2">
				<div className="p-2 shadow-md rounded-md flex flex-col w-full bg-white">
					<div className="w-full text-center bg-primary-600 rounded-t">
						<h1 className="font-bold text-primary-50">Document Actions</h1>
					</div>
					{session?.user?.email === data?.supervisor?.email && (
						<div className="w-full flex mt-2 space-x-2 text-xs">
							<button
								type="button"
								className="w-1/2 bg-primary-600 p-1 rounded-md hover:bg-primary-600/80 flex items-center justify-center text-primary-50 space-x-2 shadow-sm hover:shadow-md"
							>
								<Icon icon="heroicons:hand-thumb-up" />
								<span>Approve</span>
							</button>

							<button
								type="button"
								className="w-1/2 bg-secondary-600 p-1 rounded-md hover:bg-secondary-600/80 flex items-center justify-center text-secondary-50 space-x-2 shadow-sm hover:shadow-md"
							>
								<Icon icon="heroicons:hand-thumb-down" />
								<span>Reject</span>
							</button>
						</div>
					)}
					{session?.user?.email === data?.employee?.email && (
						<div className="w-full flex mt-2 space-x-2 text-xs">
							<Link
								href={
									data?.leaveFinalApproval?.status !== 1
										? `/staff/leave-applications/${data?.id}/edit`
										: '#'
								}
								className={`w-1/2  p-1 rounded-md  flex items-center justify-center text-primary-50 space-x-2  ${data?.leaveFinalApproval?.status === 1 ? 'bg-primary-600/80 cursor-not-allowed' : 'hover:bg-primary-600/80 bg-primary-600 shadow-sm hover:shadow-md'}`}
								aria-disabled={
									data?.leaveFinalApproval?.status !== 1 ? false : true
								}
							>
								<Icon icon="heroicons:pencil-square" />
								<span>Edit</span>
							</Link>

							<button
								type="button"
								className={`w-1/2  p-1 rounded-md  flex items-center justify-center text-secondary-50 space-x-2  ${data?.leaveFinalApproval?.status !== 1 ? 'bg-secondary-600/80' : 'hover:bg-secondary-600/80 bg-secondary-600 shadow-sm hover:shadow-md'}`}
								disabled={data?.leaveFinalApproval?.status !== 1 ? true : false}
							>
								<Icon icon="mdi:file-pdf-box-outline" />
								<span>PDF</span>
							</button>
						</div>
					)}
				</div>
				<div className="p-2 shadow-md rounded-md flex flex-col w-full bg-white">
					<div className="w-full text-center bg-primary-600 rounded-t">
						<h1 className="font-bold text-primary-50">Document Summary</h1>
					</div>
					<div className="w-full flex flex-col">
						<span className="text-xs font-semibold text-secondary-700">
							{data && format(data.createdAt as Date, 'MMM dd, yyyy, h:mm:ss a')}
						</span>
						<span
							className={`w-full ${data?.leaveFinalApproval?.status !== 1 ? 'text-red-500' : 'text-primary-600'}`}
						>
							{data?.leaveFinalApproval?.comments}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShowLeave;
