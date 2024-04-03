'use client';

import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

type User = {
	image: string;
	name: string | null | undefined;
	designation?: string;
};

export default function Logged({ image, name, designation }: User) {
	return (
		<>
			<div className="inline-flex items-center rounded-lg  bg-white bg-opacity-0 text-right">
				<Menu as="div" className="relative inline-block text-left">
					<div>
						<Menu.Button className="inline-flex w-full items-center justify-center rounded-md text-sm font-medium text-white  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
							{!image ? (
								<span className="inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-secondary-500 bg-secondary-50 text-secondary-500 hover:bg-secondary-500 hover:text-secondary-50">
									<span className="font-sm leading-none ">
										{name
											?.split(' ')
											.map((n) => n[0])
											.join('')}
									</span>
								</span>
							) : (
								<Image
									src={image}
									width={20}
									height={20}
									alt="User Avatar"
									className="h-6 w-6 rounded-full border-2 border-secondary-50 object-contain p-px hover:border-secondary-400"
								/>
							)}
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
						<Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
							<div className="flex flex-col divide-y px-1 py-1 text-base font-semibold text-secondary-700">
								<Menu.Item>
									{({ active }) => (
										<Link
											className="flex items-center p-1 hover:rounded-md  hover:bg-primary-400 hover:text-white"
											href={`/${name}`}
										>
											My Profile{' '}
										</Link>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<button
											type="button"
											className="flex items-center justify-between p-1 hover:rounded-md hover:bg-primary-400 hover:text-white"
											onClick={() => signOut()}
										>
											<span>Sign Out</span>
											<Icon icon="heroicons:arrow-left-on-rectangle" />
										</button>
									)}
								</Menu.Item>
							</div>
						</Menu.Items>
					</Transition>
				</Menu>
			</div>
		</>
	);
}
