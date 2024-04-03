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
		<div className="grid w-11/12 grid-cols-12 gap-5">
			<div className="col-span-9 space-y-3 rounded-md bg-white p-4">
				<div className="relative flex w-full items-center justify-center">
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
						className="absolute left-0 top-0 flex items-center space-x-2 rounded bg-primary-600 p-1 text-xs text-primary-50 hover:bg-primary-600/80"
					>
						<Icon icon="heroicons:chevron-left" />
						<span>Back</span>
					</Link>
				</div>
				<div className="flex w-full items-center justify-center bg-primary-600">
					<p className="text-2xl font-bold uppercase text-white">Leave Application</p>
				</div>
				<div className="flex w-full items-center justify-center">
					<table className="w-full table-fixed">
						<thead className="bg-secondary-200 text-xs uppercase text-secondary-700">
							<tr>
								<th scope="col" colSpan={2} className="px-6 py-3">
									Section 1: Employee Details
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="border px-2">
									<div className="flex flex-col">
										<span className="text-xs">Name:</span>
										<span className="text-primary-600">
											{data?.employee?.name}
										</span>
									</div>
								</td>
								<td className="border px-2">
									<div className="flex flex-col">
										<span className="text-xs">Payroll Number:</span>
										<span className="text-primary-600">
											{data?.employee?.staffNo}
										</span>
									</div>
								</td>
							</tr>
							<tr>
								<td className="border px-2">
									<div className="flex flex-col">
										<span className="text-xs">Title:</span>
										<span className="text-primary-600">
											{data?.employee?.designation?.name}
										</span>
									</div>
								</td>
								<td className="border px-2">
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
				<div className="flex w-full items-center justify-center">
					<table className="w-full table-fixed">
						<thead className="bg-secondary-200 text-xs uppercase text-secondary-700">
							<tr>
								<th scope="col" colSpan={2} className="px-6 py-3">
									Section 2: Leave Details
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="border px-2">
									<div className="flex flex-col">
										<span className="text-xs">Leave Type:</span>
										<span className="text-primary-600">{data?.type?.name}</span>
									</div>
								</td>
								<td className="border px-2">
									<div className="flex flex-col">
										<span className="text-xs">Number of Leave Days:</span>
										<span className="text-primary-600">{data?.duration}</span>
									</div>
								</td>
							</tr>
							<tr>
								<td className="border px-2">
									<div className="flex flex-col">
										<span className="text-xs">Start Leave On:</span>
										<span className="text-primary-600">
											{!data?.startDate
												? ''
												: format(new Date(data?.startDate), 'MMMM d, yyyy')}
										</span>
									</div>
								</td>
								<td className="border px-2">
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
								<td className="border px-2">
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
								<td className="border px-2">
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
				<div className="flex w-full items-center justify-center">
					<table className="w-full table-fixed">
						<thead className="bg-secondary-200 text-xs uppercase text-secondary-700">
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
					<div className="flex w-full flex-col items-center justify-center space-y-2">
						<h1 className="text-primary-600">For Official Use Only - HR Department</h1>
						<table className="w-2/3 table-auto">
							<tbody>
								<tr>
									<td className="border px-2">
										<span className="text-lg">No. of leave days available</span>
									</td>
									<td className="border p-2">
										<span>
											{data?.employee?.leaveBalance?.balanceCarryForward}
										</span>
									</td>
								</tr>
								<tr>
									<td className="border px-2">
										<span className="text-lg">No. of leave taken now</span>
									</td>
									<td className="border p-2">
										<span>{data?.duration}</span>
									</td>
								</tr>
								<tr>
									<td className="border px-2">
										<span className="text-lg">Balance of leave days</span>
									</td>
									<td className="border p-2">
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
					<div className="flex w-full flex-col items-center justify-center space-y-2">
						<h1 className="text-primary-600">For Official Use Only - HR Department</h1>
						<table className="w-2/3 table-auto">
							<tbody>
								<tr>
									<td className="border px-2">
										<span className="text-lg">No. of leave taken now</span>
									</td>
									<td className="border p-2">
										<span>{data?.duration}</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				)}
			</div>
			<div className="col-span-3 space-y-2 rounded-md">
				<div className="flex w-full flex-col rounded-md bg-white p-2 shadow-md">
					<div className="w-full rounded-t bg-primary-600 text-center">
						<h1 className="font-bold text-primary-50">Document Actions</h1>
					</div>
					{session?.user?.email === data?.supervisor?.email && (
						<div className="mt-2 flex w-full space-x-2 text-xs">
							<button
								type="button"
								className="flex w-1/2 items-center justify-center space-x-2 rounded-md bg-primary-600 p-1 text-primary-50 shadow-sm hover:bg-primary-600/80 hover:shadow-md"
							>
								<Icon icon="heroicons:hand-thumb-up" />
								<span>Approve</span>
							</button>

							<button
								type="button"
								className="flex w-1/2 items-center justify-center space-x-2 rounded-md bg-secondary-600 p-1 text-secondary-50 shadow-sm hover:bg-secondary-600/80 hover:shadow-md"
							>
								<Icon icon="heroicons:hand-thumb-down" />
								<span>Reject</span>
							</button>
						</div>
					)}
					{session?.user?.email === data?.employee?.email && (
						<div className="mt-2 flex w-full space-x-2 text-xs">
							<Link
								href={
									data?.leaveFinalApproval?.status !== 1
										? `/staff/leave-applications/${data?.id}/edit`
										: '#'
								}
								className={`flex  w-1/2 items-center  justify-center space-x-2 rounded-md p-1 text-primary-50  ${data?.leaveFinalApproval?.status === 1 ? 'cursor-not-allowed bg-primary-600/80' : 'bg-primary-600 shadow-sm hover:bg-primary-600/80 hover:shadow-md'}`}
								aria-disabled={
									data?.leaveFinalApproval?.status !== 1 ? false : true
								}
							>
								<Icon icon="heroicons:pencil-square" />
								<span>Edit</span>
							</Link>

							<button
								type="button"
								className={`flex  w-1/2 items-center  justify-center space-x-2 rounded-md p-1 text-secondary-50  ${data?.leaveFinalApproval?.status !== 1 ? 'bg-secondary-600/80' : 'bg-secondary-600 shadow-sm hover:bg-secondary-600/80 hover:shadow-md'}`}
								disabled={data?.leaveFinalApproval?.status !== 1 ? true : false}
							>
								<Icon icon="mdi:file-pdf-box-outline" />
								<span>PDF</span>
							</button>
						</div>
					)}
				</div>
				<div className="flex w-full flex-col rounded-md bg-white p-2 shadow-md">
					<div className="w-full rounded-t bg-primary-600 text-center">
						<h1 className="font-bold text-primary-50">Document Summary</h1>
					</div>
					<div className="flex w-full flex-col">
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
