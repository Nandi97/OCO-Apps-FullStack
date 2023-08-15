'use client';
import SearchInput from '@/components/ui/SearchInput';
import { useState } from 'react';

import { Icon } from '@iconify/react/dist/iconify.js';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function LawyerStopwatch() {
	const [title, setTitle] = useState('Lawyer Stopwatch');
	const [searchParam, setSearchParam] = useState<string | null>(null);
	const [toggleCreateLawyerStopwatch, setToggleCreateLawyerStopwatch] = useState(false);
	const [toggleEditLawyerStopwatch, setToggleEditLawyerStopwatch] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);

	const pathname = usePathname();

	const handleSearch = (searchInput: any) => {
		setSearchParam(searchInput);
	};
	return (
		<div className="space-y-2 bg-white">
			<div className="sticky z-20 flex items-center justify-between gap-2 bg-white top-2">
				<h1 className="text-lg font-extralight text-accent-700">{title}</h1>
				<div className="inline-flex items-center space-x-2">
					<SearchInput onSearch={handleSearch} />
					<Link
						href={`${pathname}/create`}
						passHref
						className="inline-flex items-center justify-center w-8 h-8 p-2 text-xs rounded-sm shadow-sm text-ocoblue-600 bg-ocoblue-100 focus:ring-offset-ocoblue-100"
					>
						<Icon icon={'heroicons:document-plus'} />
					</Link>
					{/* <OptDropdown optBtn={headerOptBtnTxt} optionsList={headerOptionsList} /> */}
				</div>
			</div>
			<div className="shadow overscroll-none ring-1 ring-black ring-opacity-5 md:rounded-md">
				<div className="flex-col hidden lg:flex">
					<table className="min-w-full divide-y divide-ocobrown-100">
						<thead className="sticky z-10 top-12 bg-ocoblue-600 text-ocoblue-50">
							<tr>
								<th
									scope="col"
									className="sticky top-0 p-2 text-sm font-semibold text-center"
								>
									Matter Code
								</th>
								<th
									scope="col"
									className="sticky top-0 p-2 pr-3 text-sm font-semibold text-left sm:pl-6"
								>
									Task
								</th>
								<th
									scope="col"
									className="sticky top-0 p-2 text-sm font-semibold text-left "
								>
									Narration
								</th>
								<th
									scope="col"
									className="sticky top-0 p-2 text-sm font-semibold text-left "
								>
									Date
								</th>
								<th
									scope="col"
									className="sticky top-0 p-2 text-sm font-semibold text-center "
								>
									Started At
								</th>
								<th
									scope="col"
									className="sticky top-0 p-2 text-sm font-semibold text-left "
								>
									Ended At
								</th>
								<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
									<span className="sr-only">Edit</span>
								</th>
							</tr>
						</thead>
						<tbody className="z-0 bg-white divide-y divide-gray-200">
							<tr>
								<td className="p-2 text-sm text-center"></td>
								<td className="py-2 pl-4 pr-3 text-sm sm:pl-6"></td>
								<td className="px-3 py-2 text-sm text-ocoblue-900"></td>
								<td className="px-3 py-2 text-sm whitespace-nowrap text-ocoblue-500"></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
