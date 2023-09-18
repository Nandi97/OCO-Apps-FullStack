import { Icon } from '@iconify/react/dist/iconify.js';
import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';

interface PurchaseItemFormProp {
	formValues: any;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onTextAreaChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	onSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	onClick: (event: any) => void;
	personResponsible: [] | null;
}

export default function MeetingItemForm({
	formValues,
	onChange,
	onClick,
	onTextAreaChange,
	personResponsible,
	onSelectChange,
}: PurchaseItemFormProp) {
	const [query, setQuery] = useState('');

	const [selected, setSelected] = useState(personResponsible?.data[0]);

	const filteredPersonResponsible =
		query === ''
			? personResponsible
			: personResponsible?.filter(
					(item) =>
						item?.name
							.toLowerCase()
							.replace(/\s+/g, '')
							.includes(query.toLowerCase().replace(/\s+/g, ''))
			  );

	const activity = [
		{ id: 1, name: 'Information' },
		{ id: 2, name: 'Open Action' },
		{ id: 3, name: 'Closed Action' },
		{ id: 4, name: 'Decision' },
	];
	return (
		<div className="grid grid-cols-12 gap-2 border rounded-md border-ocoblue-400 p-2">
			<div className="col-span-12">
				<label
					htmlFor="description"
					className="flex items-center space-x-2 text-sm font-medium text-ocoblue-700 f"
				>
					<span> Action</span>
				</label>
				<div className="mt-1">
					<textarea
						name="description"
						id="description"
						value={formValues?.action}
						onChange={onTextAreaChange}
						className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
					/>
				</div>
			</div>
			<div className="col-span-12">
				<label
					htmlFor="responsible"
					className="flex items-center space-x-2 text-sm font-medium text-ocoblue-700 f"
				>
					<span>Responsible</span>
				</label>
				<div className="mt-1">
					<Combobox
						as="div"
						value={selected}
						onChange={(newSelected) => {
							console.log('Selected staff:', newSelected);
							setSelected(newSelected);
						}}
					>
						<div className="relative mt-1">
							<div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
								<Combobox.Input
									className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
									onChange={(event) => setQuery(event.target.value)}
									displayValue={(item) => item?.name}
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
								<Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
									{filteredPersonResponsible?.length === 0 && query !== '' ? (
										<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
											Nothing found.
										</div>
									) : (
										filteredPersonResponsible?.map((item) => (
											<Combobox.Option
												key={item.id}
												value={item}
												className={({ active }) =>
													`relative cursor-default select-none py-2 pl-10 pr-4 ${
														active
															? 'bg-teal-600 text-white'
															: 'text-gray-900'
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
															{item.name}
														</span>
														{selected ? (
															<span
																className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
																	active
																		? 'text-white'
																		: 'text-teal-600'
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
			<div className="col-span-12 md:col-span-6">
				<label
					htmlFor="dueDate"
					className="flex items-center space-x-2 text-sm font-medium text-ocoblue-700"
				>
					<span>Due Date</span>
				</label>
				<div className="mt-1">
					<input
						type="date"
						name="dueDate"
						value={formValues?.date}
						onChange={onChange}
						id="dueDate"
						className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
					/>
				</div>
			</div>
			<div className="col-span-12 md:col-span-6">
				<label
					htmlFor="activity"
					className="flex items-center space-x-2 text-sm font-medium text-ocoblue-700"
				>
					<span>Activity</span>
				</label>
				<div className="mt-1">
					<select
						id="activity"
						name="activity"
						onChange={onSelectChange}
						value={formValues?.activity}
						className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 focus:border-ocoblue-500 block p-2.5 h-8 px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
					>
						<option disabled value="" className="text-opacity-50 text-ocoblue-700">
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
					className="flex items-center space-x-2 text-sm font-medium text-ocoblue-700 f"
				>
					<span> Status</span>
				</label>
				<div className="mt-1">
					<textarea
						name="status"
						id="status"
						value={formValues?.status}
						onChange={onTextAreaChange}
						className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
					/>
				</div>
			</div>
			<div className="md:col-span-1 flex w-full items-center justify-center">
				<button
					onClick={onClick}
					className="bg-ocobrown-600 text-white p-2 rounded-md mt-5"
					type="button"
				>
					<Icon icon="heroicons:trash" />
				</button>
			</div>
		</div>
	);
}
