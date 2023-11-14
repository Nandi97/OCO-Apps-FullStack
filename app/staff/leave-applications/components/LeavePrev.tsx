'use client';
import Image from 'next/image';
import logo from '@/public/assets/images/oco_ab_and_david.png';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import format from 'date-fns/format';

interface LeavePrevProps {
	url: string;
}
const fetchDetails = async (slug: string) => {
	const response = await axios.get(`/api/leave/get/${slug}`);
	return response.data;
};

export default function LeavePrev({ url }: LeavePrevProps) {
	const { data: prevVal } = useQuery({
		queryKey: ['detailLeave'],
		queryFn: () => fetchDetails(url),
	});

	// console.log('URL:', url);
	console.log('Prev Leave Val:', prevVal);
	return (
		<>
			<div className="grid grid-cols-12">
				<div className="w-full p-4 flex-col rounded-md shadow-md space-y-3 col-span-9">
					<div className="w-full flex items-center justify-center">
						<Image
							src={logo}
							placeholder="blur"
							width={300}
							height={200}
							alt="OCO ab David Logo"
							className="w-36"
						/>
					</div>
					<div className="w-full flex items-center justify-center bg-ocobrown-600">
						<p className="font-bold uppercase text-2xl text-white">Leave Application</p>
					</div>
					<div className="w-full flex items-center justify-center">
						<table className="table-fixed w-full">
							<thead className="text-xs text-ocoblue-700 uppercase bg-ocoblue-200">
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
											<span className="text-ocobrown-600">
												{prevVal?.employee?.name}
											</span>
										</div>
									</td>
									<td className="px-2 border">
										<div className="flex flex-col">
											<span className="text-xs">Payroll Number:</span>
											<span className="text-ocobrown-600">
												{prevVal?.employee?.staffNo}
											</span>
										</div>
									</td>
								</tr>
								<tr>
									<td className="px-2 border">
										<div className="flex flex-col">
											<span className="text-xs">Title:</span>
											<span className="text-ocobrown-600">
												{prevVal?.title}
											</span>
										</div>
									</td>
									<td className="px-2 border">
										<div className="flex flex-col">
											<span className="text-xs">Team:</span>
											<span className="text-ocobrown-600">
												{prevVal?.team}
											</span>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="w-full flex items-center justify-center">
						<table className="table-fixed w-full">
							<thead className="text-xs text-ocoblue-700 uppercase bg-ocoblue-200">
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
											<span className="text-ocobrown-600">
												{/* {
													leaveTypes?.find(
														(item: any) =>
															item?.id === prevVal?.leaveType
													)?.name
												} */}
											</span>
										</div>
									</td>
									<td className="px-2 border">
										<div className="flex flex-col">
											<span className="text-xs">Number of Leave Days:</span>
											<span className="text-ocobrown-600">
												{prevVal?.leaveDays}
											</span>
										</div>
									</td>
								</tr>
								<tr>
									<td className="px-2 border">
										<div className="flex flex-col">
											<span className="text-xs">Start Leave On:</span>
											<span className="text-ocobrown-600">
												{prevVal?.startDate
													? format(
															new Date(prevVal?.startDate),
															'MMMM d, yyyy'
													  )
													: ''}
											</span>
										</div>
									</td>
									<td className="px-2 border">
										<div className="flex flex-col">
											<span className="text-xs">End Leave On:</span>
											<span className="text-ocobrown-600">
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
									<td className="px-2 border">
										<div className="flex flex-col">
											<span className="text-xs">Reporting Back On:</span>
											<span className="text-ocobrown-600">
												{prevVal?.reportingDate
													? format(
															new Date(prevVal?.reportingDate),
															'MMMM d, yyyy'
													  )
													: ''}
											</span>
										</div>
									</td>
									<td className="px-2 border">
										<div className="flex flex-col">
											<span className="text-xs">Applied on:</span>
											<span className="text-ocobrown-600">
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
							<thead className="text-xs text-ocoblue-700 uppercase bg-ocoblue-200">
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
											<span className="text-ocobrown-600">
												{prevVal?.supervisor}
											</span>
										</div>
									</td>
									<td className=" border">
										<div className="flex flex-col">
											<span>Approved On:</span>
											<span className="text-ocobrown-600">
												Pending Approval
											</span>
										</div>
									</td>
								</tr>
								<tr>
									<td className=" border">
										<div className="flex flex-col">
											<span>HR Manager:</span>
											<span className="text-ocobrown-600">
												{/* {
													allStaff?.find(
														(item: any) =>
															item?.id === prevVal?.humanResource
													)?.name
												} */}
											</span>
										</div>
									</td>
									<td className=" border">
										<div className="flex flex-col">
											<span>Approved On:</span>
											<span className="text-ocobrown-600">
												Pending Approval
											</span>
										</div>
									</td>
								</tr>
								<tr>
									<td className=" border">
										<div className="flex flex-col">
											<span>Deputy/ Managing Partner:</span>
											<span className="text-ocobrown-600">
												{/* {
													allStaff?.find(
														(item: any) => item?.id === prevVal?.partner
													)?.name
												} */}
											</span>
										</div>
									</td>
									<td className=" border">
										<div className="flex flex-col">
											<span>Approved On:</span>
											<span className="text-ocobrown-600">
												Pending Approval
											</span>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="w-full flex items-center justify-center flex-col space-y-2">
						<h1 className="text-ocobrown-600">For Official Use Only - HR Department</h1>
						<table className="table-auto w-2/3">
							<tbody>
								<tr>
									<td className="px-2 border">
										<span className="text-lg">No. of leave days available</span>
									</td>
									<td className="p-2 border">
										<span></span>
									</td>
								</tr>
								<tr>
									<td className="px-2 border">
										<span className="text-lg">No. of leave taken now</span>
									</td>
									<td className="p-2 border">
										<span></span>
									</td>
								</tr>
								<tr>
									<td className="px-2 border">
										<span className="text-lg">Balance of leave days</span>
									</td>
									<td className="p-2 border">
										<span></span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
}
