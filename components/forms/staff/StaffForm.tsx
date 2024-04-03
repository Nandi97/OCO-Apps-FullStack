'use client';

import AvatarPlaceholder from '@/public/assets/images/avatar_placeholder.png';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import TextInput from '@/components/my-ui/form-inputs/InputField';

interface StaffForm {
	name: string;
	email: string;
	mobile: string;
	ext: number;
	staffNo: number;
	avatarUrl: string;
	teamId: number;
	designationId: number;
	genderId: number;
}

type Gender = {
	id: number;
	name: string;
};

type StaffType = {
	id: number;
	name: string;
	designations: any[];
};

type Team = {
	id: number;
	name: string;
};

interface StaffFormProps {
	onSubmit: SubmitHandler<StaffForm>;
	initialValues?: StaffForm;
	isPending: boolean;
}

const fetchAllGenders = async () => {
	const response = await axios.get('/api/general/gender/get');
	return response.data;
};
const fetchAllStaffTypes = async () => {
	const response = await axios.get('/api/staff/types/get');
	return response.data;
};
const fetchAllStaffTeams = async () => {
	const response = await axios.get('/api/staff/team/get');
	return response.data;
};

export default function StaffForm({ onSubmit, initialValues, isPending }: StaffFormProps) {
	const [selectedImage, setSelectedImage] = useState<string>('');
	const avatarRef = useRef<HTMLInputElement>(null);
	const [selectedType, setSelectedType] = useState<any>();

	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<StaffForm>({
		defaultValues: initialValues,
	});

	const { data: genders } = useQuery<Gender[]>({
		queryKey: ['genders'],
		queryFn: fetchAllGenders,
	});
	const { data: staffTypes } = useQuery<StaffType[]>({
		queryKey: ['staff-types'],
		queryFn: fetchAllStaffTypes,
	});
	const { data: teams } = useQuery<Team[]>({
		queryKey: ['teams'],
		queryFn: fetchAllStaffTeams,
	});

	const convertToBase64 = (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = (error) => reject(error);
		});
	};

	const onStaffAvatarSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event?.target?.files;
		if (files && files.length > 0) {
			const file = files[0];
			const base64Image = await convertToBase64(file);
			setSelectedImage(base64Image);
		}
	};

	const designations = staffTypes?.find((item) => item?.id === parseInt(selectedType));

	const handleSubmitForm: SubmitHandler<StaffForm> = (data) => {
		if (selectedImage) {
			data.avatarUrl = selectedImage;
		} else {
			data.avatarUrl = '/assets/images/logo-placeholder-image.png';
		}
		try {
			onSubmit(data);
		} catch (error) {
			console.error('Error in handleSubmitForm:', error);
		}
	};

	return (
		<form
			className="flex w-full flex-col justify-center md:w-4/6"
			onSubmit={handleSubmit(handleSubmitForm)}
		>
			<div className="grid grid-cols-6 md:grid-cols-12 md:gap-4">
				{/* Photo Upload Component */}
				<div className="col-span-6 border-secondary-100 p-1 md:col-span-3 md:border-r-2">
					<div className="flex w-full flex-col items-center justify-center space-y-2">
						<label htmlFor="photo" className="text-sm font-medium text-secondary-700">
							Staff Photo
						</label>

						<Image
							height={20}
							width={20}
							src={initialValues?.avatarUrl || selectedImage || AvatarPlaceholder}
							alt="Staff Avatar Image"
							className="inline-flex items-center justify-center overflow-hidden rounded-full bg-secondary-300 ring-2 ring-primary-600 ring-offset-1 sm:h-10 sm:w-10 md:h-24 md:w-24"
						/>

						<input
							type="file"
							name="avatarUrl"
							id="avatarUrl"
							ref={avatarRef}
							accept="image/*"
							placeholder="Staff Avatar"
							className="hidden"
							onChange={onStaffAvatarSelected}
						/>
						<button
							onClick={() => avatarRef.current?.click()}
							type="button"
							className="rounded-md border border-secondary-300 bg-white p-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-1"
						>
							Change
						</button>
					</div>
				</div>
				<div className="col-span-6 grid grid-cols-6 gap-4 p-2 md:col-span-9">
					{/* Name */}
					{/* <div className="col-span-6 space-y-1 md:col-span-3">
						<label
							htmlFor="name"
							className="block text-sm font-medium text-secondary-700"
						>
							Name
						</label>
						<input
							type="text"
							id="name"
							{...register('name', { required: true })}
							className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
							required
						/>
						{errors.name && (
							<p className="text-xs text-red-500">Please enter a valid name</p>
						)}
					</div> */}
					<TextInput
						type="text"
						label="Name"
						className="col-span-6 space-y-1 md:col-span-3"
						error={errors.name}
						registration={register('name', { required: true })}
					/>

					{/* Staff Type Field  */}
					<div className="col-span-3 space-y-1 md:col-span-3">
						<label
							htmlFor="type"
							className="block text-sm font-medium text-secondary-700"
						>
							Staff Type
						</label>
						<select
							id="type"
							name="type"
							value={selectedType} // Use selectedStaffType here
							onChange={(e) => setSelectedType(e.target.value)}
							className="border-1 shadow-accent-300 block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
						>
							<option
								selected
								disabled
								value=""
								className="text-secondary-700 text-opacity-50"
							>
								--Select Staff Type--
							</option>
							{staffTypes?.map((item) => (
								<option key={item?.id} value={item?.id}>
									{item?.name}
								</option>
							))}
						</select>
					</div>

					{/* Designation Field  */}
					<div className="col-span-3 space-y-1 md:col-span-3">
						<label
							htmlFor="designation"
							className="block text-sm font-medium text-secondary-700"
						>
							Designation
						</label>
						<select
							id="designationId"
							{...register('designationId', {
								required: true,
								valueAsNumber: true,
								validate: (value) => value > 0,
							})}
							className="border-1 shadow-accent-300 block h-8 w-full rounded-md border border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5 px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
							disabled={!selectedType ? true : false}
						>
							<option
								selected
								disabled
								value=""
								className="text-secondary-700 text-opacity-50"
							>
								--Select Designation--
							</option>
							{designations?.designations?.map((item: any) => (
								<option key={item?.id} value={item?.id}>
									{item?.name}
								</option>
							))}
						</select>
					</div>

					{/* Staff Team Field  */}
					<div className="col-span-3">
						<label
							htmlFor="team"
							className="block text-sm font-medium text-secondary-700"
						>
							Team
						</label>
						<div className="mt-1">
							<select
								id="teamId"
								{...register('teamId', {
									required: true,
									valueAsNumber: true,
									validate: (value) => value > 0,
								})}
								className="border-1 shadow-accent-300 block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
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
									<option key={team?.id} value={team?.id}>
										{team?.name}
									</option>
								))}
							</select>
						</div>
					</div>

					{/* Staff Email Field  */}
					<div className="col-span-6 md:col-span-4">
						<label
							htmlFor="email"
							className="block text-sm font-medium text-secondary-700"
						>
							Email
						</label>
						<div className="mt-1">
							<input
								type="email"
								id="email"
								{...register('email', { required: true })}
								className="border-1 shadow-accent-300 block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
							/>
						</div>
					</div>

					{/* Staff Mobile Field  */}
					<div className="col-span-6 md:col-span-2">
						<label
							htmlFor="mobile"
							className="block text-sm font-medium text-secondary-700"
						>
							Mobile
						</label>
						<div className="mt-1">
							<input
								type="tel"
								id="mobile"
								{...register('mobile', { required: true })}
								className="border-1 shadow-accent-300 block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
							/>
						</div>
					</div>

					{/* Staff Number Field  */}
					<div className="col-span-2">
						<label
							htmlFor="staff-no"
							className="block text-sm font-medium text-secondary-700"
						>
							Staff Number
						</label>
						<div className="mt-1">
							<input
								id="staffNo"
								{...register('staffNo', {
									required: true,
									valueAsNumber: true,
									validate: (value) => value > 0,
								})}
								className="border-1 shadow-accent-300 block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
							/>
						</div>
					</div>

					{/* Staff Extension Field  */}
					<div className="col-span-2">
						<label
							htmlFor="ext"
							className="block text-sm font-medium text-secondary-700"
						>
							Staff Extension
						</label>
						<div className="mt-1">
							<input
								type="number"
								id="ext"
								{...register('ext', {
									required: true,
									valueAsNumber: true,
									validate: (value) => value > 0,
								})}
								className="border-1 shadow-accent-300 block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
							/>
						</div>
					</div>

					{/* Staff Gender Field  */}
					<div className="col-span-2">
						<label
							htmlFor="gender"
							className="block text-sm font-medium text-secondary-700"
						>
							Gender
						</label>
						<div className="mt-1">
							<select
								id="genderId"
								{...register('genderId', {
									required: true,
									valueAsNumber: true,
									validate: (value) => value > 0,
								})}
								className="border-1 shadow-accent-300 block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
							>
								<option
									selected
									disabled
									value=""
									className="text-secondary-700 text-opacity-50"
								>
									--Gender--
								</option>
								{genders?.map((gender) => (
									<option
										className="h-8 border-secondary-300 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-primary-500"
										key={gender.id}
										value={gender.id}
									>
										{gender.name}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>
			</div>
			<div className="flex w-full items-center justify-center space-x-2 py-8">
				<button
					type="submit"
					className="flex items-center gap-2 rounded-md border border-primary-300 bg-primary-600 p-2 text-sm font-medium leading-4 text-white shadow-sm hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
				>
					Submit Form
				</button>
				<Link
					href={`/staff/staff-list/`}
					className="flex items-center gap-2 rounded-md border border-secondary-300 bg-secondary-600 p-2 text-sm font-medium leading-4 text-white shadow-sm hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-1"
				>
					Cancel
				</Link>
			</div>
		</form>
	);
}
