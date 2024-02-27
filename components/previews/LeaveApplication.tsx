import logo from '@/public/assets/images/oco_ab_and_david.png';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { Staff } from '@/lib/types/master';
import { format } from 'date-fns';

interface LeaveApplicationPrev {
	employee: Staff;
	supervisorId: string;
	leaveTypeId: string;
	duration: number;
	startDate?: Date;
	endDate?: Date;
	reportDate?: Date;
	finalApproverId: string;
	approvingHRMId: string;
}

interface LeaveApplicationPrevProps {
	prevVal?: LeaveApplicationPrev;
}

const getStaff = async () => {
	const response = await axios.get('/api/staff/get');
	return response.data as Array<Staff>;
};

const fetchLeaveTypes = async () => {
	const response = await axios.get('/api/leave/leave-type/get');
	return response.data;
};

export default function LeaveApplicationPrev({ prevVal }: LeaveApplicationPrevProps) {
	const customTime = new Date().getTime();
	const { data: staff } = useQuery({
		queryFn: getStaff,
		queryKey: ['all-staff'],
	});
	const { data: leaveTypes } = useQuery({
		queryFn: fetchLeaveTypes,
		queryKey: ['leaveTypes'],
	});

	return (
		<div className="w-full p-4 flex-col rounded-md shadow-md space-y-3">
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
										{prevVal?.employee?.name}
									</span>
								</div>
							</td>
							<td className="px-2 border">
								<div className="flex flex-col">
									<span className="text-xs">Payroll Number:</span>
									<span className="text-primary-600">
										{prevVal?.employee?.staffNo}
									</span>
								</div>
							</td>
						</tr>
						<tr>
							<td className="px-2 border">
								<div className="flex flex-col">
									<span className="text-xs">Title:</span>
									<span className="text-primary-600">
										{prevVal?.employee?.designation?.name}
									</span>
								</div>
							</td>
							<td className="px-2 border">
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
									<span className="text-primary-600">
										{
											leaveTypes?.find(
												(item: any) => item?.id === prevVal?.leaveTypeId
											)?.name
										}
									</span>
								</div>
							</td>
							<td className="px-2 border">
								<div className="flex flex-col">
									<span className="text-xs">Number of Leave Days:</span>
									<span className="text-primary-600">{prevVal?.duration}</span>
								</div>
							</td>
						</tr>
						<tr>
							<td className="px-2 border">
								<div className="flex flex-col">
									<span className="text-xs">Start Leave On:</span>
									<span className="text-primary-600">
										{!prevVal?.startDate
											? ''
											: format(new Date(prevVal.startDate), 'MMMM d, yyyy')}
									</span>
								</div>
							</td>
							<td className="px-2 border">
								<div className="flex flex-col">
									<span className="text-xs">End Leave On:</span>
									<span className="text-primary-600">
										{!prevVal?.endDate
											? ''
											: format(prevVal.endDate, 'MMMM d, yyyy')}
									</span>
								</div>
							</td>
						</tr>
						<tr>
							<td className="px-2 border">
								<div className="flex flex-col">
									<span className="text-xs">Reporting Back On:</span>
									<span className="text-primary-600">
										{!prevVal?.reportDate
											? ''
											: format(prevVal.reportDate, 'MMMM d, yyyy')}
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
										{
											staff?.find(
												(item: any) => item?.id === prevVal?.supervisorId
											)?.name
										}
									</span>
								</div>
							</td>
							<td className=" border">
								<div className="flex flex-col">
									<span>Approved On:</span>
									<span className="text-primary-600">Pending Approval</span>
								</div>
							</td>
						</tr>
						<tr>
							<td className=" border">
								<div className="flex flex-col">
									<span>HR Manager:</span>
									<span className="text-primary-600">
										{
											staff?.find(
												(item: any) => item?.id === prevVal?.approvingHRMId
											)?.name
										}
									</span>
								</div>
							</td>
							<td className=" border">
								<div className="flex flex-col">
									<span>Approved On:</span>
									<span className="text-primary-600">Pending Approval</span>
								</div>
							</td>
						</tr>
						<tr>
							<td className=" border">
								<div className="flex flex-col">
									<span>Deputy/ Managing Partner:</span>
									<span className="text-primary-600">
										{
											staff?.find(
												(item: any) => item?.id === prevVal?.finalApproverId
											)?.name
										}
									</span>
								</div>
							</td>
							<td className=" border">
								<div className="flex flex-col">
									<span>Approved On:</span>
									<span className="text-primary-600">Pending Approval</span>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
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
									{prevVal?.employee?.leaveBalance?.balanceCarryForward
										? prevVal?.employee?.leaveBalance?.balanceCarryForward
										: 0}
								</span>
							</td>
						</tr>
						<tr>
							<td className="px-2 border">
								<span className="text-lg">No. of leave taken now</span>
							</td>
							<td className="p-2 border">
								<span>{prevVal?.duration}</span>
							</td>
						</tr>
						<tr>
							<td className="px-2 border">
								<span className="text-lg">Balance of leave days</span>
							</td>
							<td className="p-2 border">
								<span>
									{prevVal?.employee?.leaveBalance?.balanceCarryForward
										? prevVal?.employee?.leaveBalance?.balanceCarryForward -
											prevVal?.duration
										: 0}
								</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}
