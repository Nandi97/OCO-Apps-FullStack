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
					className="inline-flex items-center space-x-1 text-primary-500"
				>
					<Icon className="text-secondary-700" icon="heroicons:chevron-left" />
					<span className="text-sm">Back</span>
				</Link>
			</div>
			<div className="col-span-6 md:col-span-3">
				<form
					className="flex w-full flex-col space-y-4 rounded-md bg-primary-50 p-2 shadow-inner shadow-secondary-600/20"
					onSubmit={handleSubmit(handleSubmitForm)}
				>
					<h1>Cause List</h1>
					<div className="grid grid-cols-6 gap-2">
						<div className="col-span-6 md:col-span-3">
							<label className="form-control w-full max-w-xs ">
								<div className="block text-sm font-medium text-secondary-700">
									<span className="label-text">Team Handling</span>
								</div>
								<select
									name="team"
									id="team"
									value={teamHandling}
									onChange={(e) => setTeamHandling(e.target.value)}
									className="border-1 shadow-accent-300 block h-8 w-full rounded-md border border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5 px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
								>
									<option
										selected
										disabled
										value=""
										className="text-secondary-700 text-opacity-50"
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

						<div className="col-span-6 md:col-span-3">
							<label className="form-control w-full max-w-xs ">
								<div className="block text-sm font-medium text-secondary-700">
									<span className="label-text">Date</span>
								</div>
								<input
									type="date"
									placeholder="Date"
									{...register('date', { required: true, valueAsDate: true })}
									className="border-1 shadow-accent-300 block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
								/>
								{errors?.date && (
									<div className="text-xs text-red-500">
										<span className="px-2">
											<sup>*</sup>
											{errors.date.message}
										</span>
									</div>
								)}
							</label>
						</div>
					</div>
					<div className="flex flex-col space-y-2 rounded-sm p-3 shadow-2 shadow-secondary-700/20">
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
								className="flex items-center space-x-2 rounded-md bg-primary-600 p-1 text-sm text-primary-50 hover:bg-primary-600/70"
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
											<div className="col-span-6 md:col-span-4">
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
														className="border-1 shadow-accent-300 block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
													/>
												</label>
											</div>
											<div className="col-span-6 md:col-span-2">
												<label className="form-control w-full max-w-xs ">
													<div className="block text-sm font-medium text-secondary-700">
														<span className="label-text">Virtual</span>
													</div>
													<select
														id={`virtual-${index}`}
														{...register(
															`cases.${index}.virtual` as const
														)}
														className="border-1 shadow-accent-300 block h-8 w-full rounded-md border border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5 px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
														defaultValue={``}
													>
														<option
															disabled
															value=""
															className="text-secondary-700 text-opacity-50"
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
															className="border-1 shadow-accent-300 block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
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
														className="border-1 shadow-accent-300 block h-20 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
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
														className="border-1 shadow-accent-300 block h-8 w-full rounded-md border border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5 px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
														defaultValue={``}
														multiple
													>
														<option
															disabled
															value=""
															className="text-secondary-700 text-opacity-50"
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
											<div className="flex w-1/12 items-center justify-center">
												<button
													onClick={() => remove(index)}
													className="rounded-md border border-primary-600 bg-primary-50 p-1 text-primary-600 hover:bg-primary-600 hover:text-primary-50"
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
					<div className="flex w-full items-center justify-center">
						<button
							type="submit"
							className="flex items-center space-x-2 rounded-md bg-primary-600 p-1 text-sm text-primary-50 hover:bg-primary-600/70"
						>
							<span>Submit</span>
						</button>
					</div>
				</form>
				<DevTool control={control} />
			</div>
			<div className="col-span-6 md:col-span-3">
				{/* <CauseListPreview formData={formData} /> */}
			</div>
		</div>
	);
};

export default CauseListForm;
