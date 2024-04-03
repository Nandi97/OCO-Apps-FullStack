'use client';
/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import { Disclosure, Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import OraroLogo from '../../public/assets/images/Oraro-Logo.png';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { HiChevronRight } from 'react-icons/hi';
import { usePathname } from 'next/navigation';
import Loading from './loading';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import UserPlaceholder from '@/public/assets/images/avatar_placeholder.png';

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

//Fetch All Menus
const allMenus = async () => {
	const response = await axios.get('/api/menus/get');
	return response.data;
};
export default function Sidebar() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [activeDisclosure, setActiveDisclosure] = useState('');
	const pathname = usePathname();

	// const { data, isPending } = useMenus();
	const { data, isPending } = useQuery({
		queryFn: allMenus,
		queryKey: ['menus'],
	});
	// if (data) console.log(`Menu Items: ${data}`);

	if (isPending) return <Loading />;

	const handleDisclosureClick = (name: string) => {
		setActiveDisclosure((prevDisclosure) => (prevDisclosure === name ? '' : name));
	};

	// console.log(`pathname: ${pathname}`);
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
											{data?.map((item) =>
												!item.sub_menus.length ? (
													<div key={item?.name}>
														<Link
															href={item?.url}
															className={`
										inline-flex w-full items-center space-x-2 rounded p-2 text-sm transition-all duration-500 ${
											pathname?.includes(item.url)
												? 'bg-primary-600 bg-opacity-20 text-secondary-600 hover:bg-primary-600 hover:bg-opacity-20'
												: 'hover:bg-secondary-600 hover:bg-opacity-20'
										}`}
														>
															<Icon
																icon={item?.icon}
																className="text-base text-primary-600 xl:text-xl"
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
																		'inline-flex w-full items-center justify-between rounded py-2 pl-2 pr-1 text-sm transition-all duration-500'
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
																			className="text-base text-primary-600 xl:text-xl"
																		/>
																		<span>{item?.name}</span>
																	</div>
																	<HiChevronRight
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
																	{item?.sub_menus?.map(
																		(sub_menu) => (
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
																					className="text-base text-primary-600 xl:text-xl"
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
										<div className="w-full p-4">
											<div className="inline-flex w-full items-center space-x-4 rounded-lg bg-white p-2">
												<Image
													src={UserPlaceholder}
													width={20}
													height={20}
													alt="User Avatar"
													className="h-12 w-12 rounded-full border-2 border-primary-400 border-opacity-30 object-contain p-px"
												/>

												<div className="inline-flex flex-col space-y-0">
													<div className="text-xs font-normal text-primary-700">
														John Doe
													</div>
													<div className="text-[10px] font-extralight text-secondary-600">
														Developer
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>
			<div className="hidden lg:fixed lg:inset-y-0 lg:z-30 lg:flex lg:w-64 lg:flex-col">
				<div className="flex h-screen grow flex-col justify-between overflow-y-auto border-r border-gray-200 bg-secondary-100 px-6 shadow-lg md:col-span-3 md:flex xl:col-span-2">
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
							{data?.map((item) =>
								!item.sub_menus.length ? (
									<div key={item?.name}>
										<Link
											href={item?.url}
											className={`
										inline-flex w-full items-center space-x-2 rounded p-2 text-sm transition-all duration-500 ${
											pathname?.includes(item.url)
												? 'bg-primary-600 bg-opacity-20 text-secondary-600 hover:bg-primary-600 hover:bg-opacity-20'
												: 'hover:bg-secondary-600 hover:bg-opacity-20'
										}`}
										>
											<Icon
												icon={item?.icon}
												className="text-base text-primary-600 xl:text-xl"
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
														'inline-flex w-full items-center justify-between rounded py-2 pl-2 pr-1 text-sm transition-all duration-500'
													)}
													onClick={() => handleDisclosureClick(item.name)}
												>
													<div className="inline-flex items-center space-x-2 ">
														<Icon
															icon={item?.icon}
															className="text-base text-primary-600 xl:text-xl"
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
													{item?.sub_menus?.map((sub_menu) => (
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
																className="text-base text-primary-600 xl:text-xl"
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
						<div className="w-full p-4">
							<div className="inline-flex w-full items-center space-x-4 rounded-lg bg-white p-2">
								<Image
									src={UserPlaceholder}
									width={20}
									height={20}
									alt="User Avatar"
									className="h-12 w-12 rounded-full border-2 border-primary-400 border-opacity-30 object-contain p-px"
								/>

								<div className="inline-flex flex-col space-y-0">
									<div className="text-xs font-normal text-primary-700">
										John Doe
									</div>
									<div className="text-[10px] font-extralight text-secondary-600">
										Developer
									</div>
								</div>
							</div>
						</div>
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

				<Link href="#">
					<span className="sr-only">Your profile</span>
					<Image
						src={UserPlaceholder}
						width={5}
						height={5}
						alt="User Avatar"
						className="h-8 w-8 rounded-full border-2 border-primary-400 border-opacity-30 bg-gray-50 object-contain p-px"
					/>
				</Link>
			</div>
		</>
	);
}
