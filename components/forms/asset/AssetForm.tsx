import { convertToBase64 } from '@/lib/imageConverter';
import Image from 'next/image';
import AddImagePlaceholder from '@/public/assets/images/add_image_placeholder.png';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { AssetCondition, AssetType, AssetCategory, Staff } from '@/lib/types/master';
import { useQuery } from '@tanstack/react-query';
// import { AssetCategory, AssetCondition, AssetType, Staff } from '@prisma/client';
import { Combobox, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Currency } from '@/lib/types/currency';

interface AssetForm {
	name: string;
	imageUrl: string;
	description: string;
	serialNumber: string;
	ocoTagNumber: string;
	location: string;
	purchaseDate: string;
	purchasePrice: number;
	currencyId: number;
	typeId: string;
	conditionId: string;
	assetCategoryId: string;
	currentlyWithId: string;
}

const getStaff = async () => {
	const response = await axios.get('/api/staff/get');
	return response.data as Array<Staff>;
};

const getTypes = async () => {
	const response = await axios.get('/api/asset/type/get');
	return response.data as Array<AssetType>;
};

const getCategories = async () => {
	const response = await axios.get('/api/asset/category/get');
	return response.data as Array<AssetCategory>;
};

const getConditions = async () => {
	const response = await axios.get('/api/asset/condition/get');
	return response.data as Array<AssetCondition>;
};

const getCurrencies = async () => {
	const response = await axios.get('/api/currency/get');
	return response.data as Array<Currency>;
};

interface AssetFormProps {
	initialValues?: AssetForm;
	onSubmit: SubmitHandler<AssetForm>;
	isPending: boolean;
}

const AssetForm = ({ onSubmit, initialValues, isPending }: AssetFormProps) => {
	const [selectedImage, setSelectedImage] = useState<string>('');
	const [personAssigned, setPersonAssigned] = useState<Staff>();
	const [filteredType, setFilteredType] = useState<AssetCategory | null>();
	const [query, setQuery] = useState('');
	const imageRef = useRef<HTMLInputElement>(null);
	const {
		register,
		watch,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<AssetForm>({
		mode: 'all',
		defaultValues: initialValues,
	});

	const { data: types } = useQuery({
		queryFn: getTypes,
		queryKey: ['all-asset-types'],
	});

	const { data: categories } = useQuery({
		queryFn: getCategories,
		queryKey: ['all-asset-categories'],
	});

	const { data: conditions } = useQuery({
		queryFn: getConditions,
		queryKey: ['all-asset-conditions'],
	});

	const { data: staff } = useQuery({
		queryFn: getStaff,
		queryKey: ['all-staff'],
	});

	const { data: currencies } = useQuery({
		queryFn: getCurrencies,
		queryKey: ['all-currencies'],
	});

	const filterCategory = (data: string) => {
		if (data) {
			const filteredData = categories?.find((category) => category.id === data);
			setFilteredType(filteredData);
		} else {
			setFilteredType(null);
		}
	};

	const filteredPeople =
		query === ''
			? staff
			: staff?.filter((person) =>
					person?.name
						.toLowerCase()
						.replace(/\s+/g, '')
						.includes(query.toLowerCase().replace(/\s+/g, ''))
				);

	const onAssetImageSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event?.target?.files;
		if (files && files.length > 0) {
			const file = files[0];
			const base64Image = await convertToBase64(file);
			setSelectedImage(base64Image);
		}
	};

	useEffect(() => {
		if (personAssigned) {
			setValue('currentlyWithId', personAssigned.id);
		}
		if (selectedImage) {
			setValue('imageUrl', selectedImage);
		} else {
			setValue('imageUrl', '');
		}
	}, [personAssigned, setValue, selectedImage]);

	const handleSubmitForm: SubmitHandler<AssetForm> = (data) => {
		try {
			onSubmit(data);
			// console.log(data);
		} catch (error) {
			console.error('Error in handleSubmitForm:', error);
		}
	};

	return (
		<form className="flex w-full justify-center p-4" onSubmit={handleSubmit(handleSubmitForm)}>
			<div className="grid grid-cols-12 gap-2 divide-x-2">
				<div className="col-span-full md:col-span-4">
					<div className="flex w-full flex-col items-center justify-center space-y-2">
						<label htmlFor="photo" className="text-sm font-medium text-secondary-700">
							Book Cover Photo
						</label>
						<Image
							height={862}
							width={1022}
							src={initialValues?.imageUrl || selectedImage || AddImagePlaceholder}
							alt="Asset Image"
							className="border-offset-1 inline-flex aspect-[1/1] items-center justify-center overflow-hidden rounded-md border-2 border-dashed border-primary-600 bg-transparent object-contain sm:w-10 md:w-28"
						/>
						<input
							type="file"
							name="cover"
							id="coverFile"
							ref={imageRef}
							accept="image/*"
							className="hidden"
							placeholder="Book Avatar"
							onChange={onAssetImageSelected}
						/>
						<button
							onClick={() => imageRef.current?.click()}
							type="button"
							className="rounded-md border border-secondary-300 bg-secondary-500 p-1 text-sm font-medium leading-4 text-secondary-50 shadow-sm hover:bg-secondary-500/90 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-1"
						>
							Select Image
						</button>
					</div>
				</div>
				<div className="col-span-full grid w-11/12 grid-cols-6  gap-4 p-2 md:col-span-8">
					<div className="col-span-full space-y-2 md:col-span-4">
						<label htmlFor="name">
							<div className="block text-sm font-medium text-secondary-700">
								<span className="label-text">
									Asset Name<sup className="text-red-600">*</sup>
								</span>
							</div>
							<div className="mt-1">
								<input
									type="text"
									id="name"
									placeholder="Name"
									{...register('name', { required: true, min: 5 })}
									className="border-1 shadow-accent-300 block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
								/>
								{errors?.name && (
									<p className="px-2 text-xs text-red-600">
										Asset name is required
									</p>
								)}
							</div>
						</label>
					</div>
					<div className="col-span-full space-y-1.5 md:col-span-6">
						<label htmlFor="description">
							<div className="block text-sm font-medium text-secondary-700">
								<span className="label-text">
									Description<sup className="text-red-600">*</sup>
								</span>
							</div>
							<div className="mt-1">
								<textarea
									{...register('description', { required: true, min: 20 })}
									className="border-1 shadow-accent-300 block h-20 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
									id="description"
									placeholder="Description"
								/>
								{errors?.description && (
									<p className="px-2 text-xs text-red-600">
										description is required
									</p>
								)}
							</div>
						</label>
					</div>
					<div className="col-span-full space-y-1.5 md:col-span-3">
						<label htmlFor="serial-number">
							<div className="block text-sm font-medium text-secondary-700">
								<span className="label-text">Serial Number</span>
							</div>
							<div className="mt-1">
								<input
									type="text"
									{...register('serialNumber', {
										min: 1,
									})}
									className="border-1 shadow-accent-300 block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
									id="serial-number"
									placeholder="Serial Number"
								/>
							</div>
						</label>
					</div>
					<div className="col-span-full space-y-1.5 md:col-span-3">
						<label htmlFor="oco-tag-number">
							<div className="block text-sm font-medium text-secondary-700">
								<span className="label-text">
									OCO Tag Number<sup className="text-red-600">*</sup>
								</span>
							</div>
							<div className="mt-1">
								<input
									type="text"
									{...register('ocoTagNumber', {
										required: true,
										min: 1,
									})}
									className="border-1 shadow-accent-300 block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
									id="oco-tag-number"
									placeholder="OCO Tag Number"
								/>
							</div>
						</label>
					</div>
					<div className="col-span-full space-y-1.5 md:col-span-3">
						<label htmlFor="location">
							<div className="block text-sm font-medium text-secondary-700">
								<span className="label-text">Location</span>
							</div>
							<div className="mt-1">
								<input
									type="text"
									{...register('location', {
										min: 1,
									})}
									className="border-1 shadow-accent-300 block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
									id="location"
									placeholder="Location"
								/>
							</div>
						</label>
					</div>
					<div className="col-span-full  space-y-1.5 md:col-span-3">
						<label htmlFor="purchase-date">
							<div className="block text-sm font-medium text-secondary-700">
								<span className="label-text">Purchase Date</span>
							</div>
							<div className="mt-1">
								<input
									{...register('purchaseDate')}
									className="border-1 shadow-accent-300 block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
									id="purchase-date"
									placeholder="Purchase Date"
									type="date"
								/>
							</div>
						</label>
					</div>
					<div className="col-span-full space-y-1.5">
						<div className="w-3/5">
							<label
								htmlFor="price"
								className="block text-sm  font-medium leading-6 text-secondary-700"
							>
								Price
							</label>
							<div className="relative mt-1 rounded-md shadow-sm">
								<input
									type="number"
									id="price"
									{...register('purchasePrice', {
										valueAsNumber: true,
										validate: (value) => value > 0,
									})}
									step="any"
									className="border-1 shadow-accent-300  block h-8 w-full rounded-md  border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5 px-3 py-1 pl-2 pr-20  text-sm font-medium leading-4 text-secondary-700  shadow-sm shadow-secondary-300 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 focus:ring-offset-1 sm:text-sm sm:leading-6"
									placeholder="0.00"
								/>
								<div className="absolute inset-y-0 right-0 flex items-center border-l">
									<label htmlFor="currencyId" className="sr-only">
										Currency
									</label>
									<select
										id="currencyId"
										{...register('currencyId', {
											valueAsNumber: true,
											validate: (value) => value > 0,
										})}
										className="h-full rounded-r-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-0 focus:ring-inset focus:ring-primary-600 sm:text-sm"
									>
										{currencies?.map((item) => (
											<option key={item?.id} value={item?.id}>
												{item?.initial}
											</option>
										))}
									</select>
								</div>
							</div>
						</div>
					</div>
					<div className="col-span-full  space-y-1.5 md:col-span-2">
						<label className="flex items-center space-x-2 text-sm font-medium text-secondary-700">
							<span>
								Asset Category<sup className="text-red-600">*</sup>
							</span>
						</label>
						<select
							{...register('assetCategoryId', {
								required: true,
								onChange: (e) => {
									filterCategory(e.target.value);
								},
							})}
							className="border-1 shadow-accent-300 block h-8 w-full rounded-md border border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5 px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
						>
							<option
								selected
								disabled
								value=""
								className="text-secondary-700 text-opacity-50"
							>
								--Asset Category--
							</option>
							{categories?.map((item) => (
								<option key={item?.id} value={item?.id}>
									{item?.name}
								</option>
							))}
						</select>
						{errors?.assetCategoryId && (
							<p className="px-2 text-xs text-red-600">Asset Category Required</p>
						)}
					</div>
					<div className="col-span-full  space-y-1.5 md:col-span-2">
						<label className="flex items-center space-x-2 text-sm font-medium text-secondary-700">
							<span>
								Asset Type<sup className="text-red-600">*</sup>
							</span>
						</label>
						<select
							{...register('typeId', { required: true })}
							className="border-1 shadow-accent-300 block h-8 w-full rounded-md border border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5 px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
							disabled={filteredType ? false : true}
						>
							<option
								selected
								disabled
								value=""
								className="text-secondary-700 text-opacity-50"
							>
								--Asset Type--
							</option>
							{filteredType?.assetTypes?.map((item) => (
								<option key={item?.id} value={item?.id}>
									{item?.name}
								</option>
							))}
						</select>
						{errors?.typeId && (
							<p className="px-2 text-xs text-red-600">Asset Type Required</p>
						)}
					</div>

					<div className="col-span-full  space-y-1.5 md:col-span-2">
						<label className="flex items-center space-x-2 text-sm font-medium text-secondary-700">
							<span>
								Condition<sup className="text-red-600">*</sup>
							</span>
						</label>
						<select
							{...register('conditionId', { required: true })}
							className="border-1 shadow-accent-300 block h-8 w-full rounded-md border border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5 px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
						>
							<option
								selected
								disabled
								value=""
								className="text-secondary-700 text-opacity-50"
							>
								--Asset Condition--
							</option>
							{conditions?.map((item) => (
								<option key={item?.id} value={item?.id}>
									{item?.name}
								</option>
							))}
						</select>
						{errors?.conditionId && (
							<p className="px-2 text-xs text-red-600">
								What Condition is the Asset?
							</p>
						)}
					</div>

					<div className="col-span-full  space-y-1.5 md:col-span-4">
						<label className="flex items-center space-x-2 text-sm font-medium text-secondary-700">
							<span>Currently With</span>
						</label>
						<Combobox value={personAssigned} onChange={setPersonAssigned}>
							<div className="relative mt-1">
								<div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
									<Combobox.Input
										className="border-1 shadow-accent-300 block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
										displayValue={(staff: any) => staff?.name}
										onChange={(event) => setQuery(event.target.value)}
									/>
									<Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
										<Icon
											icon="heroicons:chevron-up-down"
											className="h-5 w-5 text-gray-400"
											aria-hidden="true"
										/>
									</Combobox.Button>
								</div>
								<Transition
									as={Fragment}
									leave="transition ease-in duration-100"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
									afterLeave={() => setQuery('')}
								>
									<Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
										{filteredPeople?.length === 0 && query !== '' ? (
											<div className="relative cursor-default select-none px-4 py-2 text-gray-700">
												Nothing found.
											</div>
										) : (
											filteredPeople?.map((person) => (
												<Combobox.Option
													key={person.id}
													className={({ active }) =>
														`relative cursor-default select-none py-2 pl-10 pr-4 ${
															active
																? 'bg-primary-600 text-white'
																: 'text-gray-900'
														}`
													}
													value={person}
												>
													{({ selected, active }) => (
														<>
															<span
																className={`block truncate ${
																	selected
																		? 'font-medium'
																		: 'font-normal'
																}`}
															>
																{person.name}
															</span>
															{selected ? (
																<span
																	className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
																		active
																			? 'text-white'
																			: 'text-primary-600'
																	}`}
																>
																	<Icon
																		icon="heroicons:check"
																		className="h-5 w-5"
																		aria-hidden="true"
																	/>
																</span>
															) : null}
														</>
													)}
												</Combobox.Option>
											))
										)}
									</Combobox.Options>
								</Transition>
							</div>
						</Combobox>
					</div>
				</div>
				<div className="col-span-full flex w-full items-center justify-center">
					<button
						type="submit"
						className="flex items-center space-x-2 rounded-md bg-primary-600 p-1 text-sm text-primary-50 hover:bg-primary-600/70"
					>
						<span>Submit</span>
					</button>
				</div>
			</div>
		</form>
	);
};

export default AssetForm;
