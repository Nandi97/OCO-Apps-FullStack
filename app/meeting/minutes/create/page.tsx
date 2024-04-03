'use client';

import MeetingForm from '@/components/forms/meeting/MeetingForm';
import Link from 'next/link';
import { useState } from 'react';

export default function CreateMinutes() {
	const [title, setTitle] = useState<string>('Create Meeting Minutes');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('Submitting Form');
		// mutate();
	};
	return (
		<div className="space-y-2 bg-white">
			<div className="grid grid-cols-12 gap-2">
				<div className="col-span-6 rounded-md p-2 shadow-md shadow-secondary-300">
					<h1 className="text-accent-700 text-lg font-extralight">{title}</h1>
					<MeetingForm />
				</div>
				<div className="col-span-12 md:col-span-6">
					{/* <PurchaseOrderPreview
						formValues={formValues}
						purchaseOrderItems={purchaseItems}
						selectedAuthorizer={selected}
						selectedTown={selectedTown}
					/> */}
				</div>
			</div>
		</div>
	);
}
