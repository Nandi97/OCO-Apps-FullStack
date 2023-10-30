'use client';

import MeetingForm from '@/components/forms/meeting/MeetingForm';
import MinutesForm from '@/components/forms/meeting/MinutesForm';
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
			<div className="sticky z-20 flex items-center justify-between gap-2 bg-transparent top-2 px-2">
				<h1 className="text-lg font-extralight text-accent-700">{title}</h1>
			</div>
			<div className="grid grid-cols-12 gap-2">
				<div className="rounded-md shadow-md shadow-ocoblue-200 col-span-6 p-2">
					<MinutesForm onSubmit={handleSubmit} />
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
