'use client';
import { useState } from 'react';
import Link from 'next/link';
import LawyerStopwatchForm from '@/components/forms/LawyerStopwatchForm';

export default function CreateLawyerStopwatch() {
	const [title, setTitle] = useState<string>('Create New Lawyer Stop Watch');
	const [formValues, setFormValues] = useState<any>([{
		matterId: '',
		taskId: '',
    narration: '',
    createdAt: '',
    startedAt: '',
    endedAt: '',
	}]);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormValues((prevFormValues: any) => ({
			...prevFormValues,
			[name]: value,
		}));
	};

	const handleSelectedMatterChange = (selectedMatter :any) => {
    // Do something with the selectedMatter value
    console.log('Selected Matter:', selectedMatter);
  }

	const handleSubmit = () => {
		console.log('Submitting Lawyer Stopwatch');
	};

	return (
		<div className="space-y-2 bg-white">
			<div className="sticky z-20 flex items-center justify-between gap-2 bg-white top-2">
				<h1 className="text-lg font-extralight text-accent-700">{title}</h1>
			</div>
			<form onSubmit={handleSubmit} className="rounded-md shadow-md shadow-ocoblue-200 p-4">
				<div>
					<LawyerStopwatchForm  formValues={formValues}
        onChange={...}
        onSelectChange={...}
        onTextAreaChange={...}
        onSelectedMatterChange={handleSelectedMatterChange} />
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
						href={'/library'}
						className="flex items-center gap-2 p-2 text-sm font-medium leading-4 text-white border rounded-md shadow-sm bg-ocoblue-600 hover:opacity-80 border-ocoblue-300 focus:outline-none focus:ring-2 focus:ring-ocoblue-500 focus:ring-offset-1"
					>
						Cancel
					</Link>
				</div>
			</form>
		</div>
	);
}
