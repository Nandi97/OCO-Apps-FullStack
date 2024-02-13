'use client';
import { Menu, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Fragment, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

//Fetch All Menus
const allMenus = async () => {
	const response = await axios.get('/api/menus/get');
	return response.data;
};
export default function NavMenu() {
	const pathname = usePathname();
	const { data } = useQuery({
		queryFn: allMenus,
		queryKey: ['menus'],
	});

	return (
		<div className="text-right z-50 inline-flex items-center  bg-white rounded-lg bg-opacity-0">
			<Menu as="div" className="relative inline-block text-left">
				<div>
					<Menu.Button className="inline-flex w-full items-center justify-center rounded-md text-sm font-medium text-white  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
						<Icon
							icon="mdi:dots-grid"
							className="object-contain w-7 h-7 p-px  border-opacity-30 hover:bg-secondary-600 rounded-md"
						/>
					</Menu.Button>
				</div>
				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items className="absolute z-auto right-0 w-96 mt-2 -mr-10 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-4">
						<div className="px-1   py-1 grid md:grid-cols-5 grid-cols-3 gap-2">
							{!data
								? 'No Menu'
								: data?.map((item: any) => (
										<Menu.Item
											as="a"
											key={item?.id}
											href={item?.url}
											className={`${
												pathname === item?.url
													? 'bg-slate-200 '
													: 'text-gray-900'
											} flex flex-col items-center z-50 col-span-1 p-2 text-secondary-600 hover:bg-slate-200 rounded-md`}
										>
											<Icon
												icon={item?.icon}
												className="text-xl h-12 w-12 p-2 rounded-md bg-primary-600 text-white"
											/>
											<span className="text-xs text-center">
												{item?.name}
											</span>
										</Menu.Item>
									))}
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	);
}
