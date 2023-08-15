import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Combobox, Switch, Transition } from '@headlessui/react';
import { debounce } from 'lodash';
import { Icon } from '@iconify/react/dist/iconify.js';

interface LawyerStopwatchFormProps {
	formValues: any;
	onSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onTextAreaChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

type Matter = {
	id: number;
	code: string;
	description: string;
};

type stopWatchItemType = {
	id: number;
	name: string;
};

export default function LawyerStopwatchForm({
	formValues,
	onChange,
	onSelectChange,
	onTextAreaChange,
}: LawyerStopwatchFormProps) {
	const [showTimeInputs, setShowTimeInputs] = useState(false);
	const [selectedMatter, setSelectedMatter] = useState<Matter | null>(null);
	const [query, setQuery] = useState('');
	const [stopwatchItems, setStopwatchItems] = useState([{ showTimeInputs: false }]);

	useEffect(() => {
		// setStopwatchItems(1);
	}, []);

	const { data: matters } = useQuery<Matter[]>(['matters'], () =>
		axios.get('/api/matters/getMatters').then((res) => res.data)
	);

	const { data: stopWatchItemTypes } = useQuery<stopWatchItemType[]>(['stopWatchItemTypes'], () =>
		axios
			.get('/api/lawyer-stopwatch/stop-watch-item-task/getStopWatchItemTasks')
			.then((res) => res.data)
	);

	const filteredMatters =
		query === ''
			? matters || []
			: (matters || []).filter(
					(matter) =>
						matter.code.toLowerCase().includes(query.toLowerCase()) ||
						matter.description.toLowerCase().includes(query.toLowerCase())
			  );

	const [page, setPage] = useState(1);
	const itemsPerPage = 10; // You can adjust this value

	const handleQueryChange = debounce((newQuery) => {
		setQuery(newQuery);
		setPage(1);
	}, 300); // Adjust the debounce delay as needed

	const startIndex = (page - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	const paginatedMatters = filteredMatters.slice(startIndex, endIndex);

	const handleComboboxChange = (value) => {
		setSelectedMatter(value);
		if (value) {
			onChange({
				target: {
					name: 'matterId',
					value: value.id,
				},
			});
		}
	};

	const handleAddStopWatchItem = () => {
		console.log('Add Stop Watch Item');
		setStopwatchItems((prevItems) => [...prevItems, { showTimeInputs: false }]);
	};

	const handleRemoveStopWatchItem = (index) => {
		console.log('Remove Stop Watch Item');
		if (stopwatchItems.length > 1) {
			setStopwatchItems((prevItems) => prevItems.filter((_, i) => i !== index));
		}
	};

	return (
		<div>
			<div className="grid grid-cols-6 md:gap-4 md:grid-cols-12">
				<div className="col-span-12">
					<div className="flex items-center space-x-2 text-sm">
						<div className="flex items-center">
							<button
								type="button"
								onClick={handleAddStopWatchItem}
								className="rounded-md text-ocobrown-50 bg-ocobrown-600  p-2"
							>
								<Icon icon="heroicons:plus" />
							</button>
						</div>

						<span>Add Stop watch Item</span>
					</div>
				</div>
				{/* Stop Watch Item  */}

				{stopwatchItems?.map((item, index) => (
					<div
						key={index}
						className="relative col-span-6 gap-4 grid md:grid-cols-12 grid-cols-6 border rounded-md shadow-sm border-ocoblue-500/30 p-2"
					>
						<button
							type="button"
							onClick={() => handleRemoveStopWatchItem(index)}
							className="absolute bottom-3 right-2.5 rounded-md text-ocobrown-50 bg-ocoblue-600  p-1"
						>
							<Icon icon="heroicons:trash" />
						</button>
						<div className="space-y-1 col-span-6 ">
							<label
								htmlFor="staff member"
								className="block text-sm font-medium text-ocoblue-700"
							>
								Matter Code/Name
							</label>
							<Combobox value={selectedMatter} onChange={handleComboboxChange}>
								<div className="relative w-full">
									<Combobox.Input
										className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 focus:border-ocoblue-500 block p-2.5 h-8 px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
										placeholder="--Matter Code/Name--"
										onChange={(e) => handleQueryChange(e.target.value)}
									/>
									<Combobox.Options
										as={Transition}
										enter="transition ease-out duration-100"
										enterFrom="opacity-0"
										enterTo="opacity-100"
										leave="transition ease-in duration-75"
										leaveFrom="opacity-100"
										leaveTo="opacity-0"
									>
										{paginatedMatters.length === 0 && query !== '' ? (
											<div className="px-3 py-2 bg-white border shadow-sm">
												Nothing found.
											</div>
										) : (
											paginatedMatters.map((matter) => (
												<Combobox.Option
													key={matter.id}
													value={matter}
													className={({ active }) =>
														`relative cursor-default select-none py-2 pl-10 pr-4 ${
															active ? 'bg-ocobrown-200' : ''
														}`
													}
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
																{matter.code}: {matter.description}
															</span>
															{selected ? (
																<span
																	className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
																		active
																			? 'text-white'
																			: 'text-ocobrown-600'
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
								</div>
							</Combobox>
						</div>
						<div className="space-y-1 col-span-6 ">
							<label
								htmlFor="task"
								className="block text-sm font-medium text-ocoblue-700"
							>
								Task
							</label>
							<div className="mt-1">
								<select
									id="task"
									name="task"
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
								htmlFor="task"
								className="block text-sm font-medium text-ocoblue-700"
							>
								Task
							</label>
							<div className="mt-1">
								<textarea
									name="name"
									id="name"
									value={formValues?.narration}
									onChange={onTextAreaChange}
									className="sm:text-sm w-full md:h-14 bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
								/>
							</div>
						</div>
						<div
							className={`space-y-1 col-span-4  ${
								item.showTimeInputs ? '' : 'hidden'
							}`}
						>
							<label
								htmlFor="task"
								className="block text-sm font-medium text-ocoblue-700"
							>
								Date
							</label>
							<div className="mt-1">
								<input
									type="date"
									name="name"
									id="name"
									value={formValues?.createdAt}
									onChange={onChange}
									className="sm:text-sm w-full  bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
								/>
							</div>
						</div>
						<div
							className={`space-y-1 col-span-4  ${
								item.showTimeInputs ? '' : 'hidden'
							}`}
						>
							<label
								htmlFor="task"
								className="block text-sm font-medium text-ocoblue-700"
							>
								Started At
							</label>
							<div className="mt-1">
								<input
									type="time"
									name="name"
									id="name"
									value={formValues?.startedAt}
									onChange={onChange}
									className="sm:text-sm w-full  bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
								/>
							</div>
						</div>
						<div
							className={`space-y-1 col-span-4  ${
								item.showTimeInputs ? '' : 'hidden'
							}`}
						>
							<label
								htmlFor="task"
								className="block text-sm font-medium text-ocoblue-700"
							>
								Ended At
							</label>
							<div className="mt-1">
								<input
									type="time"
									name="name"
									id="name"
									value={formValues?.endedAt}
									onChange={onChange}
									className="sm:text-sm w-full  bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
								/>
							</div>
						</div>

						<div className="space-y-1 col-span-6 ">
							<label
								htmlFor={`showTimeInputs-${index}`}
								className="block text-sm font-medium text-ocoblue-700"
							>
								{item.showTimeInputs
									? 'Disable Manual Entry'
									: ' Toggle Manual Entry'}
							</label>
							<Switch
								id={`showTimeInputs-${index}`}
								checked={item.showTimeInputs}
								onChange={() =>
									setStopwatchItems((prevItems) =>
										prevItems.map((prevItem, i) =>
											i === index
												? {
														...prevItem,
														showTimeInputs: !prevItem.showTimeInputs,
												  }
												: prevItem
										)
									)
								}
								className={`${
									item.showTimeInputs ? 'bg-ocobrown-900' : 'bg-ocobrown-700'
								}
            relative inline-flex h-[23px] w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
							>
								<span className="sr-only">Use setting</span>
								<span
									aria-hidden="true"
									className={`${
										item.showTimeInputs ? 'translate-x-4' : 'translate-x-0'
									}
              pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
								/>
							</Switch>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
