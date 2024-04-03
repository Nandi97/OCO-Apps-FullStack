import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import format from 'date-fns/format';
import { Icon } from '@iconify/react/dist/iconify.js';
import { LeaveApplication } from '@/lib/types/master';

const fetchAllApplications = async () => {
	const response = await axios.get<LeaveApplication[]>('/api/leave/get');
	return response.data;
};

export default function LeaveView() {
	const { data: applications } = useQuery({
		queryFn: fetchAllApplications,
		queryKey: ['leaveApplications'],
	});

	console.log('Leave Applications:', applications);
	return (
		<>
			<table className="w-full table-auto divide-y divide-primary-100">
				<thead className="sticky z-10 bg-secondary-600 text-secondary-50">
					<tr>
						<th
							scope="col"
							className="sticky top-0 p-3 text-center text-sm font-semibold"
						>
							#
						</th>
						<th
							scope="col"
							className="sticky top-0 p-3 text-left text-sm font-semibold  sm:pl-6"
						>
							Leave ID
						</th>

						<th
							scope="col"
							className="sticky top-0 py-3 text-left text-sm font-semibold  "
						>
							Duration
						</th>
						<th
							scope="col"
							className="sticky top-0 p-3 text-left text-sm font-semibold"
						>
							Start Date
						</th>
						<th
							scope="col"
							className="sticky top-0 p-3 text-left text-sm font-semibold"
						>
							End Date
						</th>
						<th
							scope="col"
							className="sticky top-0 p-3 text-left text-sm font-semibold"
						>
							Report Date
						</th>
						<th
							scope="col"
							className="sticky top-0 p-3 text-center text-sm font-semibold"
						>
							3 stage Approval
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200 bg-white">
					{applications?.map((item, index: number) => (
						<tr
							key={item?.id}
							className={`hover:bg-primary-100/95 ${
								index % 2 && index !== 0 ? 'bg-secondary-100/95' : ''
							}`}
						>
							<td className="whitespace-nowrap p-2 text-center text-sm text-secondary-500">
								{index + 1}
							</td>
							<td className="py-2 text-sm text-primary-600 hover:underline">
								<Link href={`/staff/leave-applications/${item?.id}`}>
									{item?.id}
								</Link>
							</td>
							<td className="whitespace-nowrap p-2 text-sm text-secondary-500">
								{item?.duration} Days
							</td>
							<td className="whitespace-nowrap p-2 text-sm text-secondary-500">
								{!item?.startDate
									? ''
									: format(new Date(item?.startDate), 'MMMM d, yyyy')}
							</td>
							<td className="whitespace-nowrap p-2 text-sm text-secondary-500">
								{!item?.endDate
									? ''
									: format(new Date(item?.endDate), 'MMMM d, yyyy')}
							</td>
							<td className="whitespace-nowrap p-2 text-sm text-secondary-500">
								{!item?.reportDate
									? ''
									: format(new Date(item?.reportDate), 'MMMM d, yyyy')}
							</td>
							<td className="flex items-center justify-center space-x-3 whitespace-nowrap px-3 py-2 text-center text-sm text-secondary-500">
								<div
									className={`rounded ring-2 ring-slate-400 ${
										item?.leaveSupervisorApproval?.status !== 1
											? 'bg-slate-50'
											: 'bg-green-500'
									}`}
								>
									<Icon
										icon="heroicons:check"
										className={`font-semibold  ${
											item?.leaveSupervisorApproval?.status !== 1
												? 'text-slate-400'
												: 'text-green-500'
										}`}
									/>
								</div>
								<div
									className={`rounded ring-2 ring-slate-400 ${
										item?.leaveFinalApproval?.status !== 1
											? 'bg-slate-50'
											: 'bg-green-500'
									}`}
								>
									<Icon
										icon="heroicons:check"
										className={`font-semibold  ${
											item?.leaveFinalApproval?.status !== 1
												? 'text-slate-400'
												: 'text-green-500'
										}`}
									/>
								</div>
								<div
									className={`rounded ring-2 ring-slate-400 ${
										item?.leaveHRMApproval?.status !== 1
											? 'bg-slate-50'
											: 'bg-green-500'
									}`}
								>
									<Icon
										icon="heroicons:check"
										className={`font-semibold  ${
											item?.leaveHRMApproval?.status !== 1
												? 'text-slate-400'
												: 'text-green-500'
										}`}
									/>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
