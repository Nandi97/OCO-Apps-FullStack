import logo from '@/public/assets/images/oco_ab_and_david.png';
import Image from 'next/image';

interface LeaveApplicationPrev {
	name: string;
	staffNo: string;
	title: string;
	team: string;

	leaveType: string;
	leaveDays: string;
	startDate: string;
	endDate: string;
	reportingDate: string;
	appliedOn: string;
	supervisor: string;
	partner: string;
	humanResource: string;
}

interface LeaveApplicationPrevProps {
	prevVal?: LeaveApplicationPrev;
}

export default function LeaveApplicationPrev({ prevVal }: LeaveApplicationPrevProps) {
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
									<span className="text-ocobrown-600">{prevVal?.name}</span>
								</div>
							</td>
							<td className="px-2 border">
								<div className="flex flex-col">
									<span className="text-xs">Payroll Number:</span>
									<span className="text-ocobrown-600">{prevVal?.staffNo}</span>
								</div>
							</td>
						</tr>
						<tr>
							<td className="px-2 border">
								<div className="flex flex-col">
									<span className="text-xs">Title:</span>
									<span className="text-ocobrown-600">{prevVal?.title}</span>
								</div>
							</td>
							<td className="px-2 border">
								<div className="flex flex-col">
									<span className="text-xs">Team:</span>
									<span className="text-ocobrown-600">{prevVal?.team}</span>
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
									<span className="text-ocobrown-600">{prevVal?.leaveType}</span>
								</div>
							</td>
							<td className="px-2 border">
								<div className="flex flex-col">
									<span className="text-xs">Number of Leave Days:</span>
									<span className="text-ocobrown-600">{prevVal?.leaveDays}</span>
								</div>
							</td>
						</tr>
						<tr>
							<td className="px-2 border">
								<div className="flex flex-col">
									<span className="text-xs">Start Leave On:</span>
									<span className="text-ocobrown-600">{prevVal?.startDate}</span>
								</div>
							</td>
							<td className="px-2 border">
								<div className="flex flex-col">
									<span className="text-xs">End Leave On:</span>
									<span className="text-ocobrown-600">{prevVal?.endDate}</span>
								</div>
							</td>
						</tr>
						<tr>
							<td className="px-2 border">
								<div className="flex flex-col">
									<span className="text-xs">Reporting Back On:</span>
									<span className="text-ocobrown-600">
										{prevVal?.reportingDate}
									</span>
								</div>
							</td>
							<td className="px-2 border">
								<div className="flex flex-col">
									<span className="text-xs">Applied on:</span>
									<span className="text-ocobrown-600">{prevVal?.appliedOn}</span>
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
									<span className="text-ocobrown-600">{prevVal?.supervisor}</span>
								</div>
							</td>
							<td className=" border">
								<div className="flex flex-col">
									<span>Approved On:</span>
									<span className="text-ocobrown-600">Pending Approval</span>
								</div>
							</td>
						</tr>
						<tr>
							<td className=" border">
								<div className="flex flex-col">
									<span>HR Manager:</span>
									<span className="text-ocobrown-600">
										{prevVal?.humanResource}
									</span>
								</div>
							</td>
							<td className=" border">
								<div className="flex flex-col">
									<span>Approved On:</span>
									<span className="text-ocobrown-600">Pending Approval</span>
								</div>
							</td>
						</tr>
						<tr>
							<td className=" border">
								<div className="flex flex-col">
									<span>Deputy/ Managing Partner:</span>
									<span className="text-ocobrown-600">{prevVal?.partner}</span>
								</div>
							</td>
							<td className=" border">
								<div className="flex flex-col">
									<span>Approved On:</span>
									<span className="text-ocobrown-600">Pending Approval</span>
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
	);
}
