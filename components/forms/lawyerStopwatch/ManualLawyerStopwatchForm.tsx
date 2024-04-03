import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';

import { debounce } from 'lodash';

import { Icon } from '@iconify/react/dist/iconify.js';

// import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Combobox } from '@headlessui/react';

type Matter = {
	currentPage: number;
	data: {
		id: number;
		code: string;
		description: string;
		deletedAt: string | null;
		createdAt: string | null;
		updatedAt: string | null;
	}[];
	firstPageUrl: string;
	lastPage: number;
	lastPageUrl: string;
	links: {
		url: string;
		label: string;
		active: boolean;
	}[];

	nextPageUrl: string;
	path: string;
	perPage: number;
	searchParam: string;
	prevPageUrl: string;
	total: number;
	from: number;
	to: number;
};

type stopWatchItemType = {
	id: number;
	name: string;
};

interface LawyerStopwatchFormProps {
	formValues: any;
	onSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	onSelectComboChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onTextAreaChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	setToggle: (toggle: boolean) => void;
}

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ');
}

export default function AutomaticLawyerStopwatchForm({
	setToggle,
	formValues,
	onChange,
	onSelectChange,
	onSelectComboChange,
	onTextAreaChange,
}: LawyerStopwatchFormProps) {
	const [query, setQuery] = useState('');
	const [selectedMatter, setSelectedMatter] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const [searchParam, setSearchParam] = useState<string | null>(null);

	const debouncedSetQuery = debounce((value) => {
		setQuery(value);
		setCurrentPage(1); // Reset page to 1 when search changes
	}, 300);

	const { data: matters } = useQuery<Matter[]>({
		queryKey: ['matters', currentPage, perPage, searchParam],
		queryFn: () =>
			axios
				.get('/api/matters/getMatters', {
					params: { page: currentPage, perPage, searchParam },
				})
				.then((res) => res.data),
	});

	// console.log('Matters', matters);

	const { data: stopWatchItemTypes } = useQuery<stopWatchItemType[]>({
		queryKey: ['stopWatchItemTypes'],
		queryFn: () =>
			axios
				.get('/api/lawyer-stopwatch/stop-watch-item-task/getStopWatchItemTasks')
				.then((res) => res.data),
	});

	const filteredMatters =
		searchParam === null
			? matters?.data
			: matters?.data?.filter((item: any) => {
					return (
						item?.code.toLowerCase().includes(searchParam.toLowerCase()) ||
						item?.description.toLowerCase().includes(searchParam.toLowerCase())
					);
				});

	// console.log('Filtered Matters:', filteredMatters);
	const handleSelectedMatterChange = (selectedMatter) => {
		setSelectedMatter(selectedMatter);
		if (onSelectComboChange) {
			onSelectComboChange(selectedMatter.id); // Pass the selected matter's id to the parent
		}
	};

	return (
		<div>
			<div className="grid grid-cols-6 md:grid-cols-12 md:gap-4">
				<div className="col-span-12 flex w-full justify-between">
					<div className="flex items-center space-x-2 text-sm">
						<div className="flex items-center">
							<button
								type="button"
								className="rounded-md bg-primary-600 p-2  text-primary-50"
							>
								<Icon icon="heroicons:plus" />
							</button>
						</div>

						<span>Add Stop watch Item</span>
					</div>
				</div>
				{/* Stop Watch Item  */}

				<div className="relative col-span-12 grid grid-cols-6 gap-4 rounded-md border border-secondary-500/30 p-2 shadow-sm md:grid-cols-12">
					<Combobox
						as="div"
						value={selectedMatter}
						onChange={handleSelectedMatterChange}
						className="col-span-6 space-y-1 "
					>
						<Combobox.Label className="block text-sm font-medium text-secondary-700">
							Matter Code/Name
						</Combobox.Label>
						<div className="relative mt-2">
							<Combobox.Input
								className="border-1 shadow-accent-300 block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
								onChange={(event) => debouncedSetQuery(event.target.value)}
								displayValue={(matter) => matter?.code}
							/>
							<Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
								<Icon
									icon="heroicons:chevron-up-down"
									className="h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
							</Combobox.Button>

							{filteredMatters?.length > 0 && (
								<Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
									{filteredMatters?.map((matter) => (
										<Combobox.Option
											key={matter.id}
											value={matter}
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
																selected && 'font-semibold'
															)}
														>
															{matter?.code}
														</span>
														<span
															className={classNames(
																'ml-2 truncate text-gray-500',
																active
																	? 'text-indigo-200'
																	: 'text-gray-500'
															)}
														>
															{matter?.description}
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
					<div className="col-span-6 space-y-1 ">
						<label
							htmlFor="taskId"
							className="block text-sm font-medium text-secondary-700"
						>
							Task
						</label>
						<div className="mt-1">
							<select
								id="taskId"
								name="taskId"
								onChange={onSelectChange}
								value={formValues?.taskId}
								className="border-1 shadow-accent-300 block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
							>
								<option
									disabled
									value=""
									className="text-secondary-700 text-opacity-50"
								>
									--Select Task--
								</option>
								{stopWatchItemTypes?.map((item) => (
									<option
										className="h-8 border-secondary-300 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-primary-500"
										key={item.id}
										value={item.id}
									>
										{item.name}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className="col-span-12 space-y-1">
						<label
							htmlFor="narration"
							className="block text-sm font-medium text-secondary-700"
						>
							Narration
						</label>
						<div className="mt-1">
							<textarea
								name="narration"
								id="narration"
								value={formValues?.narration}
								onChange={onTextAreaChange}
								className="border-1 shadow-accent-300 block h-8 w-full rounded-md border border-secondary-300  bg-secondary-50 bg-opacity-70 p-2.5 px-3  py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm md:h-14"
							/>
						</div>
					</div>
					<div className="col-span-4 space-y-1">
						<label
							htmlFor="itemDate"
							className="block text-sm font-medium text-secondary-700"
						>
							Date
						</label>
						<div className="mt-1">
							<input
								type="date"
								name="itemDate"
								id="itemDate"
								value={formValues?.itemDate}
								onChange={onChange}
								className="border-1 shadow-accent-300  block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
							/>
						</div>
					</div>
					<div className="col-span-4 space-y-1">
						<label
							htmlFor="startedAt"
							className="block text-sm font-medium text-secondary-700"
						>
							Started At
						</label>
						<div className="mt-1">
							<input
								type="time"
								name="startedAt"
								id="startedAt"
								value={formValues?.startedAt}
								onChange={onChange}
								className="border-1 shadow-accent-300  block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
							/>
						</div>
					</div>
					<div className="col-span-4 space-y-1">
						<label
							htmlFor="endedAt"
							className="block text-sm font-medium text-secondary-700"
						>
							Ended At
						</label>
						<div className="mt-1">
							<input
								type="time"
								name="endedAt"
								id="endedAt"
								value={formValues?.endedAt}
								onChange={onChange}
								className="border-1 shadow-accent-300  block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
