import { Disclosure } from '@headlessui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import PurchaseItemForm from './PurchaseItemForm';

type Currency = {
	id: number;
	name: string;
	initial: string;
};

interface PurchaseOrderFormProps {
	formValues: any;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	setSelectedFile: (file: File | null) => void;
	setBase64Cover: (base64: string) => void;
}

export default function PurchaseOrderForm({
	formValues,
	onChange,
	setSelectedFile,
	setBase64Cover,
}: PurchaseOrderFormProps) {
	const { data: currencies } = useQuery<Currency[]>(['currencies'], () =>
		axios.get('/api/general/getCurrencies').then((res) => res.data)
	);
	return (
		<div>
			<Disclosure>
				{({ open }) => (
					<>
						<Disclosure.Button className="flex w-full items-center justify-between rounded-lg bg-ocobrown-100 px-4 py-2 text-left text-sm font-medium text-ocobrown-900 hover:bg-ocobrown-200 focus:outline-none focus-visible:ring focus-visible:ring-ocobrown-500 focus-visible:ring-opacity-75">
							<div className="w-full flex items-center space-x-2">
								<div className="h-2 w-2 p-3 rounded-full bg-ocobrown-600 text-ocobrown-50 flex items-center justify-center">
									<span>1</span>
								</div>
								<div className="flex flex-col">
									<span className="text-base font-semibold text-ocoblue-600">
										Vendor Details
									</span>
									<span className="text-xs font-semibold text-ocoblue-600/70">
										Please Fill In All The Details
									</span>
								</div>
							</div>
							<Icon
								icon="heroicons:chevron-right"
								className={`${
									open ? 'rotate-90 transform' : ''
								} h-5 w-5 text-ocobrown-500`}
							/>
						</Disclosure.Button>
						<Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
							<div className="grid grid-cols-12 gap-2 border border-ocoblue-200 rounded p-4">
								<div className="col-span-6 space-y-1 md:col-span-4">
									<label
										htmlFor="vendorType"
										className="block text-sm font-medium text-ocoblue-700"
									>
										Vendor Type
									</label>
									<select
										id="vendorType"
										name="vendorType"
										value={formValues?.vendorType}
										className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 focus:border-ocoblue-500 block p-2.5 h-8 px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
									>
										<option
											disabled
											value=""
											className="text-opacity-50 text-ocoblue-700"
										>
											--Vendor Type--
										</option>
										<option value="Local">Local</option>
										<option value="International">International</option>
									</select>
								</div>
								<div className="col-span-6 space-y-1 md:col-span-4">
									<label
										htmlFor="vatable"
										className="block text-sm font-medium text-ocoblue-700"
									>
										Vatable
									</label>
									<select
										id="vatable"
										name="vatable"
										value={formValues?.vatable}
										className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 focus:border-ocoblue-500 block p-2.5 h-8 px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
									>
										<option
											disabled
											value=""
											className="text-opacity-50 text-ocoblue-700"
										>
											--Vatable?--
										</option>
										<option value="true">Vatable</option>
										<option value="false">Non-Vatable</option>
									</select>
								</div>
								<div className="col-span-6 space-y-1 md:col-span-4">
									<label
										htmlFor="currencyId"
										className="block text-sm font-medium text-ocoblue-700"
									>
										Billing Currency
									</label>
									<select
										id="currencyId"
										name="currencyId"
										value={formValues?.currencyId}
										className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 focus:border-ocoblue-500 block p-2.5 h-8 px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
									>
										<option
											disabled
											value=""
											className="text-opacity-50 text-ocoblue-700"
										>
											--Currency?--
										</option>
										{currencies?.map((item: any) => (
											<option key={item?.id} value={item?.id}>
												{item?.initial}
											</option>
										))}
									</select>
								</div>
								<div className="col-span-6 md:col-span-12">
									<label
										htmlFor="name"
										className="block text-sm font-medium text-ocoblue-700"
									>
										Vendors Name
									</label>
									<div className="mt-1">
										<input
											type="name"
											name="name"
											id="name"
											value={formValues?.name}
											onChange={onChange}
											className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
										/>
									</div>
								</div>
								<div className="col-span-6 md:col-span-6">
									<label
										htmlFor="email"
										className="flex items-center space-x-2 text-sm font-medium text-ocoblue-700 f"
									>
										<Icon icon="heroicons:envelope" className="text-base" />
										<span> Email Address</span>
									</label>
									<div className="mt-1">
										<input
											type="email"
											name="email"
											id="email"
											value={formValues?.email}
											onChange={onChange}
											className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
										/>
									</div>
								</div>
								<div className="col-span-6 md:col-span-6">
									<label
										htmlFor="phoneNumber"
										className="flex items-center space-x-2 text-sm font-medium text-ocoblue-700 f"
									>
										<Icon
											icon="heroicons:phone-20-solid"
											className="text-base"
										/>
										<span> Phone Number</span>
									</label>
									<div className="mt-1">
										<input
											type="tel"
											name="phoneNumber"
											id="phoneNumber"
											value={formValues?.phoneNumber}
											onChange={onChange}
											className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
										/>
									</div>
								</div>
								<div className="col-span-6 md:col-span-12">
									<label
										htmlFor="address"
										className="flex items-center space-x-2 text-sm font-medium text-ocoblue-700 f"
									>
										Physical Address
									</label>
									<div className="mt-1">
										<input
											type="text"
											name="address"
											id="address"
											value={formValues?.address}
											onChange={onChange}
											className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
										/>
									</div>
								</div>
								<div className="col-span-12 w-full flex items-center justify-center">
									<button
										type="button"
										className="flex items-center gap-2 p-2 text-sm font-medium leading-4 text-white border rounded-md shadow-sm bg-ocobrown-600 hover:opacity-80 border-ocobrown-300 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
									>
										Continue
									</button>
								</div>
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
			<Disclosure as="div" className="mt-2">
				{({ open }) => (
					<>
						<Disclosure.Button className="flex items-center w-full justify-between rounded-lg bg-ocobrown-100 px-4 py-2 text-left text-sm font-medium text-ocobrown-900 hover:bg-ocobrown-200 focus:outline-none focus-visible:ring focus-visible:ring-ocobrown-500 focus-visible:ring-opacity-75">
							<div className="w-full flex items-center space-x-2">
								<div className="h-2 w-2 p-3 rounded-full bg-ocobrown-600 text-ocobrown-50 flex items-center justify-center">
									<span>2</span>
								</div>
								<div className="flex flex-col">
									<span className="text-base font-semibold text-ocoblue-600">
										Purchased Items
									</span>
									<span className="text-xs font-semibold text-ocoblue-600/70 flex items-center">
										Click the + icon to add a new item and the
										<Icon icon="heroicons:trash-solid" /> icon to delete an item
									</span>
								</div>
							</div>
							<Icon
								icon="heroicons:chevron-right"
								className={`${
									open ? 'rotate-90 transform' : ''
								} h-5 w-5 text-ocobrown-500`}
							/>
						</Disclosure.Button>
						<Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
							<div className="border border-ocoblue-200 rounded p-4">
								<div className="flex w-full divide-solid divide-x-2">
									<button className="bg-ocobrown-600 text-white p-2 rounded-l-md">
										<Icon icon="heroicons:plus" />
									</button>
									<button className="bg-ocobrown-600 text-white p-2 rounded-r-md">
										<Icon icon="heroicons:trash" />
									</button>
								</div>
								<PurchaseItemForm
									formValues={formValues}
									onChange={onChange}
									currency={formValues?.initial}
								/>
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
		</div>
	);
}
