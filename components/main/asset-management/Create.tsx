'use client';
import AssetForm from '@/components/forms/asset/AssetForm';
import { Asset } from '@/lib/types/master';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import React from 'react';
import toast from 'react-hot-toast';

const Create = () => {
	const router = useRouter();
	let toastId: string;

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: Asset) => {
			const formData = {
				name: data?.name,
				imageUrl: data?.imageUrl,
				description: data?.description,
				serialNumber: data?.serialNumber,
				ocoTagNumber: data?.ocoTagNumber,
				location: data?.location,
				purchaseDate: data?.purchaseDate,
				purchasePrice: data?.purchasePrice,
				currencyId: data?.currencyId,
				typeId: data?.typeId,
				conditionId: data?.conditionId,
				currentlyWithId: data?.currentlyWithId,
			};
			const response = await axios.post('/api/asset/post', formData);
			return response.data;
		},

		onError: (error: any) => {
			if (error instanceof AxiosError) {
				toast.error(error?.response?.data.message, {
					id: toastId,
				});
			}
		},
		onSuccess: (data: any) => {
			toast.success('Asset Created Successfully', { id: toastId });
			router.push(`/asset-management/`);
		},
	});

	const handleCreate = (data: any) => {
		mutate(data);
	};
	return (
		<div className="h-full w-3/4 rounded-md bg-primary-50 shadow-md">
			<div className="flex w-full flex-col items-center justify-center space-y-2 text-secondary-700">
				<h1 className="text-2xl font-bold">Asset Details</h1>
				<h2 className="text-xl font-semibold">Enter the asset details below.</h2>
			</div>
			<AssetForm onSubmit={handleCreate} isPending={isPending} />
		</div>
	);
};

export default Create;
