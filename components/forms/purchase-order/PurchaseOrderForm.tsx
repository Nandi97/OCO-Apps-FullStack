'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from '@/components/ui/Accordion ';
import axios from 'axios';
import { Town } from '@/lib/types/town';
import { useQuery } from '@tanstack/react-query';
import { useState, Fragment } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Currency } from '@/lib/types/currency';
import { Combobox, Transition } from '@headlessui/react';
import PurchaseItemForm from './PurchaseItemForm';
import { Staff } from '@/lib/types/staff';
import { Tax } from '@/lib/types/tax';

interface POItem {
	description: string;
	quantity: string;
	cost: string;
}

interface POForm {
	type: number;
	taxId: boolean;
	currencyId: number;
	name: string;
	email: string;
	phoneNumber: string;
	physicalAddress: string;
	postalAddress: string;
	postalCode: string;
	townId: number;
	city: string;
	country: string;
	approverId: string;
	purchaseItems: POItem[];
}

interface POFormProps {
	onSubmit: SubmitHandler<POForm>;
	initialValues?: POForm;
	isPending: boolean;
}

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ');
}

const fetchAllTowns = async () => {
	const response = await axios.get('/api/town/get');
	return response.data as Array<Town>;
};
const fetchAllCurrencies = async () => {
	const response = await axios.get('/api/currency/get');
	return response.data as Array<Currency>;
};

const fetchAllStaff = async () => {
	const response = await axios.get('/api/staff/get');
	return response.data as Array<Staff>;
};

const fetchAllTax = async () => {
	const response = await axios.get('/api/tax/get');
	return response.data as Array<Tax>;
};

export default function PurchaseOrderForm({ onSubmit, initialValues, isPending }: POFormProps) {
	const [accValue, setAccValue] = useState('one');
	const [vendorType, setVendorType] = useState('1');
	const [query, setQuery] = useState('');
	const [selectedTown, setSelectedTown] = useState<Town>();
	const [selectedStaff, setSelectedStaff] = useState<Staff>();
	const [purchaseOrderItems, setPurchaseOrderItems] = useState<any>([]);
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<POForm>({
		defaultValues: initialValues,
	});
	const { data: towns } = useQuery({
		queryFn: fetchAllTowns,
		queryKey: ['towns'],
	});
	const { data: currencies } = useQuery({
		queryFn: fetchAllCurrencies,
		queryKey: ['currencies'],
	});
	const { data: staff } = useQuery({
		queryFn: fetchAllStaff,
		queryKey: ['allStaff'],
	});

	const { data: tax } = useQuery({
		queryFn: fetchAllTax,
		queryKey: ['tax'],
	});
	const handleContinueClick = (newValue: string) => {
		setAccValue(newValue);
	};

	const filteredTown =
		query === ''
			? towns
			: towns?.filter((item) =>
					item.name
						.toLowerCase()
						.replace(/\s+/g, '')
						.includes(query.toLowerCase().replace(/\s+/g, ''))
				);

	const filteredStaff = (data: any) => {
		const filteredData = query
			? data.filter((item) => item?.name.toLowerCase().includes(query.toLowerCase()))
			: data;

		return filteredData;
	};
	const handleAddPOItem = (newPOItem: any) => {
		const newItem = {
			key: purchaseOrderItems.length + 1,
			...newPOItem,
		};
		setPurchaseOrderItems([...purchaseOrderItems, newItem]);
	};

	const handleRemovePOItem = (key: any) => {
		const updatedServices = purchaseOrderItems.filter((item) => item.key !== key);
		setPurchaseOrderItems(updatedServices);
	};
	const watchAllFields: POForm = watch();
	const selectedCurrency = currencies?.find(
		(currency) => currency.id === parseInt(watchAllFields?.currencyId)
	)?.initial;

	const handleSubmitForm: SubmitHandler<POForm> = (data) => {
		try {
			console.log(data);
			// onSubmit(data);
		} catch (error) {
			console.error('Error in handleSubmitForm:', error);
		}
	};
	return (
		<div className="grid md:grid-cols-6 grid-cols-1 w-full">
			<form className="md:col-span-3 col-span-1" onSubmit={handleSubmit(handleSubmitForm)}>
				<Accordion
					type="single"
					value={accValue}
					collapsible
					className="w-full p-2"
					defaultValue="one"
				>
					<AccordionItem value="one">
						<AccordionTrigger
							className="[&[data-state=open]>div>div]:bg-primary-600"
							onClick={() => handleContinueClick('one')}
						>
							<div className="flex items-center space-x-3">
								<div className="bg-secondary-200 text-white flex items-center justify-center text-xs p-2 h-4 w-4 rounded-full ">
									1
								</div>

								<span className="text-base font-semibold text-slate-700">
									<span className="w-full flex items-start">Vendor Details</span>
									<span className="text-xs font-semibold text-slate-700/70 flex items-center">
										Please fill in all the details
									</span>
								</span>
							</div>
						</AccordionTrigger>
						<AccordionContent>
							<div className="grid grid-cols-12 gap-2 border border-secondary-200 rounded p-4">
								<div className="col-span-6 space-y-1 md:col-span-4">
									<label
										htmlFor="vendorType"
										className="block text-sm font-medium text-secondary-700"
									>
										Vendor Type
									</label>
									<select
										id="vendorType"
										value={vendorType}
										onChange={(e) => setVendorType(e.target.value)}
										className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 focus:border-secondary-500 block p-2.5 h-8 px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
									>
										<option
											selected
											disabled
											value=""
											className="text-opacity-50 text-secondary-700"
										>
											--Vendor Type--
										</option>
										<option value={1}>Local</option>
										<option value={2}>International</option>
									</select>
								</div>
								<div className="col-span-6 space-y-1 md:col-span-4">
									<label
										htmlFor="vatable"
										className="block text-sm font-medium text-secondary-700"
									>
										Vatable
									</label>
									<select
										id="vatable"
										{...register('taxId', { required: true })}
										className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 focus:border-secondary-500 block p-2.5 h-8 px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
									>
										<option
											selected
											disabled
											value=""
											className="text-opacity-50 text-secondary-700"
										>
											--Vatable?--
										</option>
										{tax?.map((item: Tax) => (
											<option key={item?.id} value={item?.id}>
												{item?.description}
											</option>
										))}
									</select>
								</div>
								<div className="col-span-6 space-y-1 md:col-span-4">
									<label
										htmlFor="currencyId"
										className="block text-sm font-medium text-secondary-700"
									>
										Billing Currency
									</label>
									<select
										id="currencyId"
										{...register('currencyId', { required: true })}
										className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 focus:border-secondary-500 block p-2.5 h-8 px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
									>
										<option
											selected
											disabled
											value=""
											className="text-opacity-50 text-secondary-700"
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
										className="block text-sm font-medium text-secondary-700"
									>
										Vendors Name
									</label>
									<div className="mt-1">
										<input
											type="text"
											id="name"
											{...register('name', { required: true })}
											className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
										/>
									</div>
								</div>
								<div className="col-span-6 md:col-span-6">
									<label
										htmlFor="email"
										className="flex items-center space-x-2 text-sm font-medium text-secondary-700 f"
									>
										<Icon icon="heroicons:envelope" className="text-base" />
										<span> Email Address</span>
									</label>
									<div className="mt-1">
										<input
											type="text"
											id="email"
											{...register('email', { required: true })}
											className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
										/>
									</div>
								</div>
								<div className="col-span-6 md:col-span-6">
									<label
										htmlFor="phoneNumber"
										className="flex items-center space-x-2 text-sm font-medium text-secondary-700 f"
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
											id="phoneNumber"
											{...register('phoneNumber', { required: true })}
											className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
										/>
									</div>
								</div>
								<div className="col-span-6 md:col-span-12">
									<label
										htmlFor="physicalAddress"
										className="flex items-center space-x-2 text-sm font-medium text-secondary-700 f"
									>
										Physical Address
									</label>
									<div className="mt-1">
										<input
											type="text"
											id="physicalAddress"
											{...register('physicalAddress', { required: true })}
											className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
										/>
									</div>
								</div>
								{vendorType !== '1' ? (
									<>
										<div className="col-span-6 md:col-span-6">
											<label
												htmlFor="city"
												className="flex items-center space-x-2 text-sm font-medium text-secondary-700 f"
											>
												City
											</label>
											<div className="mt-1">
												<input
													type="text"
													id="city"
													{...register('city', { required: true })}
													className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
												/>
											</div>
										</div>
										<div className="col-span-6 md:col-span-6">
											<label
												htmlFor="country"
												className="flex items-center space-x-2 text-sm font-medium text-secondary-700 f"
											>
												country
											</label>
											<div className="mt-1">
												<input
													type="text"
													id="country"
													{...register('country', { required: true })}
													className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
												/>
											</div>
										</div>
									</>
								) : (
									<>
										<div className="col-span-6 md:col-span-4">
											<label
												htmlFor="address"
												className="flex items-center space-x-2 text-sm font-medium text-secondary-700 f"
											>
												Postal Address
											</label>
											<div className="mt-1">
												<input
													type="text"
													id="address"
													{...register('postalAddress', {
														required: true,
													})}
													className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
												/>
											</div>
										</div>
										<div className="col-span-6 md:col-span-4">
											<label
												htmlFor="postalCode"
												className="flex items-center space-x-2 text-sm font-medium text-secondary-700 f"
											>
												Postal Code
											</label>
											<div className="mt-1">
												<input
													type="text"
													id="postalCode"
													{...register('postalCode', { required: true })}
													className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
												/>
											</div>
										</div>
										<Combobox
											as="div"
											value={selectedTown}
											onChange={(newSelectedTown) => {
												console.log('Selected Town:', newSelectedTown);
												setSelectedTown(newSelectedTown);
											}}
											className="space-y-1 col-span-4"
										>
											<Combobox.Label className="block text-sm font-medium text-secondary-700">
												Town
											</Combobox.Label>
											<div className="relative mt-2">
												<Combobox.Input
													className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
													onChange={(event) =>
														setQuery(event.target.value)
													}
													displayValue={(item) => item?.name}
												/>
												<Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
													<Icon
														icon="heroicons:chevron-up-down"
														className="h-5 w-5 text-gray-400"
														aria-hidden="true"
													/>
												</Combobox.Button>

												{filteredTown?.length > 0 && (
													<Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
														{filteredTown?.map((item) => (
															<Combobox.Option
																key={item.id}
																value={item}
																className={({ active }) =>
																	classNames(
																		'relative cursor-default select-none py-2 pl-3 pr-9',
																		active
																			? 'bg-primary-600 text-white'
																			: 'text-secondary-900'
																	)
																}
															>
																{({ active, selected }) => (
																	<>
																		<div className="flex">
																			<span
																				className={classNames(
																					'truncate',
																					selected &&
																						'font-semibold'
																				)}
																			>
																				{item?.name}
																			</span>
																		</div>

																		{selected && (
																			<span
																				className={classNames(
																					'absolute inset-y-0 right-0 flex items-center pr-4',
																					active
																						? 'text-white'
																						: 'text-indigo-600'
																				)}
																			>
																				<Icon
																					icon="heroicons:check"
																					className="h-5 w-5"
																					aria-hidden="true"
																				/>
																			</span>
																		)}
																	</>
																)}
															</Combobox.Option>
														))}
													</Combobox.Options>
												)}
											</div>
										</Combobox>
									</>
								)}
								<div className="col-span-12 w-full flex items-center justify-center">
									<button
										type="button"
										onClick={() => handleContinueClick('two')}
										className="flex items-center gap-2 p-2 text-sm font-medium leading-4 text-white border rounded-md shadow-sm bg-primary-600 hover:opacity-80 border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
									>
										Continue
									</button>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="two">
						<AccordionTrigger
							className="[&[data-state=open]>div>div]:bg-primary-600"
							onClick={() => handleContinueClick('two')}
						>
							<div className="flex items-center space-x-3">
								<div className="bg-secondary-200 text-white flex items-center justify-center text-xs p-2 h-4 w-4 rounded-full ">
									2
								</div>

								<span className="text-base font-semibold text-slate-700">
									<span className="w-full flex items-start">Purchased Items</span>
									<span className="text-xs font-semibold text-slate-700/70 flex items-center">
										Click the + icon to add a new item and the
										<Icon icon="heroicons:trash-solid" /> icon to delete an item
									</span>
								</span>
							</div>
						</AccordionTrigger>
						<AccordionContent>
							<div className="flex flex-col border rounded-b-lg bg-primary-50 p-4">
								<div className="flex w-full divide-solid py-2">
									<PurchaseItemForm
										addPOItem={handleAddPOItem}
										currency={selectedCurrency as string}
									/>
								</div>
								<div className="w-full flex flex-col space-y-3">
									<table className="w-full table-auto text-sm text-left rtl:text-right text-gray-500 border">
										<thead className="text-xs text-gray-700 uppercase bg-primary-300">
											<tr>
												<th scope="col" className="px-6 py-3">
													#
												</th>
												<th scope="col" className="px-6 py-3">
													Description
												</th>
												<th scope="col" className="px-6 py-3">
													Quantity
												</th>
												<th scope="col" className="px-6 py-3">
													Cost
												</th>
												<th scope="col" className="px-6 py-3"></th>
											</tr>
										</thead>
										<tbody>
											{purchaseOrderItems?.map((item) => (
												<tr key={item?.key} className="bg-white border-b">
													<th
														scope="row"
														className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
													>
														{item?.key}
													</th>
													<td className="px-6 py-4">
														{item?.description}
													</td>
													<td className="px-6 py-4">{item?.quantity}</td>
													<td className="px-6 py-4">
														{item?.cost} {selectedCurrency}
													</td>
													<td className="px-6 py-4">
														<button
															onClick={() =>
																handleRemovePOItem(item?.key)
															}
															type="button"
														>
															<Icon icon="heroicons:trash" />
														</button>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
								<div className="w-full flex items-center py-2 justify-center">
									<button
										type="button"
										onClick={() => handleContinueClick('three')}
										className="flex items-center gap-2 p-2 text-sm font-medium leading-4 text-white border rounded-md shadow-sm bg-primary-600 hover:opacity-80 border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
									>
										Continue
									</button>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="three">
						<AccordionTrigger
							className="[&[data-state=open]>div>div]:bg-primary-600"
							onClick={() => handleContinueClick('three')}
						>
							<div className="flex items-center space-x-3">
								<div className="bg-secondary-200 text-white flex items-center justify-center text-xs p-2 h-4 w-4 rounded-full ">
									3
								</div>

								<span className="text-base font-semibold text-slate-700">
									<span className="w-full flex items-start">
										Partner Approval
									</span>
									<span className="text-xs font-semibold text-slate-700/70 flex items-center">
										An email will be sent to the partner for their approval
									</span>
								</span>
							</div>
						</AccordionTrigger>
						<AccordionContent>
							<div className="flex flex-col border rounded-b-lg bg-primary-50 p-4">
								<div className="flex w-full items-center justify-center divide-solid py-2">
									<Combobox
										as="div"
										value={selectedStaff}
										onChange={setSelectedStaff}
										className="space-y-1 w-2/3"
									>
										<Combobox.Label className="block text-sm font-medium text-secondary-700">
											To be Authorized by
										</Combobox.Label>
										<div className="relative mt-2">
											<Combobox.Input
												className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
												onChange={(event) => setQuery(event.target.value)}
												displayValue={(item) => item?.name}
											/>
											<Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
												<Icon
													icon="heroicons:chevron-up-down"
													className="h-5 w-5 text-gray-400"
													aria-hidden="true"
												/>
											</Combobox.Button>
											<Transition
												as={Fragment}
												leave="transition ease-in duration-100"
												leaveFrom="opacity-100"
												leaveTo="opacity-0"
												afterLeave={() => setQuery('')}
											>
												<Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
													{filteredStaff(staff)?.map((item) => (
														<Combobox.Option
															key={item.id}
															value={item}
															className={({ active }) =>
																classNames(
																	'relative cursor-default select-none py-2 pl-3 pr-9',
																	active
																		? 'bg-primary-600 text-white'
																		: 'text-secondary-900'
																)
															}
														>
															{({ active, selected }) => (
																<>
																	<div className="flex">
																		<span
																			className={classNames(
																				'truncate',
																				selected &&
																					'font-semibold'
																			)}
																		>
																			{item?.name}
																		</span>
																	</div>

																	{selected && (
																		<span
																			className={classNames(
																				'absolute inset-y-0 right-0 flex items-center pr-4',
																				active
																					? 'text-white'
																					: 'text-indigo-600'
																			)}
																		>
																			<Icon
																				icon="heroicons:check"
																				className="h-5 w-5"
																				aria-hidden="true"
																			/>
																		</span>
																	)}
																</>
															)}
														</Combobox.Option>
													))}
												</Combobox.Options>
											</Transition>
										</div>
									</Combobox>
								</div>
								<div className="w-full flex items-center py-2 justify-center">
									<button
										type="submit"
										className={`flex ${
											isPending
												? 'bg-slate-600 text-white'
												: 'bg-primary-600 text-white hover:bg-primary-600/90 hover:opacity-80 border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1'
										} items-center gap-2 p-2 text-sm font-medium leading- border rounded-md shadow-sm  `}
										disabled={isPending ? true : false}
									>
										Save and Continue
									</button>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</form>
		</div>
	);
}
