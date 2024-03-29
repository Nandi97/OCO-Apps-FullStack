'use client';

import TextInput from '@/components/my-ui/form-inputs/InputField';
import SelectInput from '@/components/my-ui/form-inputs/SelectField';
import CauseListPreview from '@/components/previews/CauseList';
import { Icon } from '@iconify/react/dist/iconify.js';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import { Staff } from '@/lib/types/staff';
import { useQuery } from '@tanstack/react-query';
import { DevTool } from '@hookform/devtools';

interface CauseListForm {
	team: { id: number; name: string };
	date: Date;
	cases: [
		{
			coram: string;
			virtual: number;
			url: string;
			case: string;
			advocates: Staff[];
		},
	];
}

const fetchAllStaff = async () => {
	const response = await axios.get('/api/staff/get');
	return response.data as Array<Staff>;
};

const fetchAllTeams = async () => {
	const response = await axios.get('/api/staff/team/get');
	return response.data as Array<any>;
};

interface CauseListFormProps {
	onSubmit: SubmitHandler<CauseListForm>;
	initialValues?: CauseListForm;
	isPending: boolean;
}

const CauseListForm = ({ onSubmit, initialValues, isPending }: CauseListFormProps) => {
	const [causeListItems, setCauseListItems] = useState<any>([
		{
			key: 0,
			coram: '',
			virtual: 0,
			url: '',
			case: '',
			advocates: [],
		},
	]);
	const [teamHandling, setTeamHandling] = useState('');
	const form = useForm<CauseListForm>({
		defaultValues: initialValues,
	});

	const {
		register,
		control,
		setValue,
		handleSubmit,
		watch,
		formState: { errors },
	} = form;

	const { fields, append, remove } = useFieldArray({
		name: 'cases',
		control,
	});

	const watchAllFields: CauseListForm = watch();

	console.log(watchAllFields);

	const { data: staffTeams } = useQuery({
		queryFn: fetchAllTeams,
		queryKey: ['teams'],
	});

	const { data: staff } = useQuery({
		queryFn: fetchAllStaff,
		queryKey: ['allStaff'],
	});

	useEffect(() => {
		const findTeam = staffTeams?.find((t: any) => t?.name === teamHandling);
		setValue('team', findTeam);
	}, [setValue, staffTeams, teamHandling]);

	const teams = [
		{ id: 1, value: 'SIMBA' },
		{ id: 2, value: 'TWIGA' },
		{ id: 3, value: 'TAI' },
	];

	const isVirtual = [
		{ id: 1, name: 'YES' },
		{ id: 2, name: 'NO' },
	];

	const filteredStaffTeam = staff?.filter((staff) => staff.team?.name === teamHandling);

	const handleSubmitForm: SubmitHandler<any> = (data) => {
		try {
			if (data) {
				data.cases = causeListItems;
			}
			onSubmit(data);
		} catch (error) {
			console.error('Error in handleSubmitForm:', error);
		}
	};

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
			<div className="md:col-span-3 col-span-6">
				<form
					className="shadow-inner shadow-secondary-600/20 rounded-md bg-primary-50 p-2 w-full flex space-y-4 flex-col"
					onSubmit={handleSubmit(handleSubmitForm)}
				>
					<h1>Cause List</h1>
					<div className="grid grid-cols-6 gap-2">
						<div className="md:col-span-3 col-span-6">
							<label className="form-control w-full max-w-xs ">
								<div className="block text-sm font-medium text-secondary-700">
									<span className="label-text">Team Handling</span>
								</div>
								<select
									name="team"
									id="team"
									value={teamHandling}
									onChange={(e) => setTeamHandling(e.target.value)}
									className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 focus:border-secondary-500 block p-2.5 h-8 px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
								>
									<option
										selected
										disabled
										value=""
										className="text-opacity-50 text-secondary-700"
									>
										--Select Team--
									</option>

									{teams?.map((team) => (
										<option key={team.id} value={team.value}>
											{team.value}
										</option>
									))}
								</select>
							</label>
						</div>

						<div className="md:col-span-3 col-span-6">
							<label className="form-control w-full max-w-xs ">
								<div className="block text-sm font-medium text-secondary-700">
									<span className="label-text">Date</span>
								</div>
								<input
									type="date"
									placeholder="Date"
									{...register('date', { required: true, valueAsDate: true })}
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
					<div className="rounded-sm space-y-2 flex flex-col shadow-2 shadow-secondary-700/20 p-3">
						<div className="w-full">
							<button
								onClick={() =>
									append({
										coram: '',
										virtual: 0,
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
							{fields?.map((field, index) => {
								return (
									<div className="flex w-full" key={field.id}>
										<div
											className={`grid ${index > 0 ? 'w-11/12' : 'w-full'}  grid-cols-6  gap-2 rounded-sm border border-secondary-700/10 p-4`}
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
															`cases.${index}.coram` as const
														)}
														className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
													/>
												</label>
											</div>
											<div className="md:col-span-2 col-span-6">
												<label className="form-control w-full max-w-xs ">
													<div className="block text-sm font-medium text-secondary-700">
														<span className="label-text">Virtual</span>
													</div>
													<select
														id={`virtual-${index}`}
														{...register(
															`cases.${index}.virtual` as const
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
											{watch(`cases.${index}.virtual`) === '1' && (
												<div className="col-span-6 ">
													<label className="form-control w-full max-w-xs ">
														<div className="block text-sm font-medium text-secondary-700">
															<span className="label-text">
																Virtual Url
															</span>
														</div>
														<input
															id={`url-${index}`}
															placeholder="url"
															{...register(
																`cases.${index}.url` as const
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
														id={`case-${index}`}
														{...register(
															`cases.${index}.case` as const
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
														id={`advocates-${index}`}
														{...register(
															`cases.${index}.advocates` as const
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
															--Is Virtual?--
														</option>
														{filteredStaffTeam?.map((item) => (
															<option key={item.id} value={item.id}>
																{item.name}
															</option>
														))}
													</select>
												</label>
											</div>
										</div>
										{index > 0 && (
											<div className="w-1/12 flex items-center justify-center">
												<button
													onClick={() => remove(index)}
													className="bg-primary-50 border border-primary-600 text-primary-600 p-1 hover:text-primary-50 hover:bg-primary-600 rounded-md"
													type="button"
												>
													<span className="sr-only">Delete</span>
													<Icon icon="heroicons:trash" />
												</button>
											</div>
										)}
									</div>
								);
							})}
						</div>
					</div>
					<div className="w-full flex items-center justify-center">
						<button
							type="submit"
							className="bg-primary-600 text-primary-50 hover:bg-primary-600/70 flex items-center space-x-2 rounded-md text-sm p-1"
						>
							<span>Submit</span>
						</button>
					</div>
				</form>
				<DevTool control={control} />
			</div>
			<div className="md:col-span-3 col-span-6">
				{/* <CauseListPreview formData={formData} /> */}
			</div>
		</div>
	);
};

export default CauseListForm;
