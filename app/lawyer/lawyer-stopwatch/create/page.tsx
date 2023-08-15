'use client';
import { useState } from 'react';
import Link from 'next/link';
import LawyerStopwatchForm from '@/components/forms/LawyerStopwatchForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function CreateLawyerStopwatch() {
	const [title, setTitle] = useState<string>('Create New Lawyer Stop Watch');
	const [formValues, setFormValues] = useState<any>([
		{
			matterId: '',
			taskId: '',
			narration: '',
			createdAt: '',
			startedAt: '',
			endedAt: '',
		},
	]);

	console.table('Form Values', formValues);

	let toastID: string;
	const queryClient = useQueryClient();

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormValues((prevFormValues: any) => ({
			...prevFormValues,
			[name]: value,
		}));
	};

	const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormValues((prevFormValues: any) => ({
			...prevFormValues,
			[name]: value,
		}));
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormValues((prevFormValues: any) => ({
			...prevFormValues,
			[name]: value,
		}));
	};

	const handleSelectedMatterChange = (selectedMatter: any) => {
		// Do something with the selectedMatter value
		console.log('Selected Matter:', selectedMatter);
	};

	const { mutate } = useMutation(
		async () => {
			const stopwatchData = [
				{
					matterId: formValues.matterId,
					taskId: formValues.taskId,
					narration: formValues.narration,
					createdAt: formValues.createdAt,
					startedAt: formValues.startedAt,
					endedAt: formValues.endedAt,
				},
			];
			console.log('stopwatchData Data', stopwatchData);
			// await axios.post('/api/staff/addStaff', stopwatchData);
		},
		{
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
				setFormValues([
					{
						...formValues,
						matterId: '',
						taskId: '',
						narration: '',
						createdAt: '',
						startedAt: '',
						endedAt: '',
					},
				]);

				// queryClient.invalidateQueries(['staffList']);
			},
		}
	);

	const handleSubmit = () => {
		console.log('Submitting Lawyer Stopwatch');
		mutate();
	};

	return (
		<div className="space-y-2 bg-white">
			<div className="sticky z-20 flex items-center justify-between gap-2 bg-white top-2">
				<h1 className="text-lg font-extralight text-accent-700">{title}</h1>
			</div>
			<form onSubmit={handleSubmit} className="rounded-md shadow-md shadow-ocoblue-200 p-4">
				<div>
					<LawyerStopwatchForm
						formValues={formValues}
						onChange={handleChange}
						onSelectChange={handleSelectChange}
						onTextAreaChange={handleTextChange}
					/>
				</div>
				<div className="flex items-center justify-center w-full py-8 space-x-2">
					{/* Submit Form Button  */}
					<button
						type="submit"
						className="flex items-center gap-2 p-2 text-sm font-medium leading-4 text-white border rounded-md shadow-sm bg-ocobrown-600 hover:opacity-80 border-ocobrown-300 focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
					>
						Submit Form
					</button>
					<Link
						href={'/lawyer/lawyer-stopwatch'}
						className="flex items-center gap-2 p-2 text-sm font-medium leading-4 text-white border rounded-md shadow-sm bg-ocoblue-600 hover:opacity-80 border-ocoblue-300 focus:outline-none focus:ring-2 focus:ring-ocoblue-500 focus:ring-offset-1"
					>
						Cancel
					</Link>
				</div>
			</form>
		</div>
	);
}
