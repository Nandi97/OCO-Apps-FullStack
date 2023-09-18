'use client';
import OptDropdown from '@/components/my-ui/OptDropdown';
import Pagination from '@/components/my-ui/Pagination';
import SearchInput from '@/components/my-ui/SearchInput';
import { Icon } from '@iconify/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Library() {
	const [title, setTitle] = useState('Library');
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const [searchParam, setSearchParam] = useState<string | null>(null);

	const pathname = usePathname();

	const { data, isLoading } = useQuery(['bookList', currentPage, perPage, searchParam], () =>
		axios
			.get(`/api/books/getBooks`, {
				params: { page: currentPage, perPage, searchParam },
			})
			.then((response) => response.data)
	);

	// console.log('Book Data', data);

	const total = data?.total ?? 0;
	const links = data?.links ?? [];
	const firstPageUrl = data?.firstPageUrl;
	const lastPageUrl = data?.lastPageUrl;
	const from = data?.from ?? 0;
	const to = data?.to ?? 0;

	const handleDelete = () => {
		console.log('Deleting Book');
	};

	// Header Dropdown
	const headerOptBtnTxt = {
		icon: 'heroicons:chevron-down',
		name: 'Other Resources',
		buttonClassName:
			'inline-flex items-center justify-center w-full h-8 px-4 text-xs text-white whitespace-nowrap rounded-sm shadow-sm bg-ocoblue-600 focus:outline-none focus:ring-2 focus:ring-ocoblue-600 focus:ring-offset-0 focus:ring-offset-ocoblue-100',
		iconClassName: '',
	};

	const headerOptionsList = [
		{
			name: 'OCO Resource Center',
			link: 'https://oraro-mobility-eu.imanage.work/work/web/r/libraries/ORARODOCS/workspaces/ORARODOCS!2993?p=1',
		},
		{
			name: 'Legislations',
			link: 'https://oraro-mobility-eu.imanage.work/work/web/r/libraries/ORARODOCS/workspaces/ORARODOCS!2993?p=1',
		},
		{
			name: 'Law Africa',
			link: 'https://llr.lawafrica.com',
		},
		{
			name: 'Practical Law',
			link: 'https://uk.practicallaw.thomsonreuters.com/Browse/Home/PracticalLaw?transitionType=Default&contextData=(sc.Default)',
		},
		{
			name: 'Westlaw UK',
			link: 'https://legalsolutions.thomsonreuters.co.uk/en/products-services/westlaw-uk.html',
		},
		{
			name: 'Kenya Law',
			link: 'http://kenyalaw.org/kl/',
		},
		{
			name: 'World LII',
			link: 'http://www.worldlii.org/',
		},
		{
			name: 'CanLII',
			link: 'https://www.canlii.org/en/',
		},
		{
			name: 'BAILII',
			link: 'https://www.bailii.org/',
		},
	];

	// Table Dopdown
	const tableOptBtnTxt = {
		icon: 'heroicons:ellipsis-horizontal',
		buttonClassName:
			'flex items-center justify-center w-full h-8 px-4 text-ocoblue-900 rounded-sm hover:shadow-sm z-10',
	};
	const tableOptionsList = [
		{ name: 'Delete Book', icon: 'heroicons:trash', action: handleDelete },
	];

	useEffect(() => {
		setTitle('Library');
	}, []);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handleSearch = (searchInput: any) => {
		setSearchParam(searchInput);
	};

	const handlePerPageChange = (newPerPage: number) => {
		setPerPage(newPerPage);
		// You may also want to update the displayed data based on the newPerPage value
	};

	return (
		<div className="space-y-2 bg-white">
			<div className="sticky z-20 flex items-center justify-between gap-2 bg-white top-2">
				<h1 className="text-lg font-extralight text-accent-700">{title}</h1>
				<div className="inline-flex items-center space-x-2">
					<SearchInput onSearch={handleSearch} />
					<Link
						href={`${pathname}/book/create`}
						className="inline-flex items-center justify-center w-8 h-8 p-2 text-xs rounded-sm shadow-sm text-ocoblue-600 bg-ocoblue-100 focus:ring-offset-ocoblue-100"
					>
						<Icon icon={'heroicons:document-plus'} />
					</Link>
					<OptDropdown optBtn={headerOptBtnTxt} optionsList={headerOptionsList} />
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
									Cover
								</th>
								<th
									scope="col"
									className="sticky top-0 p-2 pr-3 text-sm font-semibold text-left sm:pl-6"
								>
									Title
								</th>
								<th
									scope="col"
									className="sticky top-0 p-2 text-sm font-semibold text-left "
								>
									Author
								</th>
								<th
									scope="col"
									className="sticky top-0 p-2 text-sm font-semibold text-left "
								>
									Publication Year
								</th>
								<th
									scope="col"
									className="sticky top-0 p-2 text-sm font-semibold text-center "
								>
									Edition
								</th>
								<th
									scope="col"
									className="sticky top-0 p-2 text-sm font-semibold text-left "
								>
									Status
								</th>
								<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
									<span className="sr-only">Edit</span>
								</th>
							</tr>
						</thead>
						<tbody className="z-0 bg-white divide-y divide-gray-200">
							{data?.data?.map((book, index) => {
								if (isLoading) {
									return (
										<tr key={index}>
											<td
												colSpan={7}
												className="flex items-center justify-center w-full px-3 py-2 text-sm text-center whitespace-nowrap text-ocoblue-500"
											>
												<svg
													aria-hidden="true"
													className="w-8 h-8 mr-2 text-ocoblue-200 animate-spin fill-ocobrown-600"
													viewBox="0 0 100 101"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
														fill="currentColor"
													/>
													<path
														d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
														fill="currentFill"
													/>
												</svg>
												<span className="sr-only">Loading...</span>
											</td>
										</tr>
									);
								} else {
									return (
										<tr
											key={book?.id}
											className={`hover:bg-ocobrown-100/95 ${
												index % 2 && index !== 0 ? 'bg-ocoblue-100/95' : ''
											}`}
										>
											<td className="p-2 text-sm text-center">
												<div className="flex items-center w-full">
													{!book?.coverUrl ? (
														<div className="w-full">
															<span className="inline-flex items-center justify-center rounded w-7 h-7 bg-ocoblue-500">
																<span className="font-medium leading-none text-white">
																	{book?.title
																		.split(' ')
																		.map((n) => n[0])
																		.join('.')}
																</span>
															</span>
														</div>
													) : (
														<div className="w-full">
															<Image
																height={200}
																width={200}
																className="object-contain h-7 rounded aspect-[9/16]"
																src={book?.coverUrl}
																alt=""
															/>
														</div>
													)}
												</div>
											</td>
											<td className="py-2 text-left  sm:pl-6 text-sm text-ocoblue-900">
												<Link
													href={`/library/book/${book?.id}`}
													className="font-medium text-ocobrown-500 truncate hover:whitespace-normal hover:overflow-visible w-72"
												>
													{book?.title}
												</Link>
											</td>
											<td className="py-2 text-left  sm:pl-6 text-sm text-ocoblue-900">
												<p className="truncate hover:whitespace-normal hover:overflow-visible w-52">
													{book?.author}
												</p>
											</td>
											<td className="px-3 py-2 text-sm whitespace-nowrap text-ocoblue-500">
												{book?.publicationYear}
											</td>
											<td className="px-3 py-2 text-sm text-center whitespace-nowrap text-ocoblue-500">
												{book?.edition}
											</td>
											<td className="px-3 py-2 text-sm whitespace-nowrap text-ocoblue-500">
												<span
													className={`inline-flex rounded-full  px-2 text-xs font-semibold leading-5 ${
														book?.status === true
															? 'text-green-800 bg-green-100'
															: 'text-red-800 bg-red-100'
													}`}
												>
													{book?.status === true ? 'Active' : 'Inactive'}
												</span>
											</td>
											<td className="relative py-2 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6">
												<button
													type="button"
													className="flex items-center justify-center w-5 h-5 p-1 rounded hover:bg-ocobrown-700 hover:bg-opacity-20"
												>
													<OptDropdown
														optBtn={tableOptBtnTxt}
														optionsList={[
															...tableOptionsList,
															{
																name: 'Edit Book',
																icon: 'heroicons:pencil-square',
																link: `${pathname}/book/${book?.id}/edit`,
															},
														]}
													/>
												</button>
											</td>
										</tr>
									);
								}
							})}
						</tbody>
					</table>
				</div>
				<div className="flex flex-wrap gap-2 sm:flex-col md:flex-row sm:flex lg:hidden">
					{data?.data?.map((book, i) => (
						<div
							key={book?.id}
							className="grid min-w-full grid-cols-12 p-3 bg-white border-t border-gray-200 rounded-md shadow-sm sm:px-6 shadow-ocoblue-400"
						>
							<div className="col-span-4">
								<div className="flex items-center gap-2">
									{!book?.coverUrl ? (
										<span className="inline-flex items-center justify-center rounded-full h-7 w-7 bg-ocoblue-500">
											<span className="font-medium leading-none text-white">
												{book?.title
													.split(' ')
													.map((n) => n[0])
													.join('.')}
											</span>
										</span>
									) : (
										<Image
											height={200}
											width={200}
											className="rounded-full h-7 w-7"
											src={book?.coverUrl}
											alt="user avatar"
										/>
									)}
								</div>
							</div>
							<div className="col-span-8">
								{book?.copies} Cop{book?.copies > 1 ? 'ies' : 'y'}
							</div>
							<div className="col-span-4 text-sm font-semibold text-left text-ocoblue-600">
								Title :
							</div>
							<div className="col-span-8">{book?.title}</div>
							<div className="col-span-4 text-sm font-semibold text-left text-ocoblue-600">
								Author :
							</div>
							<div className="col-span-8">{book?.author}</div>
							<div className="col-span-4 text-sm font-semibold text-left text-ocoblue-600">
								Publication Year :
							</div>
							<div className="col-span-8 text-ocobrown-500">
								{book?.publicationYear}
							</div>
							<div className="col-span-4 text-sm font-semibold text-left text-ocoblue-600">
								Extension :
							</div>
							<div className="col-span-8">{book?.edition}</div>
							<div className="col-span-4 text-sm font-semibold text-left text-ocoblue-600">
								Status :
							</div>
							<div className="col-span-8">
								<span
									className={`inline-flex rounded-full  px-2 text-xs font-semibold leading-5 ${
										book?.status === true
											? 'text-green-800 bg-green-100'
											: 'text-red-800 bg-red-100'
									}`}
								>
									{book?.status === true ? 'Active' : 'Inactive'}
								</span>
							</div>
						</div>
					))}
				</div>

				<Pagination
					from={from}
					to={to}
					currentPage={currentPage}
					lastPage={Math.ceil(total / perPage)}
					perPage={perPage}
					total={total}
					links={links}
					firstPageUrl={firstPageUrl}
					lastPageUrl={lastPageUrl}
					onPageChange={handlePageChange}
					onPerPageChange={handlePerPageChange}
				/>
			</div>
		</div>
	);
}
