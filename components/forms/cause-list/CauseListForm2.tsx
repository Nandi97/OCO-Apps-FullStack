'use client';
import React, { Fragment } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Staff, Team } from '@/lib/types/master';
import { SubmitHandler, useFieldArray, useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Combobox, Transition } from '@headlessui/react';
import ComboBoxWrapper from '@/components/my-ui/form-inputs/ComboBox';

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ');
}

type FormValues = {
	team: Team;
	date: Date;
	cases: [
		{
			coram: string;
			virtual?: number | null;
			url: string;
			case: string;
			advocates: Staff[];
		},
	];
};
const getTeams = async () => {
	const response = await axios.get('/api/staff/team/get');
	return response.data as Array<Team>;
};

const getStaff = async () => {
	const response = await axios.get('/api/staff/get');
	return response.data as Array<Staff>;
};

interface CauseListFormProps {
	onSubmit: SubmitHandler<FormValues>;
	initialValues?: FormValues;
	isPending: boolean;
}

const CauseListForm2 = ({ onSubmit, initialValues, isPending }: CauseListFormProps) => {
	const [isShowing, setIsShowing] = React.useState(false);
	const [selectedPeople, setSelectedPeople] = React.useState<Staff[]>([]);
	const [query, setQuery] = React.useState('');
	const form = useForm<FormValues>({
		defaultValues: {
			...initialValues,
			cases: [
				{
					coram: '',
					virtual: null,
					url: '',
					case: '',
					advocates: [],
				},
			],
		},
	});
	const { register, formState, watch, setValue, control } = form;
	const { errors } = formState;
	const { fields, append, remove } = useFieldArray({
		name: 'cases',
		control,
	});

	const { data: teams } = useQuery({
		queryFn: getTeams,
		queryKey: ['all-teams'],
	});
	const { data: staff } = useQuery({
		queryFn: getStaff,
		queryKey: ['all-staff'],
	});

	const filteredTeams = teams?.filter(
		(t) => t?.name === 'SIMBA' || t?.name === 'TAI' || t?.name === 'TWIGA'
	);

	const filteredStaffTeam = staff?.filter((staff) => staff.team?.name === watch('team.name'));
	const filteredPeople =
		query === ''
			? filteredStaffTeam
			: filteredStaffTeam?.filter((person) => {
					return person.name.toLowerCase().includes(query.toLowerCase());
				});
	const isVirtual = [
		{ id: 1, name: 'YES' },
		{ id: 2, name: 'NO' },
	];

	console.log('Watch All Fields:', watch());

	return (
		<div className="grid grid-cols-6 gap-2">
			<div className="col-span-6">
				<Link
					href={`/court/cause-lists`}
					className="text-primary-500 inline-flex space-x-1 items-center"
				>
					<Icon className="text-secondary-700" icon="heroicons:chevron-left" />
					<span className="text-sm">Back</span>
				</Link>
			</div>
			<div className="md:col-span-3 col-span-6 bg-primary-50">
				<form className="shadow-inner shadow-secondary-600/20 rounded-md w-full flex space-y-4 flex-col">
					<h1 className="w-full bg-primary-600 text-primary-50 rounded-t-md p-2 font-semibold">
						Cause List
					</h1>
					<div className="grid grid-cols-6 gap-2 p-2">
						<div className="md:col-span-3 col-span-6">
							<label className="form-control w-full max-w-xs ">
								<div className="block text-sm font-medium text-secondary-700">
									<span className="label-text">
										Team Handling<sup className="text-xs text-red-500">*</sup>
									</span>
								</div>
								<select
									id="team"
									{...register('team.id', {
										required: { value: true, message: 'Please Select a Team' },
										valueAsNumber: true,
										onChange: () => {
											const teamId = watch('team.id');
											if (teamId) {
												const selectedTeam = teams?.find(
													(t) => t?.id === teamId
												);
												console.log('Watch Team ', selectedTeam);
												if (selectedTeam) {
													setValue('team.name', selectedTeam.name);
												}
											}
										},
									})}
									className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 focus:border-secondary-500 block p-2.5 h-8 px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
									defaultValue=""
								>
									<option
										disabled
										value=""
										className="text-opacity-50 text-secondary-700"
									>
										--Select Team--
									</option>

									{filteredTeams?.map((team) => (
										<option key={team?.id} value={team?.id}>
											{team?.name}
										</option>
									))}
								</select>
								{errors?.team && (
									<div className="text-red-500 text-xs">
										<span className="px-2">
											<sup>*</sup>
											{errors.team.message}
										</span>
									</div>
								)}
							</label>
						</div>
						<div className="md:col-span-3 col-span-6">
							<label className="form-control w-full max-w-xs ">
								<div className="block text-sm font-medium text-secondary-700">
									<span className="label-text">
										Date<sup className="text-xs text-red-500">*</sup>
									</span>
								</div>
								<input
									type="date"
									placeholder="Date"
									{...register('date', {
										required: { value: true, message: 'Date is required' },
										valueAsDate: true,
									})}
									className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
								/>
								{errors?.date && (
									<div className="text-red-500 text-xs">
										<span className="px-2">
											<sup>*</sup>
											{errors.date.message}
										</span>
									</div>
								)}
							</label>
						</div>
					</div>
					<div className="rounded-sm space-y-2 flex flex-col p-3">
						<div className="w-full">
							<button
								onClick={() =>
									append({
										coram: '',
										virtual: null,
										url: '',
										case: '',
										advocates: [],
									})
								}
								type="button"
								className="bg-primary-600 text-primary-50 hover:bg-primary-600/70 flex items-center space-x-2 rounded-md text-sm p-1"
							>
								<Icon icon="heroicons:plus" />
								<span>Add Case</span>
							</button>
						</div>
						<div className="flex w-full flex-col space-y-4">
							{fields.map((field, index) => {
								return (
									<div className="flex w-full" key={field.id}>
										<div
											className={`grid ${index > 0 ? 'w-11/12' : 'w-full'}  grid-cols-6  gap-2 border rounded-md border-secondary-700/10 p-4`}
										>
											<div className="md:col-span-4 col-span-6">
												<label className="form-control w-full max-w-xs ">
													<div className="block text-sm font-medium text-secondary-700">
														<span className="label-text">Coram</span>
													</div>
													<input
														type="text"
														placeholder="Coram"
														{...register(
															`cases.${index}.coram` as 'cases.0.coram',
															{
																required: {
																	value: true,
																	message: 'Please fill in Coram',
																},
															}
														)}
														className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
													/>
												</label>
												{errors?.cases?.[index]?.coram && (
													<div className="text-red-500 text-xs">
														<span className="px-2">
															<sup>*</sup>
															{errors?.cases?.[index]?.coram?.message}
														</span>
													</div>
												)}
											</div>
											<div className="md:col-span-2 col-span-6">
												<label className="form-control w-full max-w-xs ">
													<div className="block text-sm font-medium text-secondary-700">
														<span className="label-text">Virtual</span>
													</div>
													<select
														{...register(
															`cases.${index}.virtual` as 'cases.0.virtual',
															{ valueAsNumber: true }
														)}
														className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 focus:border-secondary-500 block p-2.5 h-8 px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
														defaultValue={``}
													>
														<option
															disabled
															value=""
															className="text-opacity-50 text-secondary-700"
														>
															--Is Virtual?--
														</option>
														{isVirtual?.map((item) => (
															<option key={item.id} value={item.id}>
																{item.name}
															</option>
														))}
													</select>
												</label>
											</div>
											{watch(
												`cases.${index}.virtual` as 'cases.0.virtual'
											) === 1 && (
												<div className="col-span-6 ">
													<label className="form-control w-full max-w-xs ">
														<div className="block text-sm font-medium text-secondary-700">
															<span className="label-text">
																Virtual Url
															</span>
														</div>
														<input
															placeholder="url"
															{...register(
																`cases.${index}.url` as 'cases.0.url'
															)}
															className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
														/>
													</label>
												</div>
											)}
											<div className="col-span-6">
												<label className="form-control w-full max-w-xs ">
													<div className="block text-sm font-medium text-secondary-700">
														<span className="label-text">
															Case No. & Parties
														</span>
													</div>
													<textarea
														{...register(
															`cases.${index}.case` as 'cases.0.case'
														)}
														placeholder="Case No. & Parties"
														className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-20  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
													/>
												</label>
											</div>
											<div className="col-span-6">
												<label
													htmlFor="advocates"
													className="block text-sm font-medium text-secondary-700"
												>
													<div className="block text-sm font-medium text-secondary-700">
														Advocate(s) handling
													</div>
													<select
														{...register(
															`cases.${index}.advocates` as 'cases.0.advocates',
															{
																required: {
																	value: true,
																	message:
																		'Select Advocate Handling',
																},
															}
														)}
														className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 focus:border-secondary-500 block p-2.5 h-8 px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
														defaultValue={``}
														multiple
													>
														<option
															disabled
															value=""
															className="text-opacity-50 text-secondary-700"
														>
															Advocates Handling
														</option>
														{filteredStaffTeam?.map((item) => (
															<option key={item.id} value={item.id}>
																{item.name}
															</option>
														))}
													</select>
													{errors?.cases?.[index]?.advocates && (
														<div className="text-red-500 text-xs">
															<span className="px-2">
																<sup>*</sup>
																{
																	errors?.cases?.[index]
																		?.advocates?.message
																}
															</span>
														</div>
													)}
												</label>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CauseListForm2;
