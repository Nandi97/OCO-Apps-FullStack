import { Icon } from '@iconify/react/dist/iconify.js';
import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';

interface MinuteItemForm {
	action: string;
	responsible: any;
	dueDate: string;
	activity: string;
	status: string;
}

interface MeetingItemFormProp {
	formValues: MinuteItemForm;
	onChange: (event: any) => void;
	onClick: (event: any) => void;
	personResponsible: [] | null;
}

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ');
}

export default function MeetingItemForm({
	formValues,
	onChange,
	onClick,
	personResponsible,
}: MeetingItemFormProp) {
	// console.log(personResponsible);

	const [query, setQuery] = useState('');
	const [selected, setSelected] = useState<any>();

	// console.log(selected);
	const filteredPersons = (data: any) => {
		const filteredData =
			query === ''
				? data
				: data?.filter((item) =>
						item?.name
							.toLowerCase()
							.replace(/\s+/g, '')
							.includes(query.toLowerCase().replace(/\s+/g, ''))
					);
		return filteredData;
	};

	const activity = [
		{ id: 1, name: 'Information' },
		{ id: 2, name: 'Open Action' },
		{ id: 3, name: 'Closed Action' },
		{ id: 4, name: 'Decision' },
	];
	return (
		<div className="grid grid-cols-12 gap-2 rounded-md border border-secondary-400 p-2">
			<div className="col-span-12">
				<label
					htmlFor="description"
					className="f flex items-center space-x-2 text-sm font-medium text-secondary-700"
				>
					<span> Action</span>
				</label>
				<div className="mt-1">
					<textarea
						name="description"
						id="description"
						value={formValues?.action}
						onChange={onChange}
						className="border-1 shadow-accent-300 block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
					/>
				</div>
			</div>
			<div className="col-span-12">
				<label
					htmlFor="responsible"
					className="f flex items-center space-x-2 text-sm font-medium text-secondary-700"
				>
					<span>Responsible</span>
				</label>
				<div className="mt-1">
					<Combobox
						value={selected}
						onChange={(newSelected) => {
							// console.log('Selected staff:', newSelected);
							setSelected(newSelected);
							setQuery('');
						}}
						multiple
					>
						<div className="relative mt-1">
							<div className="z-[3] flex flex-wrap items-center">
								{selected?.map((item) => (
									<div
										key={item?.id}
										className="relative m-1 flex items-center rounded-full bg-secondary-300 px-2 py-1 text-xs text-white"
									>
										<span className="w-14 overflow-hidden truncate text-xs">
											{item?.name}
										</span>
										<button
											type="button"
											onClick={() => {
												setSelected((peopleResponsible) =>
													peopleResponsible.filter(
														(person) => person.id !== item.id
													)
												);
											}}
											className="ml-1 focus:outline-none"
										>
											<Icon icon="heroicons:x-mark" className="h-4 w-4" />
										</button>
									</div>
								))}
								<Combobox.Input
									className="border-1  shadow-accent-300 z-[2] block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
									onChange={(event) => setQuery('')}
									// displayValue={(selected: any) =>
									// 	selected
									// 		? selected?.map((item: any) => item?.name).join(', ')
									// 		: ''
									// }
								/>
							</div>
							<Transition
								as={Fragment}
								leave="transition ease-in duration-100"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
								afterLeave={() => setQuery('')}
							>
								<Combobox.Options className="z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
									{filteredPersons(personResponsible)?.length === 0 &&
									query !== '' ? (
										<div className="relative cursor-default select-none px-4 py-2 text-gray-700">
											Nothing found.
										</div>
									) : (
										filteredPersons(personResponsible)?.map((item) => (
											<Combobox.Option
												key={item?.id}
												value={item}
												className={({ active, selected }) =>
													classNames(
														'flex cursor-default select-none justify-between py-2 pl-3 pr-9',
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
																		'font-semibold text-primary-400'
																)}
															>
																{item?.name}
															</span>
														</div>

														{selected && (
															<span
																className={classNames(
																	'inset-y-0 right-0 flex items-center pr-4',
																	active
																		? 'text-white'
																		: 'text-secondary-600'
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
										))
									)}
								</Combobox.Options>
							</Transition>
						</div>
					</Combobox>
				</div>
			</div>
			<div className="col-span-12 md:col-span-6">
				<label
					htmlFor="dueDate"
					className="flex items-center space-x-2 text-sm font-medium text-secondary-700"
				>
					<span>Due Date</span>
				</label>
				<div className="mt-1">
					<input
						type="date"
						name="dueDate"
						value={formValues?.dueDate}
						onChange={onChange}
						id="dueDate"
						className="border-1 shadow-accent-300 block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
					/>
				</div>
			</div>
			<div className="col-span-12 md:col-span-6">
				<label
					htmlFor="activity"
					className="flex items-center space-x-2 text-sm font-medium text-secondary-700"
				>
					<span>Activity</span>
				</label>
				<div className="mt-1">
					<select
						id="activity"
						name="activity"
						onChange={onChange}
						value={formValues?.activity}
						className="border-1 shadow-accent-300 block h-8 w-full rounded-md border border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5 px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
					>
						<option disabled value="" className="text-secondary-700 text-opacity-50">
							--Activity--
						</option>
						{activity?.map((item: any) => (
							<option key={item?.id} value={item?.name}>
								{item?.name}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className="col-span-12">
				<label
					htmlFor="status"
					className="f flex items-center space-x-2 text-sm font-medium text-secondary-700"
				>
					<span> Status</span>
				</label>
				<div className="mt-1">
					<textarea
						name="status"
						id="status"
						value={formValues?.status}
						onChange={onChange}
						className="border-1 shadow-accent-300 block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
					/>
				</div>
			</div>
			<div className="flex w-full items-center justify-center md:col-span-1">
				<button
					onClick={onClick}
					className="mt-5 rounded-md bg-primary-600 p-2 text-white"
					type="button"
				>
					<Icon icon="heroicons:trash" />
				</button>
			</div>
		</div>
	);
}
