'use client';
import LeaveForm from '@/components/forms/LeaveForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CreateLeave() {
	// const queryClient = useQueryClient();
	const router = useRouter();
	let toastId: string;

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: any) => {
			const response = await axios.post('/api/leave/post', data);
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
			toast.success('Leave Application Was Successful', { id: toastId });
			router.push(`/staff/leave-applications/${data?.id}`);
			// queryClient.invalidateQueries({ queryKey: ['animals'] });
		},
	});

	const handleCreateLeave = (data: any) => {
		// console.log('Data:', data);
		mutate(data);
	};
	return (
		<div className="">
			<LeaveForm onSubmit={handleCreateLeave} isLoading={isPending} />
		</div>
	);
}
