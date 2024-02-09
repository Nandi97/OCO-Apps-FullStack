'use client';
import CauseListForm from '@/components/forms/cause-list/CauseListForm';
import { CauseList } from '@/lib/types/master';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

const Create = () => {
	const router = useRouter();
	let toastId: string;

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: CauseList) => {
			const formData = {
				team: data.team,
				date: data.date,
				cases: data.cases,
			};
			// console.log(formData);

			const response = await axios.post('/api/cause-list/post', formData);
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
			toast.success('Cause List Created Successfully', { id: toastId });
			// router.push(`/newsfeed/${data?.id}`);
		},
	});

	const handleCreate = (data: any) => {
		mutate(data);
		// console.log('Data at Mutate', data);
	};
	return (
		<div>
			<CauseListForm onSubmit={handleCreate} isPending={isPending} />
		</div>
	);
};

export default Create;
