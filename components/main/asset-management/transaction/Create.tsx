import { Asset, AssetTransactionType, Staff, AssetCondition } from '@/lib/types/master';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import React, { useState, Fragment, useEffect } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface AssetTransaction {
	assetId: string;
	assetTransactionTypeId: string;
	transactionDate: string;
	fromUserId: string;
	toUserId: string;
	asset: {
		currentlyWithId: string;
		conditionId: string;
	};
}

type TransactionProps = {
	setToggle: (toggle: boolean) => void;
	assetId?: string;
};

const getConditions = async () => {
	const response = await axios.get('/api/asset/condition/get');
	return response.data as Array<AssetCondition>;
};
const getAnAsset = async (slug: string) => {
	const response = await axios.get(`/api/asset/get/${slug}`);
	return response.data;
};
const getStaff = async () => {
	const response = await axios.get('/api/staff/get');
	return response.data as Array<Staff>;
};
const getAssetTransactionTypes = async () => {
	const response = await axios.get('/api/asset/transaction-type/get');
	return response.data as Array<AssetTransactionType>;
};

const Create = ({ setToggle, assetId }: TransactionProps) => {
	const queryClient = useQueryClient();

	let toastId: string;
	const [personAssigned, setPersonAssigned] = useState<Staff>();
	const [query, setQuery] = useState('');
	const {
		register,
		watch,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<AssetTransaction>({
		mode: 'all',
	});

	const { data } = useQuery<Asset>({
		queryFn: () => getAnAsset(assetId as string),
		queryKey: ['assets', assetId],
	});

	const { data: staff } = useQuery({
		queryFn: getStaff,
		queryKey: ['all-staff'],
	});

	const { data: assetTransactionTypes } = useQuery({
		queryFn: getAssetTransactionTypes,
		queryKey: ['asset-transaction-types'],
	});
	const { data: conditions } = useQuery({
		queryFn: getConditions,
		queryKey: ['all-asset-conditions'],
	});

	const filteredPeople =
		query === ''
			? staff
			: staff?.filter((person) =>
					person?.name
						.toLowerCase()
						.replace(/\s+/g, '')
						.includes(query.toLowerCase().replace(/\s+/g, ''))
				);

	useEffect(() => {
		if (personAssigned) {
			setValue('asset.currentlyWithId', personAssigned.id);
			setValue('toUserId', personAssigned.id);
		}
		if (data) {
			setValue('fromUserId', data.currentlyWithId);
			setValue('assetId', data.id);
		}
	}, [personAssigned, setValue, data]);

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: AssetTransaction) => {
			const response = await axios.post('/api/asset/transaction/post', data);
			return response.data;
		},

		onError: (error: any) => {
			if (error instanceof AxiosError) {
				toast.error('Error Making Transaction', {
					id: toastId,
				});
			}
		},
		onSuccess: (data: any) => {
			toast.success('Transaction Successful', { id: toastId });
			queryClient.invalidateQueries({ queryKey: ['assets'] });
			setToggle(false);
		},
	});

	const handleSubmitForm: SubmitHandler<AssetTransaction> = (data) => {
		try {
			mutate(data);
			// console.log(data);
		} catch (error) {
			console.error('Error in handleSubmitForm:', error);
		}
	};

	return (
		<div className="fixed top-0 left-0 z-20 w-full -mt-20 h-full bg-secondary-700/50">
			<div className="absolute flex flex-col items-center gap-6 p-12 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg top-1/2 left-1/2">
				<button
					type="button"
					onClick={(e) => {
						e.stopPropagation();
						setToggle(false);
					}}
					className="absolute top-2 right-2"
				>
					<Icon icon="heroicons:x-mark" />
					<span className="sr-only">close</span>
				</button>
				<form className="grid grid-cols-12 gap-4" onSubmit={handleSubmit(handleSubmitForm)}>
					<div className="col-span-full py-3">
						<h1 className="text-secondary-700">Transactions for {data?.name}</h1>
					</div>
					<div className="col-span-6">
						<label htmlFor="name">
							<div className="block text-sm font-medium text-secondary-700">
								<span className="label-text">From</span>
							</div>
							<div className="mt-1">
								<input
									type="text"
									id="name"
									placeholder="Name"
									value={data?.currentlyWith?.name}
									className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500/50 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700/50 shadow-sm hover:bg-secondary-50"
									disabled
								/>
							</div>
						</label>
					</div>

					<div className="col-span-6">
						<label
							className="flex items-center space-x-2 text-sm font-medium text-secondary-700"
							htmlFor="name"
						>
							To<sup className="text-red-600">*</sup>
						</label>
						<Combobox value={personAssigned} onChange={setPersonAssigned}>
							<div className="relative mt-1">
								<div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
									<Combobox.Input
										className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
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
					<div className="col-span-6">
						<label className="flex items-center space-x-2 text-sm font-medium text-secondary-700">
							<span>
								Transaction Type<sup className="text-red-600">*</sup>
							</span>
						</label>
						<div className="mt-1">
							<select
								id="assetTransactionTypeId"
								{...register('assetTransactionTypeId')}
								className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 focus:border-secondary-500 block p-2.5 h-8 px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
							>
								{assetTransactionTypes?.map((item) => (
									<option key={item?.id} value={item?.id}>
										{item?.name}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className="col-span-6">
						<label htmlFor="transaction-date">
							<div className="block text-sm font-medium text-secondary-700">
								<span className="label-text">
									Transaction Date<sup className="text-red-600">*</sup>
								</span>
							</div>
							<div className="mt-1">
								<input
									{...register('transactionDate', { valueAsDate: true })}
									className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
									id="transaction-date"
									placeholder="Transaction Date"
									type="date"
								/>
							</div>
						</label>
					</div>

					<div className="space-y-1.5  md:col-span-4 col-span-full">
						<label className="flex items-center space-x-2 text-sm font-medium text-secondary-700">
							<span>
								Condition<sup className="text-red-600">*</sup>
							</span>
						</label>
						<select
							{...register('asset.conditionId', { required: true })}
							className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 focus:border-secondary-500 block p-2.5 h-8 px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
							defaultValue={data?.conditionId}
						>
							{conditions?.map((item) => (
								<option key={item?.id} value={item?.id}>
									{item?.name}
								</option>
							))}
						</select>
						{errors?.asset?.conditionId && (
							<p className="text-xs text-red-600 px-2">
								What Condition is the Asset?
							</p>
						)}
					</div>
					<div className="col-span-full w-full py-4 flex items-center justify-center">
						<button
							disabled={isPending ? true : false}
							type="submit"
							className="text-primary-50 bg-primary-600 text-sm p-1 rounded-md"
						>
							<span>Submit</span>
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Create;
