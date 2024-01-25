'use client';

import Form from '@/components/forms/newsfeed/NewsFeedForm';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function Create() {
	const router = useRouter();
	let toastId: string;

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: any) => {
			const response = await axios.post('/api/newsfeed/post', data);
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
			router.push(`/newsfeed/${data?.id}`);
		},
	});

	const handleCreate = (data: any) => {
		mutate(data);
		// console.log(data);
	};
	return <Form onSubmit={handleCreate} isPending={isPending} />;
}
