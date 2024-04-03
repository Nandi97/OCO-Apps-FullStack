'use client';
import BookForm from '@/components/forms/book/BookForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface StaffFormData {
	author: string;
	title: string;
	coverUrl: string;
	copies: number;
	edition: string;
	isbnIssn: string;
	mediaType: string;
	publicationYear: number;
	publisher: string;
	subject: string;
}

export default function CreateBook() {
	const [title, setTitle] = useState<string>('Create New Book');
	const router = useRouter();
	const queryClient = useQueryClient();

	let toastID: string;

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: StaffFormData) => {
			// console.log(data);
			const response = await axios.post('/api/books/post', data);
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
			toast.success('Book has been Created', {
				id: toastID,
			});

			queryClient.invalidateQueries({ queryKey: ['staffList'] });
			router.push(`/library/book/${data?.id}`);
		},
	});

	const handleCreate = (data: any) => {
		mutate(data);
		// console.log(data);
	};

	return (
		<div className="  h-full w-full  text-center">
			<div className="flex w-full flex-col items-center space-y-4 divide-y-2 rounded-md bg-white">
				<h1 className="mb-4 pt-5 text-xl font-medium text-secondary-900">Create Book</h1>

				<BookForm onSubmit={handleCreate} isPending={isPending} />
			</div>
		</div>
	);
}
