'use client';
import StaffForm from '@/components/forms/staff/StaffForm';
import { Icon } from '@iconify/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface StaffFormData {
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

export default function CreateStaff() {
	const [title, setTitle] = useState<string>('Create New Staff');
	const router = useRouter();
	const queryClient = useQueryClient();

	let toastID: string;

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: StaffFormData) => {
			const response = await axios.post('/api/staff/addStaff', data);
			return response.data;
		},

		onError: (error) => {
			if (error instanceof AxiosError) {
				toast.error(error?.response?.data.message, {
					id: toastID,
				});
				console.error('Form submission error:', error);
			}
		},
		onSuccess: (data) => {
			toast.success('Staff Member has been Created', {
				id: toastID,
			});

			queryClient.invalidateQueries({ queryKey: ['staffList'] });
			router.push(`/staff/staff-list/${data?.id}`);
		},
	});

	const handleCreate = (data: any) => {
		mutate(data);
	};

	return (
		<div className="  w-full h-full  text-center">
			<div className="rounded-md bg-white w-full flex flex-col items-center divide-y-2 space-y-4">
				<h1 className="mb-4 text-xl font-medium text-secondary-900 pt-5">Staff Form </h1>

				<StaffForm onSubmit={handleCreate} isPending={isPending} />
			</div>
		</div>
	);
}
