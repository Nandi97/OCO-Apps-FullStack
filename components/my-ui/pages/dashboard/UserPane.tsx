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
					className="flex justify-center items-center flex-col p-4 w-full space-y-4 hover:shadow-md transition-all duration-300 hover:p-5 cursor-pointer shadow-md border border-secondary-100 rounded-md bg-secondary-50 h-full bg-clip-padding backdrop-filter backdrop-blur-md"
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
							className="h-20 w-20 p-2 rounded-full z-10"
							src={currentUser?.avatarUrl || sessionData?.user?.image || avatar}
							alt="User Image"
							quality={100}
							style={{ objectFit: 'contain' }}
						/>
					</div>
					<h1 className="font-bold text-lg">{currentUser?.name}</h1>
					<span className="font-normal text-primary-600">{currentUser?.email}</span>{' '}
				</Link>
			))}
		</>
	);
}
