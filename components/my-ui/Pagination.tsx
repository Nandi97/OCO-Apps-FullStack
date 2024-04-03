'use client';
/* This example requires Tailwind CSS v2.0+ */
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/my-ui/select';

interface LinkProps {
	url?: any;
	label?: any;
	active: boolean;
}

interface PaginationProps {
	from: number;
	to: number;
	currentPage: number;
	lastPage: number;
	perPage: number;
	total: number;
	links: LinkProps[];
	firstPageUrl: any;
	lastPageUrl: any;
	onPageChange: (page: number, perPage: number) => void;
	onPerPageChange: (perPage: number) => void;
}

export default function Pagination({
	from,
	to,
	currentPage,
	lastPage,
	perPage,
	total,
	onPageChange,
	links,
	firstPageUrl,
	lastPageUrl,
	onPerPageChange,
}: PaginationProps) {
	// const totalPages = Math.ceil(total / perPage);
	const router = useRouter();

	const handlePageChange = (page: number) => {
		onPageChange(page, perPage);
	};

	const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const newValue = parseInt(event.target.value, 10); // Parse the selected value to an integer
		onPerPageChange(newValue);
	};
	const showFullPagination = total / perPage < 11;

	return (
		<div className="flex items-center justify-between border-t border-secondary-200 bg-white px-4 py-3 sm:px-6">
			<div className="flex flex-1 justify-between sm:hidden">
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className="relative inline-flex items-center rounded-md border border-secondary-300 bg-white px-4 py-2 text-sm font-medium text-secondary-700 hover:bg-secondary-50"
				>
					Previous
				</button>
				<button
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === lastPage}
					className="relative ml-3 inline-flex items-center rounded-md border border-secondary-300 bg-white px-4 py-2 text-sm font-medium text-secondary-700 hover:bg-secondary-50"
				>
					Next
				</button>
			</div>
			<div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
				<div>
					<p className="text-sm text-secondary-700">
						Showing <span className="font-medium">{from}</span> to{' '}
						<span className="font-medium">{to}</span> of{' '}
						<span className="font-medium">{total}</span> results
					</p>
				</div>
				{total >= 10 ? (
					<div className="flex items-center space-x-4">
						<div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-end sm:space-x-4">
							<div>
								<p className="text-xs text-secondary-700">Rows per page:</p>
							</div>
							<select
								onChange={handlePerPageChange}
								className="border-1 shadow-accent-300 block h-8 w-16 rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
							>
								<option value="" disabled>
									Select Rows
								</option>
								<option value="10">10</option>
								<option value="15">15</option>
								<option value="20">20</option>
								<option value="25">25</option>
								<option value="30">40</option>
								<option value={total}>All</option>
							</select>
						</div>
						<nav
							className="isolate inline-flex -space-x-px rounded-md shadow-sm"
							aria-label="Pagination"
						>
							{links.map((item, index) => {
								if (index === 0) {
									return (
										<button
											key={index}
											onClick={() => handlePageChange(currentPage - 1)}
											disabled={currentPage === 1}
											className={` relative inline-flex items-center  rounded-l-md border px-2 py-2 text-sm font-medium focus:z-20 ${
												currentPage < 2
													? 'cursor-not-allowed border-secondary-200 text-slate-400'
													: 'border-secondary-400 bg-secondary-400 text-secondary-50   hover:bg-primary-500 hover:text-primary-50'
											}`}
										>
											<span className="sr-only">Previous</span>
											<Icon
												icon="heroicons:chevron-left"
												className="h-5 w-5"
												aria-hidden="true"
											></Icon>
										</button>
									);
								} else if (index > 0 && index < links?.length - 1) {
									return (
										showFullPagination && (
											<button
												key={index}
												onClick={() =>
													handlePageChange(parseInt(item?.label))
												}
												className={`relative inline-flex items-center border ${
													currentPage === parseInt(item?.label)
														? 'border-primary-500 bg-primary-500 text-primary-50'
														: 'border-secondary-400 bg-white text-secondary-500 hover:bg-secondary-50'
												} px-4 py-2 text-sm font-medium  focus:z-20`}
											>
												{item?.label}
											</button>
										)
									);
								} else {
									return (
										<button
											key={index}
											disabled={currentPage === lastPage}
											className={`relative inline-flex items-center rounded-r-md border  px-2 py-2 focus:z-20 ${
												currentPage === lastPage
													? 'cursor-not-allowed border-secondary-200 text-slate-400'
													: 'border-secondary-400 bg-secondary-400 text-secondary-50   hover:bg-primary-500 hover:text-primary-50'
											}`}
											onClick={() =>
												handlePageChange(parseInt(currentPage) + 1)
											}
										>
											<span className="sr-only">Next</span>
											<Icon
												icon="heroicons:chevron-right"
												className="h-5 w-5"
												aria-hidden="true"
											></Icon>
										</button>
									);
								}
							})}
						</nav>
					</div>
				) : null}
			</div>
		</div>
	);
}
