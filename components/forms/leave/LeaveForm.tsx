'use client';

import React, { useState, Fragment } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import useAuthStaff from '@/hooks/useAuthStaff';
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from '@/components/ui/Accordion ';
import { useQuery } from '@tanstack/react-query';
import { addBusinessDays, format } from 'date-fns';
import { Combobox, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { LeaveType, Staff, StaffData } from '@/lib/types/master';
import LeaveApplicationPrev from '@/components/previews/LeaveApplication';

interface LeaveForm {
	employee: Staff;
	supervisorId: string;
	leaveTypeId: string;
	duration: number;
	startDate: Date;
	endDate: Date;
	reportDate: Date;
	finalApproverId: string;
	approvingHRMId: string;
}

const getStaff = async () => {
	const response = await axios.get('/api/staff/get');
	return response.data as Array<Staff>;
};

const getLeaveTypes = async () => {
	const response = await axios.get('/api/leave/leave-type/get');
	return response.data as Array<LeaveType>;
};

interface LeaveFormProps {
	onSubmit: SubmitHandler<LeaveForm>;
	initialValues?: LeaveForm;
	isLoading: any;
}

const LeaveForm2 = ({ onSubmit, initialValues, isLoading }: LeaveFormProps) => {
	const authStaff = useAuthStaff();
	const [reportingDate, setReportingDate] = useState<Date | string | undefined>();
	const [endDate, setEndDate] = useState<Date | string | undefined>();
	const [accValue, setAccValue] = useState('one');
	const [selectedPerson, setSelectedPerson] = useState<Staff>();
	const [hRMid, sethRMId] = useState<string>();
	const [activePartners, setActivePartners] = useState<Staff[]>();
	const [query, setQuery] = useState('');

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<LeaveForm>({
		defaultValues: initialValues,
	});

	const handleContinueClick = (newValue: string) => {
		setAccValue(newValue);
	};

	const { data: leaveTypes } = useQuery({
		queryFn: getLeaveTypes,
		queryKey: ['leave-types'],
	});

	const { data: staff } = useQuery({
		queryFn: getStaff,
		queryKey: ['all-staff'],
	});
	const filteredPeople =
		query === ''
			? staff
			: staff?.filter((person) =>
					person?.name
						.toLowerCase()
						.replace(/\s+/g, '')
						.includes(query.toLowerCase().replace(/\s+/g, ''))
				);

	const partners = staff?.filter(
		(item: any) =>
			item?.designation?.name === 'Deputy Managing Partner' ||
			item?.designation?.name === 'Managing Partner'
	);

	// console.log('All Fields', watch());
	const startDate = watch('startDate');
	const duration = watch('duration');
	React.useEffect(() => {
		if (duration) {
			if (startDate) {
				const newDur = Number(duration - 1);
				const addDuration = addBusinessDays(startDate, newDur);
				console.log('Return Date Fields', addDuration);
				setValue('endDate', addDuration);
				const formatted = format(addDuration, 'yyyy-MM-dd');
				setEndDate(formatted);
			} else {
				setEndDate('');
			}

			if (endDate) {
				const fullRepDate = new Date(endDate);
				const addADay = addBusinessDays(fullRepDate, 1);
				setValue('reportDate', addADay);

				const formatted = format(addADay, 'yyyy-MM-dd');
				setReportingDate(formatted);
			} else {
				setReportingDate('');
			}
		}
		if (!hRMid) {
			const hRM = staff?.find(
				(person) => person?.designation?.name === 'Head of Human Resource'
			)?.id;
			setValue('approvingHRMId', hRM as string);
			sethRMId(hRM);
		}

		if (selectedPerson) {
			setValue('supervisorId', selectedPerson?.id);
		}
		if (authStaff) {
			setValue('employee', authStaff);
		}
	}, [
		watch,
		startDate,
		duration,
		reportingDate,
		endDate,
		setValue,
		hRMid,
		staff,
		authStaff,
		selectedPerson,
	]);

	const handleSubmitForm: SubmitHandler<LeaveForm> = (data) => {
		try {
			// console.log(data);
			onSubmit(data);
		} catch (error) {
			console.error('Error in handleSubmitForm:', error);
		}
	};

	return (
		<div className="grid md:grid-cols-12 grid-cols-6 gap-2 ">
			<form
				className="col-span-6 bg-primary-50 rounded"
				onSubmit={handleSubmit(handleSubmitForm)}
			>
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
									<div className="col-span-6 md:col-span-8 space-y-1">
										<label
											htmlFor="leaveTypeId"
											className="block text-xs font-medium text-secondary-700"
										>
											Type of Leave
										</label>
										<select
											id="leaveTypeId"
											{...register('leaveTypeId', {
												required: {
													value: true,
													message: 'Please select a leave type',
												},
											})}
											className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
											defaultValue={``}
										>
											<option
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
										{errors?.leaveTypeId &&
											(accValue !== 'one' ? (
												(setAccValue('one'),
												(
													<p className="text-xs text-red-500">
														{errors?.leaveTypeId?.message}
													</p>
												))
											) : (
												<p className="text-xs text-red-500">
													{errors?.leaveTypeId?.message}
												</p>
											))}
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
												required: {
													value: true,
													message: 'This field is required',
												},
												valueAsNumber: true,
												min: {
													value: 1,
													message: 'Minimum leave days is 1',
												},
												max: {
													value: authStaff?.leaveBalance
														?.balanceCarryForward as number,

													message: `Minimum leave days is ${authStaff?.leaveBalance?.balanceCarryForward}`,
												},
											})}
											className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
										/>
										{errors?.duration &&
											(accValue !== 'one' ? (
												(setAccValue('one'),
												(
													<p className="text-xs text-red-500">
														{errors?.duration?.message}
													</p>
												))
											) : (
												<p className="text-xs text-red-500">
													{errors?.duration?.message}
												</p>
											))}
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
											{...register('startDate', {
												required: {
													value: true,
													message: 'Start Date is required',
												},
												valueAsDate: true,
											})}
											disabled={!duration || duration < 1 ? true : false}
											className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
										/>
										{errors?.startDate &&
											(accValue !== 'one' ? (
												(setAccValue('one'),
												(
													<p className="text-xs text-red-500">
														{errors?.startDate?.message}
													</p>
												))
											) : (
												<p className="text-xs text-red-500">
													{errors?.startDate?.message}
												</p>
											))}
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
											readOnly
											value={endDate as string}
											{...register('endDate', {
												valueAsDate: true,
											})}
											disabled
											className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
										/>
									</div>
									<div className="col-span-6 space-y-1">
										<label
											htmlFor="reportOn"
											className="block text-xs font-medium text-secondary-700"
										>
											Reporting Back on
										</label>
										<input
											type="date"
											id="reportOn"
											readOnly
											value={reportingDate as string}
											{...register('reportDate', {
												valueAsDate: true,
											})}
											disabled
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
											htmlFor="finalApprover"
											className="block text-xs font-medium text-secondary-700"
										>
											Final Approver
										</label>
										<select
											id="finalApprover"
											{...register('finalApproverId', {
												required: {
													value: true,
													message: 'Please Select the final Approver',
												},
											})}
											className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
											defaultValue={``}
										>
											<option
												disabled
												value=""
												className="text-opacity-50 text-secondary-700"
											>
												--Select Final Approver--
											</option>
											{partners?.map((item) => (
												<option key={item?.id} value={item?.id}>
													{item?.name}
												</option>
											))}
										</select>
										{errors?.finalApproverId &&
											(accValue !== 'two' ? (
												(setAccValue('two'),
												(
													<p className="text-xs text-red-500">
														{errors?.finalApproverId?.message}
													</p>
												))
											) : (
												<p className="text-xs text-red-500">
													{errors?.finalApproverId?.message}
												</p>
											))}
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

			<div className="col-span-6 bg-primary-50 rounded">
				<LeaveApplicationPrev prevVal={watch()} />
			</div>
		</div>
	);
};

export default LeaveForm2;
