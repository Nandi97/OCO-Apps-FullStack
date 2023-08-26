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

	const { data: matters } = useQuery<Matter[]>(
		['matters', currentPage, perPage, searchParam],
		() =>
			axios
				.get('/api/matters/getMatters', {
					params: { page: currentPage, perPage, searchParam },
				})
				.then((res) => res.data)
	);

	// console.log('Matters', matters);

	const { data: stopWatchItemTypes } = useQuery<stopWatchItemType[]>(['stopWatchItemTypes'], () =>
		axios
			.get('/api/lawyer-stopwatch/stop-watch-item-task/getStopWatchItemTasks')
			.then((res) => res.data)
	);

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
			<div className="grid grid-cols-6 md:gap-4 md:grid-cols-12">
				<div className="col-span-12 flex w-full justify-between">
					<div className="flex items-center space-x-2 text-sm">
						<div className="flex items-center">
							<button
								type="button"
								className="rounded-md text-ocobrown-50 bg-ocobrown-600  p-2"
							>
								<Icon icon="heroicons:plus" />
							</button>
						</div>

						<span>Add Stop watch Item</span>
					</div>
				</div>
				{/* Stop Watch Item  */}

				<div className="relative col-span-12 gap-4 grid md:grid-cols-12 grid-cols-6 border rounded-md shadow-sm border-ocoblue-500/30 p-2">
					<Combobox
						as="div"
						value={selectedMatter}
						onChange={handleSelectedMatterChange}
						className="space-y-1 col-span-6 "
					>
						<Combobox.Label className="block text-sm font-medium text-ocoblue-700">
							Matter Code/Name
						</Combobox.Label>
						<div className="relative mt-2">
							<Combobox.Input
								className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
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
					<div className="space-y-1 col-span-6 ">
						<label
							htmlFor="taskId"
							className="block text-sm font-medium text-ocoblue-700"
						>
							Task
						</label>
						<div className="mt-1">
							<select
								id="taskId"
								name="taskId"
								onChange={onSelectChange}
								value={formValues?.taskId}
								className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
							>
								<option
									disabled
									value=""
									className="text-opacity-50 text-ocoblue-700"
								>
									--Select Task--
								</option>
								{stopWatchItemTypes?.map((item) => (
									<option
										className="border-ocoblue-300 p-2.5 h-8  px-3 py-1 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocobrown-500"
										key={item.id}
										value={item.id}
									>
										{item.name}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className="space-y-1 col-span-12">
						<label
							htmlFor="narration"
							className="block text-sm font-medium text-ocoblue-700"
						>
							Narration
						</label>
						<div className="mt-1">
							<textarea
								name="narration"
								id="narration"
								value={formValues?.narration}
								onChange={onTextAreaChange}
								className="sm:text-sm w-full md:h-14 bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
							/>
						</div>
					</div>
					<div className="space-y-1 col-span-4">
						<label
							htmlFor="itemDate"
							className="block text-sm font-medium text-ocoblue-700"
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
								className="sm:text-sm w-full  bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
							/>
						</div>
					</div>
					<div className="space-y-1 col-span-4">
						<label
							htmlFor="startedAt"
							className="block text-sm font-medium text-ocoblue-700"
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
								className="sm:text-sm w-full  bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
							/>
						</div>
					</div>
					<div className="space-y-1 col-span-4">
						<label
							htmlFor="endedAt"
							className="block text-sm font-medium text-ocoblue-700"
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
								className="sm:text-sm w-full  bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
