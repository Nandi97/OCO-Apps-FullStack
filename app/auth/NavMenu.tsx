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
		<div className="z-50 inline-flex items-center rounded-lg  bg-white bg-opacity-0 text-right">
			<Menu as="div" className="relative inline-block text-left">
				<div>
					<Menu.Button className="inline-flex w-full items-center justify-center rounded-md text-sm font-medium text-white  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
						<Icon
							icon="mdi:dots-grid"
							className="h-7 w-7 rounded-md border-opacity-30  object-contain p-px hover:bg-secondary-600"
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
					<Menu.Items className="absolute right-0 z-auto -mr-10 mt-2 w-96 origin-top-right divide-y divide-gray-100 rounded-md bg-white p-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
						<div className="grid   grid-cols-3 gap-2 px-1 py-1 md:grid-cols-5">
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
											} z-50 col-span-1 flex flex-col items-center rounded-md p-2 text-secondary-600 hover:bg-slate-200`}
										>
											<Icon
												icon={item?.icon}
												className="h-12 w-12 rounded-md bg-primary-600 p-2 text-xl text-white"
											/>
											<span className="text-center text-xs">
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
