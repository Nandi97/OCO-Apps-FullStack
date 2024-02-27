'use client';
import LeaveForm from '@/components/forms/leave/LeaveForm';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CreateLeave() {
	// const queryClient = useQueryClient();
	let toastId: string;

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: any) => {
			const formData = {
				employeeId: data.employee.id,
				leaveTypeId: data.leaveTypeId,
				duration: data.duration,
				startDate: data.startDate,
				endDate: data.endDate,
				reportDate: data.reportDate,
				supervisorId: data.supervisorId,
				finalApproverId: data.finalApproverId,
				approvingHRMId: data.approvingHRMId,
			};
			// console.log('Form Data:', formData);

			const response = await axios.post('/api/leave/post', formData);
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
			console.log(data);
			toast.success('Leave Application Was Successful', { id: toastId });

			redirect(`/staff/leave-applications/${data?.id}`);
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
