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
		<div className="w-full space-y-3 bg-primary-50">
			<div className="sticky top-2 z-20 hidden items-center justify-end gap-2 bg-white md:flex">
				<div className="inline-flex items-center space-x-2 px-2">
					<SearchInput onSearch={handleSearch} />
					<Link
						href={`${pathname}/create`}
						className="rounded-md border bg-secondary-300  p-2"
					>
						<Icon icon="heroicons:plus" />
					</Link>
				</div>
			</div>
			<div className="overscroll-none shadow ring-1 ring-black ring-opacity-5 md:rounded-md">
				<div className="hidden flex-col lg:flex">
					<table className="table-auto divide-y divide-primary-100">
						<thead className="sticky top-12 z-10 bg-secondary-600 text-secondary-50">
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
						<tbody className="divide-y divide-gray-200 bg-white">
							{data?.map((feed, index: number) => (
								<tr
									key={feed?.id}
									className={`hover:bg-primary-100/95 ${
										index % 2 && index !== 0 ? 'bg-secondary-100/95' : ''
									}`}
								>
									<td className="whitespace-nowrap px-3 py-2 text-start text-base text-secondary-900">
										{format(feed.createdAt, 'MMM do, yyyy')}
									</td>
									<td className="whitespace-nowrap px-3 py-2 text-start text-base text-primary-500">
										<Link href={`${pathname}/${feed?.id}`}>
											Newsfeed for {format(feed?.date, 'MMM do, yyyy')}
										</Link>
									</td>
									<td className="whitespace-nowrap px-3 py-2 text-start text-sm text-secondary-500">
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
