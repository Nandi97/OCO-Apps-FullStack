import MultiCombobox from '@/components/my-ui/MultiComboBox';
import { Combobox, Disclosure, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState, Fragment } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import MinutesItemForm from './MinutesItemForm';

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
	onSubmit: SubmitHandler<MeetingForm>;
	initialValues?: MeetingForm;
	isLoading: any;
	animalValues?: any;
}

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ');
}

const allUnpaginatedStaff = async () => {
	const response = await axios.get('/api/staff/getAllUnpaginatedStaff');
	return response.data;
};

export default function MinutesForm({
	onSubmit,
	initialValues,
	isLoading,
	animalValues,
}: MeetingFormProps) {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<MeetingForm>({
		defaultValues: initialValues,
	});
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

	console.log('Meeting Attendees:', meetingAttendees);
	const handleSubmitForm: SubmitHandler<MeetingForm> = (data) => {
		data.attendees = meetingAttendees;

		console.log('Data:', data);
		onSubmit(data);
	};
	return (
		<form onSubmit={handleSubmit(handleSubmitForm)}>
			<Disclosure as="div" className="pt-6" defaultOpen={true}>
				{({ open }) => (
					<>
						<Disclosure.Button
							// onClick={() => handleDisclosureToggle(0)}
							// ref={(el) => (AccordionRefs?.current[0] = el)}
							className="flex w-full items-center justify-between rounded-lg bg-ocobrown-100 px-4 py-2 text-left text-sm font-medium text-ocobrown-900 hover:bg-ocobrown-200 focus:outline-none focus-visible:ring focus-visible:ring-ocobrown-500 focus-visible:ring-opacity-75"
						>
							<div className="w-full flex items-center space-x-2">
								<div className="h-2 w-2 p-3 rounded-full bg-ocobrown-600 text-ocobrown-50 flex items-center justify-center">
									<span>1</span>
								</div>
								<div className="flex flex-col">
									<span className="text-base font-semibold text-ocoblue-600">
										Meeting Details
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

						<Disclosure.Panel as="dd" className="px-4 pt-4 pb-2 text-sm text-gray-500">
							<div className="grid md:grid-cols-12 grid-cols-6 gap-4 border border-ocoblue-200 rounded p-2">
								<div className="col-span-6 md:col-span-12">
									<label
										htmlFor="title"
										className="block text-sm font-medium text-ocoblue-700"
									>
										Meeting Title
									</label>
									<div className="mt-1">
										<input
											type="text"
											id="title"
											{...register('title', { required: true })}
											className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
										/>
									</div>
								</div>

								<div className="col-span-6">
									<label
										htmlFor="date"
										className="block text-sm font-medium text-ocoblue-700"
									>
										Date
									</label>
									<div className="mt-1">
										<input
											type="date"
											id="date"
											{...register('date', { required: true })}
											className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
										/>
									</div>
								</div>
								<div className="col-span-6">
									<label
										htmlFor="startedAt"
										className="block text-sm font-medium text-ocoblue-700"
									>
										Started At
									</label>
									<div className="mt-1">
										<input
											type="time"
											id="startedAt"
											{...register('startedAt', { required: true })}
											className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
										/>
									</div>
								</div>
								<div className="col-span-6">
									<label
										htmlFor="endedAt"
										className="block text-sm font-medium text-ocoblue-700"
									>
										Ended At
									</label>
									<div className="mt-1">
										<input
											type="time"
											id="endedAt"
											{...register('endedAt', { required: true })}
											className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
										/>
									</div>
								</div>
								<div className="col-span-6">
									<label
										htmlFor="venue"
										className="block text-sm font-medium text-ocoblue-700"
									>
										venue
									</label>
									<div className="mt-1">
										<input
											type="text"
											id="venue"
											{...register('venue', { required: true })}
											className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
										/>
									</div>
								</div>
								<div className="col-span-6 md:col-span-12">
									<label
										htmlFor="venue"
										className="block text-sm font-medium text-ocoblue-700"
									>
										Attendees
									</label>
									<Combobox
										value={meetingAttendees}
										onChange={setMeetingAttendees}
										multiple
									>
										<Combobox.Input
											className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
											displayValue={(meetingAttendees: any) =>
												meetingAttendees
													? meetingAttendees
															?.map((item: any) => item?.name)
															.join(', ')
													: ''
											}
											onChange={(event) => setQuery(event.target.value)}
										/>
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
																			active
																				? 'text-white'
																				: 'text-ocoblue-600'
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
										className="block text-sm font-medium text-ocoblue-700"
									>
										Absentee With Apologies
									</label>
									<Combobox
										value={meetingAbsenteesWithApologies}
										onChange={setMeetingAbsenteesWithApologies}
										multiple
									>
										<Combobox.Input
											className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
											displayValue={(meetingAbsenteesWithApologies: any) =>
												meetingAbsenteesWithApologies
													? meetingAbsenteesWithApologies
															?.map((item: any) => item?.name)
															.join(', ')
													: ''
											}
											onChange={(event) => setQuery(event.target.value)}
										/>
										<Combobox.Options className="z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
											{filteredAttendeeItems(absenteesWithApologies)?.map(
												(item) => (
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
																			active
																				? 'text-white'
																				: 'text-ocoblue-600'
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
										className="block text-sm font-medium text-ocoblue-700"
									>
										Absentee
									</label>
									<Combobox
										value={meetingAbsenteesWithoutApologies}
										onChange={setMeetingAbsenteesWithoutApologies}
										multiple
									>
										<Combobox.Input
											className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
											displayValue={(
												meetingAbsenteesWithoutApologies: any
											) =>
												meetingAbsenteesWithoutApologies
													? meetingAbsenteesWithoutApologies
															?.map((item: any) => item?.name)
															.join(', ')
													: ''
											}
											onChange={(event) => setQuery(event.target.value)}
										/>
										<Combobox.Options className="z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
											{filteredAttendeeItems(absenteesWithoutApologies)?.map(
												(item) => (
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
																			active
																				? 'text-white'
																				: 'text-ocoblue-600'
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
								<div className="col-span-6 md:col-span-12 w-full flex items-center justify-center">
									<button
										type="button"
										// onClick={() => handleContinue(0)}
										className="flex items-center gap-2 p-2 text-sm font-medium leading-4 text-white border rounded-md shadow-sm bg-ocoblue-600 hover:opacity-80 border-ocoblue-300 focus:outline-none focus:ring-2 focus:ring-ocoblue-500 focus:ring-offset-1"
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
						<Disclosure.Button
							// onClick={() => handleDisclosureToggle(1)}
							// ref={(el) => (AccordionRefs.current[1] = el)}
							className="flex items-center w-full justify-between rounded-lg bg-ocobrown-100 px-4 py-2 text-left text-sm font-medium text-ocobrown-900 hover:bg-ocobrown-200 focus:outline-none focus-visible:ring focus-visible:ring-ocobrown-500 focus-visible:ring-opacity-75"
						>
							<div className="w-full flex items-center space-x-2">
								<div className="h-2 w-2 p-3 rounded-full bg-ocobrown-600 text-ocobrown-50 flex items-center justify-center">
									<span>1</span>
								</div>
								<div className="flex flex-col">
									<span className="text-base font-semibold text-ocoblue-600">
										Minutes
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

						<Disclosure.Panel as="dd" className="px-4 pt-4 pb-2 text-sm text-gray-500">
							<div className="border border-ocoblue-200 rounded p-4 space-y-2">
								<div className="flex w-full divide-solid py-2">
									<button
										type="button"
										onClick={handleAddMeetingItem}
										className="bg-ocobrown-600 text-white text-sm flex items-center p-2 rounded-md"
									>
										<Icon icon="heroicons:plus" />{' '}
										<span> Add A Meeting Item</span>
									</button>
								</div>
								<div className="flex flex-col space-y-2">
									{meetingItems.map((item: any, index: any) => (
										<MinutesItemForm
											key={index}
											minuteItemValues={item}
											attendees={meetingAttendees}
											onChange={(e) => handleChangeMeetingItem(index, e)}
											onClick={() => handleRemoveMeetingItem(index)}
										/>
									))}
								</div>
								<div className=" w-full flex items-center justify-center">
									<button
										type="button"
										// onClick={() => handleContinue(1)}
										className="flex items-center gap-2 p-2 text-sm font-medium leading-4 text-white border rounded-md shadow-sm bg-ocoblue-600 hover:opacity-80 border-ocoblue-300 focus:outline-none focus:ring-2 focus:ring-ocoblue-500 focus:ring-offset-1"
									>
										Continue
									</button>
								</div>
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
		</form>
	);
}
