'use client';

import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { Icon } from '@iconify/react/dist/iconify.js';

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
					className="object-contain w-12 h-12 p-px border-2 rounded-full border-ocobrown-600 border-opacity-30"
				/>

				<div className="lg:inline-flex flex-col space-y-0 hidden">
					<div className="text-sm font-normal text-ocobrown-700">{name}</div>
					<div className="font-extralight text-[10px] text-ocoblue-600">
						{designation || 'Designation'}
					</div>
				</div>

				<button
					className="border-2 border-ocoblue-700 text-ocoblue-700 text-base p-1 rounded-md font-semibold"
					onClick={() => signOut()}
				>
					<Icon icon="heroicons:arrow-left-on-rectangle" />
				</button>
			</div>
		</>
	);
}
