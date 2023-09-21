import { Disclosure } from '@headlessui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import PurchaseItemForm from './PurchaseItemForm';
import { Combobox } from '@headlessui/react';
import { useEffect, useState } from 'react';

type Currency = {
	id: number;
	name: string;
	initial: string;
};

type Town = {
	id: number;
	name: string;
};

interface PurchaseOrderFormProps {
	formValues: any;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	onBooleanSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	setSelectedAuthorizer: (value: any) => void;
	setSelectedTownValue: (value: any) => void;
	setPurchaseOrderItems: ([]: any) => void;
}

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ');
}

export default function PurchaseOrderForm({
	formValues,
	onChange,
	onSelectChange,
	onBooleanSelectChange,
	setSelectedAuthorizer,
	setSelectedTownValue,
	setPurchaseOrderItems,
}: PurchaseOrderFormProps) {
	const [query, setQuery] = useState('');
	const [searchParam, setSearchParam] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(97);
	const [disclosureStates, setDisclosureStates] = useState(1);
	const [purchaseItems, setPurchaseItems] = useState<any>([]);

	const { data: currencies } = useQuery<Currency[]>(['currencies'], () =>
		axios.get('/api/general/getCurrencies').then((res) => res.data)
	);

	const { data: towns } = useQuery(['towns'], () =>
		axios.get('/api/general/getTowns').then((res) => res.data)
	);

	const { data: staff } = useQuery(['unpaginatedStaff'], () =>
		axios.get('/api/staff/getAllUnpaginatedStaff').then((response) => response.data)
	);
	// console.log('Staff:', staff);
	const [selected, setSelected] = useState(staff?.[0]);
	const [selectedTown, setSelectedTown] = useState(towns?.[0]);

	const filteredStaff =
		query === ''
			? staff
			: staff?.filter((item) =>
					item.name
						.toLowerCase()
						.replace(/\s+/g, '')
						.includes(query.toLowerCase().replace(/\s+/g, ''))
			  );

	const filteredTown =
		query === ''
			? towns
			: towns?.filter((item) =>
					item.name
						.toLowerCase()
						.replace(/\s+/g, '')
						.includes(query.toLowerCase().replace(/\s+/g, ''))
			  );

	// console.log('Filtered Staff Data:', filteredStaff);
	const handleAddPurchaseItem = () => {
		const newItem = {
			description: '',
			quantity: 0,
			cost: 0,
		};
		setPurchaseItems([...purchaseItems, newItem]);
	};

	const handleRemovePurchaseItem = (index) => {
		const updatedItems = [...purchaseItems];
		updatedItems.splice(index, 1);
		setPurchaseItems(updatedItems);
	};

	const handleContinue = () => {
		console.log('Next Panel');
	};

	const handlePrevious = () => {
		console.log('Previous Panel');
	};

	const handleChangePurchaseItem = (index, event) => {
		const { name, value } = event.target;
		const updatedItems = [...purchaseItems];
		updatedItems[index][name] = value;
		setPurchaseItems(updatedItems);
	};

	useEffect(() => {
		setPurchaseOrderItems(purchaseItems);
		setSelectedAuthorizer(selected);
		setSelectedTownValue(selectedTown); // Set selectedTownValue to the value of selectedTown
	}, [
		setPurchaseOrderItems,
		purchaseItems,
		setSelectedAuthorizer,
		selected,
		setSelectedTownValue, // Add setSelectedTownValue to the dependency array
		selectedTown, // Add selectedTown to the dependency array if needed
	]);
	// console.log('Purchase Items', purchaseItems);
	// console.log('Selected', selected);
	return (
		<div>
			<Disclosure defaultOpen={true}>
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
										onChange={onSelectChange}
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
										onChange={onBooleanSelectChange}
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
										onChange={onSelectChange}
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
											type="text"
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
											type="text"
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
										htmlFor="physicalAddress"
										className="flex items-center space-x-2 text-sm font-medium text-ocoblue-700 f"
									>
										Physical Address
									</label>
									<div className="mt-1">
										<input
											type="text"
											name="physicalAddress"
											id="physicalAddress"
											value={formValues?.physicalAddress}
											onChange={onChange}
											className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
										/>
									</div>
								</div>
								{formValues?.vendorType !== 'Local' ? (
									<>
										<div className="col-span-6 md:col-span-6">
											<label
												htmlFor="city"
												className="flex items-center space-x-2 text-sm font-medium text-ocoblue-700 f"
											>
												City
											</label>
											<div className="mt-1">
												<input
													type="text"
													name="city"
													id="city"
													value={formValues?.city}
													onChange={onChange}
													className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
												/>
											</div>
										</div>
										<div className="col-span-6 md:col-span-6">
											<label
												htmlFor="country"
												className="flex items-center space-x-2 text-sm font-medium text-ocoblue-700 f"
											>
												country
											</label>
											<div className="mt-1">
												<input
													type="text"
													name="country"
													id="country"
													value={formValues?.country}
													onChange={onChange}
													className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
												/>
											</div>
										</div>
									</>
								) : (
									<>
										<div className="col-span-6 md:col-span-4">
											<label
												htmlFor="address"
												className="flex items-center space-x-2 text-sm font-medium text-ocoblue-700 f"
											>
												Postal Address
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
										<div className="col-span-6 md:col-span-4">
											<label
												htmlFor="postalCode"
												className="flex items-center space-x-2 text-sm font-medium text-ocoblue-700 f"
											>
												Postal Code
											</label>
											<div className="mt-1">
												<input
													type="text"
													name="postalCode"
													id="postalCode"
													value={formValues?.postalCode}
													onChange={onChange}
													className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
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
											<Combobox.Label className="block text-sm font-medium text-ocoblue-700">
												Town
											</Combobox.Label>
											<div className="relative mt-2">
												<Combobox.Input
													className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
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
																			? 'bg-ocobrown-600 text-white'
																			: 'text-ocoblue-900'
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
										onClick={handleContinue}
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
								<div className="flex w-full divide-solid py-2">
									<button
										type="button"
										onClick={handleAddPurchaseItem}
										className="bg-ocobrown-600 text-white text-sm flex items-center p-2 rounded-md"
									>
										<Icon icon="heroicons:plus" />{' '}
										<span> Add A Purchase Item</span>
									</button>
								</div>
								<div className="flex flex-col space-y-2">
									{purchaseItems.map((item, index) => (
										<PurchaseItemForm
											key={index}
											formValues={item}
											currencyId={formValues?.currencyId}
											onChange={(e) => handleChangePurchaseItem(index, e)}
											onClick={() => handleRemovePurchaseItem(index)}
										/>
									))}
								</div>
								<div className=" w-full flex items-center justify-center">
									<button
										type="button"
										onClick={handleContinue}
										className="flex items-center gap-2 p-2 text-sm font-medium leading-4 text-white border rounded-md shadow-sm bg-ocobrown-600 hover:opacity-80 border-ocobrown-300 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
									>
										Continue
									</button>
									<button
										type="button"
										onClick={handlePrevious}
										className="flex items-center gap-2 p-2 text-sm font-medium leading-4 text-white border rounded-md shadow-sm bg-ocoblue-600 hover:opacity-80 border-ocoblue-300 focus:outline-none focus:ring-2 focus:ring-ocoblue-500 focus:ring-offset-1"
									>
										Previous
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
									<span>3</span>
								</div>
								<div className="flex flex-col">
									<span className="text-base font-semibold text-ocoblue-600">
										Partner Approval
									</span>
									<span className="text-xs font-semibold text-ocoblue-600/70 flex items-center">
										An email will be sent to the partner for their approval
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
							<div className="border border-ocoblue-200 rounded p-4 space-y-2">
								<Combobox
									as="div"
									value={selected}
									onChange={(newSelected) => {
										// console.log('Selected staff:', newSelected);
										setSelected(newSelected);
									}}
									className="space-y-1 col-span-6 "
								>
									<Combobox.Label className="block text-sm font-medium text-ocoblue-700">
										Authorised by
									</Combobox.Label>
									<div className="relative mt-2">
										<Combobox.Input
											className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
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

										{filteredStaff?.length > 0 && (
											<Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
												{filteredStaff?.map((item) => (
													<Combobox.Option
														key={item.id}
														value={item}
														className={({ active }) =>
															classNames(
																'relative cursor-default select-none py-2 pl-3 pr-9',
																active
																	? 'bg-ocobrown-600 text-white'
																	: 'text-ocoblue-900'
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
								<div className=" w-full flex items-center justify-center">
									<button
										type="button"
										onClick={handlePrevious}
										className="flex items-center gap-2 p-2 text-sm font-medium leading-4 text-white border rounded-md shadow-sm bg-ocoblue-600 hover:opacity-80 border-ocoblue-300 focus:outline-none focus:ring-2 focus:ring-ocoblue-500 focus:ring-offset-1"
									>
										Previous
									</button>
								</div>
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
		</div>
	);
}
