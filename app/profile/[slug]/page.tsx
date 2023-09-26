'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { URL } from '@/components/types/URL';
import Link from 'next/link';
import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image';

const fetchDetails = async (slug: string) => {
	const response = await axios.get(`/api/staff/${slug}`);
	return response.data;
};

export default function Profile(url: URL) {
	const { data: user } = useQuery({
		queryKey: ['userDetails'],
		queryFn: () => fetchDetails(url.params.slug),
	});
	console.log('Authenticated', user);
	return (
		<div>
			<div className="sticky z-20 flex items-center justify-between gap-2 bg-white top-2">
				<Link
					href={`/`}
					className="text-lg bg-ocobrown-600 rounded-md flex items-center text-ocobrown-50 p-1 hover:shadow-md shadow hover:bg-ocobrown-500/70"
				>
					<Icon icon="heroicons:chevron-left" />
					<span>Dashboard</span>
				</Link>
				<div className="inline-flex items-center space-x-2"></div>
			</div>
			<div className="grid grid-cols-12 gap-4">
				<div className="col-span-4 p-4">
					<div className="bg-ocobrown-200 rounded-md flex p-4 flex-col w-full">
						<div className="w-full flex items-center justify-center">
							<Image
								width={100}
								height={100}
								quality={100}
								className="h-20 w-20 rounded-xl border-4 border-ocobrown-400"
								alt="user profile image "
								src={user?.avatarUrl}
							/>
						</div>
						<h1 className="font-bold text-ocoblue-700">{user?.name}</h1>
					</div>
				</div>
			</div>
		</div>
	);
}
