import React from 'react';

interface TableHead {
	key: string;
	label: string;
	align?: 'start' | 'center' | 'end';
	textClass?: string;
	render?: (item: any) => React.ReactNode;
}
interface TableBody {
	[key: string]: any;
}

interface CustomTableProps {
	columns: TableHead[];
	data: TableBody[];
}

const CustomTable = ({ columns, data }: CustomTableProps) => {
	return (
		<table className="table-auto divide-y divide-primary-100">
			<thead className="sticky top-12 z-10 bg-secondary-600 text-secondary-50">
				<tr>
					{columns?.map((column, index) => (
						<th
							key={index}
							scope="col"
							className={`sticky top-0 py-3.5 ${index === 0 ? 'pl-4' : 'px-3'} ${index === columns.length - 1 ? 'pr-3' : ''} text-start text-sm font-semibold`}
						>
							{column.label}
						</th>
					))}
				</tr>
			</thead>
			<tbody className="divide-y divide-gray-200 bg-white">
				{data?.map((item, index) => (
					<tr
						key={index}
						className={`hover:bg-primary-100/95 ${index % 2 && index !== 0 ? 'bg-secondary-100/95' : ''}`}
					>
						{columns.map((column, columnIndex) => (
							<td
								key={columnIndex}
								className={`px-3 py-2 text-${column.align || 'base'} ${columnIndex === 0 ? 'text-start' : 'whitespace-nowrap'} ${columnIndex === columns.length - 1 ? 'text-end' : ''} ${column.textClass || ''}`}
							>
								{column.render ? column.render(item) : item[column.key]}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};
export default CustomTable;
