import { Fragment, useRef, useState, useEffect } from 'react';
import { Combobox, Disclosure, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import MultiCombobox from '@/components/my-ui/MultiComboBox';
import MeetingItemForm from './MeetingItemForm';

interface MeetingForm {
	title: string;
	date: string;
	startedAt: string;
	endedAt: string;
	venue: string;
	attendees: any[];
	absenteesWithApologies?: any[];
	absenteesWithoutApologies?: any[];
	chairperson: number;
	scribe: number;
}

interface MeetingFormProps {
	formValues: MeetingForm;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	onBooleanSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	setAOBs: ([]: any) => void;
	setMeetingItems: ([]: any) => void;
}

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ');
}

const allUnpaginatedStaff = async () => {
	const response = await axios.get('/api/staff/getAllUnpaginatedStaff');
	return response.data;
};

export default function MeetingForm({
	formValues,
	onChange,
	onSelectChange,
	setAOBs,
	onBooleanSelectChange,
}: MeetingFormProps) {
	const [query, setQuery] = useState('');
	const [meetingAttendees, setMeetingAttendees] = useState<any>();
	const [meetingAbsenteesWithApologies, setMeetingAbsenteesWithApologies] = useState<any>();
	const [meetingAbsenteesWithoutApologies, setMeetingAbsenteesWithoutApologies] = useState<any>();
	const [meetingItems, setMeetingItems] = useState<any>([]);

	const { data: allStaff } = useQuery({
		queryFn: allUnpaginatedStaff,
		queryKey: ['unpaginatedStaff'],
	});

	const filteredAttendeeItems = (data: any) => {
		const filteredData = query
			? data.filter((item) => item?.name.toLowerCase().includes(query.toLowerCase()))
			: data;

		return filteredData;
	};

	const absenteesWithApologies = allStaff?.filter(
		(item) => !meetingAttendees?.some((meetingAttendee) => meetingAttendee.id === item.id)
	);
	const absenteesWithoutApologies = allStaff?.filter(
		(item) =>
			!meetingAttendees?.some((meetingAttendee) => meetingAttendee?.id === item?.id) &&
			!meetingAbsenteesWithApologies?.some(
				(meetingAbsenteeWithApologies) => meetingAbsenteeWithApologies?.id === item?.id
			)
	);

	// console.log('Filtered Staff Data:', filteredStaff);
	const handleAddMeetingItem = () => {
		const newItem = {
			action: '',
			responsible: [],
			dueDate: '',
			activity: '',
			status: '',
		};
		setMeetingItems([...meetingItems, newItem]);
	};

	const handleRemoveMeetingItem = (index) => {
		const updatedItems = [...meetingItems];
		updatedItems.splice(index, 1);
		setMeetingItems(updatedItems);
	};

	const handleChangeMeetingItem = (index, event) => {
		const { name, value } = event.target;
		const updatedItems = [...meetingItems];
		updatedItems[index][name] = value;
		setMeetingItems(updatedItems);
	};

	return (
		<div>
			<Disclosure as="div" className="pt-6" defaultOpen={true}>
				{({ open }) => (
					<>
						<Disclosure.Button className="flex w-full items-center justify-between rounded-lg bg-primary-100 px-4 py-2 text-left text-sm font-medium text-primary-900 hover:bg-primary-200 focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75">
							<div className="flex w-full items-center space-x-2">
								<div className="flex h-2 w-2 items-center justify-center rounded-full bg-primary-600 p-3 text-primary-50">
									<span>1</span>
								</div>
								<div className="flex flex-col">
									<span className="text-base font-semibold text-secondary-600">
										Meeting Details
									</span>
								</div>
							</div>
							<Icon
								icon="heroicons:chevron-right"
								className={`${
									open ? 'rotate-90 transform' : ''
								} h-5 w-5 text-primary-500`}
							/>
						</Disclosure.Button>

						<Disclosure.Panel as="dd" className="px-4 pb-2 pt-4 text-sm text-gray-500">
							<div className="grid grid-cols-6 gap-4 rounded border border-secondary-200 p-2 md:grid-cols-12">
								<div className="col-span-6 md:col-span-12">
									<label
										htmlFor="title"
										className="block text-sm font-medium text-secondary-700"
									>
										Meeting Title
									</label>
									<div className="mt-1">
										<input
											type="text"
											name="title"
											id="title"
											value={formValues?.title}
											onChange={onChange}
											className="border-1 shadow-accent-300 block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
										/>
									</div>
								</div>

								<div className="col-span-6">
									<label
										htmlFor="date"
										className="block text-sm font-medium text-secondary-700"
									>
										Date
									</label>
									<div className="mt-1">
										<input
											type="date"
											name="date"
											id="date"
											value={formValues?.date}
											onChange={onChange}
											className="border-1 shadow-accent-300 block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
										/>
									</div>
								</div>
								<div className="col-span-6">
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
											className="border-1 shadow-accent-300 block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
										/>
									</div>
								</div>
								<div className="col-span-6">
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
											className="border-1 shadow-accent-300 block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
										/>
									</div>
								</div>
								<div className="col-span-6">
									<label
										htmlFor="venue"
										className="block text-sm font-medium text-secondary-700"
									>
										venue
									</label>
									<div className="mt-1">
										<input
											type="text"
											name="venue"
											id="venue"
											value={formValues?.venue}
											onChange={onChange}
											className="border-1 shadow-accent-300 block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
										/>
									</div>
								</div>
								<div className="col-span-6 md:col-span-12">
									<label
										htmlFor="venue"
										className="block text-sm font-medium text-secondary-700"
									>
										Attendees:
									</label>
									<Combobox
										as="div"
										value={meetingAttendees}
										onChange={setMeetingAttendees}
										multiple
									>
										<div className="z-[3] flex flex-wrap items-center">
											{meetingAttendees?.map((item) => (
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
															setMeetingAttendees(
																(currentAttendees) =>
																	currentAttendees.filter(
																		(attendee) =>
																			attendee.id !== item.id
																	)
															);
														}}
														className="ml-1 focus:outline-none"
													>
														<Icon
															icon="heroicons:x-mark"
															className="h-4 w-4"
														/>
													</button>
												</div>
											))}
											<Combobox.Input
												className="border-1  shadow-accent-300 z-[2] block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
												onChange={(event) => setQuery(event.target.value)}
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
												{filteredAttendeeItems(allStaff)?.map((item) => (
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
												))}
											</Combobox.Options>
										</Transition>
									</Combobox>
								</div>
								<div className="col-span-6 md:col-span-12">
									<label
										htmlFor="AWA"
										className="block text-sm font-medium text-secondary-700"
									>
										Absentee With Apologies
									</label>
									<Combobox
										value={meetingAbsenteesWithApologies}
										onChange={setMeetingAbsenteesWithApologies}
										multiple
									>
										<div className="z-[3] flex flex-wrap items-center">
											{meetingAbsenteesWithApologies?.map((item) => (
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
															setMeetingAbsenteesWithApologies(
																(currentAbsenteesWithApologies) =>
																	currentAbsenteesWithApologies.filter(
																		(absenteesWithApologies) =>
																			absenteesWithApologies.id !==
																			item.id
																	)
															);
														}}
														className="ml-1 focus:outline-none"
													>
														<Icon
															icon="heroicons:x-mark"
															className="h-4 w-4"
														/>
													</button>
												</div>
											))}
											<Combobox.Input
												className="border-1 shadow-accent-300 block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
												// displayValue={(
												// 	meetingAbsenteesWithApologies: any
												// ) =>
												// 	meetingAbsenteesWithApologies
												// 		? meetingAbsenteesWithApologies
												// 				?.map((item: any) => item?.name)
												// 				.join(', ')
												// 		: ''
												// }
												onChange={(event) => setQuery(event.target.value)}
											/>
										</div>
										<Combobox.Options className="z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
											{filteredAttendeeItems(absenteesWithApologies)?.map(
												(item) => (
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
												)
											)}
										</Combobox.Options>
									</Combobox>
								</div>
								<div className="col-span-6 md:col-span-12">
									<label
										htmlFor="venue"
										className="block text-sm font-medium text-secondary-700"
									>
										Absentee
									</label>
									<Combobox
										value={meetingAbsenteesWithoutApologies}
										onChange={setMeetingAbsenteesWithoutApologies}
										multiple
									>
										<div className="z-[3] flex flex-wrap items-center">
											{meetingAbsenteesWithoutApologies?.map((item) => (
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
															setMeetingAbsenteesWithoutApologies(
																(
																	currentAbsenteesWithoutApologies
																) =>
																	currentAbsenteesWithoutApologies.filter(
																		(
																			absenteesWithoutApologies
																		) =>
																			absenteesWithApologies.id !==
																			item.id
																	)
															);
														}}
														className="ml-1 focus:outline-none"
													>
														<Icon
															icon="heroicons:x-mark"
															className="h-4 w-4"
														/>
													</button>
												</div>
											))}
											<Combobox.Input
												className="border-1 shadow-accent-300 block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
												// displayValue={(
												// 	meetingAbsenteesWithoutApologies: any
												// ) =>
												// 	meetingAbsenteesWithoutApologies
												// 		? meetingAbsenteesWithoutApologies
												// 				?.map((item: any) => item?.name)
												// 				.join(', ')
												// 		: ''
												// }
												onChange={(event) => setQuery(event.target.value)}
											/>
										</div>
										<Combobox.Options className="z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
											{filteredAttendeeItems(absenteesWithoutApologies)?.map(
												(item) => (
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
												)
											)}
										</Combobox.Options>
									</Combobox>
								</div>
								<div className="col-span-6 flex w-full items-center justify-center md:col-span-12">
									<button
										type="button"
										className="flex items-center gap-2 rounded-md border border-secondary-300 bg-secondary-600 p-2 text-sm font-medium leading-4 text-white shadow-sm hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-1"
									>
										Continue
									</button>
								</div>
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
			<Disclosure as="div" className="pt-6">
				{({ open }) => (
					<>
						<Disclosure.Button className="flex w-full items-center justify-between rounded-lg bg-primary-100 px-4 py-2 text-left text-sm font-medium text-primary-900 hover:bg-primary-200 focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75">
							<div className="flex w-full items-center space-x-2">
								<div className="flex h-2 w-2 items-center justify-center rounded-full bg-primary-600 p-3 text-primary-50">
									<span>1</span>
								</div>
								<div className="flex flex-col">
									<span className="text-base font-semibold text-secondary-600">
										Minutes
									</span>
									<span className="flex items-center text-xs font-semibold text-secondary-600/70">
										Click the + icon to add a new item and the
										<Icon icon="heroicons:trash-solid" /> icon to delete an item
									</span>
								</div>
							</div>
							<Icon
								icon="heroicons:chevron-right"
								className={`${
									open ? 'rotate-90 transform' : ''
								} h-5 w-5 text-primary-500`}
							/>
						</Disclosure.Button>

						<Disclosure.Panel as="dd" className="px-4 pb-2 pt-4 text-sm text-gray-500">
							<div className="space-y-2 rounded border border-secondary-200 p-4">
								<div className="flex w-full divide-solid py-2">
									<button
										type="button"
										onClick={handleAddMeetingItem}
										className="flex items-center rounded-md bg-primary-600 p-2 text-sm text-white"
									>
										<Icon icon="heroicons:plus" />{' '}
										<span> Add A Meeting Item</span>
									</button>
								</div>
								<div className="flex flex-col space-y-2">
									{meetingItems?.map((item: any, index: any) => (
										<MeetingItemForm
											key={index}
											formValues={item}
											personResponsible={meetingAttendees}
											onChange={(e) => handleChangeMeetingItem(index, e)}
											onClick={() => handleRemoveMeetingItem(index)}
										/>
									))}
								</div>
								<div className=" flex w-full items-center justify-center">
									<button
										type="button"
										className="flex items-center gap-2 rounded-md border border-secondary-300 bg-secondary-600 p-2 text-sm font-medium leading-4 text-white shadow-sm hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-1"
									>
										Continue
									</button>
								</div>
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
			<Disclosure as="div" className="pt-6">
				{({ open }) => (
					<>
						<Disclosure.Button className="flex w-full items-center justify-between rounded-lg bg-primary-100 px-4 py-2 text-left text-sm font-medium text-primary-900 hover:bg-primary-200 focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75">
							<div className="flex w-full items-center space-x-2">
								<div className="flex h-2 w-2 items-center justify-center rounded-full bg-primary-600 p-3 text-primary-50">
									<span>3</span>
								</div>
								<div className="flex flex-col">
									<span className="text-base font-semibold text-secondary-600">
										AOB {`(Any Other Business)`}
									</span>
									<span className="flex items-center text-xs font-semibold text-secondary-600/70">
										Click the + icon to add a AOB and the
										<Icon icon="heroicons:trash-solid" /> icon to delete a AOB
									</span>
								</div>
							</div>
							<Icon
								icon="heroicons:chevron-right"
								className={`${
									open ? 'rotate-90 transform' : ''
								} h-5 w-5 text-primary-500`}
							/>
						</Disclosure.Button>

						<Disclosure.Panel as="dd" className="px-4 pb-2 pt-4 text-sm text-gray-500">
							<div className="space-y-2 rounded border border-secondary-200 p-4">
								{/* Panel Content Goes Here */}
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
		</div>
	);
}
