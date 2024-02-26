'use client';

import React, { useState, useEffect, Fragment } from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../ui/Accordion ';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Combobox, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import LeaveApplicationPrev from '../../previews/LeaveApplication';
import { useSession } from 'next-auth/react';
import { LeaveType, Staff } from '@/lib/types/master';
import { addBusinessDays, format } from 'date-fns';
import useStaggeredTime from '@/hooks/useStaggeredTime';

interface LeaveForm {
	employee: Staff;
	supervisorId: string;
	leaveTypeId: string;
	duration: number;
	startDate: string;
	endDate: string;
	reportDate: string;
	finalApproverId: string;
	approvingHRMId: string;
}

interface HolidayApiParams {
	api_key: any;
	country: string;
	year: number;
}

interface LeaveFormProps {
	onSubmit: SubmitHandler<LeaveForm>;
	initialValues?: LeaveForm;
	isLoading: any;
}

const getStaff = async () => {
	const response = await axios.get('/api/staff/get');
	return response.data as Array<Staff>;
};

const getLeaveTypes = async () => {
	const response = await axios.get('/api/leave/leave-type/get');
	return response.data as Array<LeaveType>;
};

const getHolidays = async () => {
	const response = await axios.get(
		'https://holidays.abstractapi.com/v1/?api_key=6db54d5cbb2e413585c7c2271825d55f&country=KE&year=2024&month=12&day=25'
	);
	return response.data as Array<any>;
};

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ');
}

export default function LeaveForm({ onSubmit, initialValues, isLoading }: LeaveFormProps) {
	const { data: session } = useSession();
	const [accValue, setAccValue] = useState('one');
	const [query, setQuery] = useState('');
	const [selectedPerson, setSelectedPerson] = useState<Staff>();
	const [sessionUser, setSessionUser] = useState<Staff>();
	const [prevValues, setPrevValues] = useState<LeaveForm>();

	const [endDate, setEndDate] = useState<any>();
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<LeaveForm>({
		defaultValues: initialValues,
	});

	const { data: staff } = useQuery({
		queryFn: getStaff,
		queryKey: ['all-staff'],
	});
	const { data: leaveTypes } = useQuery({
		queryFn: getLeaveTypes,
		queryKey: ['leave-types'],
	});
	const { data: holidays } = useQuery({
		queryFn: getHolidays,
		queryKey: ['ke-holidays'],
	});

	const partners = staff?.filter(
		(item: any) =>
			item?.designation?.name === 'Deputy Managing Partner' ||
			item?.designation?.name === 'Managing Partner'
	);

	const filteredPeople =
		query === ''
			? staff
			: staff?.filter((person) =>
					person?.name
						.toLowerCase()
						.replace(/\s+/g, '')
						.includes(query.toLowerCase().replace(/\s+/g, ''))
				);

	const handleContinueClick = (newValue: string) => {
		setAccValue(newValue);
	};

	const handlePreviousClick = (newValue: string) => {
		setAccValue(newValue);
	};

	const customTime = new Date().getTime();

	useEffect(() => {
		const defaultDate = new Date('01 January 1900 00:00:00 UTC+03:00');
		const formPrevVal = watch();
		const duration = watch('duration');
		const startDate = watch('startDate')
			? new Date(watch('startDate') + customTime)
			: defaultDate;

		const HRMId = staff?.find(
			(person) => person?.designation?.name === 'Head of Human Resource'
		)?.id;

		if (HRMId) {
			setValue('approvingHRMId', HRMId);
		}
		if (selectedPerson) {
			setValue('supervisorId', selectedPerson?.id);
		}

		if (formPrevVal) {
			setPrevValues(formPrevVal);
		}

		if (session) {
			const selectedUser = staff?.find((item: any) => item?.email === session?.user?.email);
			if (selectedUser) {
				setSessionUser(selectedUser);
				setValue('employee', selectedUser);
			}
		}

		if (startDate && duration) {
			let tempEndDate = addBusinessDays(startDate, duration);

			// Adjust end date for holidays
			holidays?.forEach((holiday) => {
				const holidayDate = new Date(holiday?.date + customTime);
				if (holidayDate >= startDate && holidayDate <= tempEndDate) {
					tempEndDate = addBusinessDays(tempEndDate, 1);
				}
			});
			const computedTempEndDate = format(new Date(tempEndDate), 'yyyy-MM-dd');
			setEndDate(computedTempEndDate);
			setValue('endDate', tempEndDate ? computedTempEndDate : '');
			const reportDate = format(addBusinessDays(tempEndDate, 1), 'yyyy-MM-dd');

			setValue('reportDate', reportDate ? reportDate : '');
		}
	}, [session, selectedPerson, staff, watch, leaveTypes, setValue, holidays, customTime]);
	console.log('Session User', sessionUser);

	const handleSubmitForm: SubmitHandler<LeaveForm> = (data) => {
		try {
			// console.log(data);
			onSubmit(data);
		} catch (error) {
			console.error('Error in handleSubmitForm:', error);
		}
	};
	return (
		<div className="grid md:grid-cols-12 grid-cols-6 gap-2 bg-primary-50">
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
							className="[&[data-state=open]>div>div]:bg-primary-600"
							onClick={() => handleContinueClick('one')}
						>
							<div className="flex items-center space-x-3">
								<div className="bg-secondary-200 text-white flex items-center justify-center text-xs p-2 h-4 w-4 rounded-full ">
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
											className="block text-xs font-medium text-secondary-700"
										>
											Type of Leave
										</label>
										<select
											id="leaveTypeId"
											{...register('leaveTypeId', { required: true })}
											className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
										>
											<option
												selected
												disabled
												value=""
												className="text-opacity-50 text-secondary-700"
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
											className="block text-xs font-medium text-secondary-700"
										>
											Duration
										</label>
										<input
											type="number"
											id="duration"
											{...register('duration', {
												valueAsNumber: true,
												min: 1,
												max:
													sessionUser?.leaveBalance
														?.balanceCarryForward ||
													sessionUser?.leaveBalance?.annualEntitlement,
											})}
											className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
										/>
										{errors?.duration && (
											<p className="text-xs text-red-500">
												Please check your duration
											</p>
										)}
									</div>
									<div className="col-span-6 space-y-1">
										<label
											htmlFor="startedAt"
											className="block text-xs font-medium text-secondary-700"
										>
											Start Date
										</label>
										<input
											type="date"
											id="startedAt"
											min={format(new Date(), 'yyyy-MM-dd')}
											{...register('startDate', {
												valueAsDate: true,
												required: true,
											})}
											className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
										/>
									</div>
									<div className="col-span-6 space-y-1">
										<label
											htmlFor="endedAt"
											className="block text-xs font-medium text-secondary-700"
										>
											End Date
										</label>
										<input
											type="date"
											id="endedAt"
											value={endDate}
											{...register('endDate', {
												valueAsDate: true,
												required: true,
											})}
											className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
										/>
									</div>
									<div className="col-span-6 space-y-1">
										<label
											htmlFor="reportOn"
											className="block text-xs font-medium text-secondary-700"
										>
											Report Back On
										</label>
										<input
											type="date"
											id="reportOn"
											{...register('reportDate', {
												valueAsDate: true,
												required: true,
											})}
											className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
										/>
									</div>
								</div>
								<div className="w-full flex items-center py-2 justify-center">
									<button
										type="button"
										className="border rounded-md bg-secondary-600 text-white hover:bg-secondary-600/90 p-1"
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
							className="[&[data-state=open]>div>div]:bg-primary-600"
							onClick={() => handleContinueClick('two')}
						>
							<div className="flex items-center space-x-3">
								<div className="bg-secondary-200 text-white flex items-center justify-center text-xs p-2 h-4 w-4 rounded-full ">
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
										<Combobox.Label className="block text-xs font-medium text-secondary-700">
											Supervisor
										</Combobox.Label>
										<div className="relative mt-1">
											<Combobox.Input
												className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
												onChange={(event) => setQuery(event.target.value)}
												displayValue={(staff: any) => staff?.name}
											/>
											<Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
												<Icon
													icon="heroicons:chevron-up-down"
													className="h-5 w-5 text-gray-400"
													aria-hidden="true"
												/>
											</Combobox.Button>

											<Transition
												as={Fragment}
												leave="transition ease-in duration-100"
												leaveFrom="opacity-100"
												leaveTo="opacity-0"
												afterLeave={() => setQuery('')}
											>
												<Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
													{filteredPeople?.length === 0 &&
													query !== '' ? (
														<div className="relative cursor-default select-none px-4 py-2 text-gray-700">
															Nothing found.
														</div>
													) : (
														filteredPeople?.map((person) => (
															<Combobox.Option
																key={person.id}
																className={({ active }) =>
																	`relative cursor-default select-none py-2 pl-10 pr-4 ${
																		active
																			? 'bg-primary-600 text-white'
																			: 'text-gray-900'
																	}`
																}
																value={person}
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
																			{person.name}
																		</span>
																		{selected ? (
																			<span
																				className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
																					active
																						? 'text-white'
																						: 'text-primary-600'
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
									<div className="col-span-6   space-y-1">
										<label
											htmlFor="partner"
											className="block text-xs font-medium text-secondary-700"
										>
											Managing Partner / Deputy
										</label>
										<select
											id="partner"
											{...register('finalApproverId', {
												required: true,
											})}
											className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
										>
											<option
												selected
												disabled
												value=""
												className="text-opacity-50 text-secondary-700"
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
										className="border rounded-md bg-secondary-600 text-white hover:bg-secondary-600/90 p-1"
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
				<LeaveApplicationPrev prevVal={prevValues} />
			</div>
		</div>
	);
}
