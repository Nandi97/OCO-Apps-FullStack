'use client';
import CauseListForm from '@/components/forms/cause-list/CauseListForm';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

interface CauseList {
	team: { id: number; name: string };
	date: string;
	causeListItem: [
		{
			coram: string;
			virtual: boolean;
			case: string;
			advocates: [];
		},
	];
}
const Create = () => {
	const router = useRouter();
	let toastId: string;

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: CauseList) => {
			const formData = {
				teamId: data.team.id,
				date: data.date,
				cause: data.causeListItem,
			};
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
			toast.success('Newsfeed Created Successfully', { id: toastId });
			// router.push(`/newsfeed/${data?.id}`);
		},
	});

	const handleCreate = (data: any) => {
		// mutate(data);
		console.log(data);
	};
	return (
		<div>
			<CauseListForm onSubmit={handleCreate} isPending={isPending} />
		</div>
	);
};

export default Create;
