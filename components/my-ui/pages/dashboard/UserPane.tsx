'use client';

import Image from 'next/image';
import avatar from '@/public/assets/images/avatar_placeholder.png';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';

export default function UserPanel({ sessionData }: any) {
	const { data: staff } = useQuery({
		queryKey: ['unpaginatedStaff'],
		queryFn: () =>
			axios.get('/api/staff/getAllUnpaginatedStaff').then((response) => response.data),
	});
	const currentUserStaff = staff?.filter((staff) => staff.email === sessionData?.user?.email);

	return (
		<>
			{currentUserStaff?.map((currentUser) => (
				<Link
					href={`/profile/${currentUser.id}`}
					key={currentUser?.id}
					className="flex h-full w-full cursor-pointer flex-col items-center justify-center space-y-4 rounded-md border border-secondary-100 bg-secondary-50 bg-clip-padding p-4 shadow-md backdrop-blur-md backdrop-filter transition-all duration-300 hover:p-5 hover:shadow-md"
				>
					`
					<div
						className="h-20 w-20 rounded-full shadow-md shadow-primary-300"
						style={{
							backgroundImage: `url("https://via.placeholder.com/500")`,
						}}
					>
						<Image
							width={1000}
							height={1000}
							className="z-10 h-20 w-20 rounded-full p-2"
							src={currentUser?.avatarUrl || sessionData?.user?.image || avatar}
							alt="User Image"
							quality={100}
							style={{ objectFit: 'contain' }}
						/>
					</div>
					<h1 className="text-lg font-bold">{currentUser?.name}</h1>
					<span className="font-normal text-primary-600">{currentUser?.email}</span>{' '}
				</Link>
			))}
		</>
	);
}
