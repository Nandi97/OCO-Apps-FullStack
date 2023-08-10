'use client';

import Image from 'next/image';
import { signOut } from 'next-auth/react';

type User = {
	image: string;
	name: string | null | undefined;
	designation?: string;
};

export default function Logged({ image, name, designation }: User) {
	return (
		<>
			<div className="inline-flex items-center w-full p-2 space-x-4 bg-white rounded-lg">
				<Image
					src={image}
					width={20}
					height={20}
					alt="User Avatar"
					className="object-contain w-12 h-12 p-px border-2 rounded-full border-ocobrown-400 border-opacity-30"
				/>

				<div className="inline-flex flex-col space-y-0">
					<div className="text-xs font-normal text-ocobrown-700">{name}</div>
					<div className="font-extralight text-[10px] text-ocoblue-600">
						{designation || 'Designation'}
					</div>
				</div>
			</div>
			<button
				className="bg-gray-700 text-white text-sm px-6 py-2 rounded-md "
				onClick={() => signOut()}
			>
				Sign Out
			</button>
		</>
	);
}
