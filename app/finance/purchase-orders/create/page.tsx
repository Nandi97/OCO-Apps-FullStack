'use client';

import PurchaseOrderForm from '@/components/forms/purchase-order/PurchaseOrderForm';
import Link from 'next/link';
import { useState } from 'react';

export default function CreatePurchaseOrder() {
	const [title, setTitle] = useState<string>('Create New PurchaseOrder');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('Submitting Form');
	};
	return (
		<div className="space-y-2 bg-white">
			<div className="sticky z-20 flex items-center justify-between gap-2 bg-white top-2">
				<h1 className="text-lg font-extralight text-accent-700">{title}</h1>
			</div>
			<div className="grid grid-cols-12">
				<form
					onSubmit={handleSubmit}
					className="rounded-md shadow-md shadow-ocoblue-200 col-span-6"
				>
					<div>
						<PurchaseOrderForm />
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
							href={'/finance/purchase-orders'}
							className="flex items-center gap-2 p-2 text-sm font-medium leading-4 text-white border rounded-md shadow-sm bg-ocoblue-600 hover:opacity-80 border-ocoblue-300 focus:outline-none focus:ring-2 focus:ring-ocoblue-500 focus:ring-offset-1"
						>
							Cancel
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
