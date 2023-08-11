'use client';

import AvatarPlaceholder from '@/public/assets/images/avatar_placeholder.png';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import Image from 'next/image';
import { useRef, useState } from 'react';

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

type StaffFormProps = {
	formValues: any;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	setSelectedFile: (file: File | null) => void;
	setBase64Cover: (base64: string) => void;
};

export default function StaffForm({
	formValues,
	onChange,
	onSelectChange,
	setSelectedFile,
	setBase64Cover,
}: StaffFormProps) {
	const [selectedImage, setSelectedImage] = useState<string>('');
	const avatarRef = useRef<HTMLInputElement>(null);

	const { data: genders } = useQuery<Gender[]>(['genders'], () =>
		axios.get('/api/general/getGenders').then((res) => res.data)
	);
	const { data: staffTypes } = useQuery<StaffType[]>(['staff-types'], () =>
		axios.get('/api/staff/getStaffTypes').then((res) => res.data)
	);
	const { data: teams } = useQuery<Team[]>(['teams'], () =>
		axios.get('/api/staff/getStaffTeams').then((res) => res.data)
	);

	const [selectedStaffType, setSelectedStaffType] = useState<any>('');
	const [designations, setDesignations] = useState<any[]>([]);

	const onStaffAvatarSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event?.target?.files;
		if (files && files.length > 0) {
			const file = files[0];
			const base64Image = await convertToBase64(file);
			setSelectedImage(base64Image);
			setSelectedFile(file);
			setBase64Cover(base64Image);
		}
	};

	const convertToBase64 = (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = (error) => reject(error);
		});
	};

	const updateDesignations = (e: any) => {
		const selectedValue = e?.target?.value;
		setSelectedStaffType(selectedValue);

		const staffType: any = staffTypes?.find((item) => item?.id === parseInt(selectedValue));
		setDesignations(staffType?.designations);
	};

	return (
		<div className="grid grid-cols-6 md:gap-4 md:grid-cols-12">
			{/* Photo Upload Component */}
			<div className="col-span-6 p-1 md:col-span-3 md:border-r-2 border-ocoblue-100">
				<div className="flex flex-col items-center justify-center w-full space-y-2">
					<label htmlFor="photo" className="text-sm font-medium text-ocoblue-700">
						Staff Photo
					</label>

					<Image
						height={20}
						width={20}
						src={formValues?.avatar_url || selectedImage || AvatarPlaceholder}
						alt="Staff Avatar Image"
						className="inline-flex items-center justify-center overflow-hidden rounded-full md:w-24 sm:h-10 md:h-24 sm:w-10 ring-2 ring-offset-1 ring-ocobrown-600 bg-ocoblue-300"
					/>

					<input
						type="file"
						name="avatarUrl"
						id="avatarUrl"
						ref={avatarRef}
						placeholder="Staff Avatar"
						className="hidden"
						onChange={onStaffAvatarSelected}
					/>
					<button
						onClick={() => avatarRef.current?.click()}
						type="button"
						className="p-1 text-sm font-medium leading-4 bg-white border rounded-md shadow-sm border-ocoblue-300 text-ocoblue-700 hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocoblue-500 focus:ring-offset-1"
					>
						Change
					</button>
				</div>
			</div>
			<div className="grid grid-cols-6 col-span-6 gap-4 p-2 md:col-span-9">
				{/* Name */}
				<div className="col-span-6 space-y-1 md:col-span-3">
					<label htmlFor="name" className="block text-sm font-medium text-ocoblue-700">
						Name
					</label>
					<input
						type="text"
						name="name"
						id="name"
						value={formValues?.name}
						onChange={onChange}
						className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
						required
					/>
				</div>

				{/* Staff Type Field  */}
				<div className="col-span-3 space-y-1 md:col-span-3">
					<label
						htmlFor="staff type"
						className="block text-sm font-medium text-ocoblue-700"
					>
						Staff Type
					</label>
					<select
						id="typeId"
						name="typeId"
						value={selectedStaffType} // Use selectedStaffType here
						onChange={updateDesignations}
						className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
					>
						<option disabled value="" className="text-opacity-50 text-ocoblue-700">
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
						className="block text-sm font-medium text-ocoblue-700"
					>
						Designation
					</label>
					<select
						id="designationId"
						name="designationId"
						onChange={onSelectChange}
						value={formValues?.designationId}
						className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 focus:border-ocoblue-500 block p-2.5 h-8 px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
					>
						<option disabled value="" className="text-opacity-50 text-ocoblue-700">
							--Select Designation--
						</option>
						{designations?.map((item: any) => (
							<option key={item?.id} value={item?.id}>
								{item?.name}
							</option>
						))}
					</select>
				</div>

				{/* Staff Team Field  */}
				<div className="col-span-3">
					<label htmlFor="team" className="block text-sm font-medium text-ocoblue-700">
						Team
					</label>
					<div className="mt-1">
						<select
							id="teamId"
							name="teamId"
							value={formValues?.teamId}
							onChange={onSelectChange}
							className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
						>
							<option disabled value="" className="text-opacity-50 text-ocoblue-700">
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
					<label htmlFor="email" className="block text-sm font-medium text-ocoblue-700">
						Email
					</label>
					<div className="mt-1">
						<input
							type="email"
							name="email"
							id="email"
							value={formValues?.email}
							onChange={onChange}
							className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
						/>
					</div>
				</div>

				{/* Staff Mobile Field  */}
				<div className="col-span-6 md:col-span-2">
					<label htmlFor="mobile" className="block text-sm font-medium text-ocoblue-700">
						Mobile
					</label>
					<div className="mt-1">
						<input
							type="tel"
							name="mobile"
							id="mobile"
							onChange={onChange}
							value={formValues?.mobile}
							className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
						/>
					</div>
				</div>

				{/* Staff Number Field  */}
				<div className="col-span-2">
					<label
						htmlFor="staff-no"
						className="block text-sm font-medium text-ocoblue-700"
					>
						Staff Number
					</label>
					<div className="mt-1">
						<input
							type="number"
							name="staffNo"
							id="staffNo"
							onChange={onChange}
							value={formValues?.staffNo}
							className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
						/>
					</div>
				</div>

				{/* Staff Extension Field  */}
				<div className="col-span-2">
					<label htmlFor="ext" className="block text-sm font-medium text-ocoblue-700">
						Staff Extension
					</label>
					<div className="mt-1">
						<input
							type="number"
							name="ext"
							id="ext"
							onChange={onChange}
							value={formValues?.ext}
							className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
						/>
					</div>
				</div>

				{/* Staff Gender Field  */}
				<div className="col-span-2">
					<label htmlFor="gender" className="block text-sm font-medium text-ocoblue-700">
						Gender
					</label>
					<div className="mt-1">
						<select
							id="genderId"
							name="genderId"
							onChange={onSelectChange}
							value={formValues?.genderId}
							className="sm:text-sm w-full bg-ocoblue-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-ocoblue-500 block p-2.5 h-8  px-3 py-1 shadow-ocoblue-300 rounded-md border border-ocoblue-300 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocoblue-50 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
						>
							<option disabled value="" className="text-opacity-50 text-ocoblue-700">
								--Gender--
							</option>
							{genders?.map((gender) => (
								<option
									className="border-ocoblue-300 p-2.5 h-8  px-3 py-1 text-sm font-medium leading-4 text-ocoblue-700 shadow-sm hover:bg-ocobrown-500"
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
	);
}
