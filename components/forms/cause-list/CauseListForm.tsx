'use client';

import TextInput from '@/components/my-ui/form-inputs/InputField';
import SelectInput from '@/components/my-ui/form-inputs/SelectField';
import CauseListPreview from '@/components/previews/CauseList';
import { Icon } from '@iconify/react/dist/iconify.js';
import Link from 'next/link';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import CauseListItemForm from './CauseListItemForm';

interface CauseListForm {
	team: string;
	teamId: string;
	date: string;
	causeListItem: [
		{
			coram: string;
			virtual: boolean;
			parties: string;
			advocates: [{ id: string }];
		},
	];
}

interface CauseListFormProps {
	onSubmit: SubmitHandler<CauseListForm>;
	initialValues?: CauseListForm;
	isPending: boolean;
}

const CauseListForm = ({ onSubmit, initialValues, isPending }: CauseListFormProps) => {
	const {
		register,
		watch,
		setError,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: initialValues,
	});

	const teams = [
		{ id: 1, value: 'SIMABA' },
		{ id: 2, value: 'TWIGA' },
		{ id: 3, value: 'TAI' },
	];

	const handleSubmitForm: SubmitHandler<any> = (data) => {
		try {
			console.log(data);
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
									{...register('team')}
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
						<button
							type="button"
							className="items-center rounded-md w-1/6 flex p-1 bg-primary-600 hover:bg-secondary-600 text-primary-50"
						>
							<Icon icon="heroicons:plus-solid" />
							<span>Add Case</span>
						</button>
						<div className="grid grid-cols-6 gap-2 rounded-sm border border-secondary-700/10 p-1">
							<CauseListItemForm />
						</div>
					</div>
				</form>
			</div>
			<div className="md:col-span-3 col-span-6">
				<CauseListPreview />
			</div>
		</div>
	);
};

export default CauseListForm;
