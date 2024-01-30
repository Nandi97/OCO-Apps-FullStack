'use client';

import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import { DataTableRowActions } from './data-table-row-actions';
import { DataTableColumnHeader } from './data-table-column-header';
import { Staff } from './data/schema';

const columnHelper = createColumnHelper<Staff>();

export const columns = [
	columnHelper.accessor('id', {
		cell: (info) => (
			<Link
				className="text-primary-600 underline"
				href={`/staff/staff-list/${info.getValue()}`}
			>
				{info.getValue()}
			</Link>
		),
		header: 'Staff ID #',
	}),
	columnHelper.accessor('name', {
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate font-medium">
						{row.getValue('name')}
					</span>
				</div>
			);
		},
		header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
	}),

	columnHelper.accessor('designation.name', {
		cell: (info) => info.getValue(),
		header: 'Designation',
	}),
	columnHelper.accessor('email', {
		cell: (info) => <div className="text-primary-600">{info.getValue()}</div>,
		header: 'Email',
	}),

	columnHelper.accessor('ext', {
		cell: (info) => info.getValue(),
		header: 'Extension',
	}),

	columnHelper.accessor('team.name', {
		cell: (info) => info.getValue(),
		header: 'Team',
	}),

	columnHelper.accessor('deletedAt', {
		cell: (info) =>
			info.getValue() === null ? (
				<span className="inline-flex rounded-full  px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100">
					Active
				</span>
			) : (
				<span className="inline-flex rounded-full  px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100">
					Inactive
				</span>
			),
		header: 'Status',
	}),
	columnHelper.display({
		id: 'actions',
		cell: (info) => <DataTableRowActions />,
	}),
];
