'use client';

import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { DataTableViewOptions } from './data-table-view-options';

import { priorities, designations } from './data/data';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { Icon } from '@iconify/react/dist/iconify.js';

interface DataTableToolbarProps<TData> {
	table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0;

	console.log('Columns', table.getAllColumns());

	return (
		<div className="flex items-center justify-between p-2">
			<div className="flex flex-1 items-center space-x-2 space-y-2">
				<Input
					placeholder="Filter"
					value={
						(table
							.getColumn('name' || 'designation_name' || 'team_name')
							?.getFilterValue() as string) ?? ''
					}
					onChange={(event) =>
						table
							.getColumn('name' || 'designation_name' || 'team_name')
							?.setFilterValue(event.target.value)
					}
					className="h-8 w-[150px] lg:w-[250px]"
				/>

				{isFiltered && (
					<Button
						variant="ghost"
						onClick={() => table.resetColumnFilters()}
						className="h-8 px-2 lg:px-3 border-2 border-secondary-500/50 text-secondary-500"
					>
						Reset
						<Icon icon="radix-icons:cross-2" className="ml-2 h-4 w-4" />
					</Button>
				)}
			</div>
			<DataTableViewOptions table={table} />
		</div>
	);
}
