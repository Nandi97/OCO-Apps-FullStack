'use client';

import PurchaseOrderForm from '@/components/forms/purchase-order/PurchaseOrderForm';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function CreatePurchaseOrder() {
	const [title, setTitle] = useState<string>('Create New PurchaseOrder');
	const [selected, setSelected] = useState('');
	const [purchaseItems, setPurchaseItems] = useState('');

	const [formValues, setFormValues] = useState<any>({
		vendorType: '',
		vatable: false,
		currencyId: 0,
		name: '',
		email: '',
		phoneNumber: '',
		address: '',
	});

	let toastID: string;

	const router = useRouter();

	const { mutate } = useMutation(
		async () => {
			const purchaseOrderData = {
				vendorType: formValues.vendorType,
				vatable: formValues.vatable,
				currencyId: formValues.currencyId,
				name: formValues.name,
				email: formValues.email,
				phoneNumber: formValues.phoneNumber,
				address: formValues.address,
				approverId: selected,
				purchaseItems: purchaseItems,
			};
			console.log('Purchase Order Data', purchaseOrderData);
			await axios.post('/api/purchase-order/addPurchaseOrder', purchaseOrderData);
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
				toast.success('Book has been Created', {
					id: toastID,
				});
				setFormValues({
					...formValues,
					vendorType: '',
					vatable: false,
					currencyId: 0,
					name: '',
					email: '',
					phoneNumber: '',
					address: '',
				});
				setSelected('');
				setPurchaseItems('');
				router.push('/finance/purchase-orders/');
			},
		}
	);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormValues((prevFormValues: any) => ({
			...prevFormValues,
			[name]: value,
		}));
	};
	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormValues((prevFormValues: any) => ({
			...prevFormValues,
			[name]: value,
		}));
	};

	const onBooleanSelectChange = (event) => {
		// Get the selected value from the select input
		const selectedValue = event.target.value;

		// Convert the selected value to a boolean
		const isVatable = selectedValue === 'true';

		// Update the formValues state with the boolean value
		setFormValues({
			...formValues,
			vatable: isVatable,
		});
	};
	// console.log('FormValues: ', formValues);
	// console.log('Selected: ', selected);
	// console.log('Purchased Items: ', purchaseItems);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// console.log('Submitting Form');
		mutate();
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
						<PurchaseOrderForm
							onBooleanSelectChange={onBooleanSelectChange}
							setSelectedAuthorizer={setSelected}
							onSelectChange={handleSelectChange}
							formValues={formValues}
							onChange={handleChange}
							setPurchaseOrderItems={setPurchaseItems}
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
