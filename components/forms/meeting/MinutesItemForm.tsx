import { Combobox, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

interface MinuteItemForm {
	action: string;
	responsible: any;
	dueDate: string;
	activity: string;
	status: string;
}

interface MinuteItemFormProps {
	onChange: (event: any) => void;
	minuteItemValues: MinuteItemForm;
	attendees: [];
	onClick?: (event: any) => void;
}

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ');
}

export default function MinutesItemForm({
	onChange,
	minuteItemValues,
	attendees,
	onClick,
}: MinuteItemFormProps) {
	const [personsResponsible, setPersonsResponsible] = useState<any>();
	const [query, setQuery] = useState('');
	const filteredPersons = (data: any) => {
		const filteredData = query
			? data.filter((item) => item?.name.toLowerCase().includes(query.toLowerCase()))
			: data;

		return filteredData;
	};

	const activity = [
		{ id: 1, name: 'Information' },
		{ id: 2, name: 'Open Action' },
		{ id: 3, name: 'Closed Action' },
		{ id: 4, name: 'Decision' },
	];
	const handlePersonsResponsibleChange = (persons: any) => {
		setPersonsResponsible(persons);
		onChange({
			...minuteItemValues,
			responsible: persons, // Update minuteItemValues.responsible when persons change
		});
	};

	console.log('Minute Items:', minuteItemValues);

	return (
		<div className="grid grid-cols-12 gap-2 border rounded-md border-ocoblue-400 p-2">
			<div className="col-span-12">
				<label
					htmlFor="action"
					className="flex items-center space-x-2 text-sm font-medium text-ocoblue-700 f"
				>
					<span> Action</span>
				</label>
				<div className="mt-1">
					<textarea
						id="action"
						name="action"
						value={minuteItemValues?.action}
						onChange={onChange}
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
						value={personsResponsible}
						onChange={handlePersonsResponsibleChange}
						multiple
					>
						<Combobox.Input
							className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
							displayValue={(personsResponsible: any) =>
								personsResponsible
									? personsResponsible?.map((item: any) => item?.name).join(', ')
									: ''
							}
							onChange={(event) => setQuery(event.target.value)}
						/>
						<Combobox.Options className="z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{filteredPersons(attendees)?.map((item) => (
								<Combobox.Option
									key={item?.id}
									value={item}
									className={({ active, selected }) =>
										classNames(
											'cursor-default select-none py-2 pl-3 pr-9 flex justify-between',
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
															'font-semibold text-ocobrown-400'
													)}
												>
													{item?.name}
												</span>
											</div>

											{selected && (
												<span
													className={classNames(
														'inset-y-0 right-0 flex items-center pr-4',
														active ? 'text-white' : 'text-ocoblue-600'
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
						value={minuteItemValues?.dueDate}
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
						value={minuteItemValues?.activity}
						onChange={onChange}
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
						id="status"
						name="status"
						value={minuteItemValues?.status}
						onChange={onChange}
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
