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
				<div className="rounded-md shadow-md shadow-ocoblue-300 col-span-6 p-2">
					<h1 className="text-lg font-extralight text-accent-700">{title}</h1>
					<MeetingForm />
				</div>
				<div className="md:col-span-6 col-span-12">
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
