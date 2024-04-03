import { Asset } from '@/lib/types/master';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface AssetMaintenance {
	assetId: string;
	maintenanceDate: string;
	description: string;
	cost: number;
}

type MaintenanceProps = {
	setToggle: (toggle: boolean) => void;
	assetId?: string;
};

const getAnAsset = async (slug: string) => {
	const response = await axios.get(`/api/asset/get/${slug}`);
	return response.data;
};

const CreateMaintenance = ({ setToggle, assetId }: MaintenanceProps) => {
	let toastId: string;

	const {
		register,
		watch,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<AssetMaintenance>({
		mode: 'all',
	});
	const { data } = useQuery<Asset>({
		queryFn: () => getAnAsset(assetId as string),
		queryKey: ['assets', assetId],
	});

	useEffect(() => {
		if (data) {
			setValue('assetId', data.id);
		}
	}, [setValue, data]);

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: AssetMaintenance) => {
			const response = await axios.post('/api/asset/maintenance/post', data);
			return response.data;
		},

		onError: (error: any) => {
			if (error instanceof AxiosError) {
				toast.error('Error Logging Maintenance', {
					id: toastId,
				});
			}
		},
		onSuccess: (data: any) => {
			toast.success('Maintenance Logged Successfully', { id: toastId });
			setToggle(false);
		},
	});

	const handleSubmitForm: SubmitHandler<AssetMaintenance> = (data) => {
		try {
			mutate(data);
			// console.log(data);
		} catch (error) {
			console.error('Error in handleSubmitForm:', error);
		}
	};

	return (
		<div className="fixed left-0 top-0 z-20 -mt-20 h-full w-full bg-secondary-700/50">
			<div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center gap-6 rounded-lg bg-white p-12">
				<button
					type="button"
					onClick={(e) => {
						e.stopPropagation();
						setToggle(false);
					}}
					className="absolute right-2 top-2"
				>
					<Icon icon="heroicons:x-mark" />
					<span className="sr-only">close</span>
				</button>
				<form className="grid grid-cols-12 gap-4" onSubmit={handleSubmit(handleSubmitForm)}>
					<div className="col-span-6">
						<label htmlFor="name">
							<div className="block text-sm font-medium text-secondary-700">
								<span className="label-text">Maintenance for</span>
							</div>
							<div className="mt-1">
								<input
									type="text"
									id="name"
									placeholder="Name"
									value={data?.name}
									className="border-1 shadow-accent-300 block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700/50 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500/50 focus:shadow-inner sm:text-sm"
									disabled
								/>
							</div>
						</label>
					</div>
					<div className="col-span-6">
						<label htmlFor="maintenance-date">
							<div className="block text-sm font-medium text-secondary-700">
								<span className="label-text">
									Maintenance Date<sup className="text-red-600">*</sup>
								</span>
							</div>
							<div className="mt-1">
								<input
									{...register('maintenanceDate', {
										required: true,
										valueAsDate: true,
									})}
									className="border-1 shadow-accent-300 block h-8 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
									id="maintenance-date"
									placeholder="maintenance Date"
									type="date"
								/>
							</div>
						</label>
					</div>
					<div className="col-span-full">
						<label htmlFor="description">
							<div className="block text-sm font-medium text-secondary-700">
								<span className="label-text">
									Description<sup className="text-red-600">*</sup>
								</span>
							</div>
							<div className="mt-1">
								<textarea
									{...register('description', { required: true })}
									className="border-1 shadow-accent-300 block h-20 w-full rounded-md border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5  px-3 py-1 text-sm font-medium leading-4 text-secondary-700 shadow-sm shadow-secondary-300 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 sm:text-sm"
									id="description"
									placeholder="Describe what has been done for maintenance"
								/>
							</div>
						</label>
					</div>
					<div className="col-span-full space-y-1.5">
						<div className="w-3/5">
							<label
								htmlFor="price"
								className="block text-sm  font-medium leading-6 text-secondary-700"
							>
								Price
							</label>
							<div className="relative mt-1 rounded-md shadow-sm">
								<input
									type="number"
									id="price"
									{...register('cost', {
										valueAsNumber: true,
										validate: (value) => value > 0,
									})}
									step="any"
									className="border-1 shadow-accent-300  block h-8 w-full rounded-md  border  border-secondary-300 bg-secondary-50 bg-opacity-70 p-2.5 px-3 py-1 pl-2 pr-20  text-sm font-medium leading-4 text-secondary-700  shadow-sm shadow-secondary-300 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 hover:bg-secondary-50 focus:border-secondary-500 focus:shadow-inner focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 focus:ring-offset-1 sm:text-sm sm:leading-6"
									placeholder="0.00"
								/>
								<div className="absolute inset-y-0 right-0 flex items-center border-l">
									<label htmlFor="currencyId" className="sr-only">
										Currency
									</label>
									<span
										id="currencyId"
										className="flex h-full w-12 items-center justify-center rounded-r-md border-0 border-primary-700 bg-transparent px-1 py-0 text-gray-500 focus:ring-0 focus:ring-inset focus:ring-primary-600 sm:text-sm"
									>
										{data?.currency?.initial}
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className="col-span-full flex w-full items-center justify-center py-4">
						<button
							disabled={isPending ? true : false}
							type="submit"
							className="rounded-md bg-primary-600 p-1 text-sm text-primary-50"
						>
							<span>Submit</span>
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateMaintenance;
