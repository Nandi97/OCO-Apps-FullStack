import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/Button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/Select';
import { Icon } from '@iconify/react/dist/iconify.js';

interface DataTablePaginationProps<TData> {
	table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
	return (
		<div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
			<div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
				<div className="flex-1 text-sm text-secondary-700">
					Page{' '}
					<span className="font-medium">{table.getState().pagination.pageIndex + 1}</span>{' '}
					of <span className="font-medium">{table.getPageCount()}</span>
				</div>
			</div>
			<div className="flex items-center space-x-6 lg:space-x-8">
				<div className="flex items-center space-x-2 text-secondary-700">
					<p className="text-sm font-medium ">Rows per page</p>
					<Select
						value={`${table.getState().pagination.pageSize}`}
						onValueChange={(value) => {
							table.setPageSize(Number(value));
						}}
					>
						<SelectTrigger className="h-8 w-[70px] border-2 border-secondary-300">
							<SelectValue placeholder={table.getState().pagination.pageSize} />
						</SelectTrigger>
						<SelectContent side="top" className="bg-primary-50">
							{[10, 20, 30, 40, 50].map((pageSize) => (
								<SelectItem
									key={pageSize}
									value={`${pageSize}`}
									className="hover:bg-primary-300 hover:text-primary-50"
								>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className="isolate inline-flex items-center -space-x-px rounded-md shadow-sm">
					<Button
						variant="outline"
						className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-secondary-900 ring-1 ring-inset ring-secondary-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
						onClick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
					>
						<span className="sr-only">Go to first page</span>
						<Icon icon="radix-icons:double-arrow-left" className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-secondary-900 ring-1 ring-inset ring-secondary-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<span className="sr-only">Go to previous page</span>
						<Icon icon="radix-icons:chevron-left" className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-secondary-900 ring-1 ring-inset ring-secondary-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<span className="sr-only">Go to next page</span>
						<Icon icon="radix-icons:chevron-right" className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-secondary-900 ring-1 ring-inset ring-secondary-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
						onClick={() => table.setPageIndex(table.getPageCount() - 1)}
						disabled={!table.getCanNextPage()}
					>
						<span className="sr-only">Go to last page</span>
						<Icon icon="radix-icons:double-arrow-right" className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}
