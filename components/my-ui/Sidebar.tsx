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
	const response = await axios.get('/api/menus/getMenus');
	return response.data;
};
export default function Sidebar() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [activeDisclosure, setActiveDisclosure] = useState('');
	const pathname = usePathname();

	// const { data, isLoading } = useMenus();
	const { data, isLoading } = useQuery({
		queryFn: allMenus,
		queryKey: ['menus'],
	});
	// if (data) console.log(`Menu Items: ${data}`);

	if (isLoading) return <Loading />;

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
							<Dialog.Panel className="relative flex flex-1 w-full max-w-xs mr-16">
								<Transition.Child
									as={Fragment}
									enter="ease-in-out duration-300"
									enterFrom="opacity-0"
									enterTo="opacity-100"
									leave="ease-in-out duration-300"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<div className="absolute top-0 flex justify-center w-16 pt-5 left-full">
										<button
											type="button"
											className="-m-2.5 p-2.5"
											onClick={() => setSidebarOpen(false)}
										>
											<span className="sr-only">Close sidebar</span>
											<Icon
												icon={'heroicons:x-mark'}
												className="w-6 h-6 text-white"
												aria-hidden="true"
											/>
										</button>
									</div>
								</Transition.Child>
								{/* Sidebar component, swap this element with another sidebar if you like */}
								<div className="flex flex-col justify-between h-screen px-6 pb-2 overflow-y-auto shadow-lg grow gap-y-5 bg-ocoblue-100">
									<div className="flex items-center flex-shrink-0 p-4">
										<Image
											height={64}
											width={64}
											className="object-contain w-8 h-8"
											src={OraroLogo}
											alt="OCO Logo"
										/>
										<div className="inline-flex items-center text-xl font-medium">
											<span className="text-ocoblue-600">OCO</span>
											<span className="text-ocobrown-600">Apps</span>
										</div>
									</div>
									<div className="flex flex-col flex-grow mt-5">
										<nav className="flex-1 px-4" aria-label="Sidebar">
											{data?.map((item) =>
												!item.sub_menus.length ? (
													<div key={item?.name}>
														<Link
															href={item?.url}
															className={`
										w-full inline-flex items-center space-x-2 text-sm rounded p-2 transition-all duration-500 ${
											pathname?.includes(item.url)
												? 'bg-ocobrown-600 bg-opacity-20 text-ocoblue-600 hover:bg-ocobrown-600 hover:bg-opacity-20'
												: 'hover:bg-ocoblue-600 hover:bg-opacity-20'
										}`}
														>
															<Icon
																icon={item?.icon}
																className="text-base xl:text-xl text-ocobrown-600"
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
																			? 'bg-ocobrown-600 bg-opacity-20 text-ocoblue-600 hover:bg-ocobrown-600 hover:bg-opacity-20'
																			: 'hover:bg-ocoblue-600 hover:bg-opacity-20',
																		'w-full inline-flex items-center justify-between text-sm rounded py-2 pl-2 pr-1 transition-all duration-500'
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
																			className="text-base xl:text-xl text-ocobrown-600"
																		/>
																		<span>{item?.name}</span>
																	</div>
																	<HiChevronRight
																		className={classNames(
																			open ||
																				pathname?.includes(
																					item?.url
																				)
																				? 'text-ocoblue-600 rotate-90'
																				: 'text-ocoblue-400',
																			'transform transition-colors duration-150 ease-in-out'
																		)}
																	/>
																</Disclosure.Button>
																<Disclosure.Panel className="pl-3 space-y-1">
																	{item?.sub_menus?.map(
																		(sub_menu) => (
																			<Link
																				key={sub_menu?.name}
																				href={sub_menu?.url}
																				className={`${
																					pathname ===
																					sub_menu?.url
																						? 'bg-ocobrown-600 bg-opacity-20 text-ocoblue-600 hover:bg-ocobrown-600 hover:bg-opacity-20'
																						: 'hover:bg-ocoblue-600 hover:bg-opacity-20'
																				}
														w-full inline-flex items-center space-x-2 text-xs rounded p-2 transition-all duration-500`}
																			>
																				<Icon
																					icon={
																						sub_menu?.icon
																					}
																					className="text-base xl:text-xl text-ocobrown-600"
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
											<div className="inline-flex items-center w-full p-2 space-x-4 bg-white rounded-lg">
												<Image
													src={UserPlaceholder}
													width={20}
													height={20}
													alt="User Avatar"
													className="object-contain w-12 h-12 p-px border-2 rounded-full border-ocobrown-400 border-opacity-30"
												/>

												<div className="inline-flex flex-col space-y-0">
													<div className="text-xs font-normal text-ocobrown-700">
														John Doe
													</div>
													<div className="font-extralight text-[10px] text-ocoblue-600">
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
				<div className="flex flex-col justify-between h-screen px-6 overflow-y-auto border-r border-gray-200 shadow-lg md:flex md:col-span-3 xl:col-span-2 bg-ocoblue-100 grow">
					<div className="flex items-center flex-shrink-0 p-4">
						<Image
							height={64}
							width={64}
							className="object-contain w-8 h-8"
							src={OraroLogo}
							alt="OCO Logo"
						/>
						<div className="inline-flex items-center text-xl font-medium">
							<span className="text-ocoblue-600">OCO</span>
							<span className="text-ocobrown-600">Apps</span>
						</div>
					</div>
					<div className="flex flex-col flex-grow mt-5">
						<nav className="flex-1 px-4" aria-label="Sidebar">
							{data?.map((item) =>
								!item.sub_menus.length ? (
									<div key={item?.name}>
										<Link
											href={item?.url}
											className={`
										w-full inline-flex items-center space-x-2 text-sm rounded p-2 transition-all duration-500 ${
											pathname?.includes(item.url)
												? 'bg-ocobrown-600 bg-opacity-20 text-ocoblue-600 hover:bg-ocobrown-600 hover:bg-opacity-20'
												: 'hover:bg-ocoblue-600 hover:bg-opacity-20'
										}`}
										>
											<Icon
												icon={item?.icon}
												className="text-base xl:text-xl text-ocobrown-600"
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
															? 'bg-ocobrown-600 bg-opacity-20 text-ocoblue-600 hover:bg-ocobrown-600 hover:bg-opacity-20'
															: 'hover:bg-ocoblue-600 hover:bg-opacity-20',
														'w-full inline-flex items-center justify-between text-sm rounded py-2 pl-2 pr-1 transition-all duration-500'
													)}
													onClick={() => handleDisclosureClick(item.name)}
												>
													<div className="inline-flex items-center space-x-2 ">
														<Icon
															icon={item?.icon}
															className="text-base xl:text-xl text-ocobrown-600"
														/>
														<span>{item?.name}</span>
													</div>
													<Icon
														icon={'heroicons:chevron-right'}
														className={classNames(
															open || pathname?.includes(item?.url)
																? 'text-ocoblue-600 rotate-90'
																: 'text-ocoblue-400',
															'transform transition-colors duration-150 ease-in-out'
														)}
													/>
												</Disclosure.Button>
												<Disclosure.Panel className="pl-3 space-y-1">
													{item?.sub_menus?.map((sub_menu) => (
														<Link
															key={sub_menu?.name}
															href={sub_menu?.url}
															className={`${
																pathname === sub_menu?.url
																	? 'bg-ocobrown-600 bg-opacity-20 text-ocoblue-600 hover:bg-ocobrown-600 hover:bg-opacity-20'
																	: 'hover:bg-ocoblue-600 hover:bg-opacity-20'
															}
														w-full inline-flex items-center space-x-2 text-xs rounded p-2 transition-all duration-500`}
														>
															<Icon
																icon={sub_menu?.icon}
																className="text-base xl:text-xl text-ocobrown-600"
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
							<div className="inline-flex items-center w-full p-2 space-x-4 bg-white rounded-lg">
								<Image
									src={UserPlaceholder}
									width={20}
									height={20}
									alt="User Avatar"
									className="object-contain w-12 h-12 p-px border-2 rounded-full border-ocobrown-400 border-opacity-30"
								/>

								<div className="inline-flex flex-col space-y-0">
									<div className="text-xs font-normal text-ocobrown-700">
										John Doe
									</div>
									<div className="font-extralight text-[10px] text-ocoblue-600">
										Developer
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Top Nav  */}
			<div className="sticky top-0 z-40 flex items-center justify-between w-screen px-4 py-4 bg-white shadow-sm gap-x-6 sm:px-6 lg:hidden">
				<button
					type="button"
					className="-m-2.5 p-2.5 text-ocoblue-700 lg:hidden"
					onClick={() => setSidebarOpen(true)}
				>
					<span className="sr-only">Open sidebar</span>
					<Icon icon={'heroicons:bars-3'} className="w-6 h-6" aria-hidden="true" />
				</button>

				<Link href="#">
					<span className="sr-only">Your profile</span>
					<Image
						src={UserPlaceholder}
						width={5}
						height={5}
						alt="User Avatar"
						className="object-contain w-8 h-8 p-px border-2 rounded-full bg-gray-50 border-ocobrown-400 border-opacity-30"
					/>
				</Link>
			</div>
		</>
	);
}
