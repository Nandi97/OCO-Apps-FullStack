'use client';
import Image from 'next/image';
import logo from '@/public/assets/images/oco_ab_and_david.png';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import format from 'date-fns/format';
import { useSession } from 'next-auth/react';
import { Icon } from '@iconify/react/dist/iconify.js';

interface LeavePrevProps {
	url: string;
}
const fetchDetails = async (slug: string) => {
	const response = await axios.get(`/api/leave/get/${slug}`);
	return response.data;
};

export default function LeavePrev({ url }: LeavePrevProps) {
	const { data: session } = useSession();
	const { data: prevVal } = useQuery({
		queryKey: ['detailLeave'],
		queryFn: () => fetchDetails(url),
	});

	// console.log('URL:', url);
	console.log('Prev Leave Val:', prevVal);
	console.log('Session:', session);
	return (
		<>
			<div className="grid grid-cols-12 gap-4">
				<div className="col-span-8 w-full flex-col space-y-3 rounded-md bg-primary-50 p-4 shadow-md">
					<div className="flex w-full items-center justify-center">
						<Image
							src={logo}
							placeholder="blur"
							width={300}
							height={200}
							alt="OCO ab David Logo"
							className="w-36"
						/>
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
												{prevVal?.employee?.name}
											</span>
										</div>
									</td>
									<td className="border px-2">
										<div className="flex flex-col">
											<span className="text-xs">Payroll Number:</span>
											<span className="text-primary-600">
												{prevVal?.employee?.staffNo}
											</span>
										</div>
									</td>
								</tr>
								<tr>
									<td className="border px-2">
										<div className="flex flex-col">
											<span className="text-xs">Title:</span>
											<span className="text-primary-600">
												{prevVal?.employee?.designation?.name}
											</span>
										</div>
									</td>
									<td className="border px-2">
										<div className="flex flex-col">
											<span className="text-xs">Team:</span>
											<span className="text-primary-600">
												{prevVal?.employee?.team?.name}
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
											<span className="text-primary-600">
												{prevVal?.type?.name}
											</span>
										</div>
									</td>
									<td className="border px-2">
										<div className="flex flex-col">
											<span className="text-xs">Number of Leave Days:</span>
											<span className="text-primary-600">
												{prevVal?.duration}
											</span>
										</div>
									</td>
								</tr>
								<tr>
									<td className="border px-2">
										<div className="flex flex-col">
											<span className="text-xs">Start Leave On:</span>
											<span className="text-primary-600">
												{prevVal?.startDate
													? format(
															new Date(prevVal?.startDate),
															'MMMM d, yyyy'
														)
													: ''}
											</span>
										</div>
									</td>
									<td className="border px-2">
										<div className="flex flex-col">
											<span className="text-xs">End Leave On:</span>
											<span className="text-primary-600">
												{prevVal?.endDate
													? format(
															new Date(prevVal?.endDate),
															'MMMM d, yyyy'
														)
													: ''}
											</span>
										</div>
									</td>
								</tr>
								<tr>
									<td className="border px-2">
										<div className="flex flex-col">
											<span className="text-xs">Reporting Back On:</span>
											<span className="text-primary-600">
												{prevVal?.reportDate
													? format(
															new Date(prevVal?.reportDate),
															'MMMM d, yyyy'
														)
													: ''}
											</span>
										</div>
									</td>
									<td className="border px-2">
										<div className="flex flex-col">
											<span className="text-xs">Applied on:</span>
											<span className="text-primary-600">
												{prevVal?.createdAt
													? format(
															new Date(prevVal?.createdAt),
															'MMMM d, yyyy'
														)
													: ''}
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
												{prevVal?.supervisor?.name}
											</span>
										</div>
									</td>
									<td className=" border">
										<div className="flex flex-col">
											<span>Approved On:</span>
											<span className="text-primary-600">
												Pending Approval
											</span>
										</div>
									</td>
								</tr>
								<tr>
									<td className=" border">
										<div className="flex flex-col">
											<span>HR Manager:</span>
											<span className="text-primary-600">
												{prevVal?.humanResource?.name}
											</span>
										</div>
									</td>
									<td className=" border">
										<div className="flex flex-col">
											<span>Approved On:</span>
											<span className="text-primary-600">
												Pending Approval
											</span>
										</div>
									</td>
								</tr>
								<tr>
									<td className=" border">
										<div className="flex flex-col">
											<span>Deputy/ Managing Partner:</span>
											<span className="text-primary-600">
												{prevVal?.partner?.name}
											</span>
										</div>
									</td>
									<td className=" border">
										<div className="flex flex-col">
											<span>Approved On:</span>
											<span className="text-primary-600">
												Pending Approval
											</span>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="flex w-full flex-col items-center justify-center space-y-2">
						<h1 className="text-primary-600">For Official Use Only - HR Department</h1>
						<table className="w-2/3 table-auto">
							<tbody>
								<tr>
									<td className="border px-2">
										<span className="text-lg">No. of leave days available</span>
									</td>
									<td className="border p-2">
										<span></span>
									</td>
								</tr>
								<tr>
									<td className="border px-2">
										<span className="text-lg">No. of leave taken now</span>
									</td>
									<td className="border p-2">
										<span></span>
									</td>
								</tr>
								<tr>
									<td className="border px-2">
										<span className="text-lg">Balance of leave days</span>
									</td>
									<td className="border p-2">
										<span></span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div className="col-span-4">
					<table className="w-full table-fixed rounded-md bg-primary-50">
						<thead className=" bg-secondary-600 text-secondary-50">
							<tr>
								<th
									scope="col"
									colSpan={2}
									className="sticky top-0 p-3 text-center text-sm font-semibold"
								>
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200 bg-white">
							{session && session?.user?.email === prevVal?.supervisor?.email ? (
								<tr>
									<td className="w-full border border-secondary-200 p-2 text-center text-sm">
										<div className="flex w-full items-center justify-center">
											<button className="flex w-24 items-center justify-center space-x-2  rounded bg-secondary-700 p-2 text-white hover:bg-secondary-700/50">
												<span>Approve</span>
												<Icon icon="heroicons:hand-thumb-up" />
											</button>
										</div>
									</td>
									<td className="w-full border border-secondary-200 p-2 text-center text-sm">
										<div className="flex w-full items-center justify-center">
											<button className="flex w-24 items-center justify-center space-x-2  rounded bg-primary-600 p-2 text-white hover:bg-primary-600/50">
												<span>Reject</span>
												<Icon icon="heroicons:hand-thumb-down" />
											</button>
										</div>
									</td>
								</tr>
							) : (
								''
							)}
							{session && session?.user?.email === prevVal?.partner?.email ? (
								<tr>
									<td className="w-full border border-secondary-200 p-2 text-center text-sm">
										<div className="flex w-full items-center justify-center">
											<button className="flex w-24 items-center justify-center space-x-2  rounded bg-secondary-700 p-2 text-white hover:bg-secondary-700/50">
												<span>Approve</span>
												<Icon icon="heroicons:hand-thumb-up" />
											</button>
										</div>
									</td>
									<td className="w-full border border-secondary-200 p-2 text-center text-sm">
										<div className="flex w-full items-center justify-center">
											<button className="flex w-24 items-center justify-center space-x-2  rounded bg-primary-600 p-2 text-white hover:bg-primary-600/50">
												<span>Reject</span>
												<Icon icon="heroicons:hand-thumb-down" />
											</button>
										</div>
									</td>
								</tr>
							) : (
								''
							)}
							{session && session?.user?.email === prevVal?.humanResource?.email ? (
								<tr>
									<td className="w-full border border-secondary-200 p-2 text-center text-sm">
										<div className="flex w-full items-center justify-center">
											<button className="flex w-24 items-center justify-center space-x-2  rounded bg-secondary-700 p-2 text-white hover:bg-secondary-700/50">
												<span>Approve</span>
												<Icon icon="heroicons:hand-thumb-up" />
											</button>
										</div>
									</td>
									<td className="w-full border border-secondary-200 p-2 text-center text-sm">
										<div className="flex w-full items-center justify-center">
											<button className="flex w-24 items-center justify-center space-x-2  rounded bg-primary-600 p-2 text-white hover:bg-primary-600/50">
												<span>Reject</span>
												<Icon icon="heroicons:hand-thumb-down" />
											</button>
										</div>
									</td>
								</tr>
							) : (
								''
							)}
							{session && session?.user?.email === prevVal?.employee?.email ? (
								<tr>
									<td className="w-full border border-secondary-200 p-2 text-center text-sm">
										<div className="flex w-full items-center justify-center">
											<button
												className={`flex w-24 items-center justify-center space-x-2  rounded p-2 text-white  ${
													!prevVal?.supervisorApproval === null ||
													!prevVal?.partnerApproval === null ||
													!prevVal?.hRMApproval === null
														? 'cursor-not-allowed bg-secondary-700/50'
														: 'bg-secondary-700 hover:bg-secondary-700/90'
												}`}
												disabled={
													!prevVal?.supervisorApproval === null ||
													!prevVal?.partnerApproval === null ||
													!prevVal?.hRMApproval === null
														? true
														: false
												}
											>
												<span>Edit</span>
												<Icon icon="heroicons:pencil-square" />
											</button>
										</div>
									</td>
									<td className="w-full border border-secondary-200 p-2 text-center text-sm">
										<div className="flex w-full items-center justify-center">
											<button
												disabled={
													!prevVal?.supervisorApproval === null &&
													!prevVal?.partnerApproval === null &&
													!prevVal?.hRMApproval === null
														? false
														: true
												}
												className={`flex items-center justify-center space-x-2  rounded p-2 text-white  ${
													!prevVal?.supervisorApproval === null &&
													!prevVal?.partnerApproval === null &&
													!prevVal?.hRMApproval === null
														? 'bg-primary-600 hover:bg-primary-600/90'
														: 'cursor-not-allowed bg-primary-600/50'
												}`}
											>
												<span>Save PDF</span>
												<Icon icon="material-symbols:download" />
											</button>
										</div>
									</td>
								</tr>
							) : (
								''
							)}
							<tr>
								<td className="w-full border border-secondary-200 p-2 text-sm">
									<div className="flex flex-col">
										<span className="text-xs">Supervisor :</span>
										<span className="text-primary-600">
											{prevVal?.supervisor?.name}
										</span>
									</div>
								</td>
								<td className="w-full border border-secondary-200 p-2 text-sm">
									<div className="flex flex-col">
										<span className="text-xs">Approved On :</span>
										<span className="text-primary-600">
											{prevVal?.supervisorApproval?.status === 0 ||
											prevVal?.supervisorApproval === null
												? 'Pending Approval'
												: prevVal?.supervisorApproval?.status === 1
													? prevVal?.supervisorApproval?.updatedAt
													: prevVal?.supervisorApproval
															?.disapprovalComment}
										</span>
									</div>
								</td>
							</tr>
							<tr>
								<td className="w-full border border-secondary-200 p-2 text-sm">
									<div className="flex flex-col">
										<span className="text-xs">Partner :</span>
										<span className="text-primary-600">
											{prevVal?.partner?.name}
										</span>
									</div>
								</td>
								<td className="w-full border border-secondary-200 p-2 text-sm">
									<div className="flex flex-col">
										<span className="text-xs">Approved On :</span>
										<span className="text-primary-600">
											{prevVal?.partnerApproval?.status === 0 ||
											prevVal?.partnerApproval === null
												? 'Pending Approval'
												: prevVal?.partnerApproval?.status === 1
													? prevVal?.partnerApproval?.updatedAt
													: prevVal?.partnerApproval?.disapprovalComment}
										</span>
									</div>
								</td>
							</tr>
							{prevVal?.humanResource ? (
								<tr>
									<td className="w-full border border-secondary-200 p-2 text-sm">
										<div className="flex flex-col">
											<span className="text-xs">Human Resource Manger :</span>
											<span className="text-primary-600">
												{prevVal?.humanResource?.name}
											</span>
										</div>
									</td>
									<td className="w-full border border-secondary-200 p-2 text-sm">
										<div className="flex flex-col">
											<span className="text-xs">Approved On :</span>
											<span className="text-primary-600">
												{prevVal?.hRMApproval?.status === 0 ||
												prevVal?.hRMApproval === null
													? 'Pending Approval'
													: prevVal?.hRMApproval?.status === 1
														? prevVal?.hRMApproval?.updatedAt
														: prevVal?.hRMApproval?.disapprovalComment}
											</span>
										</div>
									</td>
								</tr>
							) : (
								''
							)}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
