'use client';

import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

type User = {
	image: string;
	name: string | null | undefined;
	designation?: string;
};

export default function Logged({ image, name, designation }: User) {
	return (
		<>
			<div className="text-right inline-flex items-center  bg-white rounded-lg bg-opacity-0">
				<Menu as="div" className="relative inline-block text-left">
					<div>
						<Menu.Button className="inline-flex w-full justify-center rounded-md text-sm font-medium text-white  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
							<Image
								src={image}
								width={20}
								height={20}
								alt="User Avatar"
								className="object-contain w-6 h-6 p-px border-2 rounded-full border-ocoblue-50 hover:border-ocoblue-400"
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
						<Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
							<div className="px-1 py-1 flex flex-col text-ocoblue-700 font-semibold text-base divide-y">
								<Menu.Item>
									{({ active }) => (
										<Link
											className="flex items-center p-1 hover:rounded-md  hover:bg-ocobrown-400 hover:text-white"
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
											className="flex items-center p-1 hover:rounded-md  hover:bg-ocobrown-400 hover:text-white"
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
