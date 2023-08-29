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
		<div className="flex items-center justify-between px-4 py-3 bg-white border-t border-ocoblue-200 sm:px-6">
			<div className="flex justify-between flex-1 sm:hidden">
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className="relative inline-flex items-center px-4 py-2 text-sm font-medium bg-white border rounded-md border-ocoblue-300 text-ocoblue-700 hover:bg-ocoblue-50"
				>
					Previous
				</button>
				<button
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === lastPage}
					className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium bg-white border rounded-md border-ocoblue-300 text-ocoblue-700 hover:bg-ocoblue-50"
				>
					Next
				</button>
			</div>
			<div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
				<div>
					<p className="text-sm text-ocoblue-700">
						Showing <span className="font-medium">{from}</span> to{' '}
						<span className="font-medium">{to}</span> of{' '}
						<span className="font-medium">{total}</span> results
					</p>
				</div>
				{total >= 10 ? (
					<div className="flex items-center space-x-4">
						<div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-end sm:space-x-4">
							<div>
								<p className="text-xs text-ocoblue-700">Rows per page:</p>
							</div>
							<select
								onChange={handlePerPageChange}
								className="sm:text-sm w-16 bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
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
							className="inline-flex -space-x-px rounded-md shadow-sm isolate"
							aria-label="Pagination"
						>
							{links.map((item, index) => {
								if (index === 0) {
									return (
										<button
											key={index}
											onClick={() => handlePageChange(currentPage - 1)}
											disabled={currentPage === 1}
											className={` focus:z-20 relative px-2  inline-flex items-center rounded-l-md py-2 text-sm font-medium border ${
												currentPage < 2
													? 'cursor-not-allowed text-slate-400 border-ocoblue-200'
													: 'border-ocoblue-400 bg-ocoblue-400 text-ocoblue-50   hover:bg-ocobrown-500 hover:text-ocobrown-50'
											}`}
										>
											<span className="sr-only">Previous</span>
											<Icon
												icon="heroicons:chevron-left"
												className="w-5 h-5"
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
														? 'border-ocobrown-500 text-ocobrown-50 bg-ocobrown-500'
														: 'border-ocoblue-400 bg-white text-ocoblue-500 hover:bg-ocoblue-50'
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
											className={`relative inline-flex items-center rounded-r-md border  focus:z-20 px-2 py-2 ${
												currentPage === lastPage
													? 'cursor-not-allowed text-slate-400 border-ocoblue-200'
													: 'border-ocoblue-400 bg-ocoblue-400 text-ocoblue-50   hover:bg-ocobrown-500 hover:text-ocobrown-50'
											}`}
											onClick={() =>
												handlePageChange(parseInt(currentPage) + 1)
											}
										>
											<span className="sr-only">Next</span>
											<Icon
												icon="heroicons:chevron-right"
												className="w-5 h-5"
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
