'use client';

import SearchInput from '@/components/my-ui/SearchInput';
import { NewsFeed } from '@/lib/types/newsFeed';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns/format';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const fetchAllNewsFeed = async () => {
	const response = await axios.get('/api/newsfeed/get');
	return response.data;
};
export default function Dashboard() {
	const pathname = usePathname();
	const [searchParam, setSearchParam] = useState<string | null>(null);

	const { data } = useQuery<NewsFeed[]>({
		queryFn: fetchAllNewsFeed,
		queryKey: ['news'],
	});

	const handleSearch = (searchInput: any) => {
		setSearchParam(searchInput);
	};
	return (
		<div className="w-full bg-primary-50 space-y-3">
			<div className="sticky z-20 md:flex items-center justify-end gap-2 bg-white top-2 hidden">
				<div className="inline-flex items-center space-x-2 px-2">
					<SearchInput onSearch={handleSearch} />
					<Link
						href={`${pathname}/create`}
						className="p-2 border bg-secondary-300  rounded-md"
					>
						<Icon icon="heroicons:plus" />
					</Link>
				</div>
			</div>
			<div className="shadow overscroll-none ring-1 ring-black ring-opacity-5 md:rounded-md">
				<div className="flex-col hidden lg:flex">
					<table className="table-auto divide-y divide-primary-100">
						<thead className="sticky z-10 top-12 bg-secondary-600 text-secondary-50">
							<tr>
								<th
									scope="col"
									className="sticky top-0 py-3.5 pl-4 pr-3 text-start text-sm font-semibold"
								>
									Created On
								</th>
								<th
									scope="col"
									className="sticky top-0 py-3.5 pl-4 pr-3 text-start text-sm font-semibold  sm:pl-6"
								>
									Title
								</th>
								<th
									scope="col"
									className="sticky top-0 px-3 py-3.5 text-start text-sm font-semibold "
								>
									Prepared By
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{data?.map((feed, index: number) => (
								<tr
									key={feed?.id}
									className={`hover:bg-primary-100/95 ${
										index % 2 && index !== 0 ? 'bg-secondary-100/95' : ''
									}`}
								>
									<td className="px-3 py-2 text-base text-start whitespace-nowrap text-secondary-900">
										{format(feed.createdAt, 'MMM do, yyyy')}
									</td>
									<td className="px-3 py-2 text-base text-start whitespace-nowrap text-primary-500">
										<Link href={`${pathname}/${feed?.id}`}>
											Newsfeed for {format(feed?.date, 'MMM do, yyyy')}
										</Link>
									</td>
									<td className="px-3 py-2 text-sm text-start whitespace-nowrap text-secondary-500">
										{feed?.user?.name}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
