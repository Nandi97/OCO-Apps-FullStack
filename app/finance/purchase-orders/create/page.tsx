'use client';

import PurchaseOrderForm from '@/components/forms/purchase-order/PurchaseOrderForm';
import PurchaseOrderPreview from '@/components/previews/PurchaseOrder';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function CreatePurchaseOrder() {
	const [title, setTitle] = useState<string>('Create New PurchaseOrder');
	const [selected, setSelected] = useState<any>([]);
	const [selectedTown, setSelectedTown] = useState<any>([]);
	const [purchaseItems, setPurchaseItems] = useState([
		{
			description: '',
			quantity: 0,
			cost: 0,
		},
	]);

	function generateRandomNumber(minDigits, maxDigits) {
		minDigits = Math.max(6, minDigits);
		maxDigits = Math.min(10, maxDigits);

		const randomFraction = Math.random();

		const range = Math.pow(10, maxDigits) - Math.pow(10, minDigits) + 1;

		const randomNumber = Math.floor(randomFraction * range) + Math.pow(10, minDigits);

		return randomNumber;
	}

	let purchaseOrderNumber = generateRandomNumber(6, 10);

	const [formValues, setFormValues] = useState<any>({
		poNumber: purchaseOrderNumber.toString(),
		type: '',
		vatable: false,
		currencyId: 0,
		name: '',
		email: '',
		phoneNumber: '',
		physicalAddress: '',
		townId: 0,
		address: null,
		postalCode: null,
		city: '',
		country: '',
		totalAmount: 0,
	});

	let toastID: string;

	const router = useRouter();

	const { mutate } = useMutation(
		async () => {
			const purchaseOrderData = {
				poNumber: purchaseOrderNumber,
				type: formValues.vendorType,
				vatable: formValues.vatable,
				currencyId: formValues.currencyId,
				name: formValues.name,
				email: formValues.email,
				phoneNumber: formValues.phoneNumber,
				physicalAddress: formValues.physicalAddress,
				townId: selectedTown?.id,
				address: parseInt(formValues.address),
				postalCode: parseInt(formValues.postalCode),
				city: formValues.city,
				country: formValues.country,
				totalAmount: formValues.vatable
					? purchaseItems?.reduce((total, item) => total + item.cost * item.quantity, 0) *
					  1.16
					: purchaseItems?.reduce((total, item) => total + item.cost * item.quantity, 0),
				approver: selected,
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
				setPurchaseItems([
					{
						description: '',
						quantity: 0,
						cost: 0,
					},
				]);
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
		const selectedValue = event.target.value;

		const isVatable = selectedValue === 'true';

		setFormValues({
			...formValues,
			vatable: isVatable,
		});
	};
	// console.log('FormValues: ', formValues);
	// console.log('Selected: ', selected);
	// console.log('Selected Town: ', selectedTown);
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
			<div className="grid grid-cols-12 gap-2">
				<form
					onSubmit={handleSubmit}
					className="rounded-md shadow-md shadow-ocoblue-200 md:col-span-6 col-span-12"
				>
					<div>
						<PurchaseOrderForm
							onBooleanSelectChange={onBooleanSelectChange}
							setSelectedAuthorizer={setSelected}
							onSelectChange={handleSelectChange}
							formValues={formValues}
							onChange={handleChange}
							setPurchaseOrderItems={setPurchaseItems}
							setSelectedTownValue={setSelectedTown}
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
				<div className="md:col-span-6 col-span-12">
					<PurchaseOrderPreview
						formValues={formValues}
						purchaseOrderItems={purchaseItems}
						selectedAuthorizer={selected}
						selectedTown={selectedTown}
					/>
				</div>
			</div>
		</div>
	);
}
