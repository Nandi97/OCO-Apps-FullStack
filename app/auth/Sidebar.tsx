'use client';

import Image from 'next/image';
import OraroLogo from '@/public/assets/images/Oraro-Logo.png';
import { Fragment } from 'react';
import { Disclosure, Dialog, Transition } from '@headlessui/react';

import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Icon } from '@iconify/react';

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

//Fetch All Menus
const allMenus = async () => {
	const response = await axios.get('/api/menus/getMenus');
	return response.data;
};

export default function Sidebar({ sidebarProp }: { sidebarProp: React.ReactNode }) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [activeDisclosure, setActiveDisclosure] = useState('');
	const pathname = usePathname();

	const { data } = useQuery({
		queryFn: allMenus,
		queryKey: ['menus'],
	});

	const handleDisclosureClick = (name: string) => {
		setActiveDisclosure((prevDisclosure) => (prevDisclosure === name ? '' : name));
	};

	return (
		<>
			<Transition.Root show={sidebarOpen} as={Fragment}>
				<Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
					<Transition.Child
						as={Fragment}
						enter="transition-opacity ease-linear duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-gray-900/80" />
					</Transition.Child>

					<div className="fixed inset-0 flex">
						<Transition.Child
							as={Fragment}
							enter="transition ease-in-out duration-300 transform"
							enterFrom="-translate-x-full"
							enterTo="translate-x-0"
							leave="transition ease-in-out duration-300 transform"
							leaveFrom="translate-x-0"
							leaveTo="-translate-x-full"
						>
							<Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
								<Transition.Child
									as={Fragment}
									enter="ease-in-out duration-300"
									enterFrom="opacity-0"
									enterTo="opacity-100"
									leave="ease-in-out duration-300"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<div className="absolute left-full top-0 flex w-16 justify-center pt-5">
										<button
											type="button"
											className="-m-2.5 p-2.5"
											onClick={() => setSidebarOpen(false)}
										>
											<span className="sr-only">Close sidebar</span>
											<Icon
												icon={'heroicons:x-mark'}
												className="h-6 w-6 text-white"
												aria-hidden="true"
											/>
										</button>
									</div>
								</Transition.Child>
								{/* Sidebar component, swap this element with another sidebar if you like */}
								<div className="flex h-screen grow flex-col justify-between gap-y-5 overflow-y-auto bg-secondary-100 px-6 pb-2 shadow-lg">
									<div className="flex flex-shrink-0 items-center p-4">
										<Image
											height={64}
											width={64}
											className="h-8 w-8 object-contain"
											src={OraroLogo}
											alt="OCO Logo"
										/>
										<div className="inline-flex items-center text-xl font-medium">
											<span className="text-secondary-600">OCO</span>
											<span className="text-primary-600">Apps</span>
										</div>
									</div>
									<div className="mt-5 flex flex-grow flex-col">
										<nav className="flex-1 px-4" aria-label="Sidebar">
											{data?.map((item: any) =>
												!item?.subMenus?.length ? (
													<div key={item?.name}>
														<Link
															href={item?.url}
															className={`
										inline-flex w-full items-center space-x-2 rounded p-2 text-xs transition-all duration-500 ${
											pathname?.includes(item.url)
												? 'bg-primary-600 bg-opacity-20 text-secondary-600 hover:bg-primary-600 hover:bg-opacity-20'
												: 'hover:bg-secondary-600 hover:bg-opacity-20'
										}`}
														>
															<Icon
																icon={item?.icon}
																className="text-sm text-primary-600 xl:text-base"
															/>
															<span>{item?.name}</span>
														</Link>
													</div>
												) : (
													<Disclosure
														as="div"
														key={item.name}
														className="space-y-1 transition-all duration-300"
														defaultOpen={pathname?.includes(item?.url)}
														onChange={(isOpen) => {
															if (isOpen) {
																setActiveDisclosure(item.name);
															} else {
																setActiveDisclosure('');
															}
														}}
													>
														{({ open }) => (
															<>
																<Disclosure.Button
																	className={classNames(
																		pathname?.includes(
																			item?.url
																		)
																			? 'bg-primary-600 bg-opacity-20 text-secondary-600 hover:bg-primary-600 hover:bg-opacity-20'
																			: 'hover:bg-secondary-600 hover:bg-opacity-20',
																		'inline-flex w-full items-center justify-between rounded py-2 pl-2 pr-1 text-xs transition-all duration-500'
																	)}
																	onClick={() =>
																		handleDisclosureClick(
																			item.name
																		)
																	}
																>
																	<div className="inline-flex items-center space-x-2 ">
																		<Icon
																			icon={item?.icon}
																			className="text-sm text-primary-600 xl:text-base"
																		/>
																		<span>{item?.name}</span>
																	</div>
																	<Icon
																		icon="heroicons:chevron-right"
																		className={classNames(
																			open ||
																				pathname?.includes(
																					item?.url
																				)
																				? 'rotate-90 text-secondary-600'
																				: 'text-secondary-400',
																			'transform transition-colors duration-150 ease-in-out'
																		)}
																	/>
																</Disclosure.Button>
																<Disclosure.Panel className="space-y-1 pl-3">
																	{item?.subMenus?.map(
																		(sub_menu: any) => (
																			<Link
																				key={sub_menu?.name}
																				href={sub_menu?.url}
																				className={`${
																					pathname ===
																					sub_menu?.url
																						? 'bg-primary-600 bg-opacity-20 text-secondary-600 hover:bg-primary-600 hover:bg-opacity-20'
																						: 'hover:bg-secondary-600 hover:bg-opacity-20'
																				}
														inline-flex w-full items-center space-x-2 rounded p-2 text-xs transition-all duration-500`}
																			>
																				<Icon
																					icon={
																						sub_menu?.icon
																					}
																					className="text-sm text-primary-600 xl:text-base"
																				/>
																				<span>
																					{sub_menu?.name}
																				</span>
																			</Link>
																		)
																	)}
																</Disclosure.Panel>
															</>
														)}
													</Disclosure>
												)
											)}
										</nav>
										<div className="w-full p-4">{sidebarProp}</div>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>
			<div className="hidden lg:fixed lg:inset-y-0 lg:z-30 lg:flex lg:w-64 lg:flex-col">
				<div className="flex h-screen grow flex-col justify-between divide-y divide-primary-200 overflow-y-auto border-r border-gray-200 bg-secondary-100 px-6 shadow-lg md:col-span-3 md:flex xl:col-span-2">
					<div className="flex h-8 flex-shrink-0 items-center pb-4 pt-6">
						<Image
							height={64}
							width={64}
							className="h-8 w-8 object-contain"
							src={OraroLogo}
							alt="OCO Logo"
						/>
						<div className="inline-flex items-center text-xl font-medium">
							<span className="text-secondary-600">OCO</span>
							<span className="text-primary-600">Apps</span>
						</div>
					</div>
					<div className="mt-5 flex flex-grow flex-col pt-4">
						<nav className="flex-1 px-4" aria-label="Sidebar">
							{data?.map((item: any) =>
								!item.subMenus.length ? (
									<div key={item?.name}>
										<Link
											href={item?.url}
											className={`
										inline-flex w-full items-center space-x-2 rounded p-2 text-xs transition-all duration-500 ${
											pathname?.includes(item.url)
												? 'bg-primary-600 bg-opacity-20 text-secondary-600 hover:bg-primary-600 hover:bg-opacity-20'
												: 'hover:bg-secondary-600 hover:bg-opacity-20'
										}`}
										>
											<Icon
												icon={item?.icon}
												className="text-sm text-primary-600 xl:text-base"
											/>
											<span>{item?.name}</span>
										</Link>
									</div>
								) : (
									<Disclosure
										as="div"
										key={item.name}
										className="space-y-1 transition-all duration-300"
										defaultOpen={pathname?.includes(item?.url)}
										onChange={(isOpen) => {
											if (isOpen) {
												setActiveDisclosure(item.name);
											} else {
												setActiveDisclosure('');
											}
										}}
									>
										{({ open }) => (
											<>
												<Disclosure.Button
													className={classNames(
														pathname?.includes(item?.url)
															? 'bg-primary-600 bg-opacity-20 text-secondary-600 hover:bg-primary-600 hover:bg-opacity-20'
															: 'hover:bg-secondary-600 hover:bg-opacity-20',
														'inline-flex w-full items-center justify-between rounded py-2 pl-2 pr-1 text-xs transition-all duration-500'
													)}
													onClick={() => handleDisclosureClick(item.name)}
												>
													<div className="inline-flex items-center space-x-2 ">
														<Icon
															icon={item?.icon}
															className="text-sm text-primary-600 xl:text-base"
														/>
														<span>{item?.name}</span>
													</div>
													<Icon
														icon={'heroicons:chevron-right'}
														className={classNames(
															open || pathname?.includes(item?.url)
																? 'rotate-90 text-secondary-600'
																: 'text-secondary-400',
															'transform transition-colors duration-150 ease-in-out'
														)}
													/>
												</Disclosure.Button>
												<Disclosure.Panel className="space-y-1 pl-3">
													{item?.subMenus?.map((sub_menu: any) => (
														<Link
															key={sub_menu?.name}
															href={sub_menu?.url}
															className={`${
																pathname === sub_menu?.url
																	? 'bg-primary-600 bg-opacity-20 text-secondary-600 hover:bg-primary-600 hover:bg-opacity-20'
																	: 'hover:bg-secondary-600 hover:bg-opacity-20'
															}
														inline-flex w-full items-center space-x-2 rounded p-2 text-xs transition-all duration-500`}
														>
															<Icon
																icon={sub_menu?.icon}
																className="text-sm text-primary-600 xl:text-base"
															/>
															<span>{sub_menu?.name}</span>
														</Link>
													))}
												</Disclosure.Panel>
											</>
										)}
									</Disclosure>
								)
							)}
						</nav>
						<div className="w-full p-4">{sidebarProp}</div>
					</div>
				</div>
			</div>

			{/* Top Nav  */}
			<div className="sticky top-0 z-40 flex w-screen items-center justify-between gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
				<button
					type="button"
					className="-m-2.5 p-2.5 text-secondary-700 lg:hidden"
					onClick={() => setSidebarOpen(true)}
				>
					<span className="sr-only">Open sidebar</span>
					<Icon icon={'heroicons:bars-3'} className="h-6 w-6" aria-hidden="true" />
				</button>
				<div className="">{sidebarProp}</div>
			</div>
		</>
	);
}
