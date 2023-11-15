'use client';

import { useState, useEffect } from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/Accordion ';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Combobox } from '@headlessui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import LeaveApplicationPrev from '../previews/LeaveApplication';
import { useSession } from 'next-auth/react';

interface LeaveForm {
	employeeId: string;
	supervisorId: string;
	leaveTypeId: string;
	duration: number;
	startDate: string;
	endDate: string;
	reportDate: string;
	approvingPartnerId: string;
	approvingHRMId: string;
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

const fetchLeaveTypes = async () => {
	const response = await axios.get('/api/leave/leave-type/get');
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
	const { data: session } = useSession();
	const [accValue, setAccValue] = useState('one');
	const [dataState, setDataState] = useState('closed');
	const [currentUser, setCurrentUser] = useState<any>();
	const [query, setQuery] = useState('');
	const [selectedPerson, setSelectedPerson] = useState<any>();
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<LeaveForm>({
		defaultValues: initialValues,
	});
	console.log('Session:', session);
	const [formValues, setFormValues] = useState({
		name: '',
		staffNo: '',
		title: '',
		team: '',
		leaveType: '',
		leaveDays: '',
		startDate: '',
		endDate: '',
		reportingDate: '',
		appliedOn: '',
		supervisor: '',
		partner: '',
		humanResource: '',
	});

	const { data: allStaff } = useQuery({
		queryFn: fetchAllStaff,
		queryKey: ['allStaff'],
	});
	const { data: leaveTypes } = useQuery({
		queryFn: fetchLeaveTypes,
		queryKey: ['leaveTypes'],
	});

	const selectedUser = allStaff?.find((item: any) => item?.email === session?.user?.email);

	const partners = allStaff?.filter(
		(item: any) =>
			item?.designation?.name === 'Deputy Managing Partner' ||
			item?.designation?.name === 'Managing Partner'
	);

	useEffect(() => {
		if (
			allStaff &&
			selectedUser &&
			selectedUser.designation &&
			selectedUser.team &&
			selectedPerson
		) {
			setFormValues((prevFormValues) => ({
				...prevFormValues,
				name: selectedUser.name || '',
				staffNo: selectedUser.staffNo || '',
				title: selectedUser.designation.name || '',
				team: selectedUser.team.name || '',
				supervisor: selectedPerson.name,
				humanResource:
					selectedUser?.designation?.staffTypeId === 1
						? null
						: allStaff?.find(
								(item: any) => item?.designation?.name === 'Head of Human Resource'
						  )?.id,
			}));
		}
	}, [allStaff, selectedUser, selectedPerson]);
	// console.log('Selected User:', selectedUser);
	// console.log('Partner', partners);
	// console.log('Selected Person:', selectedPerson);
	// console.log('Form Values:', formValues);
	// console.log('Leave Types:', leaveTypes);

	const filteredPeople =
		query === ''
			? allStaff
			: allStaff.filter((person: any) => {
					return person.name.toLowerCase().includes(query.toLowerCase());
			  });

	const handleContinueClick = (newValue: string) => {
		setAccValue(newValue);
	};

	const handlePreviousClick = (newValue: string) => {
		setAccValue(newValue);
	};

	const handleSubmitForm: SubmitHandler<LeaveForm> = (data) => {
		try {
			if (formValues || selectedUser || selectedPerson) {
				data.employeeId = selectedUser.id;
				data.supervisorId = selectedPerson.id;
				data.leaveTypeId = formValues.leaveType;
				data.duration = parseInt(formValues.leaveDays);
				data.startDate = new Date(formValues.startDate).toISOString();
				data.endDate = new Date(formValues.endDate).toISOString();
				data.reportDate = new Date(formValues.reportingDate).toISOString();
				data.approvingHRMId = formValues.humanResource;
				data.approvingPartnerId = formValues.partner;
			}

			// console.log('Form Data:', data);
			onSubmit(data);
		} catch (error) {
			console.error('Error in handleSubmitForm:', error);
		}
	};
	return (
		<div className="grid md:grid-cols-12 grid-cols-6 gap-2 bg-ocobrown-50">
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
							className="[&[data-state=open]>div>div]:bg-ocobrown-600"
							onClick={() => handleContinueClick('one')}
						>
							<div className="flex items-center space-x-3">
								<div className="bg-ocoblue-200 text-white flex items-center justify-center text-xs p-2 h-4 w-4 rounded-full ">
									1
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
											value={formValues?.leaveType}
											onChange={(e) => {
												setFormValues({
													...formValues,
													leaveType: e.target.value,
												});
											}}
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
											{leaveTypes?.map((item) => (
												<option key={item?.id} value={item?.id}>
													{item?.name}
												</option>
											))}
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
											value={formValues?.leaveDays} // Use selectedStaffType here
											onChange={(e) =>
												setFormValues({
													...formValues,
													leaveDays: e.target.value,
												})
											}
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
											value={formValues?.startDate} // Use selectedStaffType here
											onChange={(e) =>
												setFormValues({
													...formValues,
													startDate: e.target.value,
												})
											}
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
											value={formValues?.endDate}
											onChange={(e) =>
												setFormValues({
													...formValues,
													endDate: e.target.value,
												})
											}
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
											value={formValues?.reportingDate}
											onChange={(e) =>
												setFormValues({
													...formValues,
													reportingDate: e.target.value,
												})
											}
											className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
										/>
									</div>
								</div>
								<div className="w-full flex items-center py-2 justify-center">
									<button
										type="button"
										className="border rounded-md bg-ocoblue-600 text-white hover:bg-ocoblue-600/90 p-1"
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
								<span>Approval</span>
							</div>
						</AccordionTrigger>
						<AccordionContent>
							<div className="flex flex-col border rounded-b-lg">
								<div className="grid grid-cols-6 md:grid-cols-12 gap-4 p-2">
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
									<div className="col-span-6   space-y-1">
										<label
											htmlFor="partner"
											className="block text-xs font-medium text-ocoblue-700"
										>
											Managing Partner / Deputy
										</label>
										<select
											id="partner"
											name="partner"
											value={formValues?.partner} // Use selectedStaffType here
											onChange={(e) => {
												// console.log(e.target.value),
												setFormValues({
													...formValues,
													partner: e.target.value,
												});
											}}
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
											{partners?.map((item) => (
												<option key={item?.id} value={item?.id}>
													{item?.name}
												</option>
											))}
										</select>
									</div>
								</div>
								<div className="w-full flex items-center py-2 justify-center">
									<button
										type="submit"
										className="border rounded-md bg-ocoblue-600 text-white hover:bg-ocoblue-600/90 p-1"
									>
										Save
									</button>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</form>
			<div className="col-span-6">
				<LeaveApplicationPrev prevVal={formValues} />
			</div>
		</div>
	);
}
