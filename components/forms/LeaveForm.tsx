'use client';

import { useState, useEffect } from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/Accordion ';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Combobox } from '@headlessui/react';
import { Icon } from '@iconify/react/dist/iconify.js';

interface LeaveForm {
	employeeId: number;
	supervisorId: number;
	leaveTypeId: number;
	duration: number;
	startDate: string;
	endDate: string;
	reportDate: string;
	approvingPartnerId: number;
	approvingHRMId: number;
}

interface LeaveFormProps {
	onSubmit: SubmitHandler<LeaveForm>;
	initialValues?: LeaveForm;
	isLoading: any;
	formValues?: any;
	loggedUser?: any;
}

const fetchAllStaff = async () => {
	const response = await axios.get('/api/staff/getAllUnpaginatedStaff');
	return response.data;
};

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ');
}

export default function LeaveForm({
	onSubmit,
	initialValues,
	isLoading,
	loggedUser,
}: LeaveFormProps) {
	const [accValue, setAccValue] = useState('one');
	const [dataState, setDataState] = useState('closed');
	const [currentUser, setCurrentUser] = useState<any>();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<LeaveForm>({
		defaultValues: initialValues,
	});

	const { data: allStaff } = useQuery({
		queryFn: fetchAllStaff,
		queryKey: ['allStaff'],
	});

	// console.log('All Staff', allStaff);

	const selectedUser = allStaff?.find((item) => item?.email === 'alvin@oraro.co.ke');

	console.log('Selected User:', selectedUser);
	const [query, setQuery] = useState('');
	const [selectedPerson, setSelectedPerson] = useState();

	const filteredPeople =
		query === ''
			? allStaff
			: allStaff.filter((person) => {
					return person.name.toLowerCase().includes(query.toLowerCase());
			  });

	const handleContinueClick = (newValue: string) => {
		setAccValue(newValue);
	};

	const handlePreviousClick = (newValue: string) => {
		setAccValue(newValue);
	};

	const handleSubmitForm: SubmitHandler<LeaveForm> = (data) => {
		data.employeeId = selectedUser?.id;
		onSubmit(data);
	};

	return (
		<div className="grid md:grid-cols-12 col-span-6 bg-ocobrown-50">
			<form className="col-span-6" onSubmit={handleSubmit(handleSubmitForm)}>
				<Accordion
					type="single"
					value={accValue}
					collapsible
					className="w-full p-2"
					defaultValue="one"
				>
					<AccordionItem value="one">
						<AccordionTrigger
							className="[&[data-state=open]>div>div]:bg-ocobrown-600 "
							onClick={() => handleContinueClick('one')}
						>
							<div className="flex items-center space-x-3">
								<div className="bg-ocoblue-200 text-white flex items-center justify-center text-xs p-2 h-4 w-4 rounded-full ">
									1
								</div>
								<span>Employee Details</span>
							</div>
						</AccordionTrigger>
						<AccordionContent>
							<div className="flex flex-col border rounded-b-lg">
								<div className="grid grid-cols-6 md:grid-cols-12 gap-4 p-2">
									<div className="col-span-6  space-y-1">
										<label
											htmlFor="staff type"
											className="block text-xs font-medium text-ocoblue-700"
										>
											Staff Type
										</label>
										<select
											id="typeId"
											name="typeId"
											// value={selectedStaffType} // Use selectedStaffType here
											// onChange={updateDesignations}
											className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
											disabled
										>
											<option
												selected
												disabled
												value=""
												className="text-opacity-50 text-ocoblue-700"
											>
												{selectedUser?.name}
											</option>
											{/* {staffTypes?.map((item) => (
												<option key={item?.id} value={item?.id}>
													{item?.name}
												</option>
											))} */}
										</select>
									</div>
									<div className="col-span-6 space-y-1">
										<label
											htmlFor="payrollNo"
											className="block text-xs font-medium text-ocoblue-700"
										>
											Payroll No
										</label>
										<input
											type="text"
											name="payrollNo"
											id="payrollNo"
											value={selectedUser?.staffNo}
											// onChange={onChange}
											className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
											disabled
										/>
									</div>
									<div className="col-span-6 space-y-1">
										<label
											htmlFor="title"
											className="block text-xs font-medium text-ocoblue-700"
										>
											Title
										</label>
										<input
											type="text"
											name="title"
											id="title"
											value={selectedUser?.designation?.name}
											// onChange={onChange}
											className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
											disabled
										/>
									</div>
									<div className="col-span-6  space-y-1">
										<label
											htmlFor="team"
											className="block text-xs font-medium text-ocoblue-700"
										>
											Team
										</label>
										<select
											id="team"
											name="team"
											// value={selectedStaffType} // Use selectedStaffType here
											// onChange={updateDesignations}
											className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
											disabled
										>
											<option
												selected
												disabled
												value=""
												className="text-opacity-50 text-ocoblue-700"
											>
												{selectedUser?.team?.name}
											</option>
											{/* {staffTypes?.map((item) => (
												<option key={item?.id} value={item?.id}>
													{item?.name}
												</option>
											))} */}
										</select>
									</div>
									<Combobox
										as="div"
										value={selectedPerson}
										onChange={setSelectedPerson}
										className="col-span-6  space-y-1"
									>
										<Combobox.Label className="block text-xs font-medium text-ocoblue-700">
											Supervisor
										</Combobox.Label>
										<div className="relative mt-1">
											<Combobox.Input
												className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
												onChange={(event) => setQuery(event.target.value)}
												displayValue={(person) => person?.name}
											/>
											<Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
												<Icon
													icon="heroicons:chevron-up-down"
													className="h-5 w-5 text-gray-400"
													aria-hidden="true"
												/>
											</Combobox.Button>

											{filteredPeople?.length > 0 && (
												<Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
													{filteredPeople?.map((person) => (
														<Combobox.Option
															key={person?.id}
															value={person}
															className={({ active }) =>
																classNames(
																	'relative cursor-default select-none py-2 pl-3 pr-9',
																	active
																		? 'bg-ocobrown-600 text-white'
																		: 'text-gray-900'
																)
															}
														>
															{({ active, selected }) => (
																<>
																	<div className="flex items-center">
																		<span
																			className={classNames(
																				'inline-block h-2 w-2 flex-shrink-0 rounded-full',
																				active
																					? 'bg-ocoblue-400'
																					: 'bg-gray-200'
																			)}
																			aria-hidden="true"
																		/>
																		<span
																			className={classNames(
																				'ml-3 truncate',
																				selected &&
																					'font-semibold'
																			)}
																		>
																			{person?.name}
																			<span className="sr-only">
																				{' '}
																				is{' '}
																				{person.online
																					? 'online'
																					: 'offline'}
																			</span>
																		</span>
																	</div>

																	{selected && (
																		<span
																			className={classNames(
																				'absolute inset-y-0 right-0 flex items-center pr-4',
																				active
																					? 'text-white'
																					: 'text-ocobrown-600'
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
								</div>
								<div className="w-full flex items-center py-2 justify-center">
									<button
										className="border rounded-md bg-ocoblue-600 text-white hover:bg-ocoblue-600/90 p-1"
										type="button"
										onClick={() => handleContinueClick('two')}
									>
										Continue
									</button>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="two">
						<AccordionTrigger
							className="[&[data-state=open]>div>div]:bg-ocobrown-600"
							onClick={() => handleContinueClick('two')}
						>
							<div className="flex items-center space-x-3">
								<div className="bg-ocoblue-200 text-white flex items-center justify-center text-xs p-2 h-4 w-4 rounded-full ">
									2
								</div>
								<span>Leave Details</span>
							</div>
						</AccordionTrigger>
						<AccordionContent>
							<div className="flex flex-col border rounded-b-lg">
								<div className="grid grid-cols-6 md:grid-cols-12 gap-4 p-2">
									<div className="col-span-6 md:col-span-12 space-y-1">
										<label
											htmlFor="leaveTypeId"
											className="block text-xs font-medium text-ocoblue-700"
										>
											Type of Leave
										</label>
										<select
											id="leaveTypeId"
											name="leaveTypeId"
											// value={selectedStaffType} // Use selectedStaffType here
											// onChange={updateDesignations}
											className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
										>
											<option
												selected
												disabled
												value=""
												className="text-opacity-50 text-ocoblue-700"
											>
												--Select Leave Type--
											</option>
											{/* {staffTypes?.map((item) => (
												<option key={item?.id} value={item?.id}>
													{item?.name}
												</option>
											))} */}
										</select>
									</div>
									<div className="col-span-6 space-y-1">
										<label
											htmlFor="duration"
											className="block text-xs font-medium text-ocoblue-700"
										>
											Duration
										</label>
										<input
											type="number"
											name="duration"
											id="duration"
											// value={formValues?.name}
											// onChange={onChange}
											className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
										/>
									</div>
									<div className="col-span-6 space-y-1">
										<label
											htmlFor="startedAt"
											className="block text-xs font-medium text-ocoblue-700"
										>
											Start Date
										</label>
										<input
											type="date"
											name="startedAt"
											id="startedAt"
											// value={formValues?.name}
											// onChange={onChange}
											className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
										/>
									</div>
									<div className="col-span-6 space-y-1">
										<label
											htmlFor="endedAt"
											className="block text-xs font-medium text-ocoblue-700"
										>
											End Date
										</label>
										<input
											type="date"
											name="endedAt"
											id="endedAt"
											// value={formValues?.name}
											// onChange={onChange}
											className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
										/>
									</div>
									<div className="col-span-6 space-y-1">
										<label
											htmlFor="reportOn"
											className="block text-xs font-medium text-ocoblue-700"
										>
											Report Back On
										</label>
										<input
											type="date"
											name="reportOn"
											id="reportOn"
											// value={formValues?.name}
											// onChange={onChange}
											className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
										/>
									</div>
								</div>
								<div className="w-full flex items-center py-2 justify-center">
									<button
										type="button"
										className="border rounded-md bg-ocoblue-600 text-white hover:bg-ocoblue-600/90 p-1"
										onClick={() => handleContinueClick('three')}
									>
										Continue
									</button>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="three">
						<AccordionTrigger
							className="[&[data-state=open]>div>div]:bg-ocobrown-600"
							onClick={() => handleContinueClick('three')}
						>
							<div className="flex items-center space-x-3">
								<div className="bg-ocoblue-200 text-white flex items-center justify-center text-xs p-2 h-4 w-4 rounded-full ">
									3
								</div>
								<span>Approval</span>
							</div>
						</AccordionTrigger>
						<AccordionContent>
							<div className="flex flex-col border rounded-b-lg">
								<div className="grid grid-cols-6 md:grid-cols-12 gap-4 p-2">
									<div className="col-span-6 md:col-span-8 md:col-start-3 space-y-1">
										<label
											htmlFor="partner"
											className="block text-xs font-medium text-ocoblue-700"
										>
											Managing Partner / Deputy
										</label>
										<select
											id="partner"
											name="partner"
											// value={selectedStaffType} // Use selectedStaffType here
											// onChange={updateDesignations}
											className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
										>
											<option
												selected
												disabled
												value=""
												className="text-opacity-50 text-ocoblue-700"
											>
												--Select Managing Partner / Deputy--
											</option>
											{/* {staffTypes?.map((item) => (
												<option key={item?.id} value={item?.id}>
													{item?.name}
												</option>
											))} */}
										</select>
									</div>
								</div>
								<div className="w-full flex items-center py-2 justify-center">
									<button
										type="button"
										className="border rounded-md bg-ocoblue-600 text-white hover:bg-ocoblue-600/90 p-1"
										onClick={() => handlePreviousClick('two')}
									>
										Save
									</button>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</form>
		</div>
	);
}
